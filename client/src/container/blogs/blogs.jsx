import BlogCard from "../../component/blogCard/blogCard";
import BlogListItem from "../../component/blogCard/blogList";
import Tab from "../../component/tab/tab";
import TrendingCard from "../../component/trendingCard";
import classes from "./blogs.module.css";
import Pagination from "@mui/material/Pagination";
import React, {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import {getBlogs, getBlogsLogout} from "../../service/api";
import List from "@mui/material/List";
import {MantineProvider} from "@mantine/core";
import {Skeleton} from "antd";
import {DotChartOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {Empty} from "antd";
import {useSelector} from "react-redux";
const Blogs = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState([]);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("Technology");
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({query: "(min-width: 1824px)"});
  const isMobile = useMediaQuery({query: "(max-width: 768px)"});
  const isTablet = useMediaQuery({query: "(max-width: 1280px)"});
  const isPortrait = useMediaQuery({query: "(orientation: portrait)"});
  const isRetina = useMediaQuery({query: "(min-resolution: 2dppx)"});
  async function fetchBlogs() {
    setLoading(true);

    const data = user.isLoggedIn
      ? await getBlogs(user.username)
      : await getBlogsLogout();
    var arr = [];
    data.data.map((item) =>
      arr.push({
        blogs: item.blogs.filter(
          (blog) => blog.blog.category.toUpperCase() === tab.toUpperCase()
        ),
      })
    );
    arr = arr.filter((item) => !(item.blogs.length <= 0));
    console.log("data", arr);
    setBlogs(arr);
    //console.log("user data", data.userData);
    setUserData(data.userData);
    setLoading(false);
  }
  useEffect(() => {
    fetchBlogs();
  }, [tab]);
  return (
    <div className={classes.container}>
      <div className={classes.headingContainer}>
        <h1 className={classes.heading}>Blogs</h1>
        <h1>you wanted to read about technology.</h1>
      </div>
      <div className={classes.trendingContainer}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <TrendingCard />
        </MantineProvider>
      </div>
      <div className={classes.blogsContainer}>
        <div className={classes.tab}>
          <Tab setTab={setTab} />
        </div>
        {!isMobile ? (
          <div className={classes.blogs}>
            <MantineProvider withGlobalStyles withNormalizeCSS>
              {loading ? (
                [1, 2, 3, 4, 5].map((item) => (
                  <Skeleton.Node
                    active={true}
                    id={item}
                    size="large"
                    style={{width: 250, height: 300}}
                  >
                    <DotChartOutlined
                      style={{fontSize: 80, color: "#bfbfbf"}}
                    />
                  </Skeleton.Node>
                ))
              ) : // "loading"
              blogs[0]?.blogs.length > 0 ? (
                blogs.map((item) =>
                  item.blogs.map((blog) => (
                    <BlogCard
                      blog={blog.blog}
                      key={blog.id}
                      author={blog.blog.author}
                      blogId={blog.id}
                      liked={
                        user.isLoggedIn && userData.likedBlogs.includes(blog.id)
                          ? true
                          : false
                      }
                      saved={
                        user.isLoggedIn && userData.savedBlogs.includes(blog.id)
                          ? true
                          : false
                      }
                    />
                  ))
                )
              ) : (
                <Empty />
              )}
            </MantineProvider>
          </div>
        ) : (
          <div className={classes.blogsList}>
            <List
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {loading
                ? [1, 2, 3, 4, 5].map((item) => (
                    <Skeleton avatar paragraph={{rows: 1}} active={true} />
                  ))
                : blogs.map(
                    (item) =>
                      item.blogs.map((blog) => (
                        <BlogListItem
                          blog={blog.blog}
                          key={blog.id}
                          blogId={blog.id}
                          author={blog.blog.author}
                          liked={
                            user.isLoggedIn &&
                            userData.likedBlogs.includes(blog.id)
                              ? true
                              : false
                          }
                          saved={
                            user.isLoggedIn &&
                            userData.savedBlogs.includes(blog.id)
                              ? true
                              : false
                          }
                        />
                      ))
                    //console.log(item)
                  )}
            </List>
          </div>
        )}
        {/* <div className={classes.pagination}>
          <Pagination count={5} color="primary" />
        </div> */}
      </div>
    </div>
  );
};

export default Blogs;
