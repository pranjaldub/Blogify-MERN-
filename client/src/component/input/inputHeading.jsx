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
import InputCategory from "./inputCategory";
import {DownOutlined} from "@ant-design/icons";
import {Dropdown, message, Space} from "antd";
import {useEffect} from "react";

// const InputCategory = () => {
//   const onClick = (e) => {
//     console.log(e.domEvent.target.innerText);

//     setBlog((prevState) => ({
//       ...prevState,
//       category: e.domEvent.target.innerText,
//     }));
//   };
//   const items = [
//     {
//       label: "Technology",
//       key: "1",
//     },
//     {
//       label: "Life",
//       key: "2",
//     },
//     {
//       label: "Education",
//       key: "3",
//     },
//   ];
//   return (
//     <Dropdown
//       menu={{
//         items,
//         onClick,
//       }}
//     >
//       <a onClick={(e) => e.preventDefault()}>
//         <Space>
//           {blog.category ? `${blog.category}` : "Hover me, Click menu item"}
//           <DownOutlined />
//         </Space>
//       </a>
//     </Dropdown>
//   );
// };
// //export default InputCategory;

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    margin: theme.spacing.xl,
    alignItems: "center",
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

export default function InputHeading({blog, setBlog, setEnable}) {
  const onClick = (e) => {
    console.log(e.domEvent.target.innerText);

    setBlog((prevState) => ({
      ...prevState,
      category: e.domEvent.target.innerText,
    }));
  };
  const items = [
    {
      label: "Technology",
      key: "1",
    },
    {
      label: "Life",
      key: "2",
    },
    {
      label: "Education",
      key: "3",
    },
  ];
  const {classes} = useStyles();
  useEffect(() => {
    if (blog.heading.length == 0 || !blog.category) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [blog.heading, blog.category]);
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>We are almost there ...</Title>
        <Text fw={500} fz="lg" mb={5}>
          What should be the Title of the article ?
        </Text>

        <div className={classes.controls}>
          <TextInput
            placeholder="Title"
            classNames={{input: classes.input, root: classes.inputWrapper}}
            //value={blog.heading}
            onChange={(text) => {
              //console.log(text);

              setBlog((prevState) => ({
                ...prevState,
                heading: text.target.value,
              }));
            }}
            value={blog.heading}
          />
        </div>
        <div className={classes.controls}>
          <Dropdown
            menu={{
              items,
              onClick,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {blog.category ? `${blog.category}` : "Choose category"}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      <Image src={image} className={classes.image} />
    </div>
  );
}
