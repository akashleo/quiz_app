import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Input, Button, Avatar, Row, Col, Drawer, Menu, Dropdown } from "antd";
import { 
  SearchOutlined, 
  UserOutlined, 
  MenuOutlined,
  PlayCircleOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  DownOutlined
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logOut } from "../store/slices/auth/AuthSlice";
import SuccessModal from "./SuccessModal";
import "./components.css";

const { Header } = Layout;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const startQuiz = () => {
    navigate("/topics");
    setMobileDrawerOpen(false);
  };

  const openProfile = () => {
    navigate("/profile");
    setMobileDrawerOpen(false);
  };

  const navigateQuestionBank = () => {
    navigate("/question");
    setMobileDrawerOpen(false);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
    setMobileDrawerOpen(false);
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: openProfile
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
      danger: true
    }
  ];

  const getMobileMenuItems = () => [
    {
      key: 'start',
      icon: <PlayCircleOutlined />,
      label: 'Start Quiz',
      onClick: startQuiz
    },
    {
      key: 'question-bank',
      icon: <QuestionCircleOutlined />,
      label: 'Question Bank',
      onClick: navigateQuestionBank
    }
  ];

  return (
    <Header className="navbar sticky">
      {/* Mobile Menu Button */}
      <div className="mobile-menu-button">
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileDrawerOpen(true)}
        />
      </div>

      <Row align="middle" className="navbar-row">
        <Col xs={14} sm={6} md={4} className="quiz-logo" onClick={() => navigate("/dashboard")}>
          Quiz Game
        </Col>
        
        {/* Search Bar - Hidden on mobile */}
        <Col xs={0} sm={8} md={8} className="searchbar">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="search"
          />
        </Col>

        {/* Navigation Buttons - Hidden on mobile */}
        <Col xs={0} sm={6} md={8} className="nav-buttons">
          <Button
            type="primary"
            icon={<QuestionCircleOutlined />}
            className="question-bank-button"
            onClick={navigateQuestionBank}
          >
            Question Bank
          </Button>
          <Button
            type="primary"
            className="start-button"
            onClick={startQuiz}
          >
            Start Quiz
          </Button>
        </Col>

        {/* Avatar and Dropdown - Hidden on mobile */}
        <Col xs={0} sm={4} md={4} className="avatar-container">
          <Dropdown 
            menu={{ items: userMenuItems }} 
            trigger={['click']}
            placement="bottomRight"
          >
            <div className="avatar-dropdown">
              <Avatar 
                className="avatar-navbar" 
                src={<img src={"https://www.w3schools.com/howto/img_avatar.png"} alt="avatar" />} 
              />
              <DownOutlined className="dropdown-icon" />
            </div>
          </Dropdown>
        </Col>

        {/* Mobile Search Icon */}
        <Col xs={10} sm={0} className="mobile-search">
          <Button
            type="text"
            icon={<SearchOutlined />}
            onClick={() => {/* Handle mobile search */}}
          />
        </Col>
      </Row>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        className="mobile-drawer"
      >
        <Menu 
          items={getMobileMenuItems()} 
          mode="vertical"
          className="mobile-drawer-menu"
        />
        <Menu 
          items={userMenuItems}
          mode="vertical"
          className="mobile-drawer-user-menu"
        />
      </Drawer>

      {open && <SuccessModal open={open} setOpen={setOpen} />}
    </Header>
  );
};

export default Navbar;
