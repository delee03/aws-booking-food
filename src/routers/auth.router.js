import { Router } from "express";
import { authController } from "../controllers/auth/auth.controller.js";

const authRouter = Router();
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

//forgot password
// authRouter.post("/auth/forgot-password", authController.forgotPassword);

export default authRouter;
