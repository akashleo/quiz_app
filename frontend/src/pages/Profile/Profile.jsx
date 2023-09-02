import React, { useState } from "react";
import { Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import LeftMenu from "../../components/LeftMenu";
import Navbar from "../../components/Navbar";
const Profile = () => {
  // const [name, setName] = useState("John Doe");
  // const [password, setPassword] = useState("");
  // const [photo, setPhoto] = useState(null);
  // const [grades, setGrades] = useState([]);
  // const [history, setHistory] = useState([]);
  // const [currentModal, setCurrentModal] = useState(null);

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

  return (
    <>
      <Navbar />
      <Row style={{ height: "90vh", marginTop: "12vh" }}>
        <Col span={6}>
          <LeftMenu />
        </Col>
        <Col span={18}>
          <div className="description">
            <div className="heading">
              <h1 className="answering-header">Profile Image</h1>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
