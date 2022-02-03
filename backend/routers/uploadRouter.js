// IMPORTS:
import express from "express";
import multer from "multer";
import { isAuth, isAdmin } from "../utils";

// DEFINING THE "STORAGE" ("DISK STORAGE") → FOR "MULTER":
const storage = multer.diskStorage({
  // FUNC. "DESTINATION(REQUEST, FILE, CALLBACK)":
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  // FUNC. "FILE NAME()" → FOR THE "FILE FORMAT":
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

// DEFINING THE "UPLOAD" OBJECT:
const upload = multer({ storage });

// DEFINING "UPLOAD ROUTER" → FROM "EXPRESS":
const uploadRouter = express.Router();

// UPLOAD ROUTER - "POST('/')":
uploadRouter.post("/", isAuth, isAdmin, upload.single("image"), (req, res) => {
  // UPLOADED FILE  INFO:
  res.status(201).send({ image: `/${req.file.path}` });
});

// EXPORT:
export default uploadRouter;
