import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { TrophyOutlined, FireOutlined, StarOutlined, ThunderboltOutlined } from '@ant-design/icons';

const Achievements = ({ singleProfile }) => {
  // Convert emoji code to actual emoji
  const getEmoji = (code) => {
    return String.fromCodePoint(parseInt(code.replace('U+', ''), 16));
  };

  const stats = [
    {
      title: 'Level',
      value: singleProfile?.level || 0,
      icon: <TrophyOutlined style={{ fontSize: '24px', color: '#4299E1' }} />,
    },
    {
      title: 'Quizzes Passed',
      value: singleProfile?.quizPassed || 0,
      icon: <StarOutlined style={{ fontSize: '24px', color: '#48BB78' }} />,
    },
    {
      title: 'Fastest Time',
      value: singleProfile?.fastestTime || 0,
      suffix: 'min',
      icon: <ThunderboltOutlined style={{ fontSize: '24px', color: '#ECC94B' }} />,
    },
    {
      title: 'Correct Answers',
      value: singleProfile?.correctAnswers || 0,
      icon: <FireOutlined style={{ fontSize: '24px', color: '#F56565' }} />,
    },
  ];

  return (
    <div className="achievements-dashboard">
      <Row gutter={[24, 24]}>
        {stats.map((stat, index) => (
          <Col xs={12} sm={12} md={6} key={index}>
            <Card className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <Statistic
                title={stat.title}
                value={stat.value}
                suffix={stat.suffix}
                className="stat-value"
              />
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="section-title">Achievements</h2>
      <Row gutter={[24, 24]}>
        {singleProfile?.achievements?.map((achievement, index) => (
          <Col xs={12} sm={8} md={6} key={index}>
            <Card className="achievement-card">
              <div className="achievement-content" style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '48px' }}>{getEmoji(achievement)}</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Achievements;
