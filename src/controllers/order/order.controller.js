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
    createPaymentUrl: async function (req, res, next) {
        try {
            const { order_id, amount = 100000, bankCode } = req.body;

            if (!order_id || !amount) {
                return res
                    .status(400)
                    .json({ message: "Order ID and amount are required" });
            }

            const returnUrl = `http://localhost:5173`;
            const paymentUrl = await orderService.createVnpayPaymentUrl(
                order_id,
                amount,
                bankCode,
                returnUrl
            );

            res.status(200).json({ paymentUrl });
        } catch (error) {
            console.error("Error creating payment:", error.message);
            next(error);
        }
    },
    handleReturnUrlPayment: async (req, res, next) => {
        try {
            const queryParams = req.query;
            const result = await orderService.handleVnpayReturn(queryParams);

            if (result.success) {
                res.status(200).json({ message: result.message });
            } else {
                res.status(400).json({ message: result.message });
            }
        } catch (error) {
            console.error("Error handling return:", error.message);
            // Xử lý lỗi Prisma hoặc lỗi khác
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return res
                    .status(400)
                    .json({ message: "Database error", code: error.code });
            }
            res.status(500).json({ message: error.message });
            next(error);
        }
    },
};
