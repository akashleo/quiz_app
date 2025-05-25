// Import necessary React and Ant Design components
import React from 'react';
import { Card } from 'antd';
import { ClockCircleOutlined, TrophyOutlined, FileOutlined, TeamOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './questions.css';

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
  const formatDate = (date) => {
    return dayjs(date).format('MMM D, YYYY');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const MetricTile = ({ icon, value, label, className }) => (
    <div className={`metric-tile ${className || ''}`}>
      {icon}
      <span className="metric-tile-value">{value}</span>
      <span className="metric-tile-label">{label}</span>
    </div>
  );

  return (
    <Card className="topic-card">
      <div className="topic-card-header">
        <div>
          <div className="topic-card-title">{name}</div>
          <div className="topic-card-code">{code}</div>
        </div>
        <div className={`topic-card-status ${available ? 'topic-card-status-active' : 'topic-card-status-inactive'}`}>
          {available ? 'Active' : 'Inactive'}
        </div>
      </div>

      <div className="topic-metrics">
        <MetricTile 
          icon={<ClockCircleOutlined />}
          value={formatTime(timeLimit)}
          label="Time Limit"
        />
        <MetricTile 
          icon={<TrophyOutlined />}
          value={points}
          label="Points"
        />
        <MetricTile 
          icon={<TeamOutlined />}
          value={maxAttempts}
          label="Max Attempts"
        />
        <MetricTile 
          icon={<FileOutlined />}
          value={questions.length}
          label="Questions"
          className={questions.length === 0 ? 'metric-tile-questions-empty' : 'metric-tile-questions-has-items'}
        />
      </div>

      <div className="topic-card-field">
        <span className="topic-card-label">Created</span>
        <span className="topic-card-value">{formatDate(createdAt)}</span>
      </div>

      <div className="topic-card-field topic-card-instructions">
        <span className="topic-card-label">Instructions</span>
        <span className="topic-card-value">{instructions || 'No instructions provided'}</span>
      </div>
    </Card>
  );
};

export default TopicCard;
