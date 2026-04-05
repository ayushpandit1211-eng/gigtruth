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
        <h1 style={styles.title}>🚴 Join GigTruth</h1>
        <p style={styles.subtitle}>Create your rider account</p>
        <input style={styles.input} placeholder="👤 Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input style={styles.input} placeholder="📱 Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        <input style={styles.input} placeholder="🔒 Password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <select style={styles.input} value={form.company} onChange={e => setForm({...form, company: e.target.value})}>
          <option>Blinkit</option>
          <option>Swiggy</option>
          <option>Zomato</option>
          <option>Other</option>
        </select>
        <input style={styles.input} placeholder="🏙️ Your City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
        <input style={styles.input} placeholder="⭐ Your Dream (e.g. Join Army)" value={form.dream} onChange={e => setForm({...form, dream: e.target.value})} />
        <button style={styles.button} onClick={handleSignup}>Create Account</button>
        <p style={styles.link}>Already registered? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: 'white', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' },
  title: { fontSize: '28px', marginBottom: '4px', color: '#1a1a2e' },
  subtitle: { color: '#666', marginBottom: '24px' },
  input: { width: '100%', padding: '14px', marginBottom: '16px', borderRadius: '10px', border: '2px solid #e0e0e0', fontSize: '16px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '16px', backgroundColor: '#ff6b35', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' },
  link: { marginTop: '16px', color: '#666' }
};

export default Signup;