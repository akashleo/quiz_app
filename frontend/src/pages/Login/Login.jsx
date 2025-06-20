import React, { useEffect } from "react";
import { GoogleOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { tokenValidity } = useSelector((state) => state.auth);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/'}user/auth/google`;
  };

  const handleAdminLogin = () => {
    navigate("/admin-login");
  };

  useEffect(() => {
    if (tokenValidity === true) {
      navigate("/dashboard");
    }
  }, [tokenValidity]);


  return (
    <div className="login-container">
      <div className="login-content">
        <Row className="login-header-section">
          <Col xs={24}>
            <h1 className="login-main-title">Welcome to Quiz App</h1>
          </Col>
          <Col xs={24}>
            <h3 className="login-subtitle">Choose your login method</h3>
          </Col>
        </Row>
        
        <Row className="login-tiles-section" gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <Button
              className="login-tile google-tile"
              onClick={handleGoogleLogin}
            >
              <div className="tile-content">
                <GoogleOutlined className="tile-icon" />
                <span className="tile-text">Sign in with Google</span>
                <span className="tile-subtitle">For Users</span>
              </div>
            </Button>
          </Col>
          
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <Button
              className="login-tile admin-tile"
              onClick={handleAdminLogin}
            >
              <div className="tile-content">
                <UserOutlined className="tile-icon" />
                <span className="tile-text">Admin Login</span>
                <span className="tile-subtitle">For Administrators</span>
              </div>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
