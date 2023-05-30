import BlogCard from "../../component/blogCard/blogCard";
import BlogListItem from "../../component/blogCard/blogList";
import Tab from "../../component/tab/tab";
import TrendingCard from "../../component/trendingCard";
import classes from "./blogs.module.css";
import Pagination from "@mui/material/Pagination";
import React from "react";
import {useMediaQuery} from "react-responsive";
import List from "@mui/material/List";
const Blogs = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({query: "(min-width: 1824px)"});
  const isMobile = useMediaQuery({query: "(max-width: 768px)"});
  const isTablet = useMediaQuery({query: "(max-width: 1280px)"});
  const isPortrait = useMediaQuery({query: "(orientation: portrait)"});
  const isRetina = useMediaQuery({query: "(min-resolution: 2dppx)"});
  return (
    <div className={classes.container}>
      <div className={classes.headingContainer}>
        <h1 className={classes.heading}>Blogs</h1>
        <h1>you wanted to read about technology.</h1>
      </div>
      <div className={classes.trendingContainer}>
        <TrendingCard />
      </div>
      <div className={classes.blogsContainer}>
        <div className={classes.tab}>
          <Tab />
        </div>
        {!isMobile ? (
          <div className={classes.blogs}>
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        ) : (
          <div className={classes.blogsList}>
            <List sx={{width: "100%"}}>
              <BlogListItem />
              <BlogListItem />
              <BlogListItem />
            </List>
          </div>
        )}
        <div className={classes.pagination}>
          <Pagination count={5} color="primary" />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
