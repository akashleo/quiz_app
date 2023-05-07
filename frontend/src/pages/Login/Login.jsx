import React from "react";
//import { LogoutOutlined } from "@ant-design/icons";
import { Row, Col, Menu, Image } from "antd";
import "./Login.css";
import loginpic from "../../assests/loginpic2.png";

const Login = () => {
  return (
    <Row style={{ height: "90vh" }}>
      <Col span={12} className="loginpic">
        {/* <Image src={loginpic} className="loginpic"/>  */}
      </Col>
      <Col span={12}>

      </Col>
    </Row>
  );
};

export default Login;
