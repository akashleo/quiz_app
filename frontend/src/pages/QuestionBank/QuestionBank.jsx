import React, { useEffect, useState } from "react";
import { Row, Col, Button, Switch } from "antd";
import { TableOutlined, IdcardOutlined } from "@ant-design/icons";
import QuestionCard from "./QuestionCard";
import AddQuestion from "./AddQuestion";
import QuestionList from "./QuestionList";
import "./questions.css";
import { getAllQuestions, updateQuestion, deleteQuestion } from "../../store/slices/question/QuestionAction";
import { getAllTopics, addTopic } from "../../store/slices/topic/TopicAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddTopic from "./AddTopic";

const QuestionBank = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questions, singleQuestion } = useSelector((state) => state.question);
  const { topics } = useSelector((state) => state.topic);

  useEffect(() => {
    if (questions?.length <= 0) dispatch(getAllQuestions());
    if (topics?.length <= 0) dispatch(getAllTopics());
  }, []);


  const [addQuestionModal, setAddQuestionModal] = useState(false);
  const [addTopicModal, setAddTopicModal] = useState(false);
  const [tableView, setTableView] = useState(false);

  const handleOk = () => {
    setAddQuestionModal(false);
  };

  const handleTopicModalClose = () => {
    setAddTopicModal(false);
  };

  const openQuestionModal = () => {
    setAddQuestionModal(true);
  };

  const openTopicModal = () => {
    setAddTopicModal(true);
  };

  const onChange = (event) => {
    console.log(event);
    if (event) {
      setTableView(true);
    } else {
      setTableView(false);
    }
  };

  const updateQuestionState = (id, payload) =>{
    const temp = {"id": id, "body":payload}
    dispatch(updateQuestion(temp));
  }


  return (
    <div className="question-bank">
      <Row className="title-line">
        <Col span={4}>
          <h2>Question Bank</h2>
        </Col>
        <Col span={9} >
          <Switch
            checkedChildren={<TableOutlined />}
            unCheckedChildren={<IdcardOutlined />}
            value={tableView}
            onChange={(event) => onChange(event)}
          />
        </Col>
        <Col span={11} className="text-right">
        <Button
            disabled={addQuestionModal ? true : false}
            onClick={() => navigate("/question/archive")}
            className="action-button"
          >
            Archive
          </Button>
          <Button
            disabled={addQuestionModal ? true : false}
            onClick={() => navigate("/dashboard")}
            className="action-button"
          >
            Dashboard
          </Button>
          <Button
            disabled={addTopicModal ? true : false}
            onClick={openTopicModal}
            className="action-button"
          >
            Add Topic
          </Button>
          <Button
            disabled={addQuestionModal ? true : false}
            onClick={openQuestionModal}
            className="action-button"
          >
            Add Question
          </Button>
        </Col>
      </Row>
      {tableView ? (
        <Row gutter={[16, 16]}>
          <QuestionList questions={questions} />
        </Row>
      ) : (
        questions &&
        <Row gutter={[16, 16]}>
          {questions?.map((question, index) => (
            <Col span={8} key={index}>
              <QuestionCard question={question} updateQuestionState={updateQuestionState}/>
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

      {addTopicModal && (
        <AddTopic
          topics={topics}
          addTopicModal={addTopicModal}
          setAddTopicModal={setAddTopicModal}
          handleOk={handleTopicModalClose}
        />
      )}
    </div>
  );
};

export default QuestionBank;
