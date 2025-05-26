// Import necessary React and Ant Design components
import React from "react";
import { Row, Col, Card, Typography, Tag, Tooltip } from "antd";
import "./Topics.css";
import { CheckCircleOutlined, ClockCircleOutlined, TrophyOutlined, FileOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getSingleTopic } from '../../store/slices/topic/TopicSlice';

const { Title, Text, Paragraph } = Typography;

// Define your TopicCard
const TopicCard = ({
  selectedTopic,
  setSelectedTopic,
  setTopic,
  topicData,
}) => {
  const {
    available,
    code,
    instructions,
    maxAttempts,
    name,
    points,
    questions,
    timeLimit,
  } = topicData;

  const dispatch = useDispatch();

  const MetricTile = ({ icon, value, label }) => (
    <div className="metric-tile-user">
      {icon}
      <Text className="metric-tile-value-user">{value}</Text>
      <Text className="metric-tile-label-user">{label}</Text>
    </div>
  );

  return (
    <Col xs={24} sm={12} lg={8} xl={8}>
      <Card
        hoverable
        className={`topic-card-user ${code === selectedTopic ? 'topic-card-selected-user' : ''}`}
        onClick={() => {
          setSelectedTopic(code);
          setTopic(topicData);
          dispatch(getSingleTopic(topicData));
        }}
      >
        <div className="topic-card-header-user">
          <div className="topic-title-container-user">
            <Text className="topic-card-title-user">{name}</Text>
            <Tag color="blue" className="topic-card-code-user">{code}</Tag>
          </div>
          {selectedTopic === code && (
            <CheckCircleOutlined className="select-emoji-user" />
          )}
        </div>

        <div className="topic-metrics-user">
          <MetricTile 
            icon={<TrophyOutlined />}
            value={points}
            label="Points"
          />
          {timeLimit && (
            <MetricTile 
              icon={<ClockCircleOutlined />}
              value={`${timeLimit} min`}
              label="Time"
            />
          )}
          {questions && (
            <MetricTile 
              icon={<FileOutlined />}
              value={questions.length}
              label="Questions"
            />
          )}
        </div>

        <div className="topic-card-instructions-user">
          <Tooltip title={instructions || "No instructions provided"}>
            <Text ellipsis={{ rows: 2 }} className="instructions-text-user">
              {instructions || "No instructions provided"}
            </Text>
          </Tooltip>
        </div>

        {available === false && (
          <Tag color="error" className="topic-availability-tag-user">
            Not Available
          </Tag>
        )}
      </Card>
    </Col>
  );
};

export default TopicCard;
