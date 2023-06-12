import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import classes from "./saveLikeList.module.css";
export default function SaveLikeList({blogs}) {
  return (
    <List
      sx={{
        width: "100%",

        height: 400,
        bgcolor: "background.paper",
        overflowY: "auto",
      }}
      className={classes.scroll}
    >
      {blogs[0]?.blogs.length > 0
        ? blogs.map((item) =>
            item.blogs.map((blog) => (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={blog.blog.author}
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={blog.blog.heading}
                    secondary={
                      <React.Fragment>{blog.blog.description}</React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))
          )
        : "no items"}
    </List>
  );
}
