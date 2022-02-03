// IMPORTS:
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import config from "./config";
import userRouter from "./routers/userRouter";
import orderRouter from "./routers/orderRouter";
import productRouter from "./routers/productRouter";
import uploadRouter from "./routers/uploadRouter";

// CONEXION  TO MONGOOSE:
mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb.");
  })
  .catch((error) => {
    console.log(error.reason);
  });

//  "APP" CONSTANT:
const app = express();

// USE PACKAGE "CORS":
app.use(cors());

// USE "DATA" IN FORMATUL "JSON" BY PACKAGE "BODY PARSER":
app.use(bodyParser.json());

// USE OF "USER UPLOADS":
app.use("/api/uploads", uploadRouter);

// USE OF "USER ROUTER":
app.use("/api/users", userRouter);

// USE OF "PRODUCTS ROUTER":
app.use("/api/products", productRouter);

// USE OF "ORDER ROUTER":
app.use("/api/orders", orderRouter);

// USE OF "PAYPAL/ 'CLIENT ID' ROUTER":
app.get("/api/paypal/clientId", (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});

//---------------------------------------------------------------------------
// "SERVING" ALL "FILES" → INSIDE "FRONTEND" FOLDER
//---------------------------------------------------------------------------

// LOADING "IMAGES" → FROM "UPLOADS" FOLDER
// FROM "FRONTEND" → TO "BACKEND":
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));

// JOINING THE "ROOT" FOLDER → WITH THE "FRONTEND" FOLDER
app.use(express.static(path.join(__dirname, "/../frontend")));

// SERVING "INDEX.HTML" → AS A "ROOT" FILE
// → FOR "ALL URL" → ENERED AFTER "__DIR NAME":
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../frontend/index.html"));
});
//---------------------------------------------------------------------------

// HAMDELLER  ALL  "ERROR" → IN "EXPRESS  INSTANCE":
app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});

// START THE "SERVER"
app.listen(5000, () => {
  console.log("serve at http://localhost:5000");
});
