import React from "react";
import { Tabs } from "antd";
import Navbar from "../../components/Navbar";
import "./Profile.css";
import ProfileDetails from "./ProfileDetails";
import Achievements from "./Achievements";
import ReviewAnswers from "./ReviewAnswers";
import { useSelector } from "react-redux";

const Profile = () => {
  const { singleProfile, loading, error } = useSelector((state) => state.profile);
  const items = [
    {
      key: "1",
      label: "Profile Details",
      children: <ProfileDetails singleProfile={singleProfile} loading={loading} error={error} />,
    },
    {
      key: "2",
      label: "Achievements",
      children: <Achievements singleProfile={singleProfile} />,
    },
    {
      key: "3",
      label: "Review Answers",
      children: <ReviewAnswers singleProfile={singleProfile} />,
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
