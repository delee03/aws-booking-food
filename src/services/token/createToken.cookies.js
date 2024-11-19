import jwt from "jsonwebtoken";
import cookie from "cookie";
import {
    JWT_EXPIRE,
    JWT_SECRET,
} from "../../common/constants/env.constants.js";

const setUpCookies = {
    createToken_Cookies: async (userId) => {
        const token = jwt.sign({ userId: userId }, JWT_SECRET, {
            expiresIn: JWT_EXPIRE,
        });
        const cookieOptions = {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
        };
        const setCookie = cookie.serialize(
            "cookiesToken",
            token,
            cookieOptions
        );
        return setCookie;
    },
};

export default setUpCookies;
