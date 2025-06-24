import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Input, Button, Avatar, Row, Col, Drawer, Menu, Dropdown } from "antd";
import { 
  SearchOutlined, 
  UserOutlined, 
  MenuOutlined,
  PlayCircleOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setUser } from "../store/slices/auth/AuthSlice";
import SuccessModal from "./SuccessModal";
import { useTheme } from "../contexts/ThemeContext";
import "./components.css";

const { Header } = Layout;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!userInfo) {
      dispatch(setUser(user));
    }
  }, [userInfo]);

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
    userInfo?.role === 'admin' && {
      key: 'questionBank',
      icon: <QuestionCircleOutlined />,
      label: 'Question Bank',
      onClick: navigateQuestionBank
    }
  ].filter(Boolean);

  return (
    <Header className="navbar sticky">
      <Row className="navbar-row" align="middle">
        {/* Mobile Menu Button */}
        <Col xs={2} sm={0}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileDrawerOpen(true)}
            className="mobile-menu-button"
          />
        </Col>

        {/* Logo */}
        <Col xs={8} sm={6} md={4}>
          <div className="quiz-logo" onClick={() => navigate('/dashboard')}>
            QUIZ
          </div>
        </Col>

        {/* Search Bar - Hidden on mobile */}
        <Col xs={0} sm={10} md={12} className="searchbar">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="search"
          />
        </Col>

        {/* Desktop Navigation */}
        <Col xs={0} sm={8} md={8} className="nav-buttons">
          {/* Theme Toggle */}
          <Button
            type="text"
            icon={theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            onClick={toggleTheme}
            className="theme-toggle-button"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          />

          {/* Question Bank Button for Admin */}
          {userInfo?.role === 'admin' && (
            <Button
              type="primary"
              icon={<QuestionCircleOutlined />}
              onClick={navigateQuestionBank}
              className="question-bank-button"
            >
              Question Bank
            </Button>
          )}

          {/* Start Quiz Button */}
          <Button
            type="default"
            onClick={startQuiz}
            className="start-button"
          >
            Start Quiz
          </Button>

          {/* Avatar with Dropdown */}
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <div className="avatar-dropdown">
              <Avatar 
                icon={<UserOutlined />} 
                src={userInfo?.profilePicture}
                className="avatar-navbar"
              />
              <DownOutlined className="dropdown-icon" />
            </div>
          </Dropdown>
        </Col>

        {/* Mobile Search and Theme Toggle */}
        <Col xs={14} sm={0} className="mobile-search">
          <Button
            type="text"
            icon={theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            onClick={toggleTheme}
            className="theme-toggle-button"
          />
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
