import React, {useState} from "react";
import classes from "./loginSignup.module.css";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {login, logout} from "../../features/user/userSlice";
import {ReactComponent as LoginSvg2} from "./login_undraw.svg";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/PersonOutlineTwoTone";
import BadgeTwoToneIcon from "@mui/icons-material/BadgeTwoTone";
import VpnKeyOffTwoToneIcon from "@mui/icons-material/VpnKeyOffTwoTone";
import InputAdornment from "@mui/material/InputAdornment";
import {Button, Alert, ConfigProvider} from "antd";
import {SmileOutlined} from "@ant-design/icons";
import {useMediaQuery} from "react-responsive";
import {Result} from "antd";
import Checkbox from "@mui/material/Checkbox";
import {signupUser, loginUser} from "../../service/api";
import {useNavigate} from "react-router-dom";
const LoginSignup = () => {
  const navigate = useNavigate();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({query: "(min-width: 1824px)"});
  const isTabletOrMobile = useMediaQuery({query: "(max-width: 1530px)"});
  const isPortrait = useMediaQuery({query: "(orientation: portrait)"});
  const isRetina = useMediaQuery({query: "(min-resolution: 2dppx)"});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("state", user);
  const initialSignupValues = {name: "", username: "", password: ""};
  const initialLoginValues = {username: "", password: ""};
  const [account, toggleAccount] = useState("signup");
  const [signup, setSignup] = useState(initialSignupValues);
  const [signupValues, setSignupValues] = useState(initialSignupValues);
  const [loginValues, setLoginValues] = useState(initialLoginValues);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [success, setSuccess] = useState({
    success: false,
    message: "",
  });
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };
  const onInputChange = (e, label) => {
    if (account === "signup") {
      setError({error: false, message: ""});
      setSignupValues({...signupValues, [label]: e.target.value});
    } else if (account === "login") {
      setLoginValues({...loginValues, [label]: e.target.value});
    }
  };
  async function sign() {
    var data = {};

    account === "signup"
      ? await (async () => {
          data = await signupUser(signupValues);
        })()
      : await (async () => {
          console.log("sending cred", loginValues);
          data = await loginUser(loginValues);
          setSignupValues(initialSignupValues);
          setLoginValues(initialLoginValues);
        })();
    console.log("inside login", data);

    if (data?.isSuccess) {
      if (account === "signup") {
        setError({error: false, message: ""});
        setSignupValues(initialSignupValues);
        setLoginValues(initialLoginValues);
        toggleAccount("login");
      } else {
        dispatch(login({name: data.name, username: data.username}));
        setError({error: false, message: ""});
        setSuccess({success: true, message: "successfully logged in"});
        setSignupValues(initialSignupValues);
        setLoginValues(initialLoginValues);
        navigate("/");
      }
    } else {
      account === "signup"
        ? Object.keys(signupValues).map((key) => {
            if (signupValues[key].length === 0) {
              setError({error: true, message: "Please enter the details"});
            } else {
              setSuccess({success: false, message: ""});
              setError({error: true, message: data.message});
            }
          })
        : Object.keys(loginValues).map((key) => {
            if (loginValues[key].length === 0) {
              setError({error: true, message: "Please enter the details"});
            } else {
              setSuccess({success: false, message: ""});
              setError({error: true, message: data.message});
            }
          });
    }
  }
  return (
    <div className={classes.container}>
      {!user.isLoggedIn ? (
        <div className={classes.innerContainer}>
          <LoginSvg2 className={classes.svg} />
          {/* =================login================= */}

          <div className={classes.formContainer}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>
                {account === "signup"
                  ? "Create your account "
                  : "Login into account"}
              </div>
              <div className={classes.subHeading}>
                {account === "signup"
                  ? "Enter your credentials "
                  : "Use your credentials to access the account"}
              </div>
            </div>

            <div className={classes.textContainer}>
              {account === "signup" && (
                <TextField
                  id="input-with-icon-textfield"
                  label="name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeTwoToneIcon sx={{color: "#765EF3"}} />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  sx={{
                    paddingBottom: 3,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        // borderColor: "black",
                        borderRadius: 10,
                      },
                    },
                  }}
                  onChange={(e) => onInputChange(e, "name")}
                />
              )}
              <TextField
                id="input-with-icon-textfield"
                label="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{color: "#765EF3"}} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                sx={{
                  paddingBottom: 3,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: 10,
                    },
                  },
                }}
                onChange={(e) => onInputChange(e, "username")}
              />

              <TextField
                id="input-with-icon-textfield"
                label="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyOffTwoToneIcon sx={{color: "#765EF3"}} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                sx={{
                  paddingBottom: 3,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: 10,
                    },
                  },
                }}
                onChange={(e) => onInputChange(e, "password")}
              />
              {account === "login" && (
                <div className={classes.helper}>
                  <span>forgot</span>
                  <span>
                    <Checkbox
                      inputProps={{"aria-label": "controlled"}}
                      defaultChecked
                      sx={{
                        color: "#765EF3",
                        "&.Mui-checked": {
                          color: "#765EF3",
                        },
                        p: 0,
                      }}
                    />
                    Remember
                  </span>
                </div>
              )}
              {error.error && (
                <Alert showIcon message={error.message} type="error" />
              )}
              {success.success && (
                <Alert
                  showIcon
                  message={`${success.message}${" "}${user.name}`}
                  type="success"
                />
              )}
              <br />
              <Button
                shape="round"
                type="default"
                size="large"
                loading={account === "login" ? loadings[0] : loadings[1]}
                onClick={() => {
                  enterLoading(account === "login" ? 0 : 1);
                  sign();
                }}
              >
                {account === "login" ? "login" : "Signup"}
              </Button>
            </div>

            <div className={classes.loginIconContainer}>
              {/* {`or ${account} with`} */}
              <div className={classes.loginIcon}>
                <Button
                  shape="round"
                  type="primary"
                  size="large"
                  style={{backgroundColor: "#8691F4"}}
                  onClick={() => navigate("/")}
                >
                  Go to Home
                </Button>
              </div>
            </div>

            {account === "login" ? (
              <div className={classes.footer}>
                {" "}
                Dont have an account ?{" "}
                <span className={classes.registerText}>register here</span>
              </div>
            ) : (
              <div className={classes.footer}>
                {" "}
                Already have an account ?{" "}
                <span
                  className={classes.registerText}
                  onClick={() => {
                    toggleAccount("login");
                  }}
                >
                  login here
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <ConfigProvider
          theme={{
            token: {
              colorTextHeading: isTabletOrMobile ? "black" : "black",
            },
          }}
        >
          <Result
            className={classes.result}
            icon={<SmileOutlined style={{color: "#8691F4"}} />}
            title="You're logged In!"
            // style={{backgroundColor: "rgba(255,255,255, 1)"}}
            extra={
              <div style={{display: "flex"}}>
                <Button
                  shape="round"
                  type="primary"
                  size="large"
                  style={{backgroundColor: "#8691F4"}}
                >
                  Go to Home
                </Button>
                &nbsp;&nbsp;
                <Button
                  shape="round"
                  type="default"
                  size="large"
                  onClick={() => {
                    dispatch(logout());
                    setSuccess({success: false, message: ""});
                  }}
                >
                  Logout
                </Button>
              </div>
            }
          />
        </ConfigProvider>
      )}
    </div>
  );
};

export default LoginSignup;
