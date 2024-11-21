import { responseSuccess } from "../../common/helpers/handle.response.js";
import { authService } from "../../services/auth/auth.service.js";

export const authController = {
    login: async function (req, res, next) {
        try {
            const result = await authService.login(req);
            const response = responseSuccess(
                result,
                `Đăng nhập thành công`
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
                `Đăng ký thành công`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
};
