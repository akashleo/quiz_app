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

const LeftMenu = ({ profileOnclick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const dashboardItems = [
    <Menu.Item key="1" onClick={() => navigate("/dashboard")}>
      <LayoutOutlined /> &nbsp; Dashboard
    </Menu.Item>,
    <Menu.Item key="2" disabled={true}>
      <PhoneOutlined /> &nbsp; Support
    </Menu.Item>,
    <Menu.Item key="3" disabled={true}>
      <BellOutlined /> &nbsp; Notification
    </Menu.Item>,
  ];

  const profileItems = [
    <Menu.Item key="1" onClick={() => profileOnclick("image")}>
      <SmileOutlined /> &nbsp; Display Picture
    </Menu.Item>,
    <Menu.Item key="2" onClick={() => profileOnclick("name")}>
      <UserOutlined /> &nbsp; Name
    </Menu.Item>,
    <Menu.Item key="3" onClick={() => profileOnclick("password")}>
      <LockOutlined /> &nbsp; Password
    </Menu.Item>,
    <Menu.Item key="4" onClick={() => profileOnclick("achievements")}>
      <TrophyOutlined /> &nbsp; Achievements
    </Menu.Item>,
    <Menu.Item key="5" onClick={() => profileOnclick("grades")}>
      <BookOutlined /> &nbsp; Grades
    </Menu.Item>,
    <Menu.Item key="6" onClick={() => profileOnclick("winner")}>
      <LineChartOutlined /> &nbsp; Winner Charts
    </Menu.Item>,
  ];

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
      {location.pathname === "/dashboard" && (
        <Menu
          style={{ backgroundColor: "#fbf9f9" }}
          defaultSelectedKeys={["1"]}
          mode="vertical"
        >
          {dashboardItems}
        </Menu>
      )}
      {location.pathname === "/topics" && (
        <Menu
          style={{ backgroundColor: "#fbf9f9" }}
          defaultSelectedKeys={["1"]}
          mode="vertical"
        >
          {dashboardItems}
        </Menu>
      )}
      {location.pathname === "/dashboard" && questionBankButton}
      {location.pathname === "/profile" && (
        <Menu style={{ backgroundColor: "#fbf9f9" }} mode="vertical">
          {profileItems}
        </Menu>
      )}

      <Menu className="logout" mode="vertical">
        <Menu.Item onClick={LogoutFn}>
          <LogoutOutlined />
          &nbsp; &nbsp;Logout
        </Menu.Item>
      </Menu>
    </>
  );
};

export default LeftMenu;
