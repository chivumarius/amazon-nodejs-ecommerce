// IMPORTS:
import express from "express";
import User from "../models/userModel";

// CREATING "ROUTER" → FROM "EXPRESS":
const userRouter = express.Router();

// ROUTE -- GET(/CREATE ADMIN):
userRouter.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "chivumarius",
      email: "chivumarius@yahoo.com",
      password: "amazon",
      isAdmin: true,
    });

    // SAVE:
    const createdUser = await user.save();

    // SENT "INFORMATIONS" → TO THE "FRONTEND":
    res.send(createdUser);
  } catch (err) {
    // ERROR MESSAGE "500":
    res.status(500).send({ message: err.message });
  }
});

// EXPORT:
export default userRouter;
