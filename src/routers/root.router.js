import { Router } from "express";
import authRouter from "./auth.router.js";
import storeRouter from "./store.router.js";
import userRouter from "./user.router.js";
import menuFoodRouter from "./menuFood.router.js";

const rootRouter = Router();

rootRouter.get("/", (req, res) => {
    res.json("Hello World");
});

rootRouter.use("/auth", authRouter);
rootRouter.use("/store", storeRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/menu-food", menuFoodRouter);

export default rootRouter;
