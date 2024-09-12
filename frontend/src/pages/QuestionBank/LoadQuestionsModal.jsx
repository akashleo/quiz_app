import React, { useEffect, useState, useMemo } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  Modal,
  Select,
  Row,
  Col,
  Upload,
  Progress
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { Packer } from "file-saver";
//import { ObjectId } from 'bson';
import "./questions.css";
import { bulkLoadQuestions } from "../../store/slices/question/QuestionAction";
import { useDispatch, useSelector } from "react-redux";
import { fileUpload } from "../../store/slices/file/FileAction";
import Typography from "antd/es/typography/Typography";
//import { current } from "@reduxjs/toolkit";

const LoadQuestions = ({ loadModal,setLoadModal, handleOk, topics }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { currentFileUrl } = useSelector((state) => state.file);

  const [topicOptions, setTopicOptions] = useState([]);
  const [topicId, setTopicId] = useState(0);

  useEffect(() => {
    const topicOption = topics.map((item) => {
      return {
        label: item.name,
        value: item.code,
      };
    });
    setTopicOptions(topicOption);
  }, []);

  const handleFormSubmit = (obj) => {
    console.log(obj);
    //const {topicId, questionText } = obj;
    // Do something with the form values, e.g. submit to a server
    const tempLoad = {
      params: {
        count: obj.amtCount,
        category: obj.categoryId,
      },
      image: currentFileUrl,
    };
    console.log(tempLoad);
    handleOk();
    dispatch(bulkLoadQuestions(tempLoad));
    //setLoadModal(false);
  };

  const handleCountChange = (value) => {
    console.log(value);
    console.log(topicId)
  };

  const handleTopicChange = (value) => {
    const topic = topics.find((item) => item.code === value);
    setTopicId(topic.code);
  };

  const imageUpload = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    console.log("formData", formData);
    dispatch(fileUpload(formData));
  };

  return (
    <Modal
      className="add-question"
      title={"Load Questions"}
      style={{ zIndex: 10 }}
      open={loadModal}
      onOk={handleOk}
      onCancel={handleOk}
      footer={false}
    >
      <div className="add-form">
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            label={<b>Question Count</b>}
            name="amtCount"
            rules={[
              {
                required: true,
                message: "Please enter the correct answer",
              },
            ]}
          >
            <Select
              disabled={false}
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={handleCountChange}
              options={[
                { label: 10, value: 10 },
                { label: 20, value: 20 },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={<b>Topic</b>}
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Please select the Topic",
              },
            ]}
          >
            <Select
              //mode="multiple"
              disabled={false}
              style={{ width: "100%" }}
              placeholder="Please select"
              //defaultValue={["a10", "c12"]}
              onChange={handleTopicChange}
              options={topicOptions}
            />
          </Form.Item>
          <Form.Item
            label={<b>Topic ID</b>}
            name="topicId"
          >
            <Typography.Title level={3} code strong>{topicId}</Typography.Title>
          </Form.Item>
          <Form.Item>
            <Space.Compact style={{ width: "100%" }}>
              <Upload
                beforeUpload={(file, fileList) => {
                  // Access file content here and do something with it
                  console.log(file);
                  imageUpload(file);
                  // Prevent upload
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Space.Compact>
          </Form.Item>
          <Form.Item>
          <Progress percent={100} size="small" />
          </Form.Item>
          <Form.Item className="button-submit">
            <Button type="primary" htmlType="submit" className="submit-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default LoadQuestions;
