import React, { useEffect, useState } from "react";
import { Row, Col, Image, Button } from "antd";
import "./Topics.css";
import subject from "../../assests/qbg2.jpg";
import Navbar from "../../components/Navbar";
import { getAllTopics } from "../../store/slices/topic/TopicAction";
import { useDispatch, useSelector } from "react-redux";
import TopicCard from "./TopicCard";
import { createNewAnswer } from "../../store/slices/answer/AnswerAction";
import { useNavigate } from "react-router-dom";

const Topics = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { topics } = useSelector((state) => state.topic);
  const { singleProfile } = useSelector((state) => state.profile);

  const [selectedTopic, setSelectedTopic] = useState(0);
  const [topic, setTopic] = useState({});

  useEffect(() => {
    if (!topics.length > 0) {
      dispatch(getAllTopics());
    }
  }, []);

  useEffect(() => {
    if (Object.keys(topic).length) {
      dispatch(createNewAnswer({ userId: singleProfile._id, answers: {}, topicId: topic._id }));
      navigate("/answer");
    }
  }, [topic]);

  return (
    <>
      <Navbar />
      <Row style={{ height: "88vh", marginTop: "12vh" }}>
        <Col span={24} className="cat-content">
          <Row>
            <div>
              <h2 className="select-topic-head">Select Topic</h2>
              <p className="featured-cat-name">Featured Category</p>
            </div>
          </Row>
          <Row gutter={[16, 16]}>
            {topics.map((item) => {
              if (item.questions?.length > 0) {
                return (
                  <TopicCard
                    key={item._id}
                    topicData={item}
                    setTopic={setTopic}
                    selectedTopic={selectedTopic}
                    setSelectedTopic={setSelectedTopic}
                  />
                );
              }
              return null;
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Topics;
