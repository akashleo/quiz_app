import React, { useEffect } from "react";
import LeftMenu from "../../components/LeftMenu";
import { Row, Col, Menu, Image, Button } from "antd";
import "./Topics.css";
import subject from "../../assests/subject.jpg";
import Navbar from "../../components/Navbar";
import { getAllTopics } from "../../store/slices/topic/TopicAction";
import { useDispatch, useSelector } from "react-redux";

const Topics = () => {

const dispatch = useDispatch();

const { topics } = useSelector((state) => state.topic);


useEffect(()=>{
    if(!topics.length>0)
    {
        dispatch(getAllTopics());
    }
})

  return (
    <>
      <Navbar/>
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
            <Row gutter={[16, 16]} style={{height: "25rem", overflowY: "auto"}}>
                {topics.map((item)=>{
                    return <Col span={6} style={{ position: "relative" }}>
                    <Image src={subject} preview={false} className="cat-img" />
                    <p className="cat-name">{item.name}</p>
                  </Col>
                })}                          
            </Row>
        </Col>
      </Row>
    </>
  );
};

export default Topics;
