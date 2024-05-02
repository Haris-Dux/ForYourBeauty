import { CouponModel } from "../models/CouponModel";
import { setMongoose } from "../utils/Mongoose.js";

export const createCoupun = async (req, res, next) => {
  try {
    const {
      code,
      discountAmount,
      total_limit,
      expiresAt,
      allProducts,
      categories,
    } = req.body;
    if (!code || !discountAmount || !total_limit || !expiresAt)
      throw new Error("Invalid Data");
    if (!allProducts || !categories)
      throw new Error("PLease select all Products or choose categories");
    await CouponModel.create({
      code,
      discountAmount,
      total_limit,
      expiresAt,
      allProducts,
      categories,
    });
    return res.status(500).json({ message:"Coupon Created" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCoupon = async (req, res,next) => {
    try {
        const {id} = req.body;
        if(!id) throw new Error("Coupon Id Required");
        await CouponModel.findByIdAndDelete(id);
        return res.status(500).json({ message:"Coupon deleted"});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateCoupon = async (req, res, next) => {
    try {
        const {
            id,
            code,
            discountAmount,
            total_limit,
            isActive,
            expiresAt,
            allProducts,
            categories,
          } = req.body;
          if(!id) throw new Error("Coupon Id not found");
          
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}