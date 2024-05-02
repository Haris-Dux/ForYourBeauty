import express from "express";
import userRouter from "./UserRoutes.js";
import productRouter from "./ProductsRoutes.js";
import reviewsRouter from "./ReviewsRoutes.js";


const router = express.Router();

router.use(userRouter);
router.use(productRouter);
router.use(reviewsRouter);


export default router;