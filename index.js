import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { handlerError } from "./src/common/helpers/handle.error.js";
import { orderService } from "./src/services/order/order.service.js";

const app = express();

app.use(express.json());

app.use(rootRouter);
app.use(handlerError);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
