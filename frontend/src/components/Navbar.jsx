import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Input, Button, Avatar, Row, Col } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import SuccessModal from "./SuccessModal";
import "./components.css";

const { Header } = Layout;
// const { Search } = Input;

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };
  const startQuiz = () => {
    navigate("/answer")
  }
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
          <Button type="primary" shape="round" className="start-button" onClick={startQuiz}>
            Start Quiz
          </Button>
        </Col>
        <Col span={4} style={{ textAlign: "right" }}>
          <Avatar icon={<UserOutlined />} />
        </Col>
      </Row>
      {open && <SuccessModal open={open} setOpen={setOpen} />}
    </Header>
  );
};

export default Navbar;
