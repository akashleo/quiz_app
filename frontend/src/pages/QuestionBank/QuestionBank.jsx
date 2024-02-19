import React, { useEffect, useState } from "react";
import { Row, Col, Button, Switch, TreeSelect } from "antd";
import {
  TableOutlined,
  IdcardOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import QuestionCard from "./QuestionCard";
import AddQuestion from "./AddQuestion";
import QuestionList from "./QuestionList";
import "./questions.css";
import {
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} from "../../store/slices/question/QuestionAction";
import { getAllTopics, addTopic } from "../../store/slices/topic/TopicAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddTopic from "./AddTopic";
import TopicList from "./TopicsList";
import { Tabs } from "antd";
import LoadQuestionsModal from "./LoadQuestionsModal";
import "./questions.css";
import TopicCard from "./TopicCard";

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
  const [showTopicsList, setShowTopicsList] = useState(false);
  const [loadModal, setLoadModal] = useState(false);
  const [tableView, setTableView] = useState(false);

  const handleOk = () => {
    setAddQuestionModal(false);
  };

  const handleTopicModalClose = () => {
    setShowTopicsList(false);
  };

  const handleLoadModalClose = () => {
    setLoadModal(false);
  };

  const openQuestionModal = () => {
    setAddQuestionModal(true);
  };

  const openTopicList = () => {
    setShowTopicsList(true);
  };

  const onChange = (event) => {
    if (event) {
      setTableView(true);
    } else {
      setTableView(false);
    }
  };

  const updateQuestionState = (id, payload) => {
    const temp = { id: id, body: payload };
    dispatch(updateQuestion(temp));
  };

  const questionJSX = (
    <>
      {tableView ? (
        <Row gutter={[16, 16]}>
          <QuestionList
            questions={questions}
            updateQuestionState={updateQuestionState}
          />
        </Row>
      ) : (
        <Row gutter={[16, 16]}>
          {questions?.map((question, index) => (
            <Col span={8} key={index}>
              <QuestionCard
                question={question}
                updateQuestionState={updateQuestionState}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );

  const topicJSX = (
    <>
      {tableView ? (
        <TopicList
          topics={topics}
          showTopicsList={showTopicsList}
          setShowTopicsList={setShowTopicsList}
          handleOk={handleTopicModalClose}
          updateQuestionState={updateQuestionState}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {topics?.map((topic, index) => (
            <Col span={8} key={index}>
              <TopicCard
                {...topic}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );

  const onTabChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Question",
      children: questionJSX,
    },
    {
      key: "2",
      label: "Topics",
      children: topicJSX,
    },
  ];

  return (
    <div className="question-bank">
      <Row className="title-line">
        <Col span={4}>
          <h2 className="pop-font">Question Bank</h2>
        </Col>
        <Col span={6}>
          <Switch
            className="pop-font"
            style={
              tableView
                ? { backgroundColor: "#d3e39a" }
                : { backgroundColor: "#e39a9c" }
            }
            checkedChildren={
              <b style={{ color: "black" }}>
                <TableOutlined />
                &nbsp;Table View
              </b>
            }
            unCheckedChildren={
              <b style={{ color: "black" }}>
                <IdcardOutlined />
                &nbsp;Card View
              </b>
            }
            value={tableView}
            onChange={(event) => onChange(event)}
            size="large"
          />
        </Col>
        <Col span={14} className="text-right">
          <Button
            disabled={addQuestionModal ? true : false}
            onClick={() => navigate("/question/archive")}
            className="action-button"
          >
            Archive
          </Button>
          <Button
            disabled={loadModal ? true : false}
            onClick={() => setLoadModal(true)}
            className="action-button"
          >
            Load Questions
          </Button>
          <Button
            disabled={addQuestionModal ? true : false}
            onClick={() => navigate("/dashboard")}
            className="action-button"
          >
            Dashboard
          </Button>
          {/* <Button
            disabled={showTopicsList ? true : false}
            onClick={openTopicList}
            className="action-button"
          >
            Topics
          </Button> */}
          <Button
            disabled={addQuestionModal ? true : false}
            onClick={openQuestionModal}
            className="action-button"
          >
            Add Question
          </Button>
        </Col>
      </Row>
      <Tabs defaultActiveKey="1" items={items} onChange={onTabChange} />

      {addQuestionModal && (
        <AddQuestion
          topics={topics}
          addQuestionModal={addQuestionModal}
          setAddQuestionModal={setAddQuestionModal}
          handleOk={handleOk}
        />
      )}

      {loadModal && (
        <LoadQuestionsModal
          topics={topics}
          loadModal={loadModal}
          setLoadModal={setLoadModal}
          handleOk={handleLoadModalClose}
        />
      )}
    </div>
  );
};

export default QuestionBank;
