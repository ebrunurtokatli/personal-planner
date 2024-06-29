import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Alert, Space, Typography } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Signup = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const birthdateRef = useRef(null);

  const handleSubmit = async () => {
    if (name !== '' && surname !== '' && email !== '' && password !== '' && birthdate !== '') {
      const response = await fetch('https://v1.nocodeapi.com/ebrunurtokatli/google_sheets/TycUklyflqLdKMII?tabId=Sayfa1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([[name, surname, email, password, birthdate]]),
      });

      await response.json();
      resetForm();
      navigate('/login');
    } else {
      setShowAlert(true);
    }
  };

  const resetForm = () => {
    setName('');
    setSurname('');
    setEmail('');
    setPassword('');
    setBirthdate('');
    setShowAlert(false);
  };

  const handleKeyDown = (event, ref) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (ref.current) {
        ref.current.focus();
      } else {
        handleSubmit();
      }
    }
  };

  const handleSignupButtonClick = () => {
    handleSubmit();
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', backgroundColor: '#ffe4e1', borderRadius: '10px' }}>
      <div className='Header' style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Title level={2} style={{ color: '#ff69b4' }}>Sign Up</Title>
      </div>
      <div className='inputs'>
        {showAlert && (
          <Alert
            message="Please fill in all fields"
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event, surnameRef)}
            ref={nameRef}
            prefix={<UserOutlined />}
          />
          <Input
            type='text'
            placeholder='Surname'
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event, emailRef)}
            ref={surnameRef}
            prefix={<UserOutlined />}
          />
          <Input
            type='email'
            placeholder='Email'
            value={email}
            prefix={<MailOutlined />}
            onChange={(event) => setEmail(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event, passwordRef)}
            ref={emailRef}
          />
          <Input.Password
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event, birthdateRef)}
            visibilityToggle={false}
            ref={passwordRef}
            prefix={<LockOutlined />}
          />
          <Input
            type='date'
            placeholder='Date of Birth'
            value={birthdate}
            prefix={<CalendarOutlined />}
            onChange={(event) => setBirthdate(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event, birthdateRef)}
            ref={birthdateRef}
            onPressEnter={handleSignupButtonClick}
          />
        </Space>
      </div>
      <div className='submit-container' style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type='primary' style={{ backgroundColor: '#ff69b4', borderColor: '#ff69b4' }} onClick={handleSignupButtonClick}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Signup;
