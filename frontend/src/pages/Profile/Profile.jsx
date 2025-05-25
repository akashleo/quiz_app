import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import Navbar from "../../components/Navbar";
import "./Profile.css";
import ProfileImage from "./ProfileImage";
import ProfileName from "./ProfileName";
import ProfilePassword from "./ProfilePassword";
import Achievements from "./Achievements";
import Grades from "./Grades";
import WinnerCharts from "./WinnerCharts";

const Profile = () => {
  const [currentModal, setCurrentModal] = useState("image");
  const [currentTitle, setCurrentTitle] = useState("Display Picture");

  const handleButtonChange = (value) => {
    setCurrentModal(value);
    if (value === "image") setCurrentTitle("Display Picture");
    if (value === "name") setCurrentTitle("Name");
    if (value === "password") setCurrentTitle("Password");
    if (value === "achievements") setCurrentTitle("Achievements");
    if (value === "grades") setCurrentTitle("Grades");
    if (value === "winner") setCurrentTitle("Winner Charts");
  };

  return (
    <>
      <Navbar />
      <Row style={{ height: "88vh", marginTop: "12vh" }}>
        <Col span={24}>
          <div className="description">
            <Row>
              <Col span={24}>
                <div className="heading">
                  <h1 className="answering-header">{currentTitle}</h1>
                </div>
              </Col>
              <Col xs={24} md={16}>
                {currentModal === "image" && <ProfileImage />}
                {currentModal === "name" && <ProfileName />}
                {currentModal === "password" && <ProfilePassword />}
                {currentModal === "achievements" && <Achievements />}
                {currentModal === "grades" && <Grades />}
                {currentModal === "winner" && <WinnerCharts />}
              </Col>
              <Col xs={24} md={8}>
                <div className="profile-actions">
                  <Button 
                    className="action-buttons"
                    onClick={() => handleButtonChange("image")}
                  >
                    Display Picture
                  </Button>
                  <Button 
                    className="action-buttons"
                    onClick={() => handleButtonChange("name")}
                  >
                    Name
                  </Button>
                  <Button 
                    className="action-buttons"
                    onClick={() => handleButtonChange("password")}
                  >
                    Password
                  </Button>
                  <Button 
                    className="action-buttons"
                    onClick={() => handleButtonChange("achievements")}
                  >
                    Achievements
                  </Button>
                  <Button 
                    className="action-buttons"
                    onClick={() => handleButtonChange("grades")}
                  >
                    Grades
                  </Button>
                  <Button 
                    className="action-buttons"
                    onClick={() => handleButtonChange("winner")}
                  >
                    Winner Charts
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
