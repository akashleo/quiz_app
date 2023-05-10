import React from 'react';
import { Card, Radio, Image } from 'antd';

const { Meta } = Card;

const QuestionCard = ({ question }) => {
  const { questionText, options, image } = question;

  return (
    <Card
      hoverable
      style={{ width: 400 }}
    //   cover={<Image alt={questionText} src={image} />}
    >
      <Meta title={questionText} />
      <Radio.Group>
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
