import React, { useEffect, useState } from "react";
//import { LogoutOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { setResponsedata } from "../../store/slices/auth/AuthSlice";

import {
  LeftOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

import { Row, Col, Form, Input, Button } from "antd";
import { login } from "../../store/slices/auth/AuthActions";
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";

import "./Login.css";

const Login = () => {

  const { tokenValidity, responseData
  } = useSelector((state) => state.auth)

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginFn = ()=>{
    console.log(username, password);
    dispatch(login({username, password}));
  }

  const handleNameChange = (event) =>{
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) =>{
    setPassword(event.target.value);
  }

  useEffect(()=>{
    if(tokenValidity===true){
      navigate("/dashboard")
    }
  },[tokenValidity])

  useEffect(()=>{
    if(responseData==="Invalid User"){
    toast.error('User does not exist');
    setResponsedata(null)
    }
  },[responseData])


  return (
    <Row style={{ height: "100vh" }}>
      <Col span={10}>
        <div
          style={{ width: "100%", height: "100%" }}
          className="cover-image-left"
        ></div>
      </Col>
      <Col span={14}>
        <div className="cover-bg-right">
          <Row>
            <Col span={24}>
              <p>
                <LeftOutlined /> Back
              </p>
            </Col>
          </Row>
          <Row className="login-section">
            <Col span={24}>
              <h2 className="login-text">Login to your Account</h2>
            </Col>
            <Col span={24}>
              <h5 className="login-text-2">
                with your registered Email Address
              </h5>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form
                layout={"vertical"}
                form={form}
                initialValues={{ layout: "vertical" }}
                //onValuesChange={onFormLayoutChange}
                style={{ margin: "0px 150px" }}
                onFinish={loginFn}
              >
                <Form.Item
                  label="Username *"
                  className="login-label"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    className="input-box"
                    placeholder="Enter your username"
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
              <Col span={24} style={{ textAlign: "center" }}>
                <p style={{ margin: "0px auto" }}>OR</p>
              </Col>
              <br />
              <Col span={24} style={{ padding: "0px 150px" }}>
                <Button block className="google-button" onClick={()=>navigate('/dashboard')}>
                  <GoogleOutlined /> &nbsp; &nbsp;<b>Login with google</b>
                </Button>
              </Col>
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
      theme="dark"/>
    </Row>
  );
};

export default Login;
