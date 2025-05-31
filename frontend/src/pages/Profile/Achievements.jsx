import React from 'react';
import { Row, Col, Card, Progress, Statistic } from 'antd';
import { TrophyOutlined, FireOutlined, StarOutlined, ThunderboltOutlined } from '@ant-design/icons';
import questionmark from '../../assets/questionmark.png';

const Achievements = () => {
  // Mock data - replace with actual data from your backend
  const achievements = [
    {
      id: 1,
      title: 'Quiz Master',
      description: 'Complete 10 quizzes with score above 80%',
      progress: 80,
      badge: questionmark,
      unlocked: true,
    },
    {
      id: 2,
      title: 'Speed Demon',
      description: 'Complete a quiz in under 5 minutes',
      progress: 100,
      badge: questionmark,
      unlocked: true,
    },
    {
      id: 3,
      title: 'Perfect Score',
      description: 'Get 100% in any quiz',
      progress: 60,
      badge: questionmark,
      unlocked: false,
    },
  ];

  const stats = [
    {
      title: 'Total Quizzes',
      value: 15,
      icon: <TrophyOutlined style={{ fontSize: '24px', color: '#4299E1' }} />,
    },
    {
      title: 'Avg. Score',
      value: '85%',
      icon: <StarOutlined style={{ fontSize: '24px', color: '#48BB78' }} />,
    },
    {
      title: 'Current Streak',
      value: 5,
      suffix: 'days',
      icon: <FireOutlined style={{ fontSize: '24px', color: '#F56565' }} />,
    },
    {
      title: 'Best Time',
      value: '4:30',
      suffix: 'min',
      icon: <ThunderboltOutlined style={{ fontSize: '24px', color: '#ECC94B' }} />,
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

      <h2 className="section-title">Badges & Achievements</h2>
      <Row gutter={[24, 24]}>
        {achievements.map((achievement) => (
          <Col xs={24} sm={12} md={8} key={achievement.id}>
            <Card className={`achievement-card ${!achievement.unlocked ? 'locked' : ''}`}>
              <div className="achievement-content">
                <img
                  src={achievement.badge}
                  alt={achievement.title}
                  className="achievement-badge"
                />
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <Progress
                  percent={achievement.progress}
                  status={achievement.progress === 100 ? 'success' : 'active'}
                  strokeColor={{
                    '0%': '#4299E1',
                    '100%': '#48BB78',
                  }}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Achievements;
