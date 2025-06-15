import React from 'react';
import { Modal, Progress } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './Profile.css';

const ReviewModal = ({ visible, onClose, answerData }) => {
  if (!answerData) return null;

  const { topic, submittedAt, score, reviewedAnswers } = answerData;

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return 'Excellent work!';
    if (percentage >= 60) return 'Good progress!';
    return 'Keep practicing!';
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="100%"
      style={{ top: 0, padding: 0, maxWidth: 'none' }}
      bodyStyle={{ padding: 0, height: '100vh' }}
      className="review-modal"
    >
      <div className="review-modal-container">
        <div className="review-modal-content">
          {/* Header */}
          <div className="review-modal-header">
            <div className="review-modal-title">
              <h2>{topic.name} Review</h2>
              <p className="review-modal-subtitle">
                Completed on {dayjs(submittedAt).format('MMMM D, YYYY')}
              </p>
            </div>
            <div className="review-score-display">
              <Progress 
                type="circle" 
                percent={score.percentage} 
                width={80}
                strokeColor={getScoreColor(score.percentage)}
              />
              <div className="review-score-details">
                <h3>{score.correct}/{score.total} Correct</h3>
                <p>{getScoreMessage(score.percentage)}</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="review-modal-body">
            {reviewedAnswers.map((qa, index) => (
              <div key={qa.questionId} className="review-question-card">
                <div className="review-question-header">
                  <span className="review-question-number">
                    Question {index + 1}
                  </span>
                  <div className={`review-question-status ${qa.isCorrect ? 'correct' : 'incorrect'}`}>
                    {qa.isCorrect ? (
                      <>
                        <CheckCircleOutlined />
                        <span>Correct</span>
                      </>
                    ) : (
                      <>
                        <CloseCircleOutlined />
                        <span>Incorrect</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="review-question-text">
                <div dangerouslySetInnerHTML={{ __html: qa.questionText }}></div>
                </div>

                <div className="review-options-list">
                  {qa.options.map((option) => {
                    const isUserSelected = option.id === qa.userAnswer;
                    const isCorrectAnswer = option.id === qa.correctAnswer;
                    const isIncorrectSelection = isUserSelected && !qa.isCorrect;

                    let className = 'review-option-item';
                    if (isCorrectAnswer) className += ' correct-answer';
                    if (isUserSelected) className += ' user-selected';
                    if (isIncorrectSelection) className += ' incorrect';

                    return (
                      <div key={option.id} className={className}>
                        <div className="review-option-indicator">
                          {isCorrectAnswer && (
                            <CheckCircleOutlined className="correct" />
                          )}
                          {isIncorrectSelection && (
                            <CloseCircleOutlined className="incorrect" />
                          )}
                          {!isCorrectAnswer && !isUserSelected && (
                            <div style={{ width: 18, height: 18 }} />
                          )}
                        </div>
                        <div className="review-option-text">
                          <div dangerouslySetInnerHTML={{ __html: option.text }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="review-modal-footer">
            <button className="close-review-button" onClick={onClose}>
              Close Review
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal; 