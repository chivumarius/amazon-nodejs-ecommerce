// IMPORTS:
import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import { generateToken, isAuth } from "../utils";

// CREATING "ROUTER" → FROM "EXPRESS":
const userRouter = express.Router();

// (1) "ROUTA 1" -- "GET(/CREATE ADMIN)":
userRouter.get(
  "/createadmin",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        name: "adminadmin",
        email: "admin@admin.com",
        password: "adminamazon",
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

// (3) "ROUTA 3" -- "POST(/REGISTER":
userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    // SENDING "REQUEST" TO "DB" → TO "CREATE USER": "EMAIL" & "PASSWORD":
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // SAVING THE "CREATED USER":
    const createdUser = await user.save();

    // CHECKING: IF THE "CREATED USER" DOES NOT EXIST:
    if (!createdUser) {
      // ERROR MESSAGE "401":
      res.status(401).send({
        message: "Invalid User Data",
      });
    } else {
      // SENDING "RESPONSE" TO THE "FRONTEND":
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
      });
    }
  })
);

// (4) "ROUTA 4" -- "PUT(/:ID" (WITH "IS AUTH" MIDDLEWARE):
userRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // FIND "USER" BY "ID":
    const user = await User.findById(req.params.id);

    // CHECKING: IF THE "USER" DOESN'T EXIST:
    if (!user) {
      // ERROR MESSAGE "404":
      res.status(404).send({
        message: "User Not Found",
      });
    } else {
      // UPDATING (SETTING) "USER INFO" → INTO "DB":
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;

      // SAVING "USER UPDATES":
      const updatedUser = await user.save();

      // SENDING "RESPONSE" TO THE "FRONTEND":
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

// EXPORT:
export default userRouter;
