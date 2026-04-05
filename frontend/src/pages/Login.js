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
      const res = await axios.post('https://gigtruth.onrender.com/api/auth/login', { phone, password });
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
        <div style={styles.iconBox}>🚴</div>
        <h1 style={styles.title}>GigTruth</h1>
        <p style={styles.subtitle}>Delivery Rider Portal</p>
        <div style={styles.inputBox}>
          <span style={styles.inputIcon}>📱</span>
          <input style={styles.input} placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div style={styles.inputBox}>
          <span style={styles.inputIcon}>🔒</span>
          <input style={styles.input} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button style={styles.button} onClick={handleLogin}>Login →</button>
        <p style={styles.link}>New rider? <Link to="/signup" style={styles.linkText}>Register here</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  card: { backgroundColor: '#1e1e2e', padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '380px', textAlign: 'center', border: '1px solid #2a2a3e' },
  iconBox: { fontSize: '48px', marginBottom: '12px' },
  title: { fontSize: '32px', color: 'white', margin: '0 0 4px' },
  subtitle: { color: '#aaa', marginBottom: '28px', fontSize: '14px' },
  inputBox: { display: 'flex', alignItems: 'center', backgroundColor: '#0f0f1a', borderRadius: '10px', padding: '12px 16px', marginBottom: '14px', border: '1px solid #2a2a3e' },
  inputIcon: { marginRight: '10px', fontSize: '16px' },
  input: { flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '15px' },
  button: { width: '100%', padding: '14px', backgroundColor: '#ff6b35', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px', marginBottom: '16px' },
  link: { color: '#aaa', fontSize: '14px' },
  linkText: { color: '#ff6b35', textDecoration: 'none', fontWeight: 'bold' }
};

export default Login;