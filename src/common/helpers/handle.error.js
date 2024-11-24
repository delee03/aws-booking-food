import pkg from "jsonwebtoken";
const { TokenExpiredError, JsonWebTokenError } = pkg;
import { responseError } from "./handle.response.js";
import { Prisma } from "@prisma/client";

export const handlerError = (error, req, res, next) => {
    console.log(`Lỗi ở next error ${error}`);
    if (error instanceof JsonWebTokenError) {
        error.code = 401;
    }
    if (error instanceof TokenExpiredError) {
        error.code = 403;
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Xử lý lỗi Prisma
        if (error.code === "P2023") {
            return res
                .status(400)
                .json({ message: "Invalid relation ID or input data" });
        }
        // Các lỗi Prisma khác
        return res
            .status(500)
            .json({ message: "Database error", code: err.code });
    }

    const resData = responseError(error.message, error.code, error.stack);
    res.status(resData.code).json(resData);
};

export class BadRequestError extends Error {
    constructor(message = "Bad Request") {
        super(message);
        this.name = "BadRequestError";
        this.code = 400;
    }
}

export class ForbiddenError extends Error {
    constructor(message = "Forbidden") {
        super(message);
        this.code = 403;
    }
}

export class UnauthorizedError extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = "UnauthorizedError";
        this.code = 401;
    }
}

export class NotFoundError extends Error {
    constructor(message = "Not Found") {
        super(message);
        this.name = "NotFoundError";
        this.code = 404;
    }
}

export class InternalServerError extends Error {
    constructor(message = "Internal Server Error") {
        super(message);
        this.name = "InternalServerError";
        this.code = 500;
    }
}
