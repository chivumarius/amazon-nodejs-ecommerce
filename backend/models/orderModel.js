// IMPORT:
import mongoose from "mongoose";

// ORDER  "SCHEMA":
const orderSchema = new mongoose.Schema(
  {
    // "ORDER ITEMS" PROPERTY:
    orderItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],

    // "USER" PROPERTY:
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // "SHIPPING" PROPERTY:
    shipping: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },

    // "PAYMENT" PROPERTY:
    payment: {
      paymentMethod: String,
      paymentResult: {
        orderID: String,
        payerID: String,
        paymentID: String,
      },
    },

    itemsPrice: Number,
    taxPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: Date,
  },

  // SAVING "TIME" OF "CREATE" & "UPDATE":
  {
    timestamps: true,
  }
);

// ORDER "MODEL" :
const Order = mongoose.model("Order", orderSchema);

// EXPORT:
export default Order;
