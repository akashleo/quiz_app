import React, { useState } from "react";
import { Card, Radio, Image } from "antd";
import { Switch } from "antd";
import questionmark from "../../assests/questionmark.png";

const { Meta } = Card;

const QuestionCard = ({ question }) => {
  const { questionText, options, image } = question;

  const [activeState, setActiveState] = useState("ACTIVE");

  const onChange = (event) => {
    console.log(event);
    if (event) {
      setActiveState("ACTIVE");
    } else {
      setActiveState("ARCHIVED");
    }
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
        <label>{activeState}</label>{" "}
        <Switch
          className="toggle"
          defaultChecked
          onChange={(event) => onChange(event)}
        />
      </div>
    </Card>
  );
};

export default QuestionCard;
