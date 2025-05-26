import React, { useEffect, useState } from "react";
//import { LogoutOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setResponsedata } from "../../store/slices/auth/AuthSlice";

import {
  LeftOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

import { Row, Col, Form, Input, Button } from "antd";
import { login } from "../../store/slices/auth/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
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
              <Form
                layout={"vertical"}
                form={form}
                initialValues={{ layout: "vertical" }}
                className="form-container"
                style={{ 
                  margin: "0 auto",
                  maxWidth: "500px",
                  width: "100%",
                  padding: "0 20px"
                }}
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
                    placeholder="Enter your email"
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
                    <b>Login</b>
                  </Button>
                </Form.Item>
              </Form>
              <br />
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
                <Button
                  block
                  className="google-button"
                  onClick={() => navigate("/signup")}
                >
                  <b>Sign Up</b>
                </Button>
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
