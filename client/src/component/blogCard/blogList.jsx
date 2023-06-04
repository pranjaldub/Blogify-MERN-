import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function BlogList({blog, author}) {
  return (
    <ListItem
      alignItems="center"
      style={{backgroundColor: "#F6F5FB", marginBottom: 15, borderRadius: 15}}
    >
      <ListItemAvatar>
        <Avatar alt={author} src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={blog.heading}
        secondary={<React.Fragment>{blog.description}</React.Fragment>}
      />
    </ListItem>
  );
}
