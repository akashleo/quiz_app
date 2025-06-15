import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, verifyOtp, adminRegister } from "../../store/slices/auth/AuthActions";
import { clearOtpState } from "../../store/slices/auth/AuthSlice";

import {
  LeftOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  CheckOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { Row, Col, Form, Input, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const AdminRegister = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { 
    otpLoading, 
    otpSent, 
    otpVerified, 
    otpError,
    loading,
    error,
    success 
  } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Handle OTP sent success
  useEffect(() => {
    if (otpSent && !otpError) {
      setShowOtpField(true);
      setTimer(30);
      setCanResend(false);
      toast.success("OTP sent to your email!");
    }
  }, [otpSent, otpError]);

  // Handle OTP verification success
  useEffect(() => {
    if (otpVerified && !otpError) {
      setShowOtpField(false);
      setOtp("");
      toast.success("Email verified successfully!");
    }
  }, [otpVerified, otpError]);

  // Handle OTP errors
  useEffect(() => {
    if (otpError) {
      toast.error(otpError);
      if (otpError.includes("Invalid OTP")) {
        setOtp("");
      }
    }
  }, [otpError]);

  // Handle admin registration success
  useEffect(() => {
    if (success && !error) {
      toast.success("Admin request submitted successfully! You will be notified once approved.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [success, error, navigate]);

  // Handle admin registration error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // Clear OTP state when email changes
    if (otpVerified || otpSent) {
      dispatch(clearOtpState());
    }
    setShowOtpField(false);
    setOtp("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailVerification = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Clear previous OTP state
    dispatch(clearOtpState());
    
    // Send OTP
    dispatch(sendOtp({ email }));
  };

  const handleOtpChange = (value) => {
    // Only allow numeric input and limit to 6 digits
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 6);
    setOtp(numericValue);

    // Fire event when 6th digit is filled
    if (numericValue.length === 6) {
      verifyOtpCode(numericValue);
    }
  };

  const verifyOtpCode = async (otpValue) => {
    dispatch(verifyOtp({ email, otp: otpValue }));
  };

  const handleResendOtp = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
      setOtp("");
      dispatch(sendOtp({ email }));
    }
  };

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (showOtpField && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => {
          if (timer <= 1) {
            setCanResend(true);
            return 0;
          }
          return timer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpField, timer]);

  const handleAdminRequest = () => {
    if (!otpVerified) {
      toast.error("Please verify your email first");
      return;
    }

    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Send admin registration request
    dispatch(adminRegister({ 
      email, 
      password, 
      fullName: fullName.trim() 
    }));
  };

  const handleBackToAdminLogin = () => {
    navigate("/admin-login");
  };

  // Clean up OTP state on component unmount
  useEffect(() => {
    return () => {
      dispatch(clearOtpState());
    };
  }, [dispatch]);

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="admin-form-container">
          <Row>
            <Col xs={24}>
              <p 
                className="back-link"
                onClick={handleBackToAdminLogin}
              >
                <LeftOutlined /> Back to Admin Login
              </p>
            </Col>
          </Row>
          <Row className="login-section">
            <Col xs={24}>
              <h2 className="login-main-title">Admin Registration</h2>
            </Col>
            <Col xs={24}>
              <h3 className="login-subtitle">
                Request admin access for your account
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
                onFinish={handleAdminRequest}
              >
                <Form.Item
                  label="Full Name *"
                  className="login-label"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your full name",
                    },
                  ]}
                >
                  <Input
                    className="input-box"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={handleFullNameChange}
                  />
                </Form.Item>

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
                  <Space.Compact style={{ width: '100%' }}>
                    <Input
                      className="input-box email-input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      prefix={<MailOutlined />}
                      disabled={otpVerified}
                    />
                    <Button
                      className={`verify-button ${otpVerified ? 'verified' : ''}`}
                      type={otpVerified ? "primary" : "default"}
                      loading={otpLoading}
                      onClick={handleEmailVerification}
                      icon={otpVerified ? <CheckOutlined /> : null}
                      disabled={otpVerified}
                    >
                      {otpVerified ? 'Verified' : 'Verify'}
                    </Button>
                  </Space.Compact>
                </Form.Item>

                {/* OTP Field */}
                {showOtpField && (
                  <Form.Item
                    label="Enter 6-digit OTP *"
                    className="login-label"
                  >
                    <Input
                      className="input-box otp-input"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => handleOtpChange(e.target.value)}
                      maxLength={6}
                      loading={otpLoading}
                      style={{
                        textAlign: 'center',
                        fontSize: '18px',
                        letterSpacing: '8px',
                        fontWeight: 'bold'
                      }}
                    />
                    <div className="otp-footer">
                      <span 
                        className={`resend-text ${canResend ? 'active' : 'inactive'}`}
                        onClick={handleResendOtp}
                      >
                        Resend OTP
                      </span>
                      <span className="timer-text">
                        {timer > 0 ? `${timer}s` : ''}
                      </span>
                    </div>
                  </Form.Item>
                )}

                <Form.Item
                  label="Password *"
                  className="login-label"
                  rules={[
                    { required: true, message: "Please input your password!" },
                    { min: 6, message: "Password must be at least 6 characters long!" }
                  ]}
                >
                  <Input.Password
                    className="input-box"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm Password *"
                  className="login-label"
                  rules={[
                    { required: true, message: "Please confirm your password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    className="input-box"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>

                <Form.Item>
                  <Button 
                    htmlType="submit" 
                    block 
                    className={`login-button ${!otpVerified ? 'disabled' : ''}`}
                    disabled={!otpVerified || loading}
                    loading={loading}
                  >
                    <b>Raise Admin Request</b>
                  </Button>
                </Form.Item>
              </Form>
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

export default AdminRegister; 