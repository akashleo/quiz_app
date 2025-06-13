import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Spin } from 'antd';
import { UserOutlined, MailOutlined, UploadOutlined, CameraOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/slices/profile/ProfileAction';
import { fileUpload } from '../../store/slices/file/FileAction';
import defaultAvatar from '../../assets/questionmark.png';
import './Profile.css';

const ProfileDetails = ({ singleProfile, loading, error }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(defaultAvatar);
  const [uploadLoading, setUploadLoading] = useState(false);
  const { currentFileUrl } = useSelector((state) => state.file);

  useEffect(() => {
    if (singleProfile?.image) {
      setImageUrl(singleProfile.image);
    }
    
    // Update form with profile data
    form.setFieldsValue({
      fullName: singleProfile?.fullName || '',
      email: singleProfile?.email || '',
    });
  }, [singleProfile, form]);

  useEffect(() => {
    if (currentFileUrl?.url) {
      setImageUrl(currentFileUrl.url);
      // Automatically update profile with new image
      handleProfileUpdate({ image: currentFileUrl.url });
    }
  }, [currentFileUrl]);

  const handleProfileUpdate = async (updateData) => {
    try {
      const result = await dispatch(updateProfile({
        id: singleProfile._id,
        body: {
          ...updateData,
          fullName: form.getFieldValue('fullName'),
          email: form.getFieldValue('email'),
        }
      })).unwrap();
      
      if (result) {
        message.success('Profile updated successfully!');
      }
    } catch (err) {
      message.error(err || 'Failed to update profile');
    }
  };

  const onFinish = (values) => {
    handleProfileUpdate({
      fullName: values.fullName,
      email: values.email,
      image: imageUrl !== defaultAvatar ? imageUrl : singleProfile?.image,
    });
  };

  const handleImageUpload = async (info) => {
    const file = info.file.originFileObj;
    if (!file) return;

    try {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      await dispatch(fileUpload(formData)).unwrap();
    } catch (error) {
      message.error('Failed to upload image');
    } finally {
      setUploadLoading(false);
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
      <div className="profile-details-container">
        <div className="avatar-section">
          <Upload
            name="avatar"
            showUploadList={false}
            beforeUpload={(file) => {
              handleImageUpload({ file: { originFileObj: file } });
              return false; // Prevent default upload behavior
            }}
            className="avatar-upload"
          >
            <div className="avatar-wrapper">
              <img 
                src={imageUrl} 
                alt="Profile" 
                className="profile-avatar" 
              />
              <div className="avatar-overlay">
                <CameraOutlined className="avatar-overlay-icon" />
                {uploadLoading && <Spin className="upload-spinner" />}
              </div>
            </div>
          </Upload>
        </div>

        <div className="form-section">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="profile-form"
          >
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: '#8692a6' }} />} 
                placeholder="Enter your name"
                className="input-box"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input 
                prefix={<MailOutlined style={{ color: '#8692a6' }} />} 
                placeholder="Enter your email" 
                className="input-box"
                disabled 
              />
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
      </div>
    </div>
  );
};

export default ProfileDetails; 