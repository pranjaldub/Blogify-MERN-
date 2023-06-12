// here we specify the enpoints of API urls

import express from "express";
import {
  signupUser,
  loginUser,
  createBlogs,
  getBlogs,
  getBlogsLogout,
  getBlogsById,
  updateBlog,
  likeBlog,
  saveBlog,
  getStats,
  unsaveBlog,
  unlikeBlog,
} from "../controller/user-comtroller.js";

const router = express.Router();

router
  .post("/signup", signupUser)
  .post("/login", loginUser)
  .post("/createBlogs", createBlogs)
  .put("/updateBlog", updateBlog)
  .post("/likeBlog", likeBlog)
  .post("/saveBlog", saveBlog)
  .post("/unsaveBlog", unsaveBlog)
  .post("/unlikeBlog", unlikeBlog);
router
  .get("/blogs/:username", getBlogs)
  .get("/blogsById/:id", getBlogsById)
  .get("/blogs", getBlogsLogout)
  .get("/stats/:username", getStats);

export default router;
