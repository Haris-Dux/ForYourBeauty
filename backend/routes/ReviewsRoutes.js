import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviewsByProduct,
  updateReview,
} from "../controllers/ReviewsController.js";
import { verifyUser } from "../middleware/Auth.js";

const reviewsRouter = express.Router();

reviewsRouter.post("/reviews/createReview",verifyUser,createReview);
reviewsRouter.post("/reviews/updateReview",verifyUser,updateReview);
reviewsRouter.post("/reviews/deleteReview",verifyUser,deleteReview);
reviewsRouter.post("/reviews/getAllReviewsByProduct",getAllReviewsByProduct);

export default reviewsRouter;
