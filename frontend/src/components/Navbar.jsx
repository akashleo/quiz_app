import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Input, Button, Avatar, Row, Col, Dropdown } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import SuccessModal from "./SuccessModal";
import "./components.css";

const { Header } = Layout;
// const { Search } = Input;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };
  const startQuiz = () => {
    navigate("/topics");
  };
  const openProfile = () => {
    navigate("/profile");
  };
  const navigateDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <Header className="navbar sticky">
      <Row>
        <Col span={4} className="quiz-logo" onClick={()=>navigateDashboard()}>
          Quiz Game
        </Col>
        <Col span={8} className="searchbar">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="search"
          />
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            shape="round"
            className="start-button"
            onClick={startQuiz}
          >
            Start Quiz
          </Button>
        </Col>
        <Col span={4} style={{ textAlign: "right" }}>
          <Avatar className="avatar-navbar" onClick={openProfile} src={<img src={"https://www.w3schools.com/howto/img_avatar.png"} alt="avatar" />} />
        </Col>
      </Row>
      {open && <SuccessModal open={open} setOpen={setOpen} />}
    </Header>
  );
};

export default Navbar;
