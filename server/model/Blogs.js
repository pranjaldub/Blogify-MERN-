// here we create schema and its validation

import mongoose from "mongoose";

const blogsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  blogs: [
    {
      id: {
        type: String,
        required: true,
      },
      blog: {
        type: String,
        required: true,
      },
    },
  ],
});

const Blogs = mongoose.model("Blogs", blogsSchema);

export default Blogs;