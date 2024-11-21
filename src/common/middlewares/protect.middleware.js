import jwt from "jsonwebtoken";

import prisma from "../prisma/prisma.init.js";
import { UnauthorizedError } from "../helpers/handle.error.js";
import { JWT_SECRET } from "../constants/env.constants.js";

async function protect(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new UnauthorizedError()
         }
        const accessToken = token.split(" ")[1]
    
        console.log(accessToken);
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        console.log(decoded)
        const userId = decoded.userId;
        const user = await prisma.user.findUnique({
            where: {
                user_id: userId,
            },
        });
        if (!user) {
            throw new ForbiddenError("Không tìm thấy user");
        }
        req.user = user;
        next();
    } catch (error) {
      next(error)
    }
}

export default protect;