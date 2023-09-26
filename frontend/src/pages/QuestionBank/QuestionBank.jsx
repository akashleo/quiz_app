import React, { useEffect, useState } from "react";
import { Row, Col, Button, Switch, TreeSelect} from "antd";
import { TableOutlined, IdcardOutlined, FilterOutlined } from "@ant-design/icons";
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
import LoadQuestionsModal from "./LoadQuestionsModal"
import "./questions.css";

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
  const [loadModal, setLoadModal] = useState(false);
  const [tableView, setTableView] = useState(false);
  const [filter, setFilter] = useState([]);
  // '64856ce8c441a939e4661e15','64ff75a27803deb515bade74'
  const { SHOW_PARENT } = TreeSelect;
  const filtertreedata =[]
  const filterTopicData={
    title: 'All Topics',
    value: 'topics',
    key: 'topics',
    children: topics.map((topic, index) => {
      return {title: topic.name,
              value: `topics-${topic._id}`,
              key: `topics-${topic._id}`}
    }),
    
  }
  filtertreedata.push(filterTopicData)

  console.log("hello",filtertreedata)
  console.log("hello2",topics)

  const handleOk = () => {
    setAddQuestionModal(false);
  };

  const handleTopicModalClose = () => {
    setAddTopicModal(false);
  };

  const handleLoadModalClose = () => {
    setLoadModal(false);
  };

  const openQuestionModal = () => {
    setAddQuestionModal(true);
  };

  const openTopicModal = () => {
    setAddTopicModal(true);
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

  const filteronchange = (newValue) => {
    console.log('onChange ', filter);
    console.log('newValue ', newValue);
    setFilter(newValue);
  };

  const filterProps = {
    treeData: filtertreedata,
    value: filter,
    onChange: filteronchange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Filter',
    style: {
      width: '100%',
    },
  };
  
  const filterTopics = filter.reduce((res,value,index) => {
    if(value.includes("-") && value.split("-")[0] == 'topics'){
      console.log(`filter_in_${index}`,value.split("-")[1])
      res.push(value.split("-")[1])
    }
     return res 
  },[])

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
          <Button
            disabled={addTopicModal ? true : false}
            onClick={openTopicModal}
            className="action-button"
          >
            Topics
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
      {!addTopicModal && (
        <>
          <Row>
            <div className="filter-quest">
            <FilterOutlined style={{ width: "3%", fontSize: '18px' }}/>
            <TreeSelect {...filterProps} style={{ width: "30%" }}/>
            </div>
          </Row>
          {tableView ? (
            <Row gutter={[16, 16]}>
              <QuestionList
                questions={questions}
                updateQuestionState={updateQuestionState}
                filter={filter}
              />
            </Row>
          ) : (
            questions && (
              <Row gutter={[16, 16]}>
                {questions?.filter((question) => {
                if(filterTopics.length == 0)
                  return true
                return filterTopics.includes(question.topicId)}).map((question, index) => (
                  <Col span={8} key={index}>
                    <QuestionCard
                      question={question}
                      updateQuestionState={updateQuestionState}
                    />
                  </Col>
                ))}
              </Row>
            )
          )}
        </>
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
