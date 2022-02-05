// IMPORTS:
import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils";
import Product from "../models/productModel";

// DEFINE "PRODUCT" ROUTER → FROM "EXPRESS":
const productRouter = express.Router();

// PRODUCT ROUTER - "GET('/')"
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    // CONDITION FOR SERCHING KETWORD:
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: "i",
          },
        }
      : {};

    // FINDING "PRODUCT":
    const products = await Product.find({ ...searchKeyword });

    // SENDING:
    res.send(products);
  })
);

// PRODUCT ROUTER - "GET('/:ID')"
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    // FINDING "PRODUCT" → BY "ID":
    const product = await Product.findById(req.params.id);
    // SENDING THISE "PRODUCT":
    res.send(product);
  })
);

// PRODUCT ROUTER - "POST('/')"
productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
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

// PRODUCT ROUTER - "PUT('/:ID')"
productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // GETTING "PRODUCT ID":
    const productId = req.params.id;

    // FINDING "PRODUCT" → BY "ID":
    const product = await Product.findById(productId);

    // IF THERE IS A "PRODUCT" → UPDATE" IT:
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;

      // SAVING "UPDATED PRODUCT":
      const updatedProduct = await product.save();

      // CHECKING IF THE "PRODUCT" IS "UPDATED":
      if (updatedProduct) {
        // SUCCESS MESSAGE:
        res.send({ message: "Product Updated", product: updatedProduct });
      } else {
        // ERROR MESSAGE "500":
        res.status(500).send({ message: "Error in updaing product" });
      }
    } else {
      // ERROR MESAGE "404":
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// PRODUCT ROUTER - "DELETE('/:ID')"
productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // FINDING "PRODUCT" → BY "ID":
    const product = await Product.findById(req.params.id);

    // CHECKING → IF "THERE IS" A "PRODUCT":
    if (product) {
      // REMOVING THE PRODUCT:
      const deletedProduct = await product.remove();

      // SUCCESS MESSAGE:
      res.send({ message: "Product Deleted", product: deletedProduct });
    } else {
      // ERROR MESSAGE "404":
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// PRODUCT ROUTER - "POST('/:ID/REVIEWS')"
productRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // GETTING THE "PRODUCT":
    const product = await Product.findById(req.params.id);

    // CHECKING - IF "PRODUCT" EXIST:
    if (product) {
      // CREATING "REVIEW" OBJECT:
      const review = {
        rating: req.body.rating,
        comment: req.body.comment,
        user: req.user._id,
        name: req.user.name,
      };

      // PUSHING "REVIEWS" → TO THE "LIST OF REVIEWS":
      product.reviews.push(review);

      // THE "PRODUCT .RATING":
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;

      // THE "NUMBER OF REVIEWS" → FOR THE "PRODUCT":
      product.numReviews = product.reviews.length;

      // SAVING THE "UPDATED PRODUCT":
      const updatedProduct = await product.save();

      // SENDING - SUCCESS MESSAGE "201":
      res.status(201).send({
        message: "Comment Created.",
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      // ERROR MESSAGE:
      throw Error("Product does not exist.");
    }
  })
);

// EXPORT:
export default productRouter;
