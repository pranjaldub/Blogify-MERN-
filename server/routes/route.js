// here we specify the enpoints of API urls

import express from "express";
import dotenv from "dotenv";
import "../passport.js";
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
import passport from "passport";
import "../passport.js";
const router = express.Router();
dotenv.config({path: "./local.env"});
router.get("/auth/login/success", (req, res) => {
  console.log("in route", req.user);
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  } else {
    res.status(400).json({
      success: false,
      message: "no success",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

const baseURL =
  process.env.ENVIRONMENT === "Development"
    ? "http://localhost:3000/"
    : "https://blogify-mern-client.vercel.app/";
router.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect(baseURL);
});

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
  .get("/stats/:username", getStats)
  .get("/google", passport.authenticate("google", {scope: ["profile"]}))
  .get(
    "/auth/google/callback",
    passport.authenticate("google", {
      //successRedirect: "http://localhost:3000/blogs",
      successRedirect: `${baseURL}blogs`,
      //failureRedirect: "http://localhost:3000/login",
      failureRedirect: `${baseURL}login`,
    })
  );

export default router;
