// IMPORT:
import mongoose from "mongoose";

// PRODUCT "SCHEMA" → FOR DATABASE
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0.0, required: true },
    countInStock: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0.0, required: true },
    numReviews: { type: Number, default: 0, required: true },
  },

  // ACTIVATING OF "CREATION & UPDATE TIME" IN "DB":
  { timestamps: true }
);

// PRODUCT "MODEL"
const Product = mongoose.model("Product", productSchema);

// EXPORT:
export default Product;
