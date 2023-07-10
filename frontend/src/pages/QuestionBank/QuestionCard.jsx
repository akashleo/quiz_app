import React, { useState } from "react";
import { Card, Radio, Image } from "antd";
import { Switch } from "antd";
import { EditOutlined } from "@ant-design/icons";
import questionmark from "../../assests/questionmark.png";
import { useSelector } from "react-redux";

const { Meta } = Card;

const QuestionCard = ({ question, updateQuestionState }) => {
  const { _id, questionText, options, image, available } = question;
  const { loading } = useSelector((state) => state.question);

  const onChange = (event) => {
    console.log(event);
    const modifiedQuestion = { ...question, available: !question.available };
    console.log(_id, question, modifiedQuestion);
    updateQuestionState(_id, modifiedQuestion);
  };

  return (
    <Card
      hoverable
      style={{ width: 400 }}
      cover={
        <Image
          preview={false}
          alt={questionText}
          src={questionmark}
          height={100}
          style={{ objectFit: "contain", paddingTop: "20px" }}
        />
      }
      actions={[
        <label key="label"><b>{available ? "ACTIVE" : "ARCHIVED"}</b></label>,
        <EditOutlined key="edit" />,
        <Switch
          className="toggle"
          key="toggle"
          checked={available}
          loading={loading}
          onChange={(event) => onChange(event)}
        />,
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
