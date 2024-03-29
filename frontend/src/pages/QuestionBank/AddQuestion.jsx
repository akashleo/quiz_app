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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { Packer } from "file-saver";
//import { ObjectId } from 'bson';
import "./questions.css";
import { addQuestion } from "../../store/slices/question/QuestionAction";
import { useDispatch, useSelector } from "react-redux";
import { fileUpload } from "../../store/slices/file/FileAction";
//import { current } from "@reduxjs/toolkit";

const AddQuestion = ({
  addQuestionModal,
  setAddQuestionModal,
  handleOk,
  topics,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { currentFileUrl } = useSelector((state) => state.file);

  const [question, setQuestion] = useState({
    options: [],
    isCorrect: "",
    topicId: "",
    available: "true",
    image: "",
    questionText: "",
  });

  const [topicOptions, setTopicOptions] = useState([]);

  const options = [];

  for (let i = 1; i <= 4; i++) {
    options.push({
      label: "Option " + i,
      value: i,
    });
  }

  useEffect(() => {
    const topicOption = topics.map((item) => {
      return {
        label: item.name,
        value: item._id,
      };
    });
    setTopicOptions(topicOption);
  }, []);

  useEffect(() => {
    setQuestion({ ...question, image: currentFileUrl.url });
  }, [currentFileUrl]);

  const handleFormSubmit = (obj) => {
    console.log(obj);
    const { op1, op2, op3, op4, correct, topicId, questionText } = obj;
    // Do something with the form values, e.g. submit to a server
    const temQuestion = {
      options: [
        { id: 1, text: op1 },
        { id: 2, text: op2 },
        { id: 3, text: op3 },
        { id: 4, text: op4 },
      ],
      isCorrect: correct,
      topicId: topicId,
      available: "true",
      questionText: questionText,
      image: question.image,
    };
    setQuestion(temQuestion);
    console.log(question);
    dispatch(addQuestion(temQuestion));
    setAddQuestionModal(false);
  };

  const handleChange = (values) => {
    console.log(values);
  };

  // const handleFileChange = (event) => {
  //   console.log("event =>", event.target.files[0]);
  //   //setFileName(event.target.files[0].name)
  //   setSelectedFile(event.target.files[0]);
  //   // setSelectedFile(event.target.files[0]);
  // };

  const imageUpload = (file) => {
    //console.log(selectedFile);
    let formData = new FormData();
    //const fileURL = URL.createObjectURL(selectedFile);
    formData.append("file", file);
    console.log("formData", formData);
    dispatch(fileUpload(formData));
  };

  return (
    <Modal
      className="add-question"
      title={"Add Question"}
      style={{ zIndex: 10 }}
      open={addQuestion}
      onOk={handleOk}
      onCancel={handleOk}
      footer={false}
    >
      <div className="add-form">
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            label={<b>Question</b>}
            name="questionText"
            rules={[
              {
                required: true,
                message: "Please enter a question",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Row>
            <Col span={12}>
              <Form.Item
                label={<b>Option 1</b>}
                name="op1"
                className="option-field"
                rules={[
                  {
                    required: true,
                    message: "Please enter option 1",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<b>Option 2</b>}
                name="op2"
                className="option-field"
                rules={[
                  {
                    required: true,
                    message: "Please enter option 2",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<b>Option 3</b>}
                name="op3"
                className="option-field"
                rules={[
                  {
                    required: true,
                    message: "Please enter option 3",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<b>Option 4</b>}
                name="op4"
                className="option-field"
                rules={[
                  {
                    required: true,
                    message: "Please enter option 4",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={<b>Correct Answer</b>}
            name="correct"
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
              onChange={handleChange}
              options={options}
            />
          </Form.Item>

          <Form.Item
            label={<b>Topic</b>}
            name="topicId"
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
              onChange={handleChange}
              options={topicOptions}
            />
          </Form.Item>
          <Form.Item>
            <Space.Compact style={{ width: "100%" }}>
              {/* <Input
                type="file"
                defaultValue={"Upload Image"}
                onChange={handleFileChange}
                value={fileName}
              /> */}
              {/* <Button type="primary" onClick={() => imageUpload()}>
                <UploadOutlined />
                &nbsp;Upload
              </Button> */}
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

export default AddQuestion;
