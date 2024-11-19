import { Router } from "express";
import authRouter from "./auth.router.js";
import storeRouter from "./strore.router.js";

const rootRouter = Router();

rootRouter.get("/", (req, res) => {
    res.json("Hello World");
});

rootRouter.use("/auth", authRouter);
rootRouter.use("/store", storeRouter);

export default rootRouter;
