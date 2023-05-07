import React, {useState} from "react";
import { Layout, Input, Button, Avatar, Row, Col } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import ConfirmModal from "./ConfirmModal";
import "./components.css";

const { Header } = Layout;
// const { Search } = Input;

const Navbar = () => {

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  return (
    <Header className="navbar sticky">
      <Row>
        <Col span={4} className="quiz-logo">
          Quiz Game
        </Col>
        <Col span={8} className="searchbar">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="search"
          />
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <Button type="primary" shape="round" className="start-button" onClick={showModal}>
            Start Quiz
          </Button>
        </Col>
        <Col span={4} style={{ textAlign: "right" }}>
          <Avatar icon={<UserOutlined />} />
        </Col>
      </Row>
      {open && <ConfirmModal open={open} setOpen={setOpen} />}
    </Header>
  );
};

export default Navbar;
