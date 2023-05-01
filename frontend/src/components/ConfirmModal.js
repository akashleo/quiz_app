import React, { useState } from "react";
import {
  QuestionOutlined,
  BellOutlined,
  PhoneOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Modal, Button, Image } from "antd";
import "./components.css";

const ConfirmModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        style={{ zIndex: 10 }}
        open={open}
        onOk={handleOk}
        footer={[
          <Button className="modal-button" key="back" onClick={handleCancel}>
            No
          </Button>,
          <Button
            className="modal-button"
            key="submit"
            loading={loading}
            onClick={handleOk}
          >
            Yes
          </Button>,
        ]}
      >
        <div className="question-mark">
          <QuestionOutlined />
        </div>
        <div className="confirm-text">
          <p>Are you sure you want to submit the quiz</p>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmModal;
