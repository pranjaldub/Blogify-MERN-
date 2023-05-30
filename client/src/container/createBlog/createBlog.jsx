import React from "react";
import MobileEditor from "../../component/editor/mobileEditor";
import LargeEditor from "../../component/editor/largeEditor";
import {useMediaQuery} from "react-responsive";
const CreateBlog = () => {
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
      <MobileEditor />
    </div>
  );
};

export default CreateBlog;
