import {Steps, theme} from "antd";
import {useState} from "react";
import CreateBlog from "./createBlog";
import {Button, message, Popconfirm} from "antd";
import InputHeading from "../../component/input/inputHeading";
import InputDescription from "../../component/input/inputDescription";
import {createBlog} from "../../service/api";
import {useSelector, useDispatch} from "react-redux";
import {Center} from "@mantine/core";

//import { set } from "mongoose";

const CreateBlogSteps = () => {
  const user = useSelector((state) => state.user);
  const [blog, setBlog] = useState({heading: "", description: "", content: ""});
  const {token} = theme.useToken();
  const [current, setCurrent] = useState(0);
  const steps = [
    {
      title: "Heading",
      content: <InputHeading blog={blog} setBlog={setBlog} />,
    },
    {
      title: "Description",
      content: <InputDescription blog={blog} setBlog={setBlog} />,
    },
    {
      title: "Last",
      content: <CreateBlog blog={blog} setBlog={setBlog} />,
    },
  ];
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const confirm = (e) => {
    //console.log(e);
    //message.success('Click on Yes');
    prev();
  };
  const cancel = (e) => {
    //console.log(e);
    //message.error('Click on No');
  };
  const contentStyle = {
    //lineHeight: "260px",
    textAlign: "center",
    //display: "flex",
    //color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    //border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,

    display: "flex",
    position: "relative",
    justifyContent: "space-around",
  };
  return (
    <div style={{height: "auto"}}>
      <Steps
        current={current}
        items={items}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 10,

          display: "flex",
          justifyContent: "center",
        }}
      >
        {current < steps.length - 1 && (
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => next()}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            shape="round"
            size="large"
            type="primary"
            onClick={() => createBlog({username: user.username, blog: blog})}
          >
            Submit
          </Button>
        )}
        {current > 0 && (
          <Popconfirm
            title="Delete the task"
            description="Your current data will be lost upon leaving this page !"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Leave"
            cancelText="Stay"
          >
            <Button
              style={{
                margin: "0 8px",
              }}
              // onClick={() => prev()}
              shape="round"
              size="large"
            >
              Previous
            </Button>
          </Popconfirm>
        )}
      </div>
    </div>
  );
};
export default CreateBlogSteps;
