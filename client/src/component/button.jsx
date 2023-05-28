import React from "react";
import classes from "./button.module.css";
const Button = ({text}) => {
  return <button className={classes.button}>{text}</button>;
};

export default Button;
