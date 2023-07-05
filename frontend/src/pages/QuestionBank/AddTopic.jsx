import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, Select, Row, Col } from "antd";
//import { ObjectId } from 'bson';
import "./questions.css";
import {
  addTopic,
} from "../../store/slices/topic/TopicAction";
import { useDispatch, useSelector } from "react-redux";

const AddTopic = ({ addTopicModal, setAddTopicModal, handleOk, topics }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [topic, setTopic] = useState({
    options: [],
    isCorrect: "",
    topicId: "",
    available: "true",
    topicText: "",
  });

  const options = [];

  for (let i = 1; i <= 4; i++) {
    options.push({
      label: "Option "+i,
      value: i,
    });
  }

  const [topicOptions, setTopicOptions] = useState([]);

  useEffect(()=>{
    const topicOption = topics.map((item)=>{
      return ( {
        label: item.name,
        value: item._id
      })
    })
    setTopicOptions(topicOption);
  },[])

  const handleFormSubmit = (obj) => {
    console.log(obj);
    const {
      op1,
      op2,
      op3,
      op4,
      correct,
      topicId,
      topicText
    }
    = obj
    // Do something with the form values, e.g. submit to a server
const x = {
      options: [{id: 1, text:op1},{id: 2, text:op2},{id: 3, text:op3},{id: 4, text:op4}],
      isCorrect: correct,
      topicId: topicId,
      available: "true",
      image: "./lmao.jpeg",
      topicText: topicText,
    };
    setTopic(x);
    console.log(topic)
    dispatch(addTopic(x));
    setAddTopicModal(false);
  };

  const handleChange = (values) => {
    console.log(values);
    // Do something with the form values, e.g. submit to a server
  };

  return (
    <Modal
      title={"Add Topic"}
      style={{ zIndex: 10 }}
      open={addTopic}
      onOk={handleOk}
      onCancel={handleOk}
      footer={false}
    >
      <div className="add-form">
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
             label={<b>Topic Name</b>}
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter a topic name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Row>
            <Col span={12}>
              <Form.Item
                 label={<b>Instructions</b>}
                name="instructions"
                className="option-field"
                rules={[
                  {
                    required: true,
                    message: "Please enter instructions",
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

export default AddTopic;
