import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', phone: '', password: '', company: 'Blinkit', city: '', dream: '' });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post('https://gigtruth.onrender.com/api/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Account created!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconBox}>🚴</div>
        <h1 style={styles.title}>Join GigTruth</h1>
        <p style={styles.subtitle}>Create your rider account</p>

        <div style={styles.inputBox}>
          <span style={styles.inputIcon}>👤</span>
          <input style={styles.input} placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </div>
        <div style={styles.inputBox}>
          <span style={styles.inputIcon}>📱</span>
          <input style={styles.input} placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        </div>
        <div style={styles.inputBox}>
          <span style={styles.inputIcon}>🔒</span>
          <input style={styles.input} placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        </div>
        <div style={styles.inputBox}>
          <span style={styles.inputIcon}>🏢</span>
          <select style={{...styles.input, color: 'white'}} value={form.company} onChange={e => setForm({...form, company: e.target.value})}>
            <option style={{backgroundColor: '#1e1e2e'}}>Blinkit</option>
            <option style={{backgroundColor: '#1e1e2e'}}>Swiggy</option>
            <option style={{backgroundColor: '#1e1e2e'}}>Zomato</option>
            <option style={{backgroundColor: '#1e1e2e'}}>Other</option>
          </select>
        </div>
        <div style={styles.inputBox}>
          <span style={styles.inputIcon}>🏙️</span>
          <input style={styles.input} placeholder="Your City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
        </div>
        <div style={styles.inputBox}>
          <span style={styles.inputIcon}>⭐</span>
          <input style={styles.input} placeholder="Your Dream (e.g. Join Army)" value={form.dream} onChange={e => setForm({...form, dream: e.target.value})} />
        </div>

        <button style={styles.button} onClick={handleSignup}>Create Account →</button>
        <p style={styles.link}>Already registered? <Link to="/login" style={styles.linkText}>Login here</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  card: { backgroundColor: '#1e1e2e', padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '380px', textAlign: 'center', border: '1px solid #2a2a3e' },
  iconBox: { fontSize: '48px', marginBottom: '12px' },
  title: { fontSize: '28px', color: 'white', margin: '0 0 4px' },
  subtitle: { color: '#aaa', marginBottom: '24px', fontSize: '14px' },
  inputBox: { display: 'flex', alignItems: 'center', backgroundColor: '#0f0f1a', borderRadius: '10px', padding: '12px 16px', marginBottom: '12px', border: '1px solid #2a2a3e' },
  inputIcon: { marginRight: '10px', fontSize: '16px' },
  input: { flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '15px' },
  button: { width: '100%', padding: '14px', backgroundColor: '#ff6b35', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px', marginBottom: '16px' },
  link: { color: '#aaa', fontSize: '14px' },
  linkText: { color: '#ff6b35', textDecoration: 'none', fontWeight: 'bold' }
};

export default Signup;