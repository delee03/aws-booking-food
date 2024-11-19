import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../prisma/prisma.init.js";

async function protect(req, res, next) {
    try {
        const cookies = req.headers.cookie;
        if (!cookies) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const parsedCookies = cookie.parse(cookies);

        console.log(parsedCookies);
        const token = parsedCookies.cookiesToken;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
}
