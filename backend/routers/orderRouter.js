// IMPORTS:
import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils";
import Order from "../models/orderModel";
import User from "../models/userModel";
import Product from "../models/productModel";

// "ORDER ROUTER" INSTANCE:
const orderRouter = express.Router();

// ORDER ROUTE "GET('/SUMMARY')" → FOR "ORDERS HISTORY":
orderRouter.get(
  "/summary",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // GETTING ALL "ORDERS"
    // BY USING THE MONGODB "AGGREGATE()" FUNCTION (INSTEAD OF "FIND()"):
    const orders = await Order.aggregate([
      {
        // GROUPING BY:
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    // GETTING ALL "USERS"
    // BY USING THE MONGODB "AGGREGATE()" FUNCTION (INSTEAD OF "FIND()"):
    const users = await User.aggregate([
      {
        // GROUPING BY:
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);

    // GETTING ALL "DAYLY ORDERS"
    // BY USING THE MONGODB "AGGREGATE()" FUNCTION (INSTEAD OF "FIND()"):
    const dailyOrders = await Order.aggregate([
      {
        // GROUPING BY:
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 },
          sales: { $sum: "$totalPrice" },
        },
      },
    ]);

    // GETTING ALL "PRODUCT CATEGORIES"
    // BY USING THE MONGODB "AGGREGATE()" FUNCTION (INSTEAD OF "FIND()"):
    const productCategories = await Product.aggregate([
      {
        // GROUPING BY:
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // SENDING DATA:
    res.send({
      users,
      // CHECKING "ORDERS.LENGTH":
      orders: orders.length === 0 ? [{ numOrders: 0, totalSales: 0 }] : orders,
      dailyOrders,
      productCategories,
    });
  })
);

// ORDER ROUTE "GET('/')" → FOR "ORDERS HISTORY":
orderRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // GETTING ALL "ORDERS"
    const orders = await Order.find({}).populate("user");

    // SENDING "ORDERS":
    res.send(orders);
  })
);

// ORDER ROUTE "GET('/MINE')" → FOR "ORDER HISTORY":
orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // GETTING USER ID:
    const orders = await Order.find({ user: req.user._id });

    // RETURN "ORDER":
    res.send(orders);
  })
);

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

// ORDER ROUTER - "DELETE('/:ID')"
orderRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // FINDING "ORDER" → BY "ID":
    const order = await Order.findById(req.params.id);

    // CHECKING → IF "THERE IS" A "PRODUCT":
    if (order) {
      // REMOVING ORDER:
      const deletedOrder = await order.remove();

      // SUCCESS MESSAGE:
      res.send({ message: "Order Deleted", product: deletedOrder });
    } else {
      // ERROR MESSAGE "404":
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

// THE "ROUTE" → FOR UPDATING "ID/ PAY":
orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // GETTING "INFORMATION" ABOUT THIS "ORDER"
    const order = await Order.findById(req.params.id);

    // CHECKING "IF THE ORDER EXIST":
    if (order) {
      // SETTINGS:
      order.isPaid = true;
      order.paidAt = Date.now();

      // FILLING THE "PAYMENT RESULT":
      order.payment.paymentResult = {
        payerID: req.body.payerID,
        paymentID: req.body.paymentID,
        orderID: req.body.orderID,
      };

      // SAVEING "UPDATED ORDER":
      const updatedOrder = await order.save();

      // SENDING MESSAGE OF CONFIRMATION:
      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      // ERROR MESSAGE "404":
      res.status(404).send({ message: "Order Not Found." });
    }
  })
);

// THE "ROUTE" → FOR UPDATING "ID/ DELIVER":
orderRouter.put(
  "/:id/deliver",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // GETTING "INFORMATION" ABOUT THIS "ORDER ID"
    const order = await Order.findById(req.params.id);

    // CHECKING "IF THE ORDER EXIST":
    if (order) {
      // SETTINGS:
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      // SAVEING "UPDATED ORDER":
      const updatedOrder = await order.save();

      // SENDING MESSAGE OF CONFIRMATION:
      res.send({ message: "Order Delivered", order: updatedOrder });
    } else {
      // ERROR MESSAGE "404":
      res.status(404).send({ message: "Order Not Found." });
    }
  })
);

// EXPORT:
export default orderRouter;
