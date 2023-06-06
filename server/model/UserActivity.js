// here we create schema and its validation

import mongoose from "mongoose";

const userActivitySchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  createdBlogs: [
    {
      blogId: {
        type: String,
        required: true,
      },
    },
  ],

  savedBlogs: [
    {
      blogId: {
        type: String,
        required: true,
      },
    },
  ],
  likedBlogs: [
    {
      blogId: {
        type: String,
        required: true,
      },
    },
  ],
});

const UserActivity = mongoose.model("UserActivity", userActivitySchema);

export default UserActivity;
