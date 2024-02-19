// Import necessary React and Ant Design components
import React from "react";
import { Row, Col, Card, Image } from "antd";
import "./Topics.css";
import subject from "../../assests/qbg2.jpg";
import { CheckCircleOutlined } from "@ant-design/icons"; 

// Define your TopicCard
const TopicCard = ({
  available,
  code,
  createdAt,
  instructions,
  maxAttempts,
  name,
  points,
  questions,
  timeLimit,
  selectedTopic,
  setSelectedTopic
}) => {


  return (
    <Col span={8} >
      <Card
        //className={item._id === selectedTopic ? "select-topic" : "topic-card"}
        key={code}
        id="topic-card"
        onClick={() => setSelectedTopic(code)}
      >
        <div className="topic-card-select"  style={code===selectedTopic ? {borderBottom: "15px solid #131313"}: {border: "none"}}>
        <Row>
          <Col span={20} >
            <strong>Code:</strong> {code}
          </Col>
          <Col span={4}>
          {selectedTopic === code &&
       <CheckCircleOutlined className="select-emoji"/>}
          </Col>
        </Row>
        <Row>
          <Col span={24} className="topic-card-label">
            {" "}
            <strong>Name:</strong> {name}
          </Col>
        </Row>
        <Row>
          <Col span={24} className="topic-card-label">
            {" "}
            <strong>Instructions:</strong> {instructions?.length>40? `${instructions.slice(0, 40)}...` : instructions}
          </Col>
        </Row>
        <Row>
          <Col span={24} >
            {" "}
            <strong>Points:</strong> {points}
          </Col>
        </Row>
        
        </div>
      </Card>
    </Col>
  );
};

export default TopicCard;
