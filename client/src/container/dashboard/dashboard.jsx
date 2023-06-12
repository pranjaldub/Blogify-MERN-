import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import StatsCards from "../../component/statCards/statsCards";
import classes from "./dashboard.module.css";
import SaveLikeList from "../../component/saveLikeList/saveLikeList";
import {gsap} from "gsap";
import {useSelector, useDispatch} from "react-redux";
import {getStats} from "../../service/api";
import {getBlogs, getBlogsLogout} from "../../service/api";
const Dashboard = () => {
  const data = {
    userData: {savedBlogs: [], likedBlogs: []},
    data: [
      {
        title: "Blog Likes",
        stats: 3,
        description:
          "24% more than in the same month last year, 33% more that two years ago",
      },
      {
        title: "Blog Saves",
        stats: 3,
        description: "13% people have saved your blogs",
      },
      {
        title: "Blogs created",
        stats: "4",
        description: "Thats a good start , contribute more !",
      },
    ],
  };

  const ref = useRef();
  const currentUser = useSelector((state) => state.user);
  const [user, setUser] = useState(data);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState({likedBlogs: [], savedBlogs: []});
  const [userData, setUserData] = useState();
  const fetchUserStats = async () => {
    setLoading(true);
    const resp = await getStats(currentUser.username);
    if (resp.isSuccess) {
      setUser((prevState) => {
        return {
          userData: resp.userData,
          data: [
            {
              title: "Blog Likes",
              stats: Object.keys(resp.likedCount).length,
              description: "See how many readers have liked your blogs !",
            },
            {
              title: "Blog Saves",
              stats: Object.keys(resp.savedCount).length,
              description:
                "If people save your blogs , that means your blogs either helped or will help them .",
            },
            {
              title: "Blogs created",
              stats: resp.userData.createdBlogs.length,
              description: "Thats a good start , contribute more !",
            },
          ],
        };
      });

      fetchBlogs(resp);
    }
  };
  async function fetchBlogs(user) {
    const data = await getBlogs(currentUser.username);

    var arr = [];
    console.log("inside", user);
    data.data.map((item) =>
      arr.push({
        blogs: item.blogs.filter((blog) =>
          user.userData.savedBlogs.includes(blog.id)
        ),
      })
    );

    var likedArr = [];
    data.data.map((item) =>
      likedArr.push({
        blogs: item.blogs.filter((blog) =>
          user.userData.likedBlogs.includes(blog.id)
        ),
      })
    );

    arr = arr.filter((item) => !(item.blogs.length <= 0));
    likedArr = likedArr.filter((item) => !(item.blogs.length <= 0));

    setBlogs({savedBlogs: [...arr], likedBlogs: [...likedArr]});

    setUserData(data.userData);
    setLoading(false);
  }
  useLayoutEffect(() => {
    fetchUserStats();
  }, []);

  useLayoutEffect(() => {
    // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
    let ctx = gsap.context(() => {
      gsap.from(`.${classes.savedContainer}`, {
        transform: "translateX(-100%)",
      });
      gsap.to(`.${classes.savedContainer}`, {
        transform: "translateX(0)",
      });
      gsap.from(`.${classes.likedContainer}`, {
        transform: "translateX(100%)",
      });
      gsap.to(`.${classes.likedContainer}`, {
        transform: "translateX(0)",
      });
    }, [ref]); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, [loading]);

  return (
    <div className={classes.dashboard}>
      <div
        style={{
          display: "flex",
          padding: "auto",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className={classes.headingContainer}>
          <h1>Dashboard</h1>
        </div>
        {loading ? (
          "loading"
        ) : (
          <>
            {" "}
            <div>
              <StatsCards data={user.data} />
            </div>
            <div className={classes.saveLikeContainer} ref={ref}>
              <div className={classes.savedContainer}>
                <h2 className={classes.savedHeading}>Saved Blogs</h2>
                <SaveLikeList blogs={blogs.savedBlogs} />
              </div>
              <div className={classes.likedContainer}>
                <h2 className={classes.savedHeading}>Liked Blogs</h2>
                <SaveLikeList blogs={blogs.likedBlogs} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
