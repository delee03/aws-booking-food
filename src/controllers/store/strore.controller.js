import { responseSuccess } from "../../common/helpers/handle.response.js";
import { storeService } from "../../services/store/store.service.js";

export const storeController = {
    create: async function (req, res, next) {
        try {
            const result = await storeService.create(req);
            const response = responseSuccess(
                result,
                `Create entity successfully`
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
                `Get all entity successfully`
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
                `Get entity #${req.params.id} successfully`
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
                `Update entity #${req.params.id} successfully`
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
                `Remove entity #${req.params.id} successfully`
            );
            res.status(response.code).json(response);
        } catch (err) {
            next(err);
        }
    },
};
