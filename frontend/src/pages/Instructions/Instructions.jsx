import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { Row, Col, Button, Image } from "antd";
import "./Instructions.css";
import qstn from "../../assests/qstn.jpg";
import Navbar from "../../components/Navbar";

const Instructions = () => {
  return (
    <>
      <Navbar />
      <Row style={{ height: "88vh", marginTop: "12vh" }}>
        <Col span={24}>
          <div className="description">
            <h1>History Quiz</h1>
            <h5>Read the following instructions</h5>
            <Row>
              <Col xs={24} md={12}>
                <Image src={qstn} className="question-image"/>
              </Col>
              <Col xs={24} md={12} className="details">
                <h4>Date: 11/12/22</h4>
                <h4>Time limit: 30mins</h4>
                <h4>Attempts: 2nd</h4>
                <h4>Points: 30pts</h4>
              </Col>
            </Row>
            <div>
              <h3>Instructions</h3>
              <p>
                This quiz consists of 5 multiple-choice questions. To be
                successful with the quizzes, it's important to be conversant with the
                topics. Keep the following in mind:
              </p>
              <p>
                Timing - You need to complete each of your attempts in one
                sitting, as you are allotted 30 minutes to each attempt. Answers -
                You may review your answer-choices and compare them to the correct
                answers after your final attempt.
              </p>
              <p>
                To start, click the "Start" button. When finished, click the
                "Submit" button.
              </p>
            </div>
            <Row>
              <Col span={24} style={{textAlign: "right"}}>
                <Button className="start-button">Start&nbsp;<RightOutlined /></Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Instructions;
