import React, { useEffect, useState } from 'react';
import { List, Tag, Button, Spin, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewedAnswers } from '../../store/slices/answer/AnswerAction';
import dayjs from 'dayjs';
import ReviewModal from './ReviewModal';
import './Profile.css';

const { Text } = Typography;

const ReviewAnswers = ({ singleProfile }) => {
  const dispatch = useDispatch();
  const { reviewedAnswers, loading, error } = useSelector((state) => state.answer);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (singleProfile?._id) {
      dispatch(getReviewedAnswers(singleProfile._id));
    }
  }, [dispatch, singleProfile]);

  const showAnswerDetails = (answer) => {
    setSelectedAnswer(answer);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAnswer(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <Text type="danger">{error}</Text>
      </div>
    );
  }

  return (
    <div className="review-answers">
      <List
        className="quiz-history-list"
        itemLayout="horizontal"
        dataSource={reviewedAnswers}
        locale={{ emptyText: 'No quiz attempts found' }}
        renderItem={(item) => (
          <List.Item className="quiz-list-item">
            <div className="quiz-item-content">
              <div className="quiz-info">
                <List.Item.Meta
                  title={<span className="topic-name">{item.topic.name}</span>}
                  description={
                    <span className="quiz-date">
                      {dayjs(item.submittedAt).format('MMMM D, YYYY')}
                    </span>
                  }
                />
                <div className="quiz-percentage">
                  <Tag color={item.score.percentage >= 70 ? 'success' : 'warning'}>
                    {item.score.percentage}%
                  </Tag>
                </div>
              </div>
              <div className="desktop-tablet-only">
                <div className="correct-count">
                  {item.score.correct}/{item.score.total} Correct
                </div>
                <Button
                  type="primary"
                  icon={<RightOutlined />}
                  className="review-button-desktop"
                  onClick={() => showAnswerDetails(item)}
                >
                  Review
                </Button>
              </div>
              <div className="mobile-bottom-row mobile-only">
                <div className="correct-count">
                  {item.score.correct}/{item.score.total} Correct
                </div>
                <Button
                  type="primary"
                  icon={<RightOutlined />}
                  className="review-button-mobile"
                  onClick={() => showAnswerDetails(item)}
                >
                  Review
                </Button>
              </div>
            </div>
          </List.Item>
        )}
      />

      <ReviewModal
        visible={modalVisible}
        onClose={closeModal}
        answerData={selectedAnswer}
      />
    </div>
  );
};

export default ReviewAnswers; 