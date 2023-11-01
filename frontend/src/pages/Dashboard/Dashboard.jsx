import React, { useState, useEffect } from "react";
import LeftMenu from "../../components/LeftMenu";
import Navbar from "../../components/Navbar";
//import { LogoutOutlined } from "@ant-design/icons";
import { Row, Col, Menu, Image, Progress } from "antd";
import {
  FlagFilled,
  CheckCircleFilled,
  ClockCircleFilled,
} from "@ant-design/icons";
import "./Dashboard.css";
import profilepic from "../../assests/profilepic.png";
import badge1 from "../../assests/Badge_1.png";
import badge2 from "../../assests/Badge_2.png";
import badge3 from "../../assests/Badge_3.png";
import history from "../../assests/history.jpg";
import medicine from "../../assests/medicine.jpg";
import technology from "../../assests/tech.jpg";
import agriculture from "../../assests/agriculture.jpg";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfileById } from "../../store/slices/profile/ProfileAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProfile } = useSelector((state) => state.profile);
  const { currentUserId } = useSelector((state) => state.auth);
  const [emojiMap, setEmojiMap] = useState({});

  useEffect(() => {
    if (currentUserId) {
      dispatch(getProfileById(currentUserId));
    }
  }, []);
  useEffect(() => {
    if (singleProfile) {
      const counts = {};
      const { achievements } = singleProfile;
      if(achievements)
      for (const key of achievements) {
        counts[key] = counts[key] ? counts[key] + 1 : 1;
      }
      setEmojiMap(counts);
    }
  }, [singleProfile]);

  return (
    <>
      <Navbar />
      <Row style={{ height: "88vh", marginTop: "12vh" }}>
        <Col span={6}>
          <LeftMenu />
        </Col>
        <Col span={18}>
          <div className="dashboard">
            <Row className="dashboard-content">
              <Col span={6}>
                <Image className="avt-dash" src={"https://www.w3schools.com/howto/img_avatar.png"} width={200} height={200} />
              </Col>
              <Col span={18}>
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
                <Row className="quiz-achivement-block">
                  <Col span={8}>
                    <div className="quiz-achivement quiz-passed">
                      <div className="quiz-achivement-icon quiz-passed-icon">
                        <FlagFilled className="quiz-achivement-icon" />
                      </div>
                      <div className="quiz-achivement-details quiz-passed-details">
                        <div className="quiz-achivement-number quiz-passed-number">
                          {singleProfile?.quizPassed === ""
                            ? 27
                            : singleProfile?.quizPassed}
                        </div>
                        <div className="quiz-achivement-lable quiz-passed-lable">
                          Quiz Passed
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="quiz-achivement quiz-passed">
                      <div className="quiz-achivement-icon quiz-passed-icon">
                        <ClockCircleFilled className="quiz-achivement-icon" />
                      </div>
                      <div className="quiz-achivement-details quiz-passed-details">
                        <div className="quiz-achivement-number quiz-passed-number">
                          {singleProfile?.fastestTime === ""
                            ? "20min"
                            : singleProfile.fastestTime}
                        </div>
                        <div className="quiz-achivement-lable quiz-passed-lable">
                          Fastest Time
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="quiz-achivement quiz-passed">
                      <div className=" quiz-achivement-icon quiz-passed-icon">
                        <CheckCircleFilled className="quiz-achivement-icon" />
                      </div>
                      <div className="quiz-achivement-details quiz-passed-details">
                        <div className="quiz-achivement-number quiz-passed-number">
                          {singleProfile?.correctAnswers}
                        </div>
                        <div className="quiz-achivement-lable quiz-passed-lable">
                          Correct Answers
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Row className="achivement-featured">
                <Col span={12}>
                  <div className="achivement">
                    <p className="achivement-name">Achievements</p>
                   
                  </div>
                  <div className="achivement-badge">
                    <Row justify="space-between" className="achievements-list">
                      {Object.entries(emojiMap).map(([emoji, count]) => {
                        return (
                          <Col span={12} key={emoji}>
                            <Row className="emoji-card">
                              <Col className="emoji-count" span={8}>
                                {String.fromCodePoint(
                                  emoji.replace("U+", "0x")
                                )}
                              </Col>

                              <Col className="emoji-count" span={8}>
                                x
                              </Col>
                              <Col className="emoji-count" span={8}>
                                <div className="emoji-count">{count}</div>
                              </Col>
                            </Row>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </Col>
                <Col span={12}>
                  <Row justify="space-between" className="featured-category">
                    <p className="featured-category-name">Worst Performances</p>
                  </Row>
                  <Row
                    gutter={[16, 16]}
                    className="featured"
                    style={{ padding: "5%" }}
                  >
                    <Col className="gutter-row" span={12}>
                      <Image
                        src={history}
                        className="featured-image"
                        width={150}
                        height={80}
                      />
                    </Col>
                    <Col className="gutter-row" span={12}>
                      <Image
                        src={medicine}
                        className="featured-image"
                        width={150}
                        height={80}
                      />
                    </Col>
                    <Col className="gutter-row" span={12}>
                      <Image
                        src={technology}
                        className="featured-image"
                        width={150}
                        height={80}
                      />
                    </Col>
                    <Col className="gutter-row" span={12}>
                      <Image
                        src={agriculture}
                        className="featured-image"
                        width={150}
                        height={80}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
