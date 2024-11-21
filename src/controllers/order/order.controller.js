import { responseSuccess } from "../../common/helpers/handle.response.js";
import { orderService } from "../../services/order/order.service.js";

export const orderController = {
  create: async function (req, res, next) {
    try {
      const result = await orderService.create(req);
      const response = responseSuccess(
        result,
        `Create order successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await orderService.findAll(req);
      const response = responseSuccess(
        result,
        `Get all order successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  findOne: async function (req, res, next) {
    try {
      const result = await orderService.findOne(req);
      const response = responseSuccess(
        result,
        `Get order #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await orderService.update(req);
      const response = responseSuccess(
        result,
        `Update order #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await orderService.remove(req);
      const response = responseSuccess(
        result,
        `Remove order #${req.params.id} successfully`
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};