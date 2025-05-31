import React from "react";
import { Tabs } from "antd";
import Navbar from "../../components/Navbar";
import "./Profile.css";
import ProfileDetails from "./ProfileDetails";
import Achievements from "./Achievements";
import ReviewAnswers from "./ReviewAnswers";

const Profile = () => {
  const items = [
    {
      key: "1",
      label: "Profile Details",
      children: <ProfileDetails />,
    },
    {
      key: "2",
      label: "Achievements",
      children: <Achievements />,
    },
    {
      key: "3",
      label: "Review Answers",
      children: <ReviewAnswers />,
    },
  ];

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-content">
        <div className="profile-card">
          <h1 className="profile-title">My Profile</h1>
          <Tabs
            defaultActiveKey="1"
            items={items}
            className="profile-tabs"
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
