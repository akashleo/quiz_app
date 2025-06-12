import React, { useEffect } from "react";
//import { LogoutOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setResponsedata } from "../../store/slices/auth/AuthSlice";

import {
  LeftOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

import { Row, Col, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import "./Login.css";

const Login = () => {
  // For user login, only Google OAuth is allowed.
  const { tokenValidity, responseData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // No email/password errors expected. Still keep generic error handler if needed.
  useEffect(() => {
    if (responseData === "Invalid User") {
      toast.error("Login failed");
      dispatch(setResponsedata(null));
    }
  }, [responseData]);

  // Redirect authenticated users (e.g., after Google OAuth) directly to dashboard
  useEffect(() => {
    if (tokenValidity) {
      navigate("/dashboard");
    }
  }, [tokenValidity, navigate]);

  return (
    <Row style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={24} md={10} lg={10}>
        <div
          style={{ width: "100%", height: "100%" }}
          className="cover-image-left"
        ></div>
      </Col>
      <Col xs={24} sm={24} md={14} lg={14}>
        <div className="cover-bg-right">
          <Row>
            <Col xs={24}>
              <p style={{ padding: "0 20px" }}>
                <LeftOutlined /> Back
              </p>
            </Col>
          </Row>
          <Row className="login-section">
            <Col xs={24}>
              <h2 className="login-text">Login to your Account</h2>
            </Col>
            <Col xs={24}>
              <h5 className="login-text-2">
                with your registered Email Address
              </h5>
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <div className="mobile-full-width" style={{ 
                margin: "0 auto",
                maxWidth: "500px",
                width: "100%",
                padding: "0 20px"
              }}>
                <Button
                  block
                  className="login-button google-login-button"
                  icon={<GoogleOutlined />}
                  onClick={() => {
                    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/'}user/auth/google`;
                  }}
                  style={{ marginBottom: '10px' }}
                >
                  <b>Sign in with Google</b>
                </Button>
                {/* Link to admin login */}
                <div style={{ textAlign: 'center' }}>
                  <Link to="/admin/login" style={{ color: '#1890ff' }}>Admin Login</Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Row>
  );
};

export default Login;
