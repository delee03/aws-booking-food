import {
    BadRequestError,
    ForbiddenError,
} from "../../common/helpers/handle.error.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../../common/prisma/prisma.init.js";
import setUpCookies from "../token/createToken.cookies.js";
import { sendMail } from "../../common/mails/sendMail.nodemailer.js";

export const authService = {
    register: async (req) => {
        //b1: nhận dữ liệu từ client FE gửi lên
        const { email, password, fullName, phone } = req.body;
        console.log(req.body);

        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        //b2: kiểm tra dữ liệu từ client FE gửi lên có hợp lệ không
        if (!email || !password || !fullName || !phone) {
            throw new BadRequestError("Email, password, fullName is invalid");
        }

        if (!validateEmail(email)) {
            throw new BadRequestError("Email is invalid");
        }

        if (password.length < 8) {
            throw new BadRequestError(
                "Password must be at least 8 characters long"
            );
        }
        //b3: kiểm tra email đã tồn tại trong db chưa
        //findunique dành cho 1 index duy nhất hoặc primary key nếu k dùng findFirst
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (user) {
            throw new BadRequestError("Email is exist");
        }
        console.log(req.body);
        //b4:  mã hóa password 1 chiều trước khi lưu vào db, tạo user trong db
        const hashPassword = bcrypt.hashSync(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                name: fullName,
                phone: phone,
            },
        });

        // gửi mail thông báo đăng kí thành công

        const emailSending = await sendMail(
            email,
            "Welcome to Our Service",
            "Xác nhận đăng ký thành công",
            fullName
        );
        if (emailSending) {
            return {
                newUser,
                nofity: "Đăng ký tài khoản thành công",
            };
        } else {
            return {
                newUser,
                nofity: "Tạo user thành công, nhưng gửi mail thất bại",
            };
        }
    },

    login: async (req) => {
        const { email, password } = req.body;

        const userExist = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!userExist) {
            throw new BadRequestError("Email is not exist, please register");
        }
        if(!userExist.status){
            throw new BadRequestError("Account is blocked");
        }
        //kiểm tra password
        const isPasswordValid = bcrypt.compareSync(
            password,
            userExist.password
        );
        if (!isPasswordValid) {
            throw new BadRequestError("Password is invalid");
        }
        //tạo token
        // const token = jwt.sign(
        //     { userId: userExist.id },
        //     process.env.JWT_SECRET,
        //     { expiresIn: "1h" }
        // );

        // const cookieOptions = {
        //     httpOnly: true,
        //     maxAge: 15 * 24 * 60 * 60 * 1000,
        // };

        // const setCookie = cookie.serialize("token", token, cookieOptions);

        const cookies = setUpCookies.createToken_Cookies(userExist.user_id);
        return cookies;
    },
   
};
