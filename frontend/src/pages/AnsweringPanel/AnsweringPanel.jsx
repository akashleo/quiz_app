import React, { useState } from "react";
import LeftMenu from "../../components/LeftMenu";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Row, Col, Radio, Image, Space, Button } from "antd";
import "./AnsweringPanel.css";
import qstn from "../../assests/qstn.jpg";
import ConfirmModal from "../../components/ConfirmModal";
import Timer from "../../components/Timer";

const AnsweringPanel = () => {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Row style={{ height: "90vh", marginTop: "12vh" }}>
        <Col span={6}>
          <LeftMenu />
        </Col>
        <Col span={18}>
          <div className="description">
            <div className="heading">
              <h1>History Quiz</h1>
              <div className="timer-clock">
                <ClockCircleOutlined />
                &nbsp;
                <Timer />
              </div>
            </div>
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
                  1963, as part of a protest against a bus company that refused
                  to employ black and Asian drivers in which UK city?
                </p>
              </Col>
            </Row>
            <div style={{ padding: "20px" }}>
              <h3>Choose Answer</h3>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={1}>Option A</Radio>
                  <Radio value={2}>Option B</Radio>
                  <Radio value={3}>Option C</Radio>
                  <Radio value={4}>Option C</Radio>
                </Space>
              </Radio.Group>
            </div>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button className="start-button" onClick={showModal}>
                  Next Question
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
        {open && <ConfirmModal open={open} setOpen={setOpen} />}
      </Row>
    </>
  );
};

export default AnsweringPanel;
