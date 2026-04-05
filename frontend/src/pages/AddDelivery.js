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
        <h2 style={styles.title}>📦 Log New Delivery</h2>
        <input style={styles.input} placeholder="📍 Distance (km)" type="number" value={form.distance} onChange={e => setForm({...form, distance: e.target.value})} />
        <input style={styles.input} placeholder="💰 Company Pay (₹)" type="number" value={form.companyPay} onChange={e => setForm({...form, companyPay: e.target.value})} />
        <input style={styles.input} placeholder="⏱️ Time Allowed (minutes)" type="number" value={form.timeAllowed} onChange={e => setForm({...form, timeAllowed: e.target.value})} />
        <select style={styles.input} value={form.weatherCondition} onChange={e => setForm({...form, weatherCondition: e.target.value})}>
          <option>Clear</option>
          <option>Rain</option>
          <option>Storm</option>
          <option>Fog</option>
          <option>Heat</option>
          <option>Cold</option>
        </select>
        <select style={styles.input} value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
          <option>Completed</option>
          <option>Cancelled</option>
          <option>Incident</option>
        </select>
        <input style={styles.input} placeholder="⚠️ Incident details (if any)" value={form.incident} onChange={e => setForm({...form, incident: e.target.value})} />
        <button style={styles.button} onClick={handleSubmit}>Submit Delivery</button>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Back</button>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  card: { backgroundColor: 'white', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
  title: { textAlign: 'center', color: '#1a1a2e', marginBottom: '24px' },
  input: { width: '100%', padding: '14px', marginBottom: '16px', borderRadius: '10px', border: '2px solid #e0e0e0', fontSize: '16px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '16px', backgroundColor: '#ff6b35', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '12px' },
  backBtn: { width: '100%', padding: '14px', backgroundColor: '#eee', color: '#333', border: 'none', borderRadius: '10px', fontSize: '16px', cursor: 'pointer' }
};

export default AddDelivery;