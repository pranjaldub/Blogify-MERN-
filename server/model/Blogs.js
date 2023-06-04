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
        heading: {
          type: String,
        },
        description: {
          type: String,
        },
        content: {
          type: String,
        },
        category: {
          type: String,
        },
        author: {
          type: String,
        },
      },
    },
  ],
});

const Blogs = mongoose.model("Blogs", blogsSchema);

export default Blogs;
