import React from "react";
import { Tabs } from "antd";
import Navbar from "../../components/Navbar";
import "./Profile.css";
import ProfileDetails from "./ProfileDetails";
import Achievements from "./Achievements";
import ReviewAnswers from "./ReviewAnswers";
import UserList from "./UserList";
import AdminRequests from "./AdminRequests";
import { useSelector } from "react-redux";

const Profile = () => {
  const { singleProfile, loading, error } = useSelector((state) => state.profile);
  const { userInfo } = useSelector((state) => state.auth);

  // Base items available to all users
  const baseItems = [
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

  // Admin-only items
  const adminItems = [
    {
      key: "4",
      label: "User List",
      children: <UserList />,
    },
    {
      key: "5",
      label: "Admin Requests",
      children: <AdminRequests />,
    },
  ];

  // Combine items based on user role
  const items = userInfo?.role === 'admin' ? [...baseItems, ...adminItems] : baseItems;

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
