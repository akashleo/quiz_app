import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Button, Drawer, Menu } from "antd";
import { 
  MenuOutlined,
  PlayCircleOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  UserOutlined,
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
    <Header className="navbar">
      <div className="navbar-container">
        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileDrawerOpen(true)}
          className="mobile-menu-btn"
        />

        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate('/dashboard')}>
          <img 
            src="/emoquiz_logo.png" 
            alt="EmoQuiz Logo" 
            className="logo-image"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-nav">
          <Button
            className="nav-btn"
            onClick={startQuiz}
            icon={<PlayCircleOutlined />}
          >
            Start Quiz
          </Button>

          {userInfo?.role === 'admin' && (
            <Button
              className="nav-btn"
              icon={<QuestionCircleOutlined />}
              onClick={navigateQuestionBank}
            >
              Question Bank
            </Button>
          )}

          <Button
            className="nav-btn"
            onClick={openProfile}
            icon={<UserOutlined />}
          >
            Profile
          </Button>

          <Button
            className="nav-btn"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
          >
            Logout
          </Button>

          <Button
            className="theme-btn"
            icon={theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          />
        </div>

        {/* Mobile Theme Toggle */}
        <Button
          className="mobile-theme-btn"
          icon={theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          onClick={toggleTheme}
        />
      </div>

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
