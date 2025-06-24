import React, { useEffect, useState } from "react";
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
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import "./questions.css";
import { addQuestion } from "../../store/slices/question/QuestionAction";
import { useDispatch, useSelector } from "react-redux";
import { fileUpload } from "../../store/slices/file/FileAction";

const AddQuestion = ({
  addQuestionModal,
  setAddQuestionModal,
  handleOk,
  topics,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { currentFileUrl, loading: fileLoading, error: fileError } = useSelector((state) => state.file);

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
  }, [topics]);

  useEffect(() => {
    if (currentFileUrl?.url) {
      setQuestion(prev => ({ ...prev, image: currentFileUrl.url }));
    }
  }, [currentFileUrl]);

  useEffect(() => {
    if (fileError) {
      message.error(`File upload failed: ${fileError}`);
    }
  }, [fileError]);

  const handleFormSubmit = async (obj) => {
    try {
      const { op1, op2, op3, op4, correct, topicId, questionText } = obj;
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
      
      await dispatch(addQuestion(temQuestion)).unwrap();
      message.success("Question added successfully!");
      form.resetFields();
      setQuestion({
        options: [],
        isCorrect: "",
        topicId: "",
        available: "true",
        image: "",
        questionText: "",
      });
      setAddQuestionModal(false);
    } catch (error) {
      message.error("Failed to add question. Please try again.");
      console.error("Error adding question:", error);
    }
  };

  const handleChange = (values) => {
    console.log(values);
  };

  const imageUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    dispatch(fileUpload(formData));
  };

  const handleModalClose = () => {
    form.resetFields();
    setQuestion({
      options: [],
      isCorrect: "",
      topicId: "",
      available: "true",
      image: "",
      questionText: "",
    });
    handleOk();
  };

  return (
    <Modal
      className="add-question"
      title={"Add Question"}
      style={{ zIndex: 10 }}
      open={addQuestionModal}
      onOk={handleModalClose}
      onCancel={handleModalClose}
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
              disabled={false}
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={handleChange}
              options={topicOptions}
            />
          </Form.Item>
          <Form.Item>
            <Space.Compact style={{ width: "100%" }}>
              <Upload
                beforeUpload={(file, fileList) => {
                  // Validate file type
                  const isImage = file.type.startsWith('image/');
                  if (!isImage) {
                    message.error('You can only upload image files!');
                    return false;
                  }
                  
                  // Validate file size (e.g., 5MB)
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    message.error('Image must be smaller than 5MB!');
                    return false;
                  }
                  
                  imageUpload(file);
                  return false;
                }}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} loading={fileLoading}>
                  {fileLoading ? 'Uploading...' : 'Click to Upload'}
                </Button>
              </Upload>
              {question.image && (
                <span style={{ marginLeft: 10, color: 'green' }}>
                  ✓ Image uploaded
                </span>
              )}
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
