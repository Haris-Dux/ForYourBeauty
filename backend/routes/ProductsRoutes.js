import express from "express";
import {
  addProduct,
  deleteProduct,
  getLatestPRoducts,
  getProducts,
  updateProduct,
} from "../controllers/ProductsController.js";

const productRouter = express.Router();

productRouter.post("/products/addProduct", addProduct);
productRouter.post("/products/updateProduct", updateProduct);
productRouter.post("/products/deleteProduct", deleteProduct);
productRouter.post("/products/deleteProduct", deleteProduct);
productRouter.post("/products/getLatestPRoducts", getLatestPRoducts);
productRouter.post("/products/getProducts", getProducts);

export default productRouter;
