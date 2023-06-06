import {
  createStyles,
  Text,
  Title,
  TextInput,
  Button,
  Image,
  rem,
} from "@mantine/core";
import image from "../svg/one.svg";
import TextArea from "antd/es/input/TextArea";
import {useEffect, useState} from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    margin: theme.spacing.xl,
    alignItems: "center",
    justifyContent: "space-around",
    padding: `calc(${theme.spacing.xl} * 2)`,
    borderRadius: theme.radius.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
    boxShadow: `4px 4px 14px #d3d3d3,
    -4px -4px 14px #ededed`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: "20%",

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "40%",
    },
  },

  body: {
    paddingRight: `calc(${theme.spacing.xl} * 4)`,

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
    borderRadius: 8,
    border: "1px solid black",
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

export default function InputDescription({blog, setBlog, setEnable}) {
  const {classes} = useStyles();

  useEffect(() => {
    if (blog.description.length == "") {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [blog.description]);
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>One more step ...</Title>
        <Text fw={500} fz="lg" mb={5}>
          Describe the content your article in 2-3 lines.
        </Text>

        <div className={classes.controls}>
          <TextArea
            placeholder="Description"
            classNames={{input: classes.input, root: classes.inputWrapper}}
            rows={4}
            onChange={(text) => {
              //console.log(text);
              setBlog((prevState) => ({
                ...prevState,
                description: text.target.value,
              }));
            }}
            value={blog.description}
          />
        </div>
      </div>
      <Image src={image} className={classes.image} />
    </div>
  );
}
