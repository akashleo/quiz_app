import React, { useEffect, useState } from "react";
import LeftMenu from "../../components/LeftMenu";
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
import { updateAnswer } from "../../store/slices/answer/AnswerAction";
import { useDispatch, useSelector } from "react-redux";
import questionmark from "../../assests/questionmark.png";
import Navbar from "../../components/Navbar";

const AnsweringPanel = () => {
  const [answer, setAnswer] = useState({});
  const [current, setCurrent] = useState(1);
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const { questions, displayQuestion } = useSelector((state) => state.question);
  const { singleTopic, topicQuestions } = useSelector((state) => state.topic);
  const { currentUserAnswer } = useSelector((state) => state.answer);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    //setValue(e.target.value);
  };

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchQuestionById(topicQuestions[0]));
    console.log(singleTopic, topicQuestions);
  }, []);

  const nextQuestion = () => {
    if (current < topicQuestions.length) {
      dispatch(fetchQuestionById(topicQuestions[current]));
      setCurrent(current + 1);
      setAnswer({})
    } else showModal();
  };

  const storeAnswer = (event) => {
    const answerTemp = JSON.parse(JSON.stringify(currentUserAnswer.answers));
    const currentAns = { [displayQuestion?._id]: event.target.value };
    const updatedAns = { ...answerTemp, ...currentAns };
    setAnswer({ ...answerTemp, ...currentAns })
    dispatch(updateAnswer({id: currentUserAnswer._id, body: {...currentUserAnswer,answers: updatedAns}}));
    
  };

  return (
    <>
      <Navbar />
      <Row style={{ height: "88vh", marginTop: "12vh" }}>
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
                <Timer duration={2} />
              </div>
            </div>
            <h5 className="answering-header">answer the question below</h5>
            <>
              <Row>
                <Col span={12} style={{ textAlign: "left" }}>
                  <Image
                    preview={false}
                    src={
                      displayQuestion?.image
                        ? displayQuestion?.image
                        : questionmark
                    }
                    className="question-image"
                  />
                </Col>
                <Col span={12} className="details">
                  <h3>
                    Question {current}/{topicQuestions?.length}
                  </h3>
                  <br />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: displayQuestion?.questionText,
                    }}
                  ></div>
                </Col>
              </Row>
              <div style={{ padding: "20px" }} className="radio-options">
                <h3>Choose Answer</h3>
                <Radio.Group
                  onChange={storeAnswer}
                  value={
                    answer[displayQuestion?._id]
                      ? answer[displayQuestion?._id]
                      : null
                  }
                >
                  <Space direction="vertical">
                    {displayQuestion?.options?.map((option) => {
                      return (
                        <Radio value={option.id}>
                          {" "}
                          <div
                            dangerouslySetInnerHTML={{ __html: option.text }}
                          ></div>
                        </Radio>
                      );
                    })}
                  </Space>
                </Radio.Group>
              </div>
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Button
                    className="start-button"
                    onClick={() => nextQuestion()}
                  >
                    {current === topicQuestions.length
                      ? "Submit"
                      : "Next Question"}
                  </Button>
                </Col>
              </Row>
            </>
          </div>
        </Col>
        {open && <ConfirmModal open={open} setOpen={setOpen} />}
      </Row>
    </>
  );
};

export default AnsweringPanel;
