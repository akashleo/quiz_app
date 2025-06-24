import React, { useEffect, useState } from "react";
import { Row, Button, Switch, Spin, Alert, Empty } from "antd";
import { TableOutlined, IdcardOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import QuestionCard from "./QuestionCard";
import QuestionList from "./QuestionList";
import "./questions.css";
import { getAllArchivedQuestions, updateQuestion } from "../../store/slices/question/QuestionAction";
import { getAllTopics } from "../../store/slices/topic/TopicAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ArchivedQuestions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { archivedQuestions, loading, error } = useSelector((state) => state.question);
  const { topics } = useSelector((state) => state.topic);

  useEffect(() => {
    dispatch(getAllArchivedQuestions());
    dispatch(getAllTopics());
  }, [dispatch]);

  const [tableView, setTableView] = useState(false);

  const onChange = (checked) => {
    setTableView(checked);
  };

  const updateQuestionState = (id, payload) => {
    const temp = {"id": id, "body": payload};
    dispatch(updateQuestion(temp));
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const isEmptyArchive = !archivedQuestions || archivedQuestions.length === 0;

  return (
    <div className="question-bank">
      <div className="title-line">
        <div className="title-section" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/question")}
            type="text"
            size="large"
          />
          <h2 className="pop-font">Archive</h2>
        </div>
        {!isEmptyArchive && (
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
        )}
      </div>

      {isEmptyArchive ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Empty
            description={
              <span>
                No archived questions found. Questions that are archived will appear here.
              </span>
            }
          />
        </div>
      ) : (
        tableView ? (
          <Row gutter={[16, 16]} className="question-table-container">
            <QuestionList questions={archivedQuestions} />
          </Row>
        ) : (
          <div className="question-grid">
            {archivedQuestions.map((question, index) => (
              <div key={question._id || index} className="question-card">
                <QuestionCard 
                  question={question} 
                  updateQuestionState={updateQuestionState}
                />
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default ArchivedQuestions;

