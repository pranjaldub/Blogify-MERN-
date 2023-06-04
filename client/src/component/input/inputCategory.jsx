import {DownOutlined} from "@ant-design/icons";
import {Dropdown, message, Space} from "antd";

const InputCategory = (blog, setBlog) => {
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
  return (
    <Dropdown
      menu={{
        items,
        onClick,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {blog.category ? `${blog.category}` : "Hover me, Click menu item"}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
export default InputCategory;
