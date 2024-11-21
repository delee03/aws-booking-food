import jwt from "jsonwebtoken";
import {
    JWT_EXPIRE,
    JWT_SECRET,
} from "../../common/constants/env.constants.js";

const tokenService = {
    createToken:  (user) => {
        const token =  jwt.sign({ userId: user.user_id, userRole:  user.role}, JWT_SECRET, {
            expiresIn: JWT_EXPIRE,
        });
        return token;
    },
};

export default tokenService;
