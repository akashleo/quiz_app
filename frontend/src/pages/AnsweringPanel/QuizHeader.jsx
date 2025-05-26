import React from 'react';
import { ClockCircleOutlined } from "@ant-design/icons";
import { Typography } from 'antd';
import Timer from "../../components/Timer";
import './AnsweringPanel.css';

const { Title } = Typography;

const QuizHeader = ({ topicName, duration, submitQuiz }) => {
  return (
    <div className="quiz-header-user">
      <div className="quiz-title-container-user">
        <Title level={2} className="quiz-title-user">
          {topicName}
        </Title>
      </div>
      <div className="quiz-timer-user">
        <ClockCircleOutlined />
        <span className="timer-display-user">
          <Timer duration={duration} submitQuiz={submitQuiz} />
        </span>
      </div>
    </div>
  );
};

export default QuizHeader; 