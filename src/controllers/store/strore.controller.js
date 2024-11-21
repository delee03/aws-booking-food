import { responseSuccess } from "../../common/helpers/handle.response.js";
import { storeService } from "../../services/store/store.service.js";

export const storeController = {
    create: async function (req, res, next) {
        try {
            const result = await storeService.create(req);
            const response = responseSuccess(
                result,
                `Thêm cửa hàng thành công`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    findAll: async function (req, res, next) {
        try {
            const result = await storeService.findAll(req);
            const response = responseSuccess(
                result,
                `Lấy tất cả cửa hàng thành công`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    findOne: async function (req, res, next) {
        try {
            const result = await storeService.findOne(req);
            const response = responseSuccess(
                result,
                `Lấy cửa hàng #${req.params.id} thành công`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    update: async function (req, res, next) {
        try {
            const result = await storeService.update(req);
            const response = responseSuccess(
                result,
                `Cập nhật cửa hàng #${req.params.id} thành công`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },

    remove: async function (req, res, next) {
        try {
            const result = await storeService.remove(req);
            const response = responseSuccess(
                result,
                `Xóa cửa hàng #${req.params.id} thành công`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
};
