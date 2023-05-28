import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReorderIcon from "@mui/icons-material/Reorder";
import classes from "./mobileNavbar.module.css";
export default function MobileNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    const element = document.getElementById("menuIcon");
    //console.log("rotating");
    element.classList.add(classes.rotateMobileNavbar);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    const element = document.getElementById("menuIcon");
    // console.log("rotating");
    element.classList.remove(classes.rotateMobileNavbar);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <ReorderIcon id="menuIcon" className={classes.menuIcon} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // anchorOrigin={{
        //   vertical: "top",
        //   horizontal: "left",
        // }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
