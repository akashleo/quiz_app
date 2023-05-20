import React, { useState } from "react";
import {
  StarTwoTone,
  BellOutlined,
  PhoneOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Modal, Button, Image } from "antd";
import "./sucess-modal.css";

const SuccessModal = ({ open, setOpen }) => {
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
          <Button className="modal-button"  key="back" onClick={handleCancel}>
            Review quiz
          </Button>,
        ]}
      >
        <div className="question-mark">
          <StarTwoTone />
        </div>
        <div className="confirm-text">
          <p>Congratulations! You have passed </p>
        </div>
        <div className="confirm-text">
          <p>
            Your score was <span>80</span>{" "}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default SuccessModal;
