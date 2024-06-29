import React, { useEffect, useState } from 'react';
import { Descriptions, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/Homepage');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      setUserData(user);
    } else {
      alert('User not authenticated');
    }
  }, []);

  const handleSendReport = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const lightPinkStyle = {
    backgroundColor: '#ffcccb',
    color: '#000',
    border: '1px solid #ffcccb',
  };

  const buttonStyle = {
    backgroundColor: '#ffcccb',
    borderColor: '#ffcccb',
    color: '#000',
  };

  const modalStyle = {
    backgroundColor: '#ffcccb',
  };

  return (
    <div className="profile" style={{ backgroundColor: '#ffe4e1', padding: '20px', borderRadius: '10px' }}>
      <h1 style={{ color: '#000' }}>User Profile</h1>
      <Button type="primary" onClick={handleBack} style={buttonStyle}>Back to Homepage</Button>
      <Button type="primary" onClick={handleSendReport} style={{ ...buttonStyle, marginLeft: '10px' }}>
        Send Report as Email
      </Button>

      {userData ? (
        <Descriptions title="My Profile" bordered style={{ marginTop: '20px', ...lightPinkStyle }}>
          <Descriptions.Item label="Name">{userData.Name}</Descriptions.Item>
          <Descriptions.Item label="Surname">{userData.Surname}</Descriptions.Item>
          <Descriptions.Item label="Email">{userData.Email}</Descriptions.Item>
          <Descriptions.Item label="Password">{userData.Password}</Descriptions.Item>
        </Descriptions>
      ) : (
        <p style={{ color: '#000' }}>Loading user data...</p>
      )}

      <Modal
        title="Report Sent"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        style={modalStyle}
        okButtonProps={{ style: buttonStyle }}
        cancelButtonProps={{ style: buttonStyle }}
      >
        <p style={{ color: '#000' }}>Report has been filtered and sent to: {userData ? userData.Email : ''}</p>
      </Modal>
    </div>
  );
};

export default Profile;
