import React, { useEffect, useState } from "react";
import { Row, Col, Button, Switch } from "antd";
import { TableOutlined, IdcardOutlined } from "@ant-design/icons";
import QuestionCard from "./QuestionCard";
import AddQuestion from "./AddQuestion";
import QuestionList from "./QuestionList";
import "./questions.css";
import { getAllQuestions } from "../../store/slices/question/QuestionAction";
import { getAllTopics, addTopic } from "../../store/slices/topic/TopicAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const QuestionBank = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questions } = useSelector((state) => state.question);
  const { topics } = useSelector((state) => state.topic);

  useEffect(() => {
    if (questions?.length <= 0) dispatch(getAllQuestions());
    if (topics?.length <= 0) dispatch(getAllTopics());
  }, []);

  const [addQuestionModal, setAddQuestionModal] = useState(false);
  const [tableView, setTableView] = useState(false);

  const handleOk = () => {
    setAddQuestionModal(false);
  };

  const openModal = () => {
    setAddQuestionModal(true);
  };

  const onChange = (event) => {
    console.log(event);
    if (event) {
      setTableView(true);
    } else {
      setTableView(false);
    }
  };

  return (
    <div className="question-bank">
      <Row className="title-line">
        <Col span={8}>
          <h2>Question Bank</h2>
        </Col>
        <Col span={8} className="text-right">
          <Switch
            checkedChildren={<TableOutlined />}
            unCheckedChildren={<IdcardOutlined />}
            value={tableView}
            onChange={(event) => onChange(event)}
          />
        </Col>
        <Col span={8} className="text-right">
          <Button
            disabled={addQuestionModal ? true : false}
            onClick={() => navigate("/dashboard")}
            className="action-button"
          >
            Dashboard
          </Button>
          <Button
            disabled={addQuestionModal ? true : false}
            onClick={openModal}
            className="action-button"
          >
            Add Topic
          </Button>
          <Button
            disabled={addQuestionModal ? true : false}
            onClick={openModal}
            className="action-button"
          >
            Add Question
          </Button>
        </Col>
      </Row>
      {tableView ? (
        <Row gutter={[16, 16]}>
         <QuestionList questions={questions}/>
        </Row>
      ) : (
        <Row gutter={[16, 16]}>
          {questions?.map((question, index) => (
            <Col span={8} key={index}>
              <QuestionCard question={question} />
            </Col>
          ))}
        </Row>
      )}
      {addQuestionModal && (
        <AddQuestion
          topics={topics}
          addQuestionModal={addQuestionModal}
          setAddQuestionModal={setAddQuestionModal}
          handleOk={handleOk}
        />
      )}
    </div>
  );
};

export default QuestionBank;
