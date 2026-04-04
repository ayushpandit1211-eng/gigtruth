import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { phone, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚴 GigTruth</h1>
        <p style={styles.subtitle}>Delivery Rider Portal</p>
        <input style={styles.input} placeholder="📱 Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
        <input style={styles.input} placeholder="🔒 Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button style={styles.button} onClick={handleLogin}>Login</button>
        <p style={styles.link}>New rider? <Link to="/signup">Register here</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: 'white', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' },
  title: { fontSize: '32px', marginBottom: '4px', color: '#1a1a2e' },
  subtitle: { color: '#666', marginBottom: '24px' },
  input: { width: '100%', padding: '14px', marginBottom: '16px', borderRadius: '10px', border: '2px solid #e0e0e0', fontSize: '16px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '16px', backgroundColor: '#ff6b35', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' },
  link: { marginTop: '16px', color: '#666' }
};

export default Login;