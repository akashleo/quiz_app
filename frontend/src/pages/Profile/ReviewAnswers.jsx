import React from 'react';
import { List, Tag, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const ReviewAnswers = () => {
  // Mock data - replace with actual data from your backend
  const quizHistory = [
    {
      id: 1,
      title: 'History Quiz',
      date: '2024-03-15',
      score: '80%',
      correct: 4,
      total: 5,
    },
    {
      id: 2,
      title: 'Science Quiz',
      date: '2024-03-14',
      score: '90%',
      correct: 9,
      total: 10,
    },
    {
      id: 3,
      title: 'Mathematics Quiz',
      date: '2024-03-13',
      score: '70%',
      correct: 7,
      total: 10,
    },
  ];

  return (
    <div className="review-answers">
      <List
        className="quiz-history-list"
        itemLayout="horizontal"
        dataSource={quizHistory}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                icon={<RightOutlined />}
                key="review"
                className="review-button"
              >
                Review
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={`Taken on ${item.date}`}
            />
            <div className="quiz-stats">
              <Tag color="blue">{item.score}</Tag>
              <span className="correct-count">
                {item.correct}/{item.total} Correct
              </span>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReviewAnswers; 