import React from "react";
import classes from "./homepage.module.css";
import Logo from "../../component/logosvg";
import Navbar from "../../component/navbar";
import {Button} from "antd";
import MobileNavbar from "../../component/mobileNavbar";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import Image from "../../component/image";
import {EditOutlined} from "@ant-design/icons";
const Homepage = ({intro, heading, subHeading}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div className={classes.text}>
        <div className={classes.textContainer}>
          <div className={classes.intro}>
            {intro}
            &nbsp;
            <EditOutlined style={{color: "#684FC9"}} />
          </div>
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
          onClick={() => {
            user.isLoggedIn ? navigate("/blogs") : navigate("/login");
          }}
        >
          Start
        </Button>
        &nbsp;&nbsp;
        {!user.isLoggedIn && (
          <Button
            shape="round"
            size="large"
            type="default"
            onClick={() => navigate("/login")}
          >
            Signup
          </Button>
        )}
      </div>
      <div className={classes.image}>
        <Image />
      </div>
    </div>
  );
};

export default Homepage;
