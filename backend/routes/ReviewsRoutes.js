import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviewsByProduct,
  updateReview,
} from "../controllers/ReviewsController.js";
const reviewsRouter = express.Router();

reviewsRouter.post("/reviews/createReview",createReview);
reviewsRouter.post("/reviews/updateReview",updateReview);
reviewsRouter.post("/reviews/deleteReview",deleteReview);
reviewsRouter.post("/reviews/getAllReviewsByProduct",getAllReviewsByProduct);

export default reviewsRouter;
