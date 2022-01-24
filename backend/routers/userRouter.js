// IMPORTS:
import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import { generateToken } from "../utils";

// CREATING "ROUTER" → FROM "EXPRESS":
const userRouter = express.Router();

// (1) "ROUTA 1" -- "GET(/CREATE ADMIN)":
userRouter.get(
  "/createadmin",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        name: "admin",
        email: "admin@example.com",
        password: "jsamazona",
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
  })
);

// (2) "ROUTA 2" -- "POST(/SIGN IN":
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    // SENDING "REQUEST" TO "DB" → TO GET "USER": "EMAIL" & "PASSWORD":
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    // CHECKING THE "SIGNIN USER":
    if (!signinUser) {
      // ERROR MESSAGE "401":
      res.status(401).send({
        message: "Invalid Email or Password",
      });
    } else {
      // SENDING "RESPONSE":
      res.send({
        _id: signinUser._id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: generateToken(signinUser),
      });
    }
  })
);

// EXPORT:
export default userRouter;
