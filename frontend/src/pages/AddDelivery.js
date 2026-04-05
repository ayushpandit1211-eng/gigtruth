import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDelivery = () => {
  const [form, setForm] = useState({ distance: '', companyPay: '', timeAllowed: '', weatherCondition: 'Clear', status: 'Completed', incident: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('https://gigtruth.onrender.com/api/deliveries', form, { headers: { Authorization: `Bearer ${token}` } });
      const d = res.data.delivery;
      toast.success(`Logged! Real profit: ₹${d.realProfit} | Risk: ${d.riskLevel}`);
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to log delivery');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Back</button>
        <div style={styles.iconBox}>📦</div>
        <h2 style={styles.title}>Log New Delivery</h2>
        <p style={styles.subtitle}>Track your real earnings</p>

        <div style={styles.inputBox}>
          <span style={styles.inputIcon}>📍</span>
          <input style={styles.input} placeholder="Distance (km)" type="number" value={form.distance} onChange={e => setForm({...form, distance: e.target.value})} />
        </div>
        <div style={styles.inputBox}>
          <span style={styles.inputIcon}>💰</span>
          <input style={styles.input} placeholder="Company Pay (₹)" type="number" value={form.companyPay} onChange={e => setForm({...form, companyPay: e.target.value})} />
        </div>
        <div style={styles.inputBox}>
          <span style={styles.inputIcon}>⏱️</span>
          <input style={styles.input} placeholder="Time Allowed (minutes)" type="number" value={form.timeAllowed} onChange={e => setForm({...form, timeAllowed: e.target.value})} />
        </div>

        <p style={styles.selectLabel}>🌤️ Weather Condition</p>
        <div style={styles.optionGrid}>
          {['Clear', 'Rain', 'Storm', 'Fog', 'Heat', 'Cold'].map(w => (
            <button key={w} style={{...styles.optionBtn, backgroundColor: form.weatherCondition === w ? '#ff6b35' : '#0f0f1a', border: form.weatherCondition === w ? '1px solid #ff6b35' : '1px solid #2a2a3e'}} onClick={() => setForm({...form, weatherCondition: w})}>
              {w === 'Clear' ? '☀️' : w === 'Rain' ? '🌧️' : w === 'Storm' ? '⛈️' : w === 'Fog' ? '🌫️' : w === 'Heat' ? '🥵' : '🥶'} {w}
            </button>
          ))}
        </div>

        <p style={styles.selectLabel}>📋 Delivery Status</p>
        <div style={styles.optionGrid}>
          {['Completed', 'Cancelled', 'Incident'].map(s => (
            <button key={s} style={{...styles.optionBtn, backgroundColor: form.status === s ? '#ff6b35' : '#0f0f1a', border: form.status === s ? '1px solid #ff6b35' : '1px solid #2a2a3e'}} onClick={() => setForm({...form, status: s})}>
              {s === 'Completed' ? '✅' : s === 'Cancelled' ? '❌' : '⚠️'} {s}
            </button>
          ))}
        </div>

        <div style={styles.inputBox}>
          <span style={styles.inputIcon}>⚠️</span>
          <input style={styles.input} placeholder="Incident details (if any)" value={form.incident} onChange={e => setForm({...form, incident: e.target.value})} />
        </div>

        <button style={styles.button} onClick={handleSubmit}>Submit Delivery →</button>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  card: { backgroundColor: '#1e1e2e', padding: '32px', borderRadius: '20px', width: '100%', maxWidth: '400px', border: '1px solid #2a2a3e' },
  backBtn: { backgroundColor: 'transparent', color: '#aaa', border: '1px solid #2a2a3e', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', marginBottom: '16px', fontSize: '13px' },
  iconBox: { fontSize: '40px', textAlign: 'center', marginBottom: '8px' },
  title: { fontSize: '24px', color: 'white', margin: '0 0 4px', textAlign: 'center' },
  subtitle: { color: '#aaa', marginBottom: '24px', fontSize: '13px', textAlign: 'center' },
  inputBox: { display: 'flex', alignItems: 'center', backgroundColor: '#0f0f1a', borderRadius: '10px', padding: '12px 16px', marginBottom: '12px', border: '1px solid #2a2a3e' },
  inputIcon: { marginRight: '10px', fontSize: '16px' },
  input: { flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '15px' },
  selectLabel: { color: '#aaa', fontSize: '12px', margin: '8px 0 8px', textTransform: 'uppercase', letterSpacing: '1px' },
  optionGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' },
  optionBtn: { padding: '10px 6px', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  button: { width: '100%', padding: '14px', backgroundColor: '#ff6b35', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }
};

export default AddDelivery;