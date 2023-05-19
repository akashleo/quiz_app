import React, { useEffect } from "react";
import LeftMenu from "../../components/LeftMenu";
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
import history from "../../assests/history.png";
import medicine from "../../assests/medicine.png";
import technology from "../../assests/technology.png";
import agriculture from "../../assests/agriculture.png";

import { useSelector, useDispatch } from "react-redux";
import { getProfileById } from "../../store/slices/profile/ProfileAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { singleProfile } = useSelector((state) => state.profile);
  const { currentUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUserId) {
      dispatch(getProfileById(currentUserId));
    }
  }, []);
  useEffect(() => {
    if (singleProfile) {
      console.log(singleProfile);
    }
  }, [singleProfile]);

  return (
    <Row style={{ height: "90vh", marginTop: "12vh" }}>
      <Col span={6}>
        <LeftMenu />
      </Col>
      <Col span={18}>
        <div className="dashboard">
          <Row className="dashboard-content">
            <Col span={6}>
              <Image src={profilepic} width={200} height={200} />
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
                        {singleProfile?.quizPassed===""?27:singleProfile?.quizPassed }
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
                        {singleProfile?.fastestTime===""?"20min": singleProfile.fastestTime}
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
                  <div className="achivement-progress">
                    <Progress
                      percent={30}
                      size="small"
                      showInfo={false}
                      strokeColor={"#C4C4C4"}
                    />
                  </div>
                </div>
                <div className="achivement-badge">
                  <Row justify="space-between">
                    <Col span={8}>
                      {" "}
                      <Image src={badge3} width={50} height={50} />
                      <p>Comeback</p>
                    </Col>
                    <Col span={8} offset={8} style={{ textAlign: "right" }}>
                      <Image src={badge1} width={50} height={50} />
                      <p>Winner</p>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <div style={{ textAlign: "center" }}>
                      <Image src={badge2} width={50} height={50} />
                      <p>Lucky</p>
                    </div>
                  </Row>
                  <Row justify="center" style={{ marginTop: "2%" }}>
                    <span className="divide-bar"></span>
                  </Row>
                  <Row justify="center" style={{ marginTop: "2%" }}>
                    <p className="view-all">View All</p>
                  </Row>
                </div>
              </Col>
              <Col span={12}>
                <Row justify="space-between" className="featured-category">
                  <p className="featured-category-name">Featured Category</p>
                  <p>View-all</p>
                </Row>
                <Row
                  gutter={[16, 16]}
                  className="featured"
                  style={{ padding: "5%" }}
                >
                  <Col className="gutter-row" span={12}>
                    <Image src={history} width={150} />
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <Image src={medicine} width={150} />
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <Image src={technology} width={150} />
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <Image src={agriculture} width={150} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default Dashboard;
