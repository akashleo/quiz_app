import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { signup } from "../../store/slices/auth/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUp.css";

const SignupPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUserId } = useSelector((state) => state.auth);

  const onFinish = (body) => {
    console.log("Received values of form: ", body);
    // Handle signup logic here
    dispatch(signup(body));
  };

  useEffect(() => {
    if (currentUserId) {
      toast.success("User successfully created");
      setTimeout(()=>navigate("/"), 5000)
    }
  }, [currentUserId]);

  return (
    <>
      <div style={{ margin: "25px" }}>
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
          <h1>
            Sign Up 	&#128514;
            <span role="img" aria-label="{label}">
              {String.fromCodePoint('U+1F435'.replace('U+', '0x'))}
            </span>
          </h1>
          <Form
            layout={"vertical"}
            form={form}
            initialValues={{ layout: "vertical" }}
            onFinish={onFinish}
          >
            <Form.Item
              name="fullName"
              label="Full Name"
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
    </>
  );
};

export default SignupPage;
