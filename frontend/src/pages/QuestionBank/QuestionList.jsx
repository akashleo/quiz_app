import React from "react";
import { Table, Tag, Switch } from "antd";
import { EditOutlined } from "@ant-design/icons";

const QuestionList = ({ questions }) => {
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
      render: (value) => <><EditOutlined/>&nbsp;&nbsp;<Switch className="toggle" checked={value} size="small" /></>,
    },
  ];
  return <Table style={{width: "100%"}} dataSource={questions} columns={columns} />;
};

export default QuestionList;
