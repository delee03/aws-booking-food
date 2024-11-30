import express from "express";
import { storeController } from "../controllers/store/strore.controller.js";
import protect from "../common/middlewares/protect.middleware.js";

const storeRouter = express.Router();
storeRouter.use(protect);

// Tạo route CRUD
storeRouter.post("/", storeController.create);
storeRouter.get("/", storeController.findAll);
storeRouter.get("/:id", storeController.findOne);
storeRouter.patch("/:id", storeController.update);
storeRouter.delete("/:id", storeController.remove);

export default storeRouter;
