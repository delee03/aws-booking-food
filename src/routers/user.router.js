import express from 'express';
import { userController } from '../controllers/user/user.controller.js';
import protect from '../common/middlewares/protect.middleware.js';

const userRouter = express.Router();
userRouter.use(protect);

// Tạo route CRUD
userRouter.post('/', userController.create);
userRouter.get('/', userController.findAll);
userRouter.get('/:id', userController.findOne);
userRouter.patch('/:id', userController.update);
userRouter.delete('/:id', userController.remove);

export default userRouter;