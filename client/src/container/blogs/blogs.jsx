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
import {useSelector, useDispatch} from "react-redux";
import {login} from "../../features/user/userSlice";
const Blogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const getUser = () => {
    setLoading(true);
    fetch(
      process.env.REACT_APP_ENVIRONMENT === "Development"
        ? "http://localhost:8000/auth/login/success"
        : "https://blogify-backend-zzfj.onrender.com/auth/login/success",
      {
        method: "GET",
        //credentials: "include",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        //googleUser = resObject.user;
        //console.log("fetched user google", resObject);
        dispatch(
          login({
            name: resObject.user.name,
            username: resObject.user.username,
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  const [blogs, setBlogs] = useState([]);
  const [userData, setUserData] = useState({likedBlogs: [], savedBlogs: []});

  const [tab, setTab] = useState("Technology");

  const isMobile = useMediaQuery({query: "(max-width: 768px)"});
  const user = useSelector((state) => state.user);
  console.log("user", user);
  async function fetchBlogs() {
    setLoading(true);

    const data = user.isLoggedIn
      ? await getBlogs(user.username)
      : await getBlogsLogout();
    setUserData(data.userData);
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

    setLoading(false);
    //console.log("inside fetched blogs", user.isLoggedIn, userData);
  }
  useEffect(() => {
    fetchBlogs();
  }, [tab, user.username]);
  return (
    <div className={classes.container}>
      <div className={classes.headingContainer}>
        <h1 className={classes.heading}>Blogs</h1>
        <h1>you wanted to read about technology.</h1>
      </div>
      <div className={classes.trendingContainer}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {/* {blogs[0]?.blogs.length > 0 && (
            <BlogCard
              blog={blogs[0].blogs[0].blog.blog}
              key={blogs[0].blogs[0].blog.id}
              author={blogs[0].blogs[0].blog.blog.author}
              blogId={blogs[0].blogs[0].blog.id}
              liked={
                user.isLoggedIn &&
                userData?.likedBlogs.includes(blogs[1].blogs[1].blog.id)
                  ? true
                  : false
              }
              saved={
                user.isLoggedIn &&
                userData?.savedBlogs.includes(blogs[1].blogs[1].blog.id)
                  ? true
                  : false
              }
            />
          )} */}
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
                    key={item}
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
                        user.isLoggedIn &&
                        userData?.likedBlogs.includes(blog.id)
                          ? true
                          : false
                      }
                      saved={
                        user.isLoggedIn &&
                        userData?.savedBlogs.includes(blog.id)
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
                            userData?.likedBlogs.includes(blog.id)
                              ? true
                              : false
                          }
                          saved={
                            user.isLoggedIn &&
                            userData?.savedBlogs.includes(blog.id)
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
