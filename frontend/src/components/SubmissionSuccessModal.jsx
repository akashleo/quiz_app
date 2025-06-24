import React from "react";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Modal, Button } from "antd";
import "./success-modal.css";

const SubmissionSuccessModal = ({ open, onGoToDashboard }) => {

  const handleGoToDashboard = () => {
    onGoToDashboard();
  };

  return (
    <>
      <Modal 
        className="success-modal"
        style={{ zIndex: 10 }}
        open={open}
        footer={[
          <Button 
            className="modal-button" 
            key="dashboard" 
            onClick={handleGoToDashboard}
            type="primary"
          >
            Go to Dashboard
          </Button>,
        ]}
        closable={false}
        maskClosable={false}
      >
        <div className="question-mark">
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        </div>
        <div className="confirm-text">
          <p>Your response has been submitted</p>
        </div>
        <div className="confirm-text">
          <p>Thank you for completing the quiz!</p>
        </div>
      </Modal>
    </>
  );
};

export default SubmissionSuccessModal; 