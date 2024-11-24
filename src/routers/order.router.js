import express from 'express';
import { orderController } from '../controllers/order/order.controller.js';
import protect from '../common/middlewares/protect.middleware.js';

const orderRouter = express.Router();

// Tạo route CRUD
orderRouter.post('/', protect,orderController.create);
orderRouter.get('/', orderController.findAll);
orderRouter.get('/:id', orderController.findOne);
orderRouter.patch('/:id', orderController.update);
orderRouter.delete('/:id', orderController.remove);

export default orderRouter;