import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import "./questions.css"

const AddQuestion = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    op1: "",
    op2: "",
    op3: "",
    op4: "",
    correct: "",
    topicId: "",
    topicName: "",
    question: "",
  });

  const handleFormSubmit = (values) => {
    console.log(values);
    // Do something with the form values, e.g. submit to a server
  };

  return (
    <div className="add-form">
      <Form form={form} onFinish={handleFormSubmit} layout="vertical">
        <Form.Item
          label="Question"
          name="question"
          rules={[
            {
              required: true,
              message: "Please enter a question",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Option 1"
          name="op1"
          rules={[
            {
              required: true,
              message: "Please enter option 1",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Option 2"
          name="op2"
          rules={[
            {
              required: true,
              message: "Please enter option 2",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Option 3"
          name="op3"
          rules={[
            {
              required: true,
              message: "Please enter option 3",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Option 4"
          name="op4"
          rules={[
            {
              required: true,
              message: "Please enter option 4",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Correct Answer"
          name="correct"
          rules={[
            {
              required: true,
              message: "Please enter the correct answer",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Topic ID"
          name="topicId"
          rules={[
            {
              required: true,
              message: "Please enter the topic ID",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Topic Name"
          name="topicName"
          rules={[
            {
              required: true,
              message: "Please enter the topic name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item className="button-submit">
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddQuestion;
