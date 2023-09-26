import React from "react";
import { Table, Tag, Switch } from "antd";
import { EditOutlined } from "@ant-design/icons";

const QuestionList = ({ questions, updateQuestionState,filter }) => {
  const onChange = (event, record, index) => {
    ///console.log(event, record, index);
    const modifiedQuestion = { ...record, available: !record.available };
    updateQuestionState(record._id, modifiedQuestion);
  };

  // const getObject = (id) =>{
  //   return questions.find((item)=> item._id === id)
  // }
  console.log("filter_in",filter)

  const filterTopics = filter.reduce((res,value,index) => {
    if(value.includes("-") && value.split("-")[0] == 'topics'){
      console.log(`filter_in_${index}`,value.split("-")[1])
      res.push(value.split("-")[1])
    }
     return res 
  },[])

  console.log("topic filter",filterTopics)

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
      dataIndex: "_id",
      key: "action",
      render: (value, record, index) => (
        <>
          <EditOutlined />
          &nbsp;&nbsp;
          <Switch
            onChange={(event) => onChange(event, record, index)}
            style={
              record.available
                ? { backgroundColor: "#d3e39a" }
                : { backgroundColor: "#e39a9c" }
            }
            checked={record.available}
            size="small"
          />
        </>
      ),
    },
  ];

  const questionsWithKeys = questions.filter((question) => {
    if(filterTopics.length == 0)
      return true
    return filterTopics.includes(question.topicId)}).map((question, index) => ({
    ...question,
    key: index.toString(), // Use a unique identifier as the key
  }));
  return (
    <Table
      style={{ width: "100%" }}
      className="pop-font"
      dataSource={questionsWithKeys}
      columns={columns}
    />
  );
};

export default QuestionList;
