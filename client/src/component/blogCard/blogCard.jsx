import {
  ShareAltOutlined as EditOutlined,
  SaveOutlined as EllipsisOutlined,
  HeartOutlined as SettingOutlined,
} from "@ant-design/icons";
import {Avatar, Card} from "antd";
const {Meta} = Card;
const BlogCard = () => (
  <Card
    hoverable
    style={{
      width: 300,
      height: 400,
      borderRadius: 10,
      backgroundColor: "transparent",
      textOverflow: "ellipses",
    }}
    cover={
      <img
        alt="example"
        src="https://images.unsplash.com/photo-1637317957434-16798e804fdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80"
        style={{borderRadius: 15}}
      />
    }
    actions={[
      <SettingOutlined key="like" />,
      <EditOutlined key="share" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      title="The effect of AI on non technical sector"
      description="This is the description The effect of AI on non technical sector The effect of AI on non technical sector ..."
      style={{textOverflow: "ellipses"}}
    />
  </Card>
);
export default BlogCard;
