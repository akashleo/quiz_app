import React from "react";
import { Table, Tag, Switch } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useWindowSize } from "../../hooks/useWindowSize";

const QuestionList = ({ questions, updateQuestionState }) => {
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  const onChange = (event, record, index) => {
    ///console.log(event, record, index);
    const modifiedQuestion = { ...record, available: !record.available };
    updateQuestionState(record._id, modifiedQuestion);
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "questionText",
      key: "question",
      ellipsis: true,
      width: isMobile ? 150 : "auto",
    },
    {
      title: "Options",
      dataIndex: "options",
      key: "options",
      responsive: ["md"],
      render: (_, { options }) => (
        <div className="options-container">
          {options.map((option, index) => (
            <Tag key={index}>{option.text}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Correct",
      dataIndex: "correct",
      key: "correct",
      responsive: ["lg"],
    },
    {
      title: "Status",
      dataIndex: "available",
      key: "av",
      width: isMobile ? 80 : 100,
      render: (value) => (
        <span className={`status-tag ${value ? "active" : "archived"}`}>
          {value ? "Active" : "Archived"}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: isMobile ? 80 : 100,
      render: (value, record, index) => (
        <div className="action-cell">
          <EditOutlined className="edit-icon" />
          <Switch
            onChange={(event) => onChange(event, record, index)}
            className={`status-switch ${record.available ? "active" : "archived"}`}
            checked={record.available}
            size="small"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="question-table-container">
      <Table
        dataSource={questions}
        columns={columns}
        className="question-table"
        scroll={{ x: true }}
        pagination={{
          responsive: true,
          position: ["bottomCenter"],
          size: isMobile ? "small" : "default",
        }}
      />
    </div>
  );
};

export default QuestionList;
