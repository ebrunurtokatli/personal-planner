import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Input, ConfigProvider } from 'antd';
import { LoginOutlined, MailOutlined } from '@ant-design/icons';

const generateToken = () => {
  return Math.random().toString(36).substr(2);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    try {
      const response = await axios.get("https://v1.nocodeapi.com/ebrunurtokatli/google_sheets/TycUklyflqLdKMII?tabId=Sayfa1");
      const data = response.data.data;

      const user = data.find(entry => entry.Email === email && entry.Password === password);

      if (user) {
        const token = generateToken();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/Homepage'); 
      } else {
        alert('Invalid email or password'); 
      }
    } catch (error) {
      console.log('Error fetching data:', error);
      alert('Error fetching data. Please try again later.'); 
    }
  };

  const handleKeyDown = (event, ref) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (ref.current) {
        ref.current.focus();
      } else {
        handleLogin();
      }
    }
  };

  const theme = {
    token: {
      colorPrimary: '#ffb6c1', // light pink
    },
  };

  return (
    <ConfigProvider theme={theme}>
      <div className='container' style={{ backgroundColor: '#ffe4e1', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div className='Header' style={{ marginBottom: '20px', textAlign: 'center' }}>
            <div className="text" style={{ fontSize: '24px', color: '#ff69b4' }}>Log In</div>
          </div>
          <div className="inputs" style={{ marginBottom: '20px' }}>
            <div className="input" style={{ marginBottom: '10px' }}>
              <Input 
                suffix={<MailOutlined />}
                size="large"
                placeholder='Email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event, passwordRef)}
                ref={emailRef}
                style={{ borderColor: '#ffb6c1' }}
              />
            </div>
            <div className="input">
              <Input.Password
                size="large"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
                onKeyDown={(event) => handleKeyDown(event, passwordRef)}
                ref={passwordRef}
                onPressEnter={handleLogin}
                style={{ borderColor: '#ffb6c1' }}
              />
            </div>
          </div>
          <div className="submit-container" style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={handleLogin}
              className="submit-button"
              style={{ backgroundColor: '#ff69b4', borderColor: '#ff69b4', marginBottom: '10px' }}
            >
              Log In
            </Button>
            <Button type="default" onClick={() => navigate('/Signup')} className="submit-button" style={{ color: '#ff69b4', borderColor: '#ff69b4' }}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
