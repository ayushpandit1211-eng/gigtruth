import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    axios.get('https://gigtruth.onrender.com/api/deliveries/summary', { headers }).then(r => setSummary(r.data));
    axios.get('https://gigtruth.onrender.com/api/deliveries', { headers }).then(r => setDeliveries(r.data));
  }, []);

  const logout = () => { localStorage.clear(); navigate('/login'); };

  const checkWeather = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`https://gigtruth.onrender.com/api/weather/${city}`, { headers: { Authorization: `Bearer ${token}` } });
      setWeather(res.data);
    } catch {
      alert('City not found');
    }
  };

  const sendEmergency = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => { alert('🚨 EMERGENCY ALERT SENT!\nLocation: ' + pos.coords.latitude + ', ' + pos.coords.longitude + '\nStay calm, help is coming!'); },
        () => { alert('🚨 EMERGENCY ALERT SENT!\nLocation unavailable but alert recorded!'); }
      );
    } else {
      alert('🚨 EMERGENCY ALERT SENT!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.greeting}>👋 Hello, {user?.name}</h2>
        <p style={styles.company}>🏢 {user?.company}</p>
        <button style={styles.logoutBtn} onClick={logout}>Logout</button>
      </div>

      <div style={styles.weatherBox}>
        <input style={styles.weatherInput} placeholder="🏙️ Enter city for weather..." value={city} onChange={e => setCity(e.target.value)} />
        <button style={styles.weatherBtn} onClick={checkWeather}>Check</button>
        {weather && (
          <div style={styles.weatherResult}>
            <p>📍 {weather.city} | 🌡️ {weather.temp}°C | {weather.condition}</p>
            <p style={{ color: weather.weatherRisk === 'High' ? 'red' : weather.weatherRisk === 'Medium' ? 'orange' : 'green' }}>
              ⚠️ Weather Risk: {weather.weatherRisk}
            </p>
          </div>
        )}
      </div>

      {summary && (
        <div style={styles.grid}>
          <div style={styles.card}><p style={styles.label}>Total Deliveries</p><h2 style={styles.value}>{summary.totalDeliveries}</h2></div>
          <div style={styles.card}><p style={styles.label}>Company Paid</p><h2 style={styles.value}>₹{summary.totalEarned}</h2></div>
          <div style={{ ...styles.card, backgroundColor: summary.totalRealProfit < 0 ? '#ffe5e5' : '#e5ffe5' }}>
            <p style={styles.label}>Real Profit</p>
            <h2 style={{ ...styles.value, color: summary.totalRealProfit < 0 ? 'red' : 'green' }}>₹{summary.totalRealProfit}</h2>
          </div>
          <div style={styles.card}><p style={styles.label}>Fuel Lost</p><h2 style={{ ...styles.value, color: 'orange' }}>₹{summary.totalFuel}</h2></div>
          <div style={styles.card}><p style={styles.label}>High Risk</p><h2 style={{ ...styles.value, color: 'red' }}>{summary.highRiskCount}</h2></div>
          <div style={styles.card}><p style={styles.label}>Incidents</p><h2 style={{ ...styles.value, color: 'red' }}>{summary.incidents}</h2></div>
        </div>
      )}

      <button style={styles.emergencyBtn} onClick={sendEmergency}>🆘 EMERGENCY</button>
      <Link to="/add-delivery" style={styles.addBtn}>+ Log New Delivery</Link>

      <h3 style={styles.historyTitle}>📋 Delivery History</h3>
      {deliveries.map(d => (
        <div key={d._id} style={styles.deliveryCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>📍 {d.distance} km</span>
            <span style={{ color: d.riskLevel === 'High' ? 'red' : d.riskLevel === 'Medium' ? 'orange' : 'green' }}>⚠️ {d.riskLevel} Risk</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            <span>💰 Paid: ₹{d.companyPay}</span>
            <span style={{ color: d.realProfit < 0 ? 'red' : 'green' }}>✅ Real: ₹{d.realProfit}</span>
          </div>
          <div style={{ marginTop: '8px', color: '#666', fontSize: '13px' }}>🌤️ {d.weatherCondition} | {d.status}</div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f4f8', minHeight: '100vh' },
  header: { backgroundColor: '#1a1a2e', color: 'white', padding: '20px', borderRadius: '16px', marginBottom: '20px', position: 'relative' },
  greeting: { margin: 0, fontSize: '22px' },
  company: { margin: '4px 0 0', color: '#aaa' },
  logoutBtn: { position: 'absolute', top: '20px', right: '20px', backgroundColor: '#ff6b35', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' },
  weatherBox: { backgroundColor: 'white', padding: '16px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  weatherInput: { width: '70%', padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', fontSize: '14px' },
  weatherBtn: { width: '28%', padding: '10px', backgroundColor: '#1a1a2e', color: 'white', border: 'none', borderRadius: '8px', marginLeft: '2%', cursor: 'pointer', fontWeight: 'bold' },
  weatherResult: { marginTop: '12px', padding: '10px', backgroundColor: '#f8f8f8', borderRadius: '8px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' },
  card: { backgroundColor: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  label: { margin: 0, color: '#666', fontSize: '13px' },
  value: { margin: '8px 0 0', fontSize: '24px' },
  emergencyBtn: { width: '100%', padding: '16px', backgroundColor: '#cc0000', color: 'white', border: 'none', borderRadius: '12px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '12px', letterSpacing: '1px' },
  addBtn: { display: 'block', backgroundColor: '#ff6b35', color: 'white', textAlign: 'center', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' },
  historyTitle: { color: '#1a1a2e', marginBottom: '12px' },
  deliveryCard: { backgroundColor: 'white', padding: '16px', borderRadius: '12px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }
};

export default Dashboard;