import React from 'react';
import LeftMenu from "../../components/LeftMenu";
import { Row, Col, Menu, Image, Button} from "antd";
import "./Topics.css";
import subject from "../../assests/subject.jpg";
const Topics = () =>{

    return (
        <Row style={{ height: "90vh", marginTop: "12vh" }}>
            <Col span={6}>
                <LeftMenu />
            </Col>
            <Col span={18} className='cat-content'>
                <Row>
                    <div>
                        <h2 className='select-topic-head'>Select Topic</h2>
                        <p className='featured-cat-name'>Featured Category</p>
                    </div>
                </Row>
                <div style={{overflow: "hidden",marginTop: "2%"}}>
                    <Row gutter={[16, 16]}>
                            <Col span={6} style={{position: "relative"}}>
                                <Image src={subject}
                                    className='cat-img'
                                    />
                                <p className='cat-name'>History</p>
                            </Col>
                            <Col span={6}>
                                <Image src={subject}
                                    className='cat-img'
                                    />
                                <p className='cat-name'>History</p>
                            </Col>
                            <Col span={6}>
                                <Image src={subject}
                                    className='cat-img'
                                    />
                                <p className='cat-name'>History</p>
                            </Col>
                            <Col span={6}>
                                <Image src={subject}
                                    className='cat-img'
                                    />
                                <p className='cat-name'>History</p>
                            </Col>
                            <Col span={6} style={{position: "relative"}}>
                                <Image src={subject}
                                    className='cat-img'
                                    />
                                <p className='cat-name'>History</p>
                            </Col>
                            <Col span={6}>
                                <Image src={subject}
                                    className='cat-img'
                                    />
                                <p className='cat-name'>History</p>
                            </Col>
                            <Col span={6}>
                                <Image src={subject}
                                    className='cat-img'
                                    />
                                <p className='cat-name'>History</p>
                            </Col>
                            <Col span={6}>
                                <Image src={subject}
                                    className='cat-img'
                                    />
                                <p className='cat-name'>History</p>
                            </Col>
                        </Row>
                    </div>
                    <Row className='more-row'>
                        <Button type="primary" shape="round" size='large' className='more-button'>
                            More
                        </Button>
                    </Row>
            </Col>
        </Row>
    )
}

export default Topics;