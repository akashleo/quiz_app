import React, { useState, useEffect } from "react";
import { Card, Radio, Image } from "antd";
import { Switch } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import questionmark from "../../assests/questionmark.png";
import { deleteQuestion } from "../../store/slices/question/QuestionAction";
import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;

const QuestionCard = ({ question, updateQuestionState }) => {
  const { _id, questionText, options, image, available } = question;
  const { loading } = useSelector((state) => state.question);

  const dispatch = useDispatch();

  const onChange = (event) => {
    console.log(event);
    const modifiedQuestion = { ...question, available: !question.available };
    updateQuestionState(_id, modifiedQuestion);
  };

  const deleteSelectedQuestion = (id) => {
    console.log(id);
    dispatch(deleteQuestion(id));
  };

  const [checked, setChecked] = useState(true);

  useEffect(() => {
    setChecked(available);
  }, [available]);

  return (
    <Card
      hoverable
      style={{ width: 400 }}
      cover={
        <Image
          preview={false}
          alt={questionText}
          src={question?.image ? question.image : questionmark}
          height={100}
          style={{ objectFit: "contain", paddingTop: "20px" }}
        />
      }
      actions={[
        <Switch
          className="pop-font"
          key="toggle"
          size="small"
          style={checked? { backgroundColor: '#d3e39a'}:{ backgroundColor: '#e39a9c'}}
          checked={checked}
          checkedChildren={<b style={{ color: "black"}}>active</b>}
          unCheckedChildren={<b style={{ color: "black"}}>archived</b>}
          loading={loading}
          onChange={(event) => onChange(event)}
        />,
        <EditOutlined key="edit" />,
        <DeleteOutlined
          onClick={() => {
            deleteSelectedQuestion(_id);
          }}
          key="delete"
        />,
      ]}
    >
      <Meta className="q-text" title={<div dangerouslySetInnerHTML={{__html: questionText}}></div>} />
      <Radio.Group className="radio-group">
        {options.map((option) => (
          <Radio key={option.id} value={option.id}>
            <div dangerouslySetInnerHTML={{__html: option.text}}></div>
          </Radio>
        ))}
      </Radio.Group>
    </Card>
  );
};

export default QuestionCard;
