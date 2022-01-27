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

// EXP. FUNC. "IS AUTH" ("MIDDLEWARE")
// (THE "MIDDLEWARE" → WILL "STOP" → BY CALLING "NEXT"):
export const isAuth = (req, res, next) => {
  // READING "HEADER.AUTHORIZATION":
  const bearerToken = req.headers.authorization;

  // IF "BEARER TOKEN" DOESN'T EXIST (IS EMPTY):
  if (!bearerToken) {
    // ERROR MESSAGE "401":
    res.status(401).send({ message: "Token is not supplied" });
  } else {
    // GETTING "TOKEN" → BY REMOVING OF CONTENT SPACES FROM "BEARER TOKEN":
    const token = bearerToken.slice(7, bearerToken.length);

    // CALLING "JSON WEB TOKEN" & VERIFY
    jwt.verify(token, config.JWT_SECRET, (err, data) => {
      // ERROR - INCORRECT TOKEN FORMAT:
      if (err) {
        // ERROR MESSAGE "401":
        res.status(401).send({ message: "Invalid Token" });
      } else {
        // ELSE (SUCCESS CASE):
        // REQUESTING "USER" DATA (WITCH IS "DECODED TOKEN"/ LIKE "USER INFO" ):
        req.user = data;

        // CALLING "NEXT()" → BECAUSE EVERYTHING IS "OK" IN THE "MIDDLEWARE"
        // & THE "NEXT HANDLER" → SHOULD "START PROCESSING" THE "REQUEST":
        next();
      }
    });
  }
};
