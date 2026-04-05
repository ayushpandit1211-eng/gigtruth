import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddDelivery from './pages/AddDelivery';
import RiderStory from './pages/RiderStory';
import WelfareScore from './pages/WelfareScore';

const App = () => {
  

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-delivery" element={<AddDelivery />} />
        <Route path="/riders" element={<RiderStory />} />
        <Route path="/welfare" element={<WelfareScore />} />
      </Routes>
    </Router>
  );
};

export default App;