// IMPORTS:
import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils";
import Order from "../models/orderModel";

// "ORDER ROUTER" INSTANCE:
const orderRouter = express.Router();

// THE "ROUTE" → FOR GETTING "ORDER" FOR AN "USER ID":
orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // FIND "ORDER" BY "ID":
    const order = await Order.findById(req.params.id);

    // IF THERE IS AN "ORDER":
    if (order) {
      // SENDING "ORDER":
      res.send(order);
    } else {
      // SENDING ERROR MESSAGE "404":
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

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
      taxPrice: req.body.taxPrice,
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
