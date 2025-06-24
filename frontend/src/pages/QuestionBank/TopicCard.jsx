// Import necessary React and Ant Design components
import React from "react";
import { Card, Button } from "antd";
import {
  ClockCircleOutlined,
  TrophyOutlined,
  FileOutlined,
  TeamOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "./questions.css";
import { useDispatch } from "react-redux";
import { clearTopicQuestions } from "../../store/slices/topic/TopicAction";

// Define your TopicCard
const TopicCard = ({
  _id,
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
  const dispatch = useDispatch();

  const handleClearQuestions = (e) => {
    e.stopPropagation(); // Prevent any parent handlers from firing
    if (
      window.confirm(
        `Are you sure you want to clear all questions from "${name}"?`
      )
    ) {
      dispatch(clearTopicQuestions(_id));
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("MMM D, YYYY");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const MetricTile = ({ icon, value, label, className }) => (
    <div className={`metric-tile ${className || ""}`}>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div className="topic-card-code">{code}</div>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "center", flexFlow: "column", gap: "10px"}}>
        <div
            className={`topic-card-status ${
              available
                ? "topic-card-status-active"
                : "topic-card-status-inactive"
            }`}
          >
            {available ? "Active" : "Inactive"}
          </div>
          {questions.length > 0 && (
          <Button
            type="text"
            size="small"
            icon={<ClearOutlined />}
            onClick={handleClearQuestions}
            title="Clear all questions"
            style={{
              color: "#ff4d4f",
              padding: "4px",
              height: "auto",
              minWidth: "auto",
              border: "1px solid #ff4d4f",
              borderRadius: "5px",
              padding: "5px 10px",
              fontSize: "10px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
            >
              Clear
            </Button>
          )}
        </div>
       
      </div>

      <div className="topic-metrics">
        <MetricTile
          icon={<ClockCircleOutlined />}
          value={formatTime(timeLimit)}
          label="Time Limit"
        />
        <MetricTile icon={<TrophyOutlined />} value={points} label="Points" />
        <MetricTile
          icon={<TeamOutlined />}
          value={maxAttempts}
          label="Max Attempts"
        />
        <MetricTile
          icon={<FileOutlined />}
          value={questions.length}
          label="Questions"
          className={
            questions.length === 0
              ? "metric-tile-questions-empty"
              : "metric-tile-questions-has-items"
          }
        />
      </div>

      <div className="topic-card-field">
        <span className="topic-card-label">Created</span>
        <span className="topic-card-value">{formatDate(createdAt)}</span>
      </div>

      <div className="topic-card-field topic-card-instructions">
        <span className="topic-card-label">Instructions</span>
        <span className="topic-card-value">
          {instructions || "No instructions provided"}
        </span>
      </div>
    </Card>
  );
};

export default TopicCard;
