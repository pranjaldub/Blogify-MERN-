import React, {useState} from "react";
import MobileEditor from "../../component/editor/mobileEditor";
import LargeEditor from "../../component/editor/largeEditor";
import {useMediaQuery} from "react-responsive";
import {Button} from "antd";
import {createBlog} from "../../service/api";
import {useSelector, useDispatch} from "react-redux";
const CreateBlog = () => {
  const user = useSelector((state) => state.user);
  const [blog, setBlog] = useState("");
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({query: "(min-width: 1824px)"});
  const isMobile = useMediaQuery({query: "(max-width: 768px)"});
  const isTablet = useMediaQuery({query: "(max-width: 1280px)"});
  const isPortrait = useMediaQuery({query: "(orientation: portrait)"});
  const isRetina = useMediaQuery({query: "(min-resolution: 2dppx)"});
  return (
    <div>
      <MobileEditor setBlog={setBlog} blog={blog} />
      <Button
        shape="round"
        size="large"
        type="primary"
        onClick={() => createBlog({username: user.username, blog: blog})}
      >
        Submit
      </Button>
    </div>
  );
};

export default CreateBlog;
