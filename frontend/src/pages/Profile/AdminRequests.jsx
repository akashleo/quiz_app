import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, message, Tag, Avatar, Card, Descriptions } from 'antd';
import { UserOutlined, CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getPendingAdminRequests } from '../../store/slices/profile/ProfileAction';
import { adminApproved, adminRejected } from '../../store/slices/auth/AuthActions';

const AdminRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { pendingRequests: requests, pendingRequestsLoading: loading, pendingRequestsError } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?.role === 'admin') {
      dispatch(getPendingAdminRequests());
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (pendingRequestsError) {
      message.error('Failed to fetch admin requests');
    }
  }, [pendingRequestsError]);

  const handleApproveRequest = (profileId, record) => {
    Modal.confirm({
      title: 'Approve Admin Request',
      content: `Are you sure you want to approve admin access for "${record.fullName}"?`,
      okText: 'Yes, Approve',
      okType: 'primary',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const result = await dispatch(adminApproved({ 
            profileId, 
            email: userInfo.email 
          })).unwrap();
          
          message.success('Admin request approved successfully');
          dispatch(getPendingAdminRequests()); // Refresh the list
        } catch (error) {
          message.error('Failed to approve admin request');
          console.error('Error approving admin request:', error);
        }
      },
    });
  };

  const handleRejectRequest = (profileId, record) => {
    Modal.confirm({
      title: 'Reject Admin Request',
      content: `Are you sure you want to reject admin access for "${record.fullName}"?`,
      okText: 'Yes, Reject',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const result = await dispatch(adminRejected({ 
            profileId, 
            email: userInfo.email 
          })).unwrap();
          
          message.success('Admin request rejected');
          dispatch(getPendingAdminRequests()); // Refresh the list
        } catch (error) {
          message.error('Failed to reject admin request');
          console.error('Error rejecting admin request:', error);
        }
      },
    });
  };

  const showRequestDetails = (record) => {
    setSelectedRequest(record);
    setModalVisible(true);
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      'PENDING': { color: 'orange', text: 'PENDING' },
      'APPROVED': { color: 'green', text: 'APPROVED' },
      'REJECTED': { color: 'red', text: 'REJECTED' },
    };
    
    const config = statusConfig[status] || { color: 'default', text: 'UNKNOWN' };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
      title: 'Request Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Status',
      dataIndex: 'adminAccessRequested',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Current Level',
      dataIndex: 'level',
      key: 'level',
      sorter: (a, b) => a.level - b.level,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="default"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => showRequestDetails(record)}
          >
            View
          </Button>
          <Button
            type="primary"
            size="small"
            icon={<CheckOutlined />}
            onClick={() => handleApproveRequest(record._id, record)}
          >
            Approve
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            icon={<CloseOutlined />}
            onClick={() => handleRejectRequest(record._id, record)}
          >
            Reject
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
    <div className="admin-requests-container">
      <div className="admin-requests-header" style={{ marginBottom: 16 }}>
        <h2>Admin Access Requests</h2>
        <p>Review and manage pending admin access requests from users.</p>
      </div>
      
      {requests.length === 0 && !loading ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h3>No Pending Requests</h3>
            <p>There are currently no pending admin access requests.</p>
          </div>
        </Card>
      ) : (
        <Table
          columns={columns}
          dataSource={requests}
          loading={loading}
          rowKey="_id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} requests`,
          }}
          scroll={{ x: 1000 }}
          className="admin-requests-table"
        />
      )}

      <Modal
        title="Request Details"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="approve"
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => {
              setModalVisible(false);
              handleApproveRequest(selectedRequest._id, selectedRequest);
            }}
          >
            Approve
          </Button>,
          <Button
            key="reject"
            type="primary"
            danger
            icon={<CloseOutlined />}
            onClick={() => {
              setModalVisible(false);
              handleRejectRequest(selectedRequest._id, selectedRequest);
            }}
          >
            Reject
          </Button>,
        ]}
        width={600}
      >
        {selectedRequest && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Full Name">
              {selectedRequest.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedRequest.email}
            </Descriptions.Item>
            <Descriptions.Item label="Current Level">
              {selectedRequest.level}
            </Descriptions.Item>
            <Descriptions.Item label="Quizzes Passed">
              {selectedRequest.quizPassed || 0}
            </Descriptions.Item>
            <Descriptions.Item label="Correct Answers">
              {selectedRequest.correctAnswers || 0}
            </Descriptions.Item>
            <Descriptions.Item label="Request Date">
              {formatDate(selectedRequest.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {getStatusTag(selectedRequest.adminAccessRequested)}
            </Descriptions.Item>
            <Descriptions.Item label="Achievements">
              {selectedRequest.achievements?.length > 0 
                ? selectedRequest.achievements.join(', ') 
                : 'None'}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default AdminRequests; 