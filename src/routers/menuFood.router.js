import express from "express";
import { menuFoodController } from "../controllers/menuFood/menuFood.controller.js";
import protect from "../common/middlewares/protect.middleware.js";

const menuFoodRouter = express.Router();
menuFoodRouter.use(protect);
// Tạo route CRUD
menuFoodRouter.post("/", menuFoodController.create);
menuFoodRouter.get("/", menuFoodController.findAll);
menuFoodRouter.get("/:id", menuFoodController.findOne);
menuFoodRouter.get("/get-by-store/:storeId", menuFoodController.findByStore);
menuFoodRouter.patch("/:id", menuFoodController.update);
menuFoodRouter.delete("/:id", menuFoodController.remove);

export default menuFoodRouter;
