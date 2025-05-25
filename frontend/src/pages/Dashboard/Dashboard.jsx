import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Row, Col, Image, Progress } from "antd";
import {
  FlagFilled,
  CheckCircleFilled,
  ClockCircleFilled,
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

  useEffect(() => {
    if (currentUserId && Object.keys(singleProfile).length < 1 && !loading) {
      dispatch(getProfileById(currentUserId));
    }
  }, []);

  useEffect(() => {
    if (singleProfile) {
      const counts = {};
      const { achievements } = singleProfile;
      if (achievements)
        for (const key of achievements) {
          counts[key] = counts[key] ? counts[key] + 1 : 1;
        }
      setEmojiMap(counts);
    }
  }, [singleProfile]);

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
                      src={"https://www.w3schools.com/howto/img_avatar.png"} 
                      preview={false}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={18}>
                    <div className="user-details">
                      <h2 className="user-name">{singleProfile?.fullName}</h2>
                      <p className="user-level">
                        Bonus booster {singleProfile?.level}lv
                      </p>
                    </div>
                    <div className="user-progress">
                      <Progress
                        percent={70}
                        showInfo={false}
                        strokeColor={"#C4C4C4"}
                      />
                    </div>
                    <Row gutter={[16, 16]} className="quiz-achivement-block">
                      <AchievementCard
                        icon={FlagFilled}
                        number={singleProfile?.quizPassed || 27}
                        label="Quiz Passed"
                      />
                      <AchievementCard
                        icon={ClockCircleFilled}
                        number={singleProfile?.fastestTime || "20min"}
                        label="Fastest Time"
                      />
                      <AchievementCard
                        icon={CheckCircleFilled}
                        number={singleProfile?.correctAnswers}
                        label="Correct Answers"
                      />
                    </Row>
                  </Col>
                </Row>
              </div>

              {/* Achievements Section */}
              <Achievements emojiMap={emojiMap} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
