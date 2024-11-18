import { responseSuccess } from "../../common/helpers/handle.response.js";
import { authService } from "../../services/auth/auth.service.js";

export const authController = {
    login: async function (req, res, next) {
        try {
            const result = await authService.login(req);
            const response = responseSuccess(
                result,
                `login user entity successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
    register: async function (req, res, next) {
        try {
            const result = await authService.register(req);
            const response = responseSuccess(
                result,
                `register user entity successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
};
