import React from "react";
import {ReactComponent} from "./logo2.svg";

const Logo = () => {
  return (
    <ReactComponent
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default Logo;
