import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { generateEmailContent } from "./generateHTML.js";

// Load các biến môi trường từ .env
dotenv.config();

// Hàm tạo transporter cho Nodemailer
const createTransporter = () => {
    return nodemailer.createTransport({
        host: "smtp.gmail.com", // Máy chủ SMTP
        port: 587, // Cổng SMTP
        secure: false,
        // secure: process.env.EMAIL_SECURE === 'true', // true nếu dùng SSL (cổng 465)
        auth: {
            user: process.env.EMAIL_USER, // Tên đăng nhập SMTP
            pass: process.env.EMAIL_PASSWORD, // Mật khẩu ứng dụng
        },
    });
};

// Hàm gửi email
export const sendMail = async (to, subject, title, fullName) => {
    try {
        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);
        const transporter = createTransporter();

        const content = generateEmailContent(title, fullName);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: content,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};
