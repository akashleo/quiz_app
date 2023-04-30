import React, { useState } from "react";
import LeftMenu from "../../components/LeftMenu";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Row, Col, Radio, Image, Space, Button } from "antd";
import "./ReviewPanel.css";
import qstn from "../../assests/qstn.jpg";

const ReviewPanel = () => {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Row style={{ height: "90vh", marginTop: "12vh" }}>
      <Col span={6}>
        <LeftMenu />
      </Col>
      <Col span={18}>
        <div className="description">
          <h1>History Quiz</h1>
          <h5>Answer the question below</h5>
          <Row>
            <Col span={12}>
              <Image src={qstn} className="question-image" />
            </Col>
            <Col span={12} className="details">
              <h3>Question 1/5</h3>
              <br />
              <p>
                Guy Bailey, Roy Hackett and Paul Stephenson made history in
                1963, as part of a protest against a bus company that refused to
                employ black and Asian drivers in which UK city?
              </p>
            </Col>
          </Row>
          <div style={{ padding: "20px" }}>
            <h3>Choose Answer</h3>
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value={1}>Option A <span className="answer-status"> <b>Correct &nbsp; <CheckCircleOutlined /></b></span></Radio>
                <Radio value={2}>Option B</Radio>
                <Radio value={3}>Option C <span className="answer-status"> <b>Wrong &nbsp; <CloseCircleOutlined /></b> </span></Radio>
                <Radio value={4}>Option C</Radio>
              </Space>
            </Radio.Group>
          </div>
          <Row>
            <Col span={24} style={{textAlign: "right"}}>
              <Button className="start-button">Next Question</Button>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ReviewPanel;
