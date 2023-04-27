import { Layout, Input, Button, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./components.css";

const { Header } = Layout;
const { Search } = Input;

const Navbar = () => {
  return (
    <Header className="navbar">
      <Row>
        <Col
          span={4}
          className="quiz-logo"
        >
          Quiz Game
        </Col>
        <Col span={8} className="searchbar" >
          <Search placeholder="Search" style={{ width: 300 }} />
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <Button type="primary" shape="round" className="start-button">
            Start Quiz
          </Button>
        </Col>
        <Col span={4} style={{ textAlign: "right" }}>
          <Avatar icon={<UserOutlined />} />
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
