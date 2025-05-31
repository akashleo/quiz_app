import React, { useState, useEffect } from "react";
import { Card, Radio } from "antd";
import { Switch } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import questionmark from "../../assets/questionmark.png";
import { deleteQuestion } from "../../store/slices/question/QuestionAction";
import { useSelector, useDispatch } from "react-redux";
import "./questions.css";

const { Meta } = Card;

const QuestionCard = ({ question, updateQuestionState }) => {
  const { _id, questionText, options, image, available } = question;
  const { loading } = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    setChecked(available);
  }, [available]);

  const onChange = (event) => {
    const modifiedQuestion = { ...question, available: !question.available };
    updateQuestionState(_id, modifiedQuestion);
  };

  const deleteSelectedQuestion = (id) => {
    dispatch(deleteQuestion(id));
  };

  const backgroundImage = question?.image ? question.image : questionmark;

  return (
    <Card
      hoverable
      className="question-card-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      actions={[
        <Switch
          className={`question-card-switch ${
            checked ? 'question-card-switch-active' : 'question-card-switch-archived'
          }`}
          key="toggle"
          size="small"
          checked={checked}
          checkedChildren={<span className="question-card-switch-text">active</span>}
          unCheckedChildren={<span className="question-card-switch-text">archived</span>}
          loading={loading}
          onChange={onChange}
        />,
        <EditOutlined key="edit" />,
        <DeleteOutlined
          onClick={() => deleteSelectedQuestion(_id)}
          key="delete"
        />,
      ]}
    >
      <div className="question-card-content">
        <Meta 
          className="question-card-meta"
          title={<div dangerouslySetInnerHTML={{__html: questionText}}></div>}
        />
        <Radio.Group className="radio-group">
          {options.map((option) => (
            <Radio key={option.id} value={option.id}>
              <div dangerouslySetInnerHTML={{__html: option.text}}></div>
            </Radio>
          ))}
        </Radio.Group>
      </div>
    </Card>
  );
};

export default QuestionCard;
