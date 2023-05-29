import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SearchButton from "../searchButton/searchButton";
import {useMediaQuery} from "react-responsive";
export default function TabComponent() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({query: "(min-width: 1824px)"});
  const isMobile = useMediaQuery({query: "(max-width: 768px)"});
  const isPortrait = useMediaQuery({query: "(orientation: portrait)"});
  const isRetina = useMediaQuery({query: "(min-resolution: 2dppx)"});
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "#ECEBF7",
        display: !isMobile ? "flex" : "",
        justifyContent: !isMobile ? "center" : "",
        alignItems: !isMobile ? "center" : "",
        flexDirection: !isMobile ? "column" : "",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{paddingBottom: 2}}
      >
        <Tab label="Technology" />
        <Tab label="Life" />
        <Tab label="Education" />
        <Tab label="Sports" />
        <Tab label="Software Development" />
      </Tabs>
      <SearchButton />
    </Box>
  );
}
