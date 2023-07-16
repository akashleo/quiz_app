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
    console.log(_id, question, modifiedQuestion);
    updateQuestionState(_id, modifiedQuestion);
  };

  const deleteSelectedQuestion =(id)=>{
    console.log(id)
    dispatch(deleteQuestion(id));
  }

  const [checked, setChecked] = useState(true);

  useEffect(()=>{
    setChecked(available)
  }, [available])

  return (
    <Card
      hoverable
      style={{ width: 400 }}
      cover={
        <Image
          preview={false}
          alt={questionText}
          src={question?.image? question.image : questionmark}
          height={100}
          style={{ objectFit: "contain", paddingTop: "20px" }}
        />
      }
      actions={[
        <Switch
          className="toggle"
          key="toggle"
          checked={checked}
          loading={loading}
          onChange={(event) => onChange(event)}
        />,
        <EditOutlined key="edit" />,
        <DeleteOutlined onClick={()=>{deleteSelectedQuestion(_id)}} key="delete"/>
      ]}
    >
      <Meta className="q-text" title={questionText} />
      <Radio.Group className="radio-group">
        {options.map((option) => (
          <Radio key={option.id} value={option.id}>
            {option.text}
          </Radio>
        ))}
      </Radio.Group>
    </Card>
  );
};

export default QuestionCard;
