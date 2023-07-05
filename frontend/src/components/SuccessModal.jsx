import React from "react";
import { StarTwoTone } from "@ant-design/icons";
import { Modal, Button } from "antd";
import "./success-modal.css";

const SuccessModal = ({ open, setOpen }) => {
  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal 
        className="success-modal"
        style={{ zIndex: 10 }}
        open={open}
        onOk={handleOk}
        footer={[
          <Button className="modal-button" key="back" onClick={handleCancel}>
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
