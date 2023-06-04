import React from "react";
import {useParams} from "react-router-dom";
const Blog = () => {
  const {blogId} = useParams();
  // console.log("id", user);
  return <div>Blog {blogId}</div>;
};

export default Blog;
