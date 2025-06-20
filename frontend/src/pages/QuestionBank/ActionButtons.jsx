import React from 'react';
import { Button } from 'antd';
import {
  FileSearchOutlined,
  InboxOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import './questions.css';

const ACTIONS = [
  {
    icon: <FileSearchOutlined />,
    label: 'Archive',
    onClick: (navigate) => navigate("/question/archive"),
    disabled: (state) => state.addQuestionModal
  },
  {
    icon: <InboxOutlined />,
    label: 'Load Questions',
    onClick: (_, setLoadModal) => setLoadModal(true),
    disabled: (state) => state.loadModal
  },
  {
    icon: <PlusOutlined />,
    label: 'Add Question',
    onClick: (_, __, setAddQuestionModal) => setAddQuestionModal(true),
    disabled: (state) => state.addQuestionModal
  }
];

const ActionButtons = ({ navigate, setLoadModal, setAddQuestionModal, state, isMobile = false }) => {
  const buttonClass = isMobile ? "mobile-action-button" : "action-button";
  const containerClass = isMobile ? "mobile-action-buttons" : "action-buttons";

  return (
    <div className={containerClass}>
      {ACTIONS.map((action, index) => (
        isMobile ? (
          <button
            key={index}
            className={buttonClass}
            disabled={action.disabled(state)}
            onClick={() => action.onClick(navigate, setLoadModal, setAddQuestionModal)}
          >
            {action.icon}
            <span className="mobile-action-button-label">{action.label}</span>
          </button>
        ) : (
          <Button
            key={index}
            disabled={action.disabled(state)}
            onClick={() => action.onClick(navigate, setLoadModal, setAddQuestionModal)}
            className={buttonClass}
          >
            {action.icon}
            {action.label}
          </Button>
        )
      ))}
    </div>
  );
};

export default ActionButtons; 