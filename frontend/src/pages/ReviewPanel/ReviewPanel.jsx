import React, { useState } from "react";
import { CloseCircleOutlined, CheckCircleOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Row, Col, Radio, Image, Space, Button, Progress } from "antd";
import "./ReviewPanel.css";
import questionmark from "../../assets/questionmark.png";
import Navbar from "../../components/Navbar";

const ReviewPanel = () => {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className="review-panel-container">
      <Navbar />
      <div className="review-content">
        <div className="review-card">
          <div className="review-header">
            <div className="quiz-title">
              <h1>History Quiz</h1>
              <p className="question-counter">Question 1 of 5</p>
            </div>
            <div className="score-display">
              <Progress type="circle" percent={80} width={80} />
              <div className="score-details">
                <h3>4/5 Correct</h3>
                <p>Great progress!</p>
              </div>
            </div>
          </div>

          <div className="question-section">
            <Row gutter={[24, 24]} align="stretch">
              <Col xs={24} md={12} className="image-container">
                <Image
                  src={questionmark}
                  className="question-image"
                  preview={false}
                  alt="Question related image"
                />
              </Col>
              <Col xs={24} md={12} className="question-content">
                <div className="question-text">
                  <h2>Question</h2>
                  <p>
                    Guy Bailey, Roy Hackett and Paul Stephenson made history in
                    1963, as part of a protest against a bus company that refused to
                    employ black and Asian drivers in which UK city?
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="answer-section">
            <h3>Your Answer</h3>
            <Radio.Group onChange={onChange} value={value} className="answer-group">
              <Space direction="vertical" className="review-options">
                <Radio value={1} className="option-card correct">
                  <span className="option-text">Option A</span>
                  <span className="answer-status">
                    <CheckCircleOutlined /> Correct
                  </span>
                </Radio>
                <Radio value={2} className="option-card">
                  <span className="option-text">Option B</span>
                </Radio>
                <Radio value={3} className="option-card wrong">
                  <span className="option-text">Option C</span>
                  <span className="answer-status">
                    <CloseCircleOutlined /> Wrong
                  </span>
                </Radio>
                <Radio value={4} className="option-card">
                  <span className="option-text">Option D</span>
                </Radio>
              </Space>
            </Radio.Group>
          </div>

          <div className="navigation-controls">
            <Button className="nav-button prev-button" icon={<LeftOutlined />}>
              Previous
            </Button>
            <Button className="nav-button next-button" icon={<RightOutlined />}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPanel;
