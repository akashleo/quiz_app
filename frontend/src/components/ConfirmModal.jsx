import React, { useState } from "react";
import {
  QuestionOutlined,
  
} from "@ant-design/icons";
import { Modal, Button } from "antd";
import "./confirm-modal.css";
import { useNavigate } from "react-router-dom";

const ConfirmModal = ({ open, setOpen, submitQuiz }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      submitQuiz();
      
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        className="confirm-modal"
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
