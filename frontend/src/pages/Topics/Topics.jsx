import React, { useEffect, useState } from "react";
import LeftMenu from "../../components/LeftMenu";
import { Row, Col, Menu, Image, Button } from "antd";
import "./Topics.css";
import subject from "../../assests/qbg2.jpg";
import Navbar from "../../components/Navbar";
import { getAllTopics } from "../../store/slices/topic/TopicAction";
import { useDispatch, useSelector } from "react-redux";
import TopicCard from "./TopicCard";
import { updateAnswer } from "../../store/slices/answer/AnswerSlice";
import { useNavigate } from "react-router-dom";

const Topics = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { topics } = useSelector((state) => state.topic);

  const [selectedTopic, setSelectedTopic] = useState(0);

  const [topic, setTopic] = useState({});

  useEffect(() => {
    if (!topics.length > 0) {
      dispatch(getAllTopics());
    }
  }, []);

  useEffect(() => {
    if (Object.keys(topic).length){
      dispatch(updateAnswer({ id: topic._id, name: "Akash" }));
      navigate("/answer");
    }
  }, [topic]);

  return (
    <>
      <Navbar />
      <Row style={{ height: "88vh", marginTop: "12vh" }}>
        <Col span={6}>
          <LeftMenu />
        </Col>
        <Col span={18} className="cat-content">
          <Row>
            <div>
              <h2 className="select-topic-head">Select Topic</h2>
              <p className="featured-cat-name">Featured Category</p>
            </div>
          </Row>
          <Row gutter={[16, 16]}>
            {topics.map((item) => {
              return (
                <TopicCard
                  topicData={item}
                  setTopic = {setTopic}
                  selectedTopic={selectedTopic}
                  setSelectedTopic={setSelectedTopic}
                />
              );
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Topics;
