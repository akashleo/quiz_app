import React from "react";

import { Row, Col, Form, Input, Button } from "antd";
import {
  LeftOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

import "./Login.css";

const Login = () => {
  const [form] = Form.useForm();
  return (
    <Row style={{ height: "100vh", marginTop: "12vh" }}>
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
              <h2>Login to your Account</h2>
            </Col>
            <Col span={24}>
              <h5>with your registered Email Address</h5>
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
              >
                <Form.Item label="Username">
                  <Input className="input-box" placeholder="Enter your username" />
                </Form.Item>
                <Form.Item label="Password">
                  <Input.Password
                  className="input-box"
                    placeholder="Password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Form.Item>
                  <Button block className="login-button"><b>Login</b></Button>
                </Form.Item>
              </Form>
              <Col span={24} style={{ textAlign: "center" }}>
                <p style={{ margin: "0px auto" }}>OR</p>
              </Col>
              <br/>
              <Col span={24} style={{ padding: "0px 150px"}}>
                <Button  block className="google-button">
                  <GoogleOutlined /> &nbsp; &nbsp;<b>Login with google</b>
                </Button>
              </Col>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
