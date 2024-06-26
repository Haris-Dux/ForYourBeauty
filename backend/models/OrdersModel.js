import mongoose from "mongoose";
import { generateUniqueOrderId } from "../utils/GenerateId.js";

const orderProgressSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Dispatched", "Deliverd", "Cancelled"],
  },
  additionalNote: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: Array,
      required: [true, "Order items required"],
    },
    userID: {
      type: mongoose.Types.ObjectId,
      required: [true, "userID required"],
    },
    name: {
      type: String,
      required: [true, "name required"],
    },
    address: {
      type: String,
      required: [true, "address required"],
    },
    phone: {
      type: String,
      required: [true, "phone required"],
    },
    totalAmount: { type: Number, required: [true, "Total Amount required"] },
    OrderID: {
      type: String,
      unique: true,
    },
    orderProgress: [orderProgressSchema],
    couponUsed: {
      code: { type: String },
      discount: { type: Number },
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  if (this.isNew || !this.OrderID) {
    const uniqueOrderID = await generateUniqueOrderId();
    this.OrderID = uniqueOrderID;
  }
  next();
});

export const OrdersModel = mongoose.model("Orders", orderSchema);
