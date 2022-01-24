// IMPORTS:
import jwt from "jsonwebtoken";
import config from "./config";

// EXP. FUNC. "GENERATE TOKEN":
export const generateToken = (user) =>
  jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET
  );
