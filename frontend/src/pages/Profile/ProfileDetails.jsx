import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Spin } from 'antd';
import { UserOutlined, MailOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/slices/profile/ProfileAction';
import defaultAvatar from '../../assests/profilepic.png';

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { singleProfile, loading, error } = useSelector((state) => state.profile);
  const [imageUrl, setImageUrl] = useState(defaultAvatar);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    if (singleProfile?.profilePicture) {
      setImageUrl(singleProfile.profilePicture);
    }
    
    // Update form with profile data
    form.setFieldsValue({
      name: singleProfile?.name || '',
      email: singleProfile?.email || '',
    });
  }, [singleProfile, form]);

  const onFinish = async (values) => {
    try {
      const updateData = {
        id: singleProfile._id,
        body: {
          name: values.name,
          email: values.email,
          profilePicture: imageUrl !== defaultAvatar ? imageUrl : singleProfile?.profilePicture,
        }
      };

      const result = await dispatch(updateProfile(updateData)).unwrap();
      if (result) {
        message.success('Profile updated successfully!');
      }
    } catch (err) {
      message.error(err || 'Failed to update profile');
    }
  };

  const handleImageUpload = (info) => {
    if (info.file.status === 'uploading') {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setUploadLoading(false);
      // In a real application, you would upload to a server and get back a URL
      // For now, we'll use local file URL
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
      message.success('Profile picture updated successfully!');
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="profile-details">
      <div className="profile-header">
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <img src={imageUrl} alt="Profile" className="profile-avatar" />
            <Upload
              name="avatar"
              showUploadList={false}
              onChange={handleImageUpload}
              className="avatar-upload"
            >
              <Button icon={<UploadOutlined />} loading={uploadLoading}>
                Change Picture
              </Button>
            </Upload>
          </div>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="profile-form"
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter your email" disabled />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="update-button"
            loading={loading}
          >
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileDetails; 