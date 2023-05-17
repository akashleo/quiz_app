import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal } from "antd";
import QuestionCard from "./QuestionCard";
import AddQuestion from "./AddQuestion";
import "./questions.css";

import {
  getAllQuestions,
  addQuestion,
} from "../../store/slices/question/QuestionAction";
import { useDispatch, useSelector } from "react-redux";

const QuestionBank = () => {
  const dispatch = useDispatch();

  const { questions } = useSelector((state) => state.question);

  useEffect(() => {
    if (questions.length <= 0) dispatch(getAllQuestions());
  }, []);

  const [addQuestion, setAddQuestion] = useState(false);

  const handleOk = () => {
    setAddQuestion(false);
  };

  const openModal = () => {
    setAddQuestion(true);
  };

  return (
    <div className="question-bank">
      <Row className="title-line">
        <Col span={8}>
          <h2>Question Bank</h2>
        </Col>
        <Col span={10} className="text-right">
          Filters
        </Col>
        <Col span={6} className="text-right">
          <Button disabled={addQuestion ? true : false} onClick={openModal}>
            Add Topic
          </Button>
          <Button disabled={addQuestion ? true : false} onClick={openModal}>
            Add Question
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {questions?.map((question, index) => (
          <Col span={8} key={index}>
            <QuestionCard question={question} />
          </Col>
        ))}
      </Row>
      {addQuestion && (
        <AddQuestion
          addQuestion={addQuestion}
          setAddQuestion={setAddQuestion}
          handleOk={handleOk}
        />
      )}
    </div>
  );
};

export default QuestionBank;
