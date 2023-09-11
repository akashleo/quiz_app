import React from "react";
import { Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ProfileName = () => {
  return (
    <div className="profile-name">
      <Typography.Title copyable={false} level={3} style={{ margin: "10px 0px" }}>
        Ant Design
      </Typography.Title>
      <br/>
      <Input size="large" placeholder="Please enter the updated name" prefix={<UserOutlined />} />
    </div>
  );
};

export default ProfileName;
