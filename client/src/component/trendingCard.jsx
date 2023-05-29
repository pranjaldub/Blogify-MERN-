import * as React from "react";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import classes from "./trendingCard.module.css";
import {useMediaQuery} from "react-responsive";
import FaceIcon from "@mui/icons-material/Face";
import {Chip} from "@mui/material";
const TrendingCard = () => {
  const theme = useTheme();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({query: "(min-width: 1824px)"});
  const isMobile = useMediaQuery({query: "(max-width: 768px)"});
  const isTablet = useMediaQuery({query: "(max-width: 1280px)"});
  const isPortrait = useMediaQuery({query: "(orientation: portrait)"});
  const isRetina = useMediaQuery({query: "(min-resolution: 2dppx)"});

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        height: isMobile ? "150%" : "100%",
        flexDirection: isMobile ? "column" : "row",
        borderRadius: 8,
        backgroundColor: "#F6F5FB",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: isMobile ? "100%" : "40%",
          height: isMobile ? "50%" : "100%",
          borderRadius: 8,
          objectFit: "fill",
        }}
        image="https://images.unsplash.com/photo-1637317957434-16798e804fdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80"
        alt="Live from space album cover"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-around",
            padding: isMobile ? 2 : 5,
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Box>
            {/* <Typography
              component="div"
              variant="p"
              sx={{color: "#6752E1", paddingBottom: 1}}
            >
              Artificial Intelligence
            </Typography> */}
            <Chip icon={<FaceIcon />} label="Artificial Intelligence" />
            <Typography
              variant={isMobile ? "h6" : "h5"}
              component="div"
              sx={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                paddingTop: 1,
                paddingBottom: 2,
              }}
            >
              The Growth of AI and not technical sector
            </Typography>
          </Box>
          <Typography
            variant="p"
            color="text.secondary"
            component="div"
            sx={{fontFamily: "Poppins"}}
          >
            Write great English with the ultimate tool for writing, in your
            favorite websites such as Facebook, Gmail, LinkedIn and more. While
            you're typing, a small Ginger logo will appear at the bottom right
            corner of your text fields. This tool will take care of all your
            writing needs.
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default TrendingCard;
