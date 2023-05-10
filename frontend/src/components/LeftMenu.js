import React from "react";
import { LayoutOutlined, BellOutlined, PhoneOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { logOut } from "../store/slices/AuthSlice";
import { useDispatch } from "react-redux";

const LeftMenu = () => {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem("Dashboard", "1", <LayoutOutlined />),
    getItem("Support", "2", <PhoneOutlined />),
    getItem("Notification", "3", <BellOutlined />),
  ];

  const dispatch = useDispatch();

  return (
    <>
      <Menu
        style={{ backgroundColor: "#fbf9f9" }}
        defaultSelectedKeys={["1"]}
        items={items}
      />
      <Menu className="logout">
        <Menu.Item onClick={()=>dispatch(logOut())}>
          <LogoutOutlined />
          &nbsp; &nbsp;Logout
        </Menu.Item>
      </Menu>
    </>
  );
};

export default LeftMenu;
