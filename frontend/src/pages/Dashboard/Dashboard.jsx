import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Row, Col, Image, Progress, Tooltip } from "antd";
import {
  FlagFilled,
  CheckCircleFilled,
  ClockCircleFilled,
  QuestionCircleOutlined
} from "@ant-design/icons";
import "./Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfileById } from "../../store/slices/profile/ProfileAction";
import Achievements from "./Achievements";
import AchievementCard from "./AchievementCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProfile, loading } = useSelector((state) => state.profile);
  const { currentUserId } = useSelector((state) => state.auth);
  const [emojiMap, setEmojiMap] = useState({});

  // Calculate level progress
  const calculateLevelProgress = (level, correctAnswers) => {
    // Each level requires more correct answers
    const answersNeededForNextLevel = level * 10;
    const progress = (correctAnswers / answersNeededForNextLevel) * 100;
    return Math.min(progress, 100); // Cap at 100%
  };

  useEffect(() => {
    if (currentUserId && Object.keys(singleProfile).length < 1 && !loading) {
      dispatch(getProfileById(currentUserId));
    }
  }, [currentUserId, singleProfile, loading, dispatch]);

  useEffect(() => {
    if (singleProfile?.achievements) {
      const counts = {};
      const { achievements } = singleProfile;
      for (const key of achievements) {
        counts[key] = counts[key] ? counts[key] + 1 : 1;
      }
      setEmojiMap(counts);
    }
  }, [singleProfile]);

  // Format time string for display
  const formatTime = (timeStr) => {
    if (!timeStr || timeStr === "") return "No attempts yet";
    const time = parseFloat(timeStr);
    if (isNaN(time)) return timeStr;
    return time < 1 ? `${Math.round(time * 60)} seconds` : `${time} minutes`;
  };

  // Format quiz passed count
  const formatQuizPassed = (count) => {
    if (!count || count === "") return "0";
    return count;
  };

  return (
    <>
      <Navbar />
      <Row style={{ minHeight: "88vh", marginTop: "10vh" }}>
        <Col xs={24} sm={24} md={24}>
          <div className="dashboard">
            <div className="dashboard-content">
              {/* Profile Section */}
              <div className="profile-section">
                <Row gutter={[24, 24]} align="middle">
                  <Col xs={24} sm={24} md={6} style={{ textAlign: 'center' }}>
                    <Image 
                      className="avt-dash" 
                      src={singleProfile?.image || "https://www.w3schools.com/howto/img_avatar.png"} 
                      preview={false}
                      style={{
                        display: 'inline-block',
                        verticalAlign: 'middle'
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={18}>
                    <div className="user-details">
                      <h2 className="user-name">{singleProfile?.fullName || "Loading..."}</h2>
                      <div className="user-level">
                        <span>Level {singleProfile?.level || 1}</span>
                        <Tooltip title="Complete quizzes to level up!">
                          <QuestionCircleOutlined style={{ marginLeft: '8px' }} />
                        </Tooltip>
                      </div>
                    </div>
                    <div className="user-progress">
                      <Progress
                        percent={calculateLevelProgress(
                          singleProfile?.level || 1,
                          singleProfile?.correctAnswers || 0
                        )}
                        showInfo={true}
                        strokeColor={"#1890ff"}
                        format={percent => `${Math.round(percent)}%`}
                      />
                      <div style={{ textAlign: 'right', fontSize: '12px', color: '#666' }}>
                        Progress to Level {(singleProfile?.level || 1) + 1}
                      </div>
                    </div>
                    <Row gutter={[16, 16]} className="quiz-achievement-block">
                      <AchievementCard
                        icon={FlagFilled}
                        number={formatQuizPassed(singleProfile?.quizPassed)}
                        label="Quizzes Passed"
                      />
                      <AchievementCard
                        icon={ClockCircleFilled}
                        number={formatTime(singleProfile?.fastestTime)}
                        label="Fastest Time"
                      />
                      <AchievementCard
                        icon={CheckCircleFilled}
                        number={singleProfile?.correctAnswers || 0}
                        label="Correct Answers"
                      />
                    </Row>
                  </Col>
                </Row>
              </div>

              {/* Achievements Section */}
              <div className="achievements-section">
                {Object.keys(emojiMap).length === 0 ? (
                  <div className="no-achievements">
                    <p>Complete quizzes to earn achievements!</p>
                  </div>
                ) : (
                  <Achievements emojiMap={emojiMap} />
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
