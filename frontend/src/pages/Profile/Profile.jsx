import React, { useState } from "react";
import { Modal, Input, Upload, Button, Menu } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [grades, setGrades] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentModal, setCurrentModal] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhotoUpload = (event) => {
    const file = event.fileList[0].originFileObj;
    setPhoto(URL.createObjectURL(file));
  };

  const handleGradesChange = (event) => {
    const newGrades = event.target.value.split(",");
    setGrades(newGrades);
  };

  const handleHistoryChange = (event) => {
    const newHistory = event.target.value.split(",");
    setHistory(newHistory);
  };

  const openModal = (modal) => {
    setCurrentModal(modal);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  return (
    <div>
      <h2>Profile Page</h2>

      <Menu mode="horizontal">
        <Menu.Item onClick={() => openModal("name")}>Name</Menu.Item>
        <Menu.Item onClick={() => openModal("password")}>Password</Menu.Item>
        <Menu.Item onClick={() => openModal("photo")}>Profile Photo</Menu.Item>
        <Menu.Item onClick={() => openModal("grades")}>Grades</Menu.Item>
        <Menu.Item onClick={() => openModal("history")}>History</Menu.Item>
      </Menu>

      <Modal
        visible={currentModal !== null}
        onCancel={closeModal}
        footer={null}
      >
        {currentModal === "name" && (
          <div>
            <h3>Change Name</h3>
            <Input value={name} onChange={handleNameChange} />
            <Button onClick={closeModal}>Save</Button>
          </div>
        )}
        {currentModal === "password" && (
          <div>
            <h3>Change Password</h3>
            <Input.Password value={password} onChange={handlePasswordChange} />
            <Button onClick={closeModal}>Save</Button>
          </div>
        )}
        {currentModal === "photo" && (
          <div>
            <h3>Upload Profile Photo</h3>
            <Upload
              accept="image/*"
              beforeUpload={() => false}
              onChange={handlePhotoUpload}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            {photo && <img src={photo} alt="Profile" />}
            <Button onClick={closeModal}>Save</Button>
          </div>
        )}
        {currentModal === "grades" && (
          <div>
            <h3>Change Grades</h3>
            <Input.TextArea value={grades} onChange={handleGradesChange} />
            <Button onClick={closeModal}>Save</Button>
          </div>
        )}
        {currentModal === "history" && (
          <div>
            <h3>Change History</h3>
            <Input.TextArea value={history} onChange={handleHistoryChange} />
            <Button onClick={closeModal}>Save</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Profile;
