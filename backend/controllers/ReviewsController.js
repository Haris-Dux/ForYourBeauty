import { reviewsAndRatings } from "../models/ReviewsModel.js";
import { setMongoose } from "../utils/Mongoose.js";

export const createReview = async (req,res,next) => {
  try {
    const { productID, userID, review, rating } = req.body;
    if (!productID || !userID)
      throw new Error(`All Fields are required`);
    if(rating.length < 1) throw new Error(`Review must have at least one star rating`);
    reviewsAndRatings.create({ productID, userID, review, rating });
    return res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateReview = async (req,res,next) => {
  try {
    const { id, review, rating } = req.body;
    if(!id) throw new Error(`Review Id required`);
    let updateQuery = {};
    if (rating && rating.length >= 1) {
        updateQuery = { ...updateQuery, review };
      } else{
        throw new Error(`Review must have at least one star rating`);
      }
      if (review) {
        updateQuery = { ...updateQuery, rating };
      }
      if(Object.keys(updateQuery).length === 0) throw new Error("No Fields To Update");
     await reviewsAndRatings.findByIdAndUpdate({_id:id},updateQuery);
    return res.status(201).json({ message: "Review updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteReview = async (req,res,next) => {
    try {
        const { id } = req.body;
        await reviewsAndRatings.findByIdAndDelete(id);
        return res.status(201).json({ message: "Review updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getAllReviewsByProduct = async (req, res, next) => {
    try {
        const { id } = req.body;
        if(id) throw new Error('Id not recieved');
        const productReviews = await reviewsAndRatings.findById(id).sort({createdAt:-1});
        setMongoose();
        return res.status(200).json(productReviews);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
