// import * as React from "react";
// import {useTheme} from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import SkipNextIcon from "@mui/icons-material/SkipNext";
// import classes from "./trendingCard.module.css";
// import {useMediaQuery} from "react-responsive";
import {Chip} from "ui-neumorphism";
import "ui-neumorphism/dist/index.css";
// const TrendingCard = () => {
//   const theme = useTheme();
//   const isDesktopOrLaptop = useMediaQuery({
//     query: "(min-width: 1224px)",
//   });
//   const isBigScreen = useMediaQuery({query: "(min-width: 1824px)"});
//   const isMobile = useMediaQuery({query: "(max-width: 768px)"});
//   const isTablet = useMediaQuery({query: "(max-width: 1280px)"});
//   const isPortrait = useMediaQuery({query: "(orientation: portrait)"});
//   const isRetina = useMediaQuery({query: "(min-resolution: 2dppx)"});

//   return (
//     <Card
//       sx={{
//         display: "flex",
//         width: "100%",
//         height: isMobile ? "150%" : "100%",
//         flexDirection: isMobile ? "column" : "row",
//         borderRadius: 8,
//         backgroundColor: "#F6F5FB",
//       }}
//     >
//       <CardMedia
//         component="img"
//         sx={{
//           width: isMobile ? "100%" : "40%",
//           height: isMobile ? "50%" : "100%",
//           borderRadius: 8,
//           objectFit: "fill",
//         }}
//         image="https://images.unsplash.com/photo-1637317957434-16798e804fdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80"
//         alt="Live from space album cover"
//       />
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: isMobile ? "row" : "column",
//         }}
//       >
//         <CardContent
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             height: "100%",
//             justifyContent: "space-around",
//             padding: isMobile ? 2 : 5,
//             alignItems: "center",
//             overflow: "hidden",
//           }}
//         >
//           <Box>
//             {/* <Typography
//               component="div"
//               variant="p"
//               sx={{color: "#6752E1", paddingBottom: 1}}
//             >
//               Artificial Intelligence
//             </Typography> */}
//             <Chip icon={<FaceIcon />} label="Artificial Intelligence" />
//             <Typography
//               variant={isMobile ? "h6" : "h5"}
//               component="div"
//               sx={{
//                 fontFamily: "Poppins",
//                 fontWeight: "bold",
//                 paddingTop: 1,
//                 paddingBottom: 2,
//               }}
//             >
//               The Growth of AI and not technical sector
//             </Typography>
//           </Box>
//           <Typography
//             variant="p"
//             color="text.secondary"
//             component="div"
//             sx={{fontFamily: "Poppins"}}
//           >
//             Write great English with the ultimate tool for writing, in your
//             favorite websites such as Facebook, Gmail, LinkedIn and more. While
//             you're typing, a small Ginger logo will appear at the bottom right
//             corner of your text fields. This tool will take care of all your
//             writing needs.
//           </Typography>
//         </CardContent>
//       </Box>
//     </Card>
//   );
// };

// export default TrendingCard;
import {
  createStyles,
  Text,
  Title,
  TextInput,
  Button,
  Image,
  rem,
} from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: `calc(${theme.spacing.xl} * 2)`,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: "40%",

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  body: {
    paddingRight: `calc(${theme.spacing.xs} * 4)`,

    [theme.fn.smallerThan("sm")]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: "flex",
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: "100%",
    flex: "1",
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));
const TrendingCard = () => {
  const image =
    "https://images.unsplash.com/photo-1637317957434-16798e804fdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80";
  const title = "The Growth of AI and not technical sector";
  const description =
    "Write great English with the ultimate tool for writing, in your favorite websites such as Facebook, Gmail, LinkedIn and more. While you're typing, a small Ginger logo will appear at the bottom right corner of your text fields. This tool will take care of all your writing needs.";
  const {classes} = useStyles();
  return (
    <div className={classes.wrapper} style={{borderRadius: 15}}>
      <div className={classes.body}>
        <Chip type="error" className="ma-3">
          Artificial Intelligence
        </Chip>

        <Text fw={700} fz="lg" mb={5} mt={5}>
          {title}
        </Text>
        <Text fz="sm" c="dimmed">
          {description}
        </Text>

        {/* <div className={classes.controls}>
          <TextInput
            placeholder="Your email"
            classNames={{input: classes.input, root: classes.inputWrapper}}
          />
          <Button className={classes.control}>Subscribe</Button>
        </div> */}
      </div>

      <Image src={image} className={classes.image} radius="lg" />
    </div>
  );
};

export default TrendingCard;
