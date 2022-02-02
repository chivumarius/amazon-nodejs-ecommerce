// IMPORTS:
import express from "express";
import expressAysncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils";
import Product from "../models/productModel";

// DEFINE "PRODUCT" ROUTER → FROM "EXPRESS":
const productRouter = express.Router();

// PRODUCT ROUTER - "POST('/')"
productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAysncHandler(async (req, res) => {
    // CREATING "NEW PRODUCT":
    const product = new Product({
      name: "sample product",
      description: "sample desc",
      category: "sample category",
      brand: "sample brand",
      image: "/images/product-1.jpg",
    });

    // SAVING PRODUCT IN "DB":
    const createdProduct = await product.save();

    // CHECKING IF THERE IS "CREATED PRODUCT":
    if (createdProduct) {
      // SENDING MESSAGE "201" (COD FOR "CREATED ITEMS")
      res
        .status(201)
        .send({ message: "Product Created", product: createdProduct });
    } else {
      // ERROR MESSAGE "500":
      res.status(500).send({ message: "Error in creating product" });
    }
  })
);

// EXPORT:
export default productRouter;
