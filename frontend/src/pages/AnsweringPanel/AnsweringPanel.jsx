import React, { useEffect, useState } from "react";
import LeftMenu from "../../components/LeftMenu";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Row, Col, Radio, Image, Space, Button } from "antd";
import "./AnsweringPanel.css";
import qstn from "../../assests/qstn.jpg";
import ConfirmModal from "../../components/ConfirmModal";
import Timer from "../../components/Timer";
import { getAllQuestions } from "../../store/slices/question/QuestionAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import questionmark from "../../assests/questionmark.png";

const AnsweringPanel = () => {
  const [answer, setAnswer] = useState({});
  const [current, setCurrent] = useState(1);
  const [displayQuestion, setDisplayQuestion] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions } = useSelector((state) => state.question);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    //setValue(e.target.value);
  };

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getAllQuestions());
  }, []);
  useEffect(() => {
    setDisplayQuestion(questions[current - 1]);
  }, [questions]);

  const nextQuestion = () => {
    if (current < questions.length) {
      setCurrent(current + 1);
      setDisplayQuestion(questions[current - 1]);
    } else showModal();
  };

  const storeAnswer = (event) =>{
    const answerTemp = JSON.parse(JSON.stringify(answer));
    const currentAns =  {[displayQuestion?._id]: event.target.value};
    setAnswer({...answerTemp, ...currentAns})
  }

  return (
    <>
      <Row style={{ height: "90vh", marginTop: "2vh" }}>
        <Col span={6}>
          <LeftMenu />
        </Col>
        <Col span={18}>
          <div className="description">
            <div className="heading">
              <h1 className="answering-header">History Quiz</h1>
              <div className="timer-clock">
                <ClockCircleOutlined />
                &nbsp;
                <Timer />
              </div>
            </div>
            <h5 className="answering-header">answer the question below</h5>
            <Row>
              <Col
                span={12}
                style={{ textAlign: "center"}}
              >
                <Image
                  preview={false}
                  src={displayQuestion?.image?displayQuestion?.image:questionmark}
                  className="question-image"
                />
              </Col>
              <Col span={12} className="details">
                <h3>
                  Question {current}/{questions?.length}
                </h3>
                <br />
                <p>{displayQuestion?.questionText}</p>
              </Col>
            </Row>
            <div style={{ padding: "20px" }} className="radio-options">
              <h3>Choose Answer</h3>
              <Radio.Group onChange={storeAnswer} value={answer[displayQuestion?._id]? answer[displayQuestion?._id]: null}>
                <Space direction="vertical">
                  {displayQuestion?.options?.map((option) => {
                    return <Radio value={option.id}>{option.text}</Radio>;
                  })}
                </Space>
              </Radio.Group>
            </div>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button className="start-button" onClick={nextQuestion}>
                  {current === questions.length
                    ? "Submit"
                    : "Next Question"}
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
