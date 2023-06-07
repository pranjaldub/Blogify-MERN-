import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {IconBookmark, IconHeart, IconShare} from "@tabler/icons-react";

import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {likeBlog, saveBlog} from "../../service/api";
export default function BlogList({blog, author, saved, liked, blogId}) {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const navigate = useNavigate();
  console.log("author", author);
  const user = useSelector((state) => state.user);
  async function likeHandler() {
    const obj = {username: user.username, blogId: blogId};
    const resp = await likeBlog(obj);
    if (resp.isSuccess) {
      setLike(true);
    }
  }
  async function saveHandler() {
    const obj = {username: user.username, blogId: blogId};
    const resp = await saveBlog(obj);
    if (resp.isSuccess) {
      setSave(true);
    }
  }
  return (
    <ListItem
      alignItems="center"
      style={{
        backgroundColor: "#F6F5FB",
        marginBottom: 12,
        borderRadius: 15,
        width: "110%",
      }}
    >
      <ListItemAvatar>
        <Avatar alt={author} src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>

      <ListItemText
        onClick={() => navigate(`/blogs/${blogId}`)}
        primary={blog.heading}
        secondary={<React.Fragment>{blog.description}</React.Fragment>}
      />
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "space-around",
        }}
      >
        <IconHeart
          size="1rem"
          color={like || liked ? "red" : "black"}
          onClick={user.isLoggedIn ? likeHandler : () => navigate("/login")}
          style={{marginBottom: 5}}
        />

        <IconBookmark
          size="1rem"
          color={save || saved ? "red" : "black"}
          onClick={user.isLoggedIn ? saveHandler : () => navigate("/login")}
          style={{marginBottom: 5}}
        />

        <IconShare size="1rem" />
      </span>
    </ListItem>
  );
}
