import mongoose from "mongoose";
const { Schema } = mongoose;

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Please Provide Coupon Code"],
      unique:true
    },
    discountAmount: {
      type: Number,
      required: [true, "Please Provide Discount Amount"],
    },
    uses_count:{
        type:Number,
        default:null
    },
    isActive:{
        type:Boolean,
        default:true
    },
    total_limit:{
        type:Number,
        required: [true, "Please Provide a limit"]
    },
    expiresAt:{
        type:Date,
        required: [true, "Please Provide Date"],
    },
    allProducts:{
        type: Boolean
    },
   categories:{
    type:Array,
    enum:["Skincare","Body Care","Haircare","Cosmetics"]
   }
  },
  { timestamps: true }
);

export const CouponModel = mongoose.model("Coupons", couponSchema);
