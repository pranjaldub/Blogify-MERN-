import BlogCard from "../../component/blogCard/blogCard";
import Tab from "../../component/tab/tab";
import TrendingCard from "../../component/trendingCard";
import classes from "./blogs.module.css";

import React from "react";

const Blogs = () => {
  return (
    <div className={classes.container}>
      <div className={classes.trendingContainer}>
        <TrendingCard />
      </div>
      <div className={classes.blogsContainer}>
        <div className={classes.tab}>
          <Tab />
        </div>
        <div className={classes.blogs}>
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
