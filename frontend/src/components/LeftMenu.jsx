import React from "react";
import {
  LayoutOutlined,
  BellOutlined,
  PhoneOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  SmileOutlined,
  LineChartOutlined,
  LockOutlined,
  TrophyOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { logOut } from "../store/slices/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const LeftMenu = () => {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const dashboardItems = [
    getItem("Dashboard", "1", <LayoutOutlined />),
    getItem("Support", "2", <PhoneOutlined />),
    getItem("Notification", "3", <BellOutlined />),
  ];

  const profileItems = [
    getItem("Public Image", "1", <SmileOutlined />),
    getItem("Name", "2", <UserOutlined />),
    getItem("Password", "3", <LockOutlined />),
    getItem("Achievements", "4", <TrophyOutlined />),
    getItem("Grades", "5", <BookOutlined />),
    getItem("Winner Charts", "6", <LineChartOutlined />),
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const LogoutFn = () => {
    dispatch(logOut());
    navigate("/");
  };

  const questionBank = (event) => {
    console.log(event);
    navigate("/question");
  };

  const questionBankButton = (
    <Menu className="questionbank">
      <Menu.Item onClick={questionBank}>
        <QuestionCircleOutlined />
        &nbsp; &nbsp;Question Bank
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Menu
        style={{ backgroundColor: "#fbf9f9" }}
        defaultSelectedKeys={["1"]}
        items={location.pathname === "/profile" ? profileItems : dashboardItems}
      />
      {location.pathname === "/dashboard" && questionBankButton}

      <Menu className="logout">
        <Menu.Item onClick={LogoutFn}>
          <LogoutOutlined />
          &nbsp; &nbsp;Logout
        </Menu.Item>
      </Menu>
    </>
  );
};

export default LeftMenu;
