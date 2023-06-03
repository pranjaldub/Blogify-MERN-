import {Steps, theme} from "antd";
import {useState} from "react";
import CreateBlog from "./createBlog";
import {Button, message, Popconfirm} from "antd";
const steps = [
  {
    title: "First",
    content: "first",
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: <CreateBlog />,
  },
];
const CreateBlogSteps = () => {
  const {token} = theme.useToken();
  const [current, setCurrent] = useState(0);
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
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    display: "flex",
    justifyContent: "space-around",
  };
  return (
    <>
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
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
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
            >
              Previous
            </Button>
          </Popconfirm>
        )}
      </div>
    </>
  );
};
export default CreateBlogSteps;
