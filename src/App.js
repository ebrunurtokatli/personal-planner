import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Signup from './Components/LoginSignup/Signup';
import Login from './Components/LoginSignup/Login';
import Homepage from './Components/Homepage/Homepage';
import Profile from './Components/Homepage/Profile';
import CalendarPage from './Components/Homepage/Calendar';

 
const App = () => {

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Homepage"element={<Homepage/>}/>
        <Route path="/Profile"element={<Profile/>}/>
        <Route path="/Signup" element={< Signup />} />
        <Route path="/Calendar" element={< CalendarPage />} />
     

      </Routes>
    </Router>
  );
};

export default App;

