import React, { useState } from "react";
import { Row, Col, Image, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import LeftMenu from "../../components/LeftMenu";
import Navbar from "../../components/Navbar";
import "./Profile.css";
import ProfileImage from "./ProfileImage";
import ProfileName from "./ProfileName";
import ProfilePassword from "./ProfilePassword";
import Achievements from "./Achievements";
import Grades from "./Grades";
import WinnerCharts from "./WinnerCharts";
const Profile = () => {
  // const [name, setName] = useState("John Doe");
  // const [password, setPassword] = useState("");
  // const [photo, setPhoto] = useState(null);
  // const [grades, setGrades] = useState([]);
  // const [history, setHistory] = useState([]);
  const [currentModal, setCurrentModal] = useState("image");
  const [currentTitle, setCurrentTitle] = useState("Display Picture");

  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  // const handlePhotoUpload = (event) => {
  //   const file = event.fileList[0].originFileObj;
  //   setPhoto(URL.createObjectURL(file));
  // };

  // const handleGradesChange = (event) => {
  //   const newGrades = event.target.value.split(",");
  //   setGrades(newGrades);
  // };

  // const handleHistoryChange = (event) => {
  //   const newHistory = event.target.value.split(",");
  //   setHistory(newHistory);
  // };

  // const openModal = (modal) => {
  //   setCurrentModal(modal);
  // };

  // const closeModal = () => {
  //   setCurrentModal(null);
  // };

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
      <Row style={{ height: "90vh", marginTop: "12vh" }}>
        <Col span={6}>
          <LeftMenu profileOnclick={handleButtonChange} />
        </Col>
        <Col span={18}>
          <div className="description">
            <Row>
              <Col span={24}>
                <div className="heading">
                  <h1 className="answering-header">{currentTitle}</h1>
                </div>
              </Col>
              <Col span={12}>
                {currentModal === "image" && <ProfileImage />}
                {currentModal === "name" && <ProfileName />}
                {currentModal === "password" && <ProfilePassword />}
                {currentModal === "achievements" && <Achievements />}
                {currentModal === "grades" && <Grades />}
                {currentModal === "winner" && <WinnerCharts />}
              </Col>
              <Col span={12}>
                <Button className="action-buttons">Edit</Button>
                <Button className="action-buttons">Remove</Button>
                <Button className="action-buttons">Save</Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
