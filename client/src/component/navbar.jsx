import React from "react";
import classes from "./navbar.module.css";
import MobileNavbar from "./mobileNavbar";
import Button from "./button";

const Navbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mobileNavbar}>
        <Button text={"Buy now"} />

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
          <Button text={"Buy now"} />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
