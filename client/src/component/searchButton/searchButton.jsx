import {SearchOutlined} from "@ant-design/icons";
import {Button, Space, Tooltip} from "antd";

import React from "react";

const SearchButton = () => {
  return (
    <div>
      <Button shape="round" icon={<SearchOutlined />}>
        Search
      </Button>
    </div>
  );
};

export default SearchButton;
