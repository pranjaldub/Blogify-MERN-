import React from "react";
import {ReactComponent} from "./logo2.svg";

const Logo = () => {
  return (
    <ReactComponent
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "20%",
        height: "20%",
      }}
    />
  );
};

export default Logo;
