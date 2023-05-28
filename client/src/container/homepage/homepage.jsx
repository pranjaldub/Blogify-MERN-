import React from "react";
import classes from "./homepage.module.css";
import Logo from "../../component/logosvg";
import Navbar from "../../component/navbar";
import {Button} from "antd";
import MobileNavbar from "../../component/mobileNavbar";

import {motion} from "framer-motion";
import Image from "../../component/image";
const Homepage = ({intro, heading, subHeading}) => {
  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <div className={classes.nav}>
        <Navbar />
      </div>
      <div className={classes.text}>
        <div className={classes.textContainer}>
          <div className={classes.intro}>{intro}</div>
          <motion.div
            animate={{color: ["hsl(0, 0, 0)", "hsl(252, 53%, 55%)"]}}
            transition={{duration: 3}}
            className={classes.heading}
          >
            {heading}
          </motion.div>
          <div className={classes.subHeading}>{subHeading}</div>
        </div>
      </div>
      <div className={classes.button}>
        <Button
          shape="round"
          size="large"
          type="primary"
          style={{backgroundColor: "#7862F2"}}
        >
          Start
        </Button>
        &nbsp;&nbsp;
        <Button shape="round" size="large" type="default">
          Signup
        </Button>
      </div>
      <div className={classes.image}>
        <Image />
      </div>
    </div>
  );
};

export default Homepage;
