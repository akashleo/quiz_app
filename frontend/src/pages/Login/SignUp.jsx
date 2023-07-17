import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignupPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // Handle signup logic here
  };

  return (
    <>
      <div style={{ margin: "30px" }}>
        <Button
          type="primary"
          htmlType="submit"
          className="action-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeftOutlined /> &nbsp;Back to Login
        </Button>
      </div>
      <div className="signup-wrapper">
        <div className="signup">
          <h1>Sign Up</h1>
          <Form
            layout={"vertical"}
            form={form}
            initialValues={{ layout: "vertical" }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Name"
              className="login-label"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input className="input-box" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
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
              <Input className="input-box" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              className="login-label"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password className="input-box" />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="action-button"
              >
                Create Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
