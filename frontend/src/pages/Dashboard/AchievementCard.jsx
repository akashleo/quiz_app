import React from 'react';
import { Col } from 'antd';
import './Dashboard.css';

const AchievementCard = ({ icon: Icon, number, label }) => (
  <Col xs={24} sm={12} md={8}>
    <div className="quiz-achivement quiz-passed">
      <div className="quiz-achivement-icon quiz-passed-icon">
        <Icon className="quiz-achivement-icon" />
      </div>
      <div className="quiz-achivement-details quiz-passed-details">
        <div className="quiz-achivement-number quiz-passed-number">
          {number}
        </div>
        <div className="quiz-achivement-lable quiz-passed-lable">
          {label}
        </div>
      </div>
    </div>
  </Col>
);

export default AchievementCard; 