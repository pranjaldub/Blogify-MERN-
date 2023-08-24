import {
  ShareAltOutlined as EditOutlined,
  SaveOutlined as EllipsisOutlined,
  HeartOutlined as SettingOutlined,
} from "@ant-design/icons";
// import {Avatar, Card} from "antd";
// const {Meta} = Card;
import {IconBookmark, IconHeart, IconShare} from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  createStyles,
  rem,
} from "@mantine/core";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {likeBlog, saveBlog, unsaveBlog, unlikeBlog} from "../../service/api";
const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    width: "30%",

    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: rem(12),
    pointerEvents: "none",
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: rem(5),
  },

  action: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

const BlogCard = ({blog, author, blogId, liked, saved}) => {
  console.log("inside card", blogId, liked, saved);
  const [like, setLike] = useState(liked);
  const [save, setSave] = useState(saved);
  //const [unsave, setUnsave] = useState(false);
  const navigate = useNavigate();
  console.log("author", author);
  const user = useSelector((state) => state.user);
  async function likeHandler() {
    const obj = {username: user.username, blogId: blogId};
    const resp = await likeBlog(obj);
    if (resp.isSuccess) {
      setLike(true);
    }
  }
  async function unlikeHandler() {
    const obj = {username: user.username, blogId: blogId};
    const resp = await unlikeBlog(obj);
    if (resp.isSuccess) {
      setLike(false);
    }
  }
  async function saveHandler() {
    const obj = {username: user.username, blogId: blogId};
    const resp = await saveBlog(obj);
    if (resp.isSuccess) {
      setSave(true);
    }
  }
  async function unsaveHandler() {
    const obj = {username: user.username, blogId: blogId};
    const resp = await unsaveBlog(obj);
    if (resp.isSuccess) {
      setSave(false);
    }
  }

  const {classes, cx, theme} = useStyles();
  // const linkProps = {href: link, target: "_blank", rel: "noopener noreferrer"};
  const image =
    "https://images.unsplash.com/photo-1637317957434-16798e804fdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80";

  return (
    <Card withBorder radius="lg" className={cx(classes.card)}>
      <Card.Section>
        <a>
          <Image src={image} height={180} />
        </a>
      </Card.Section>

      <Text
        className={classes.title}
        fw={500}
        component="a"
        onClick={() => navigate(`/blogs/${blogId}`)}
      >
        {blog.heading}
      </Text>

      <Text fz="sm" color="dimmed" lineClamp={4}>
        {blog.description}
      </Text>

      <Group position="apart" className={classes.footer}>
        <Center>
          <Avatar src={image} size={24} radius="xl" mr="xs" />
          <Text fz="sm" inline>
            {author}
          </Text>
        </Center>

        <Group spacing={8} mr={0}>
          <ActionIcon
            className={classes.action}
            onClick={
              user.isLoggedIn
                ? !like
                  ? likeHandler
                  : unlikeHandler
                : () => navigate("/login")
            }
          >
            <IconHeart
              size="1rem"
              color={like || liked ? theme.colors.red[6] : theme.colors.black}
            />
          </ActionIcon>
          <ActionIcon
            className={classes.action}
            onClick={
              user.isLoggedIn
                ? !save
                  ? saveHandler
                  : unsaveHandler
                : () => navigate("/login")
            }
          >
            <IconBookmark
              size="1rem"
              color={save || saved ? theme.colors.red[6] : theme.colors.black}
            />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconShare size="1rem" />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
};
export default BlogCard;
