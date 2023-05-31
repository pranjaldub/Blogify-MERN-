// here we specify the enpoints of API urls

import express from "express";
import {
  signupUser,
  loginUser,
  createBlogs,
  getBlogs,
} from "../controller/user-comtroller.js";

const router = express.Router();

router
  .post("/signup", signupUser)
  .post("/login", loginUser)
  .post("/createBlogs", createBlogs);
router.get("/blogs", getBlogs);

export default router;
