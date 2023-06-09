import * as React from "react";
import {Menu, Button, Text} from "@mantine/core";
import {
  IconHome2,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconCategory2,
  IconUserCircle,
} from "@tabler/icons-react";

import ReorderIcon from "@mui/icons-material/Reorder";
import {MenuOutlined} from "@ant-design/icons";
import classes from "./mobileNavbar.module.css";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../features/user/userSlice";
export default function MobileNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    const element = document.getElementById("menuIcon");
    //console.log("rotating");
    element.classList.add(classes.rotateMobileNavbar);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    const element = document.getElementById("menuIcon");
    // console.log("rotating");
    element.classList.remove(classes.rotateMobileNavbar);
    setAnchorEl(null);
  };

  return (
    <Menu
      shadow="md"
      width={200}
      transitionProps={{transition: "scale-y", duration: 200}}
    >
      <Menu.Target style={{marginLeft: 20, marginTop: 2}}>
        <IconCategory2 />
      </Menu.Target>

      <Menu.Dropdown>
        Pages
        <Menu.Item icon={<IconHome2 size={14} />} onClick={() => navigate("/")}>
          Home
        </Menu.Item>
        <Menu.Item
          icon={<IconMessageCircle size={14} />}
          onClick={() => navigate("/blogs")}
        >
          Blogs
        </Menu.Item>
        <Menu.Item
          icon={<IconPhoto size={14} />}
          onClick={() => navigate("/blogs")}
        >
          Features
        </Menu.Item>
        <Menu.Item
          icon={<IconUserCircle size={14} />}
          onClick={() => navigate("/about")}
        >
          About
        </Menu.Item>
        {/* <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item> */}
        <Menu.Divider />
        {/* <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          Delete my account
        </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
}
