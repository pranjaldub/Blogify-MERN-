import {
  ShareAltOutlined as EditOutlined,
  SaveOutlined as EllipsisOutlined,
  HeartOutlined as SettingOutlined,
} from "@ant-design/icons";
import {Avatar, Card} from "antd";
const {Meta} = Card;
const BlogCard = () => (
  <Card
    style={{
      width: 300,
      borderRadius: 10,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="like" />,
      <EditOutlined key="share" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
      }
      title="Card title"
      description="This is the description"
    />
  </Card>
);
export default BlogCard;
