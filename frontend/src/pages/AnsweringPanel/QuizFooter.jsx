import React from 'react';
import { Button, Steps } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './AnsweringPanel.css';

const QuizFooter = ({ 
  current, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onShowModal,
  className 
}) => {
  return (
    <div className={`quiz-footer-user ${className || ''}`}>
      <Button 
        type="primary"
        icon={<LeftOutlined />}
        className="nav-button-user prev-button-user" 
        onClick={onPrevious}
        disabled={current === 1}
      >
        Previous
      </Button>

      <div className="quiz-progress-wrapper-user">
        <Steps
          current={current - 1}
          size="small"
          className="quiz-progress-user"
          items={Array(totalQuestions).fill(null).map((_, index) => ({
            title: '',
          }))}
        />
      </div>

      {current === totalQuestions ? (
        <Button 
          type="primary"
          className="nav-button-user next-button-user" 
          onClick={onShowModal}
        >
          Submit Quiz
        </Button>
      ) : (
        <Button 
          type="primary"
          className="nav-button-user next-button-user" 
          onClick={onNext}
        >
          Next <RightOutlined />
        </Button>
      )}
    </div>
  );
};

export default QuizFooter; 