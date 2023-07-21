import React from "react";
import { Table, Tag, Switch } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteTopic } from "../../store/slices/topic/TopicAction";
import { useDispatch, useSelector } from "react-redux";

const TopicList = ({ topics, updateQuestionState }) => {
    const dispatch = useDispatch();
  const onChange = (event, record, index) => {
    ///console.log(event, record, index);
    const modifiedQuestion = { ...record, available: !record.available };
    updateQuestionState(record._id, modifiedQuestion);
  };
  const deleteTopicRow = (id) =>{
    dispatch(deleteTopic(id))
  }
  const columns = [
    {
      title: "Topic Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ID",
      dataIndex: "code",
      key: "id",
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
          <DeleteOutlined onClick={()=>{deleteTopicRow(record._id)}}/>
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
  return (
    <Table
      style={{ width: "100%" }}
      className="pop-font"
      dataSource={topics}
      columns={columns}
    />
  );
};

export default TopicList;
