import React, { useState } from "react";
import { Card, Radio, Image } from "antd";
import { Switch } from "antd";
import questionmark from "../../assests/questionmark.png";
import { useSelector } from "react-redux";


const { Meta } = Card;

const QuestionCard = ({ question, updateQuestionState }) => {
  const {_id, questionText, options, image, available } = question;
  const {loading} = useSelector((state)=>state.question)

  const onChange = (event) => {
    console.log(event);
    const modifiedQuestion = {...question, available: !question.available};
    console.log(_id, question, modifiedQuestion)
    updateQuestionState(_id, modifiedQuestion)
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
    >
      <Meta className="q-text" title={questionText} />
      <Radio.Group className="radio-group">
        {options.map((option) => (
          <Radio key={option.id} value={option.id}>
            {option.text}
          </Radio>
        ))}
      </Radio.Group>
      <div className="archive">
        <label>{available? "ACTIVE": "ARCHIVED"}</label>{" "}
        <Switch
          className="toggle"
          checked={available}
          loading={loading}
          onChange={(event) => onChange(event)}
        />
      </div>
    </Card>
  );
};

export default QuestionCard;
