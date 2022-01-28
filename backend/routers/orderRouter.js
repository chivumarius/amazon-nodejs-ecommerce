// IMPORTS:
import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils";
import Order from "../models/orderModel";

// "ORDER ROUTER" INSTANCE:
const orderRouter = express.Router();

// THE "ROUTE" → FOR CREATING "ORDER":
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // CREATING "ORDER":
    const order = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxtPrice: req.body.taxtPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });

    // SAVING "ORDER":
    const createdOrder = await order.save();

    // SENDING SUCCESS MESSAGE "201":
    res.status(201).send({ message: "New Order Created", order: createdOrder });
  })
);

// EXPORT:
export default orderRouter;
