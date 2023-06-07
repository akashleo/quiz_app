import React from "react";
import { Card, Radio, Image } from "antd";
import { Switch } from "antd";
import questionmark from "../../assests/questionmark.png";

const { Meta } = Card;

const QuestionCard = ({ question }) => {
  const { questionText, options, image } = question;

  const onChange = (event) => {
    console.log(event);
  };

  return (
    <Card
      hoverable
      style={{ width: 400 }}
      cover={
        <Image
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
        <label>ARCHIVE</label>{" "}
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
