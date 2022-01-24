// IMPORT:
import dotenv from "dotenv";

// CALLING FUNC. "CONFIG()" → TO READ ".ENV"
dotenv.config();

// EXPORT "ENVIRONMENT VARIABLE":
export default {
  MONGODB_URL: process.env.MONGODB_URL,
};
