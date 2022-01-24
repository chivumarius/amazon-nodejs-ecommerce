// IMPORT "MONGODE":
import mongoose from "mongoose";

// USER "SCHEMA"
// (IT IS THE "DOCUMENT  STRUCTURE"):
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

// USER "MODEL"
// (ASKING "MONGODB" → TO CREATE "USER COLLECTION"
//   → WITH THE STRUCTURE OF "USER SCHEMA"):
const User = mongoose.model("User", userSchema);

// EXPORT:
export default User;
