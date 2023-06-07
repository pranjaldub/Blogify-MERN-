// here we create schema and its validation

import mongoose from "mongoose";

const userActivitySchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  createdBlogs: [],

  savedBlogs: [],
  likedBlogs: [],
});

const UserActivity = mongoose.model("UserActivity", userActivitySchema);

export default UserActivity;
