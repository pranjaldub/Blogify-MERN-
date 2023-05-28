import React from "react";
import classes from "./navbar.module.css";
import MobileNavbar from "./mobileNavbar";
import {Button} from "antd";

const Navbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mobileNavbar}>
        <Button
          shape="round"
          size="medium"
          type="primary"
          style={{backgroundColor: "#7862F2"}}
        >
          Buy now
        </Button>

        <MobileNavbar />
      </div>
      <ul className={classes.navlist}>
        <li>
          <p>Home</p>
        </li>
        <li>
          <p>News</p>
        </li>
        <li>
          <p>Contact</p>
        </li>
        <li>
          <p>About</p>
        </li>
        <li>
          <Button
            shape="round"
            size="medium"
            type="primary"
            style={{backgroundColor: "#7862F2"}}
          >
            Buy now
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
