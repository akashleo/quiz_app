import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, message, Tag, Avatar, Input } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProfilesAdmin } from '../../store/slices/profile/ProfileAction';
import apiConfig from '../../AxiosConfig';

const UserList = () => {
  const [searchText, setSearchText] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const { adminProfiles: users, adminProfilesLoading: loading, adminProfilesError } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?.role === 'admin') {
      dispatch(getAllProfilesAdmin());
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (adminProfilesError) {
      message.error('Failed to fetch users');
    }
  }, [adminProfilesError]);

  const handleDeleteUser = (userId, userName) => {
    Modal.confirm({
      title: 'Delete User',
      content: `Are you sure you want to delete user "${userName}"?`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await apiConfig.delete(`/profile/${userId}`);
          message.success('User deleted successfully');
          dispatch(getAllProfilesAdmin()); // Refresh the list
        } catch (error) {
          message.error('Failed to delete user');
          console.error('Error deleting user:', error);
        }
      },
    });
  };

  const getRoleTag = (role) => {
    return (
      <Tag color={role === 'admin' ? 'red' : 'blue'}>
        {role.toUpperCase()}
      </Tag>
    );
  };

  const getStatusTag = (adminAccessRequested) => {
    const statusConfig = {
      'PENDING': { color: 'orange', text: 'PENDING' },
      'APPROVED': { color: 'green', text: 'APPROVED' },
      'REJECTED': { color: 'red', text: 'REJECTED' },
      '': { color: 'default', text: 'N/A' }
    };
    
    const config = statusConfig[adminAccessRequested] || statusConfig[''];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'image',
      key: 'avatar',
      width: 80,
      render: (image, record) => (
        <Avatar 
          src={image} 
          icon={<UserOutlined />}
          size="large"
          alt={record.fullName}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => getRoleTag(role),
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'User', value: 'user' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Admin Status',
      dataIndex: 'adminAccessRequested',
      key: 'adminAccessRequested',
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Pending', value: 'PENDING' },
        { text: 'Approved', value: 'APPROVED' },
        { text: 'Rejected', value: 'REJECTED' },
        { text: 'N/A', value: '' },
      ],
      onFilter: (value, record) => record.adminAccessRequested === value,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      sorter: (a, b) => a.level - b.level,
    },
    {
      title: 'Quizzes Passed',
      dataIndex: 'quizPassed',
      key: 'quizPassed',
      sorter: (a, b) => parseInt(a.quizPassed || 0) - parseInt(b.quizPassed || 0),
    },
    {
      title: 'Correct Answers',
      dataIndex: 'correctAnswers',
      key: 'correctAnswers',
      sorter: (a, b) => (a.correctAnswers || 0) - (b.correctAnswers || 0),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              // TODO: Implement edit user functionality
              message.info('Edit user functionality to be implemented');
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record._id, record.fullName)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (userInfo?.role !== 'admin') {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h3>Access Denied</h3>
        <p>This section is only available to administrators.</p>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header" style={{ marginBottom: 16 }}>
        <h2>User Management</h2>
        <Input
          placeholder="Search users by name, email, or role..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 400, marginBottom: 16 }}
        />
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredUsers}
        loading={loading}
        rowKey="_id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} users`,
        }}
        scroll={{ x: 1200 }}
        className="user-management-table"
      />
    </div>
  );
};

export default UserList; 