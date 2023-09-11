import React from "react";
import { Image } from "antd";
import { CameraOutlined } from "@ant-design/icons";

const ProfileImage = () => {
  return (
    <div className="profile-image">
      <img
        src="https://www.w3schools.com/howto/img_avatar.png"
        className="custom-avt"
      ></img>
      <div className="overlay">
        <button>
          <CameraOutlined />
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
