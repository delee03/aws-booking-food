import express from "express";
import { orderController } from "../controllers/order/order.controller.js";
import protect from "../common/middlewares/protect.middleware.js";

const orderRouter = express.Router();
orderRouter.use(protect);

// Tạo route CRUD
orderRouter.post("/", orderController.create);
orderRouter.get("/", orderController.findAll);
orderRouter.get("/:id", orderController.findOne);
orderRouter.patch("/:id", orderController.update);
orderRouter.delete("/:id", orderController.remove);
orderRouter.post("/create-payment-url", orderController.createPaymentUrl);
// Router xử lý trả về từ VNPAY
orderRouter.get(
    "/handle-return-url-payment",
    orderController.handleReturnUrlPayment
);

export default orderRouter;
