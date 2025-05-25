import React, { useState } from "react";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Row, Col, Radio, Image, Space, Button } from "antd";
import "./ReviewPanel.css";
import qstn from "../../assests/qstn.jpg";
import Navbar from "../../components/Navbar";

const ReviewPanel = () => {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <Navbar />
      <Row style={{ height: "88vh", marginTop: "12vh" }}>
        <Col span={24}>
          <div className="description">
            <div className="heading">
              <h1 className="answering-header">History Quiz</h1>
              <div className="review-status">
                <h3>Score: 80%</h3>
                <h3>4/5 Correct</h3>
              </div>
            </div>
            <h5 className="answering-header">Review your answers below</h5>
            <Row>
              <Col xs={24} md={12}>
                <Image src={qstn} className="question-image" preview={false} />
              </Col>
              <Col xs={24} md={12} className="details">
                <h3>Question 1/5</h3>
                <br />
                <p>
                  Guy Bailey, Roy Hackett and Paul Stephenson made history in
                  1963, as part of a protest against a bus company that refused to
                  employ black and Asian drivers in which UK city?
                </p>
              </Col>
            </Row>
            <div className="radio-options">
              <h3>Your Answer</h3>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical" className="review-options">
                  <Radio value={1}>
                    Option A{" "}
                    <span className="answer-status correct">
                      <CheckCircleOutlined /> Correct
                    </span>
                  </Radio>
                  <Radio value={2}>Option B</Radio>
                  <Radio value={3}>
                    Option C{" "}
                    <span className="answer-status wrong">
                      <CloseCircleOutlined /> Wrong
                    </span>
                  </Radio>
                  <Radio value={4}>Option D</Radio>
                </Space>
              </Radio.Group>
            </div>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button className="review-nav-button prev-button">
                  Previous Question
                </Button>
                <Button className="review-nav-button next-button">
                  Next Question
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ReviewPanel;
