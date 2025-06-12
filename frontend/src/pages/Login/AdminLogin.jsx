import React, { useState, useEffect } from "react";
import { Form, Input, Button, Space, Alert } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/slices/auth/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUp.css"; // Reuse styles from existing signup page
import apiConfig from "../../../src/AxiosConfig";

/**
 * AdminLogin component allows admin users to authenticate via email & password.
 * Includes email verification via OTP.
 */
const AdminLogin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { tokenValidity, userInfo } = useSelector((state) => state.auth);

  // Local state for OTP flow
  const [email, setEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle sending OTP
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await apiConfig.post("/user/verify/send-otp", { email });
      setOtpSent(true);
      setShowOtpInput(true);
      toast.success("OTP sent successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Handle verifying OTP
  const handleVerifyOtp = async (otp) => {
    try {
      setLoading(true);
      setError("");
      const response = await apiConfig.post("/user/verify/validate-otp", { email, otp });
      toast.success("Email verified successfully!");
      setShowOtpInput(false);
      // After verification, proceed with login
      form.submit();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to verify OTP");
      toast.error(err.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission (login)
  const onFinish = (values) => {
    dispatch(login(values));
  };

  // Handle email change
  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setOtpSent(false);
    setShowOtpInput(false);
  };

  // Redirect admin to dashboard after successful login
  useEffect(() => {
    if (tokenValidity && userInfo?.role === "admin") {
      toast.success("Admin login successful");
      navigate("/dashboard");
    }
  }, [tokenValidity, userInfo, navigate]);

  // Non-admin logged in with this form – force logout / warning
  useEffect(() => {
    if (tokenValidity && userInfo && userInfo.role !== "admin") {
      toast.error("You are not authorized as admin");
    }
  }, [tokenValidity, userInfo]);

  return (
    <>
      <div style={{ margin: "25px" }}>
        <Button
          type="primary"
          htmlType="button"
          className="action-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeftOutlined /> &nbsp;Back to User Login
        </Button>
      </div>
      <div className="signup-wrapper">
        <div className="signup">
          <h1>Admin Login</h1>
          {error && <Alert message={error} type="error" style={{ marginBottom: 16 }} />}
          <Form
            layout={"vertical"}
            form={form}
            initialValues={{ layout: "vertical" }}
            onFinish={onFinish}
          >
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
              <Space.Compact style={{ width: '100%' }}>
                <Input 
                  className="input-box" 
                  onChange={onEmailChange}
                  disabled={otpSent}
                />
                <Button 
                  type="primary"
                  onClick={handleSendOtp}
                  loading={loading}
                  disabled={!email || otpSent}
                >
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </Button>
              </Space.Compact>
            </Form.Item>

            {showOtpInput && (
              <Form.Item
                name="otp"
                label="OTP"
                className="login-label"
                rules={[
                  {
                    required: true,
                    message: "Please enter the OTP",
                  },
                  {
                    len: 6,
                    message: "OTP must be 6 digits",
                  },
                ]}
              >
                <Space.Compact style={{ width: '100%' }}>
                  <Input 
                    className="input-box"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                  <Button 
                    type="primary"
                    onClick={() => handleVerifyOtp(form.getFieldValue('otp'))}
                    loading={loading}
                  >
                    Verify OTP
                  </Button>
                </Space.Compact>
              </Form.Item>
            )}

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
                disabled={!otpSent}
              >
                Login as Admin
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

export default AdminLogin; 