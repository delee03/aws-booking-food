import { responseSuccess } from "../../common/helpers/handle.response.js";
import { userService } from "../../services/user/user.service.js";

export const userController = {
  create: async function (req, res, next) {
    try {
      const result = await userService.create(req);
      const response = responseSuccess(
        result,
        `Thêm user thành công`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await userService.findAll(req);
      const response = responseSuccess(
        result,
        `Lấy tất cả user thành công`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findOne: async function (req, res, next) {
    try {
      const result = await userService.findOne(req);
      const response = responseSuccess(
        result,
        `Lấy user #${req.params.id} thành công`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await userService.update(req);
      const response = responseSuccess(
        result,
        `Cập nhật user #${req.params.id} thành công`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await userService.remove(req);
      const response = responseSuccess(
        result,
        `Xóa user #${req.params.id} thành công`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};