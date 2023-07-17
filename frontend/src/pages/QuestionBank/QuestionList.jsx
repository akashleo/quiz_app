import React from "react";
import { Table, Tag, Switch } from "antd";
import { EditOutlined } from "@ant-design/icons";

const QuestionList = ({ questions, updateQuestionState }) => {
  const onChange = (event, record, index) => {
    console.log(event, record, index);
    const modifiedQuestion = { ...questions[index], available: !record.available };
    updateQuestionState(record._id, modifiedQuestion);
  };
  const columns = [
    {
      title: "Question",
      dataIndex: "questionText",
      key: "question",
    },
    {
      title: "Options",
      dataIndex: "options",
      key: "options",
      render: (_, { options }) => (
        <>
          {options.map((option) => {
            return <Tag>{option.text}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Correct",
      dataIndex: "correct",
      key: "address",
    },
    {
      title: "Active",
      dataIndex: "available",
      key: "av",
      render: (value) => <b>{value ? "Active" : "Archived"}</b>,
    },
    {
      title: "Action",
      dataIndex: "available",
      key: "action",
      render: (value, record, index) => (
        <>
          <EditOutlined />
          &nbsp;&nbsp;
          <Switch
            onChange={(event, record, index) => onChange(event, record, index)}
            style={
              value
                ? { backgroundColor: "#d3e39a" }
                : { backgroundColor: "#e39a9c" }
            }
            checked={value}
            size="small"
          />
        </>
      ),
    },
  ];
  return (
    <Table
      style={{ width: "100%" }}
      className="pop-font"
      dataSource={questions}
      columns={columns}
    />
  );
};

export default QuestionList;
