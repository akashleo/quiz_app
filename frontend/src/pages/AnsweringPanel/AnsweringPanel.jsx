import React, { useEffect, useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Row, Col, Radio, Image, Space, Button } from "antd";
import "./AnsweringPanel.css";
import ConfirmModal from "../../components/ConfirmModal";
import Timer from "../../components/Timer";
import {
  getAllQuestions,
  fetchQuestionById,
} from "../../store/slices/question/QuestionAction";
import { setDisplayQuestion } from "../../store/slices/question/QuestionSlice";
import { updateAnswer, submitAnswer } from "../../store/slices/answer/AnswerAction";
import { useDispatch, useSelector } from "react-redux";
import questionmark from "../../assests/questionmark.png";
import Navbar from "../../components/Navbar";
import { updateAnswerMap } from "../../store/slices/answer/AnswerSlice";
import { useNavigate } from "react-router-dom";

const AnsweringPanel = () => {
  const [answer, setAnswer] = useState({});
  const [current, setCurrent] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { displayQuestion } = useSelector((state) => state.question);
  const { singleTopic, topicQuestions } = useSelector((state) => state.topic);
  const { currentUserAnswer, answerMap } = useSelector((state) => state.answer);

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(updateAnswerMap({}));
    dispatch(fetchQuestionById(topicQuestions[0]));
  }, []);

  const nextQuestion = () => {
    if (current < topicQuestions.length) {
      dispatch(fetchQuestionById(topicQuestions[current]));
      setCurrent(current + 1);
      setAnswer({});
    } else showModal();
  };

  const storeAnswer = (event) => {
    const { _id } = currentUserAnswer;
    const currentAns = { [displayQuestion?._id]: event.target.value };
    const updatedAns = { ...answerMap, ...currentAns };
    setAnswer(updatedAns);
    dispatch(updateAnswerMap(updatedAns));
    dispatch(updateAnswer({ id: _id, body: { answers: updatedAns } }));
  };

  const submitQuiz = () => {
    const { _id } = currentUserAnswer;
    setAnswer({});
    dispatch(updateAnswerMap({}));
    dispatch(submitAnswer({ id: _id, body: { submitted: true } }));
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <Row style={{ height: "88vh", marginTop: "12vh" }}>
        <Col span={24}>
          <div className="description">
            <div className="heading">
              <h1 className="answering-header">History Quiz</h1>
              <div className="timer-clock">
                <ClockCircleOutlined />
                &nbsp;
                <Timer duration={1} submitQuiz={submitQuiz} />
              </div>
            </div>
            <h5 className="answering-header">Answer the question below</h5>
            <Row>
              <Col xs={24} md={12}>
                <Image
                  preview={false}
                  src={displayQuestion?.image ? displayQuestion?.image : questionmark}
                  className="question-image"
                />
              </Col>
              <Col xs={24} md={12} className="details">
                <h3>Question {current}/{topicQuestions?.length}</h3>
                <br />
                <div dangerouslySetInnerHTML={{ __html: displayQuestion?.questionText }}></div>
              </Col>
            </Row>
            <div style={{ padding: "20px" }} className="radio-options">
              <h3>Choose Answer</h3>
              <Radio.Group
                onChange={storeAnswer}
                value={answer[displayQuestion?._id] ? answer[displayQuestion?._id] : null}
              >
                <Space direction="vertical">
                  {displayQuestion?.options?.map((option) => (
                    <Radio key={option.id} value={option.id}>
                      <div dangerouslySetInnerHTML={{ __html: option.text }}></div>
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button className="start-button" onClick={() => nextQuestion()}>
                  {current === topicQuestions.length ? "Submit" : "Next Question"}
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      {open && <ConfirmModal open={open} setOpen={setOpen} submitQuiz={submitQuiz} />}
    </>
  );
};

export default AnsweringPanel;
