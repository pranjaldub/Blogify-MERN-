import logo from "./logo.svg";
import "./App.css";
import Homepage from "./container/homepage/homepage";
import LoginSignup from "./container/loginSignup/loginSignup";
import Blogs from "./container/blogs/blogs";
import {useSelector} from "react-redux";
import {BrowserRouter, Routes, Route, Outlet, Navigate} from "react-router-dom";
import classes from "./container/homepage/homepage.module.css";
import Navbar from "./component/navbar";
import Logo from "./component/logosvg";
import Editor from "./component/editor/mobileEditor";
import CreateBlog from "./container/createBlog/createBlog";
import CreateBlogSteps from "./container/createBlog/createBlogSteps";

function App() {
  const user = useSelector((state) => state.user);
  const PrivateRoute = ({...props}) => {
    return user.isLoggedIn ? (
      <>
        <Outlet />
      </>
    ) : (
      <Navigate replace to="/login" />
    );
  };
  const intro = "Introducing Blogify";
  const heading = "Express the meaning of your blogs differently";
  const subHeading =
    "Our rewriting tool alters the syntax, structure, word/phrase arrangement, and incorporates relevant synonyms. This tool is compatible with all major languages, including English, German, Spanish, French, Arabic, Chinese, and many others.";
  return (
    <BrowserRouter>
      <div className="App">
        <div className={classes.nav}>
          <Navbar />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                intro={intro}
                heading={heading}
                subHeading={subHeading}
              />
            }
          />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/blogs" element={<PrivateRoute />}>
            <Route path="/blogs" element={<Blogs />} />
          </Route>
          <Route path="/createBlog" element={<PrivateRoute />}>
            <Route path="/createBlog" element={<CreateBlogSteps />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
