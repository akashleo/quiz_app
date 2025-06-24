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
  Progress,
  message,
  Spin
} from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";

import { Packer } from "file-saver";
//import { ObjectId } from 'bson';
import "./questions.css";
import { bulkLoadQuestions } from "../../store/slices/question/QuestionAction";
import { useDispatch, useSelector } from "react-redux";
import { fileUpload } from "../../store/slices/file/FileAction";
import Typography from "antd/es/typography/Typography";
//import { current } from "@reduxjs/toolkit";

const LoadQuestions = ({ loadModal, setLoadModal, handleOk, topics }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { currentFileUrl, loading: fileLoading } = useSelector((state) => state.file);
  const { loading: questionLoading, error: questionError } = useSelector((state) => state.question);

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
  }, [topics]);

  // Handle question loading state changes
  useEffect(() => {
    if (submitting) {
      if (!questionLoading && !questionError) {
        // Success case
        setSubmitting(false);
        message.success('Questions loaded successfully!');
        form.resetFields();
        setFileList([]);
        setTopicId(0);
        handleOk();
      } else if (!questionLoading && questionError) {
        // Error case
        setSubmitting(false);
        message.error(`Failed to load questions: ${questionError}`);
      }
    }
  }, [questionLoading, questionError, submitting, form, handleOk]);

  const handleFormSubmit = async (obj) => {
    if (!currentFileUrl) {
      message.error('Please upload an image first');
      return;
    }

    try {
      setSubmitting(true);
      const tempLoad = {
        params: {
          count: obj.amtCount,
          category: obj.categoryId,
        },
        image: currentFileUrl,
      };
      
      await dispatch(bulkLoadQuestions(tempLoad));
    } catch (error) {
      setSubmitting(false);
      message.error('An unexpected error occurred while loading questions');
      console.error('Bulk load error:', error);
    }
  };

  const handleTopicChange = (value) => {
    const topic = topics.find((item) => item.code === value);
    setTopicId(topic.code);
  };

  const imageUpload = (file) => {
    setUploading(true);
    let formData = new FormData();
    formData.append("file", file);
    dispatch(fileUpload(formData))
      .then(() => {
        setUploading(false);
        message.success('Image uploaded successfully');
      })
      .catch((error) => {
        setUploading(false);
        message.error('Failed to upload image');
        console.error('Upload error:', error);
      });
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return Upload.LIST_IGNORE;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!');
        return Upload.LIST_IGNORE;
      }

      imageUpload(file);
      return false;
    },
    maxCount: 1,
    fileList: fileList,
    onChange: ({ fileList }) => setFileList(fileList),
    onRemove: () => {
      setFileList([]);
    }
  };

  const handleCancel = () => {
    if (submitting || uploading) {
      message.warning('Please wait for the current operation to complete');
      return;
    }
    form.resetFields();
    setFileList([]);
    setTopicId(0);
    handleOk();
  };

  const isFormDisabled = uploading || submitting || fileLoading;

  return (
    <Modal
      className="add-question"
      title={"Load Questions"}
      style={{ zIndex: 10 }}
      open={loadModal}
      onCancel={handleCancel}
      footer={false}
      closable={!submitting && !uploading}
      maskClosable={!submitting && !uploading}
    >
      <div className="add-form">
        <Spin spinning={submitting} tip="Loading questions..." size="large">
          <Form form={form} onFinish={handleFormSubmit} layout="vertical">
            <Form.Item
              label={<b>Question Count</b>}
              name="amtCount"
              rules={[
                {
                  required: true,
                  message: "Please select question count",
                },
              ]}
            >
              <Select
                disabled={isFormDisabled}
                style={{ width: "100%" }}
                placeholder="Please select"
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
                disabled={isFormDisabled}
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleTopicChange}
                options={topicOptions}
              />
            </Form.Item>
            <Form.Item
              label={<b>Topic ID</b>}
              name="topicId"
            >
              <Typography.Title level={3} code strong>{topicId || 'Select a topic'}</Typography.Title>
            </Form.Item>
            <Form.Item
              label={<b>Upload Image</b>}
              required
              tooltip="Please upload an image file (max: 5MB)"
            >
              <Upload {...uploadProps} disabled={isFormDisabled}>
                <Button 
                  icon={<UploadOutlined />} 
                  loading={uploading}
                  disabled={fileList.length === 1 || isFormDisabled}
                >
                  {fileList.length === 1 ? 'Image Uploaded' : 'Upload Image'}
                </Button>
              </Upload>
            </Form.Item>
            {uploading && (
              <Form.Item>
                <Progress percent={100} size="small" status="active" />
              </Form.Item>
            )}
            <Form.Item className="button-submit">
              <Button 
                type="primary" 
                htmlType="submit" 
                className="submit-button"
                disabled={!currentFileUrl || isFormDisabled}
                loading={submitting}
                icon={submitting ? <LoadingOutlined /> : null}
              >
                {submitting ? 'Loading Questions...' : 'Submit'}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </Modal>
  );
};

export default LoadQuestions;
