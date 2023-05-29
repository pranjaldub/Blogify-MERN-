import React from "react";
import classes from "./navbar.module.css";
import MobileNavbar from "./mobileNavbar";
import {Button} from "antd";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../features/user/userSlice";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div className={classes.mobileNavbar}>
        {!user.isLoggedIn ? (
          <Button
            shape="round"
            size="medium"
            type="primary"
            style={{backgroundColor: "#7862F2"}}
            onClick={() => navigate("/login")}
          >
            login
          </Button>
        ) : (
          <Button
            shape="round"
            size="medium"
            type="primary"
            style={{backgroundColor: "#7862F2"}}
            onClick={() => dispatch(logout())}
          >
            logout
          </Button>
        )}

        <MobileNavbar />
      </div>
      <ul className={classes.navlist}>
        <li>
          <p>Home</p>
        </li>
        <li>
          <p>Blogs</p>
        </li>

        <li>
          <p>About</p>
        </li>
        <li>
          {!user.isLoggedIn ? (
            <Button
              shape="round"
              size="medium"
              type="primary"
              style={{backgroundColor: "#7862F2"}}
              onClick={() => navigate("/login")}
            >
              login
            </Button>
          ) : (
            <Button
              shape="round"
              size="medium"
              type="primary"
              style={{backgroundColor: "#7862F2"}}
              onClick={() => dispatch(logout())}
            >
              logout
            </Button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
