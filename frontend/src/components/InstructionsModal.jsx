import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { ClockCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import "./instructions-modal.css";

const InstructionsModal = ({ open, onClose }) => {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    if (open && timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            onClose();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [open, timeRemaining, onClose]);

  // Reset timer when modal opens
  useEffect(() => {
    if (open) {
      setTimeRemaining(10);
    }
  }, [open]);

  const handleStartEarly = () => {
    onClose();
  };

  return (
    <Modal
      className="instructions-modal"
      open={open}
      footer={[
        <Button
          key="start"
          className="start-button"
          onClick={handleStartEarly}
        >
          Start Quiz Now
        </Button>,
      ]}
      closable={false}
      maskClosable={false}
    >
      <div className="instructions-header">
        <InfoCircleOutlined className="info-icon" />
        <h2>Quiz Instructions</h2>
      </div>
      
      <div className="instructions-content">
        <ul className="instructions-list">
          <li>Read each question carefully before selecting your answer.</li>
          <li>You can navigate between questions using the Previous and Next buttons.</li>
          <li>Make sure to submit your quiz before the time runs out.</li>
        </ul>
      </div>

      <div className="timer-section">
        <ClockCircleOutlined className="timer-icon" />
        <div className="timer-text">
          <span>Quiz will start automatically in</span>
          <div className="countdown-display">
            {timeRemaining}s
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InstructionsModal; 