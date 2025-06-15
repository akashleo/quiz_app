import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setResponsedata } from "../../store/slices/auth/AuthSlice";

import {
  LeftOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import { Row, Col, Form, Input, Button } from "antd";
import { login } from "../../store/slices/auth/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const AdminLogin = () => {
  const { tokenValidity, responseData } = useSelector((state) => state.auth);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFn = () => {
    dispatch(login({ email, password }));
  };

  const handleNameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterAsAdmin = () => {
    navigate("/admin-register");
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (tokenValidity === true) {
      navigate("/dashboard");
    }
  }, [tokenValidity]);

  useEffect(() => {
    if (responseData === "Invalid User") {
      toast.error("User does not exist");
      dispatch(setResponsedata(null));
    }
  }, [responseData]);

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="admin-form-container">
          <Row>
            <Col xs={24}>
              <p 
                className="back-link"
                onClick={handleBackToLogin}
              >
                <LeftOutlined /> Back to Login Options
              </p>
            </Col>
          </Row>
          <Row className="login-section">
            <Col xs={24}>
              <h2 className="login-main-title">Admin Login</h2>
            </Col>
            <Col xs={24}>
              <h3 className="login-subtitle">
                Login with your admin credentials
              </h3>
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <Form
                layout={"vertical"}
                form={form}
                initialValues={{ layout: "vertical" }}
                className="form-container"
                onFinish={loginFn}
              >
                <Form.Item
                  label="Email *"
                  className="login-label"
                  rules={[
                    {
                      type: "email",
                      message: "Please enter a valid email",
                    },
                    {
                      required: true,
                      message: "Please enter your email",
                    },
                  ]}
                >
                  <Input
                    className="input-box"
                    placeholder="Enter your admin email"
                    onChange={(event) => handleNameChange(event)}
                  />
                </Form.Item>
                <Form.Item
                  label="Password *"
                  className="login-label"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    className="input-box"
                    placeholder="Password"
                    onChange={(event) => handlePasswordChange(event)}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" block className="login-button">
                    <b>Login as Admin</b>
                  </Button>
                </Form.Item>
              </Form>
              <div className="form-footer">
                <Button
                  block
                  className="google-button"
                  onClick={handleRegisterAsAdmin}
                >
                  <b>Register as Admin</b>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
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
    </div>
  );
};

export default AdminLogin; 