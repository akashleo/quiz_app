import React, { useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import "./Topics.css";
import Navbar from "../../components/Navbar";
import { getAllTopics } from "../../store/slices/topic/TopicAction";
import { useDispatch, useSelector } from "react-redux";
import TopicCard from "./TopicCard";
import { createNewAnswer } from "../../store/slices/answer/AnswerAction";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

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
      <div className="topics-container-user">
        <div className="topics-content-user">
          <div className="topics-header-user">
            <Title level={2} className="topics-title-user">Select Topic</Title>
            <Title level={5} className="topics-subtitle-user">Featured Category</Title>
          </div>
          
          <Row gutter={[24, 24]} className="topics-grid-user">
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
        </div>
      </div>
    </>
  );
};

export default Topics;
