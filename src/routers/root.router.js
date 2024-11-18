import { Router } from "express";
import authRouter from "./auth.router.js";

const rootRouter = Router();

rootRouter.get("/", (req, res) => {
    res.json("Hello World");
});

rootRouter.use("/auth", authRouter);

export default rootRouter;
