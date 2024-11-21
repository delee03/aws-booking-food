import { responseSuccess } from "../../common/helpers/handle.response.js";
import { menuFoodService } from "../../services/menuFood/menuFood.service.js";

export const menuFoodController = {
  create: async function (req, res, next) {
    try {
      const result = await menuFoodService.create(req);
      const response = responseSuccess(
        result,
        `Tạo mới món ăn thành công`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await menuFoodService.findAll(req);
      const response = responseSuccess(
        result,
        `Lấy tất cả món ăn thành công`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
  findByStore : async (req, res, next) => { 
    try {
      const result = await menuFoodService.findByStore(req);
      const response = responseSuccess(
        result,
        `Lấy tất cả món ăn theo cửa hàng thành công`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
   }
},

  findOne: async function (req, res, next) {
    try {
      const result = await menuFoodService.findOne(req);
      const response = responseSuccess(
        result,
        `Lấy món ăn ${req.params.id} thành công`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await menuFoodService.update(req);
      const response = responseSuccess(
        result,
        `Cập nhật món ăn ${req.params.id} thành công`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await menuFoodService.remove(req);
      const response = responseSuccess(
        result,
        `Xóa món ăn ${req.params.id} thành công`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};