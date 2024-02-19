// Import necessary React and Ant Design components
import React from 'react';
import { Card } from 'antd';

// Define your TopicCard
const TopicCard = ({
  available,
  code,
  createdAt,
  instructions,
  maxAttempts,
  name,
  points,
  questions,
  timeLimit,
}) => {
  return (
    <Card style={{ width: '100%', height: '20rem', border: "2px solid  grey" }}>
      <div>
        <strong>Availability:</strong> {available ? 'Yes' : 'No'}
      </div>
      <div>
        <strong>Code:</strong> {code}
      </div>
      <div>
        <strong>Created At:</strong> {createdAt}
      </div>
      <div>
        <strong>Instructions:</strong> {instructions}
      </div>
      <div>
        <strong>Max Attempts:</strong> {maxAttempts}
      </div>
      <div>
        <strong>Name:</strong> {name}
      </div>
      <div>
        <strong>Points:</strong> {points}
      </div>
      <div>
        <strong>Time Limit:</strong> {timeLimit} seconds
      </div>
      <div>
        <strong>Questions:</strong> {questions.length}
      </div>
    </Card>
  );
};

export default TopicCard;
