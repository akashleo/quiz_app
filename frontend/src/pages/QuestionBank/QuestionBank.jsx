import React, { useEffect, useState } from "react";
import { Button, Switch } from "antd";
import {
  TableOutlined,
  IdcardOutlined,
  InboxOutlined,
  PlusOutlined,
  DashboardOutlined,
  FileSearchOutlined,
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
import TopicCard from "./TopicCard";

const ACTIONS = [
  {
    icon: <FileSearchOutlined />,
    label: 'Archive',
    onClick: (navigate) => navigate("/question/archive"),
    disabled: (state) => state.addQuestionModal
  },
  {
    icon: <InboxOutlined />,
    label: 'Load Questions',
    onClick: (_, setLoadModal) => setLoadModal(true),
    disabled: (state) => state.loadModal
  },
  {
    icon: <DashboardOutlined />,
    label: 'Dashboard',
    onClick: (navigate) => navigate("/dashboard"),
    disabled: (state) => state.addQuestionModal
  },
  {
    icon: <PlusOutlined />,
    label: 'Add Question',
    onClick: (_, __, setAddQuestionModal) => setAddQuestionModal(true),
    disabled: (state) => state.addQuestionModal
  }
];

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

  const onChange = (event) => {
    setTableView(event);
  };

  const updateQuestionState = (id, payload) => {
    const temp = { id: id, body: payload };
    dispatch(updateQuestion(temp));
  };

  const questionJSX = (
    <>
      {tableView ? (
        <QuestionList
          questions={questions}
          updateQuestionState={updateQuestionState}
        />
      ) : (
        <div className="question-grid">
          {questions?.map((question, index) => (
            <div key={index} className="question-card">
              <QuestionCard
                question={question}
                updateQuestionState={updateQuestionState}
              />
            </div>
          ))}
        </div>
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
        <div className="question-grid">
          {topics?.map((topic, index) => (
            <div key={index} className="question-card">
              <TopicCard {...topic} />
            </div>
          ))}
        </div>
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

  const state = { addQuestionModal, loadModal };

  return (
    <div className="question-bank">
      <div className="title-line">
        <div className="title-section">
          <h2 className="pop-font">Question Bank</h2>
        </div>
        <Switch
          className={`view-switch ${tableView ? 'view-switch-table' : 'view-switch-card'}`}
          checkedChildren={
            <b style={{ color: "black" }}>
              <TableOutlined />
              &nbsp;Table
            </b>
          }
          unCheckedChildren={
            <b style={{ color: "black" }}>
              <IdcardOutlined />
              &nbsp;Cards
            </b>
          }
          checked={tableView}
          onChange={onChange}
          size="large"
        />
      </div>

      {/* Desktop/Tablet Action Buttons */}
      <div className="action-buttons">
        {ACTIONS.map((action, index) => (
          <Button
            key={index}
            disabled={action.disabled(state)}
            onClick={() => action.onClick(navigate, setLoadModal, setAddQuestionModal)}
            className="action-button"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>

      {/* Mobile Action Buttons (with labels) */}
      <div className="mobile-action-buttons">
        {ACTIONS.map((action, index) => (
          <button
            key={index}
            className="mobile-action-button"
            disabled={action.disabled(state)}
            onClick={() => action.onClick(navigate, setLoadModal, setAddQuestionModal)}
          >
            {action.icon}
            <span className="mobile-action-button-label">{action.label}</span>
          </button>
        ))}
      </div>

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
