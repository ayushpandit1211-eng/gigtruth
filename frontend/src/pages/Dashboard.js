import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
    } catch { alert('City not found'); }
  };

  const sendEmergency = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => { alert('🚨 EMERGENCY ALERT SENT!\nLocation: ' + pos.coords.latitude + ', ' + pos.coords.longitude + '\nStay calm, help is coming!'); },
        () => { alert('🚨 EMERGENCY ALERT SENT!\nLocation unavailable but alert recorded!'); }
      );
    } else { alert('🚨 EMERGENCY ALERT SENT!'); }
  };

  const chartData = deliveries.slice(0, 7).reverse().map((d, i) => ({
    name: `D${i + 1}`,
    'Company Paid': d.companyPay,
    'Real Profit': d.realProfit,
    'Fuel Cost': d.fuelCost
  }));

  const getRiskColor = (risk) => risk === 'High' ? '#ff4444' : risk === 'Medium' ? '#ff9800' : '#4caf50';

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <p style={styles.greeting}>Good day 👋</p>
          <h2 style={styles.name}>{user?.name}</h2>
          <span style={styles.companyBadge}>{user?.company}</span>
        </div>
        <button style={styles.logoutBtn} onClick={logout}>Logout</button>
      </div>

      {/* Weather */}
      <div style={styles.weatherBox}>
        <p style={styles.sectionTitle}>🌤️ Weather Check</p>
        <div style={styles.weatherRow}>
          <input style={styles.weatherInput} placeholder="Enter city..." value={city} onChange={e => setCity(e.target.value)} />
          <button style={styles.weatherBtn} onClick={checkWeather}>Check</button>
        </div>
        {weather && (
          <div style={styles.weatherResult}>
            <span>📍 {weather.city} | 🌡️ {weather.temp}°C | {weather.condition}</span>
            <span style={{ color: weather.weatherRisk === 'High' ? '#ff4444' : weather.weatherRisk === 'Medium' ? '#ff9800' : '#4caf50', fontWeight: 'bold' }}>
              {' '}| Risk: {weather.weatherRisk}
            </span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      {summary && (
        <div style={styles.grid}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Total Deliveries</p>
            <h2 style={styles.statValue}>{summary.totalDeliveries}</h2>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Company Paid</p>
            <h2 style={{...styles.statValue, color: '#64b5f6'}}>₹{summary.totalEarned}</h2>
          </div>
          <div style={{...styles.statCard, borderLeft: '4px solid ' + (summary.totalRealProfit < 0 ? '#ff4444' : '#4caf50')}}>
            <p style={styles.statLabel}>Real Profit</p>
            <h2 style={{...styles.statValue, color: summary.totalRealProfit < 0 ? '#ff4444' : '#4caf50'}}>₹{summary.totalRealProfit}</h2>
          </div>
          <div style={{...styles.statCard, borderLeft: '4px solid #ff9800'}}>
            <p style={styles.statLabel}>Fuel Lost</p>
            <h2 style={{...styles.statValue, color: '#ff9800'}}>₹{summary.totalFuel}</h2>
          </div>
          <div style={{...styles.statCard, borderLeft: '4px solid #ff4444'}}>
            <p style={styles.statLabel}>High Risk</p>
            <h2 style={{...styles.statValue, color: '#ff4444'}}>{summary.highRiskCount}</h2>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Incidents</p>
            <h2 style={{...styles.statValue, color: '#ff4444'}}>{summary.incidents}</h2>
          </div>
        </div>
      )}

      {/* Chart */}
      {chartData.length > 0 && (
        <div style={styles.chartBox}>
          <p style={styles.sectionTitle}>📊 Earnings vs Fuel (Last 7)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#aaa" fontSize={12} />
              <YAxis stroke="#aaa" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1e1e2e', border: 'none', borderRadius: '8px', color: 'white' }} />
              <Legend />
              <Bar dataKey="Company Paid" fill="#64b5f6" radius={[4,4,0,0]} />
              <Bar dataKey="Real Profit" fill="#4caf50" radius={[4,4,0,0]} />
              <Bar dataKey="Fuel Cost" fill="#ff9800" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Action Buttons */}
      <button style={styles.emergencyBtn} onClick={sendEmergency}>🆘 EMERGENCY</button>
      <Link to="/welfare" style={{...styles.actionBtn, backgroundColor: '#c62828'}}>🏆 Company Welfare Score</Link>
      <Link to="/riders" style={{...styles.actionBtn, backgroundColor: '#1565c0'}}>👥 Meet the Riders</Link>
      <Link to="/add-delivery" style={{...styles.actionBtn, backgroundColor: '#2e7d32'}}>+ Log New Delivery</Link>

      {/* Delivery History */}
      <p style={styles.sectionTitle}>📋 Delivery History</p>
      {deliveries.map(d => (
        <div key={d._id} style={styles.deliveryCard}>
          <div style={styles.deliveryRow}>
            <span style={styles.deliveryText}>📍 {d.distance} km</span>
            <span style={{...styles.riskBadge, backgroundColor: getRiskColor(d.riskLevel)}}>{d.riskLevel} Risk</span>
          </div>
          <div style={styles.deliveryRow}>
            <span style={styles.deliveryText}>💰 Paid: ₹{d.companyPay}</span>
            <span style={{...styles.deliveryText, color: d.realProfit < 0 ? '#ff4444' : '#4caf50', fontWeight: 'bold'}}>
              Net: ₹{d.realProfit}
            </span>
          </div>
          <div style={{marginTop: '6px', fontSize: '12px', color: '#aaa'}}>
            🌤️ {d.weatherCondition} | {d.status}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#0f0f1a', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e1e2e', padding: '20px', borderRadius: '16px', marginBottom: '16px' },
  greeting: { margin: 0, color: '#aaa', fontSize: '13px' },
  name: { margin: '4px 0', color: 'white', fontSize: '22px' },
  companyBadge: { backgroundColor: '#ff6b35', color: 'white', padding: '3px 12px', borderRadius: '20px', fontSize: '12px' },
  logoutBtn: { backgroundColor: 'transparent', color: '#ff6b35', border: '1px solid #ff6b35', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' },
  weatherBox: { backgroundColor: '#1e1e2e', padding: '16px', borderRadius: '12px', marginBottom: '16px' },
  sectionTitle: { color: '#aaa', fontSize: '13px', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '1px' },
  weatherRow: { display: 'flex', gap: '8px' },
  weatherInput: { flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#0f0f1a', color: 'white', fontSize: '14px' },
  weatherBtn: { padding: '10px 16px', backgroundColor: '#ff6b35', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  weatherResult: { marginTop: '10px', color: '#ccc', fontSize: '13px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' },
  statCard: { backgroundColor: '#1e1e2e', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #333' },
  statLabel: { margin: 0, color: '#aaa', fontSize: '12px' },
  statValue: { margin: '6px 0 0', fontSize: '24px', color: 'white' },
  chartBox: { backgroundColor: '#1e1e2e', padding: '16px', borderRadius: '12px', marginBottom: '16px' },
  emergencyBtn: { width: '100%', padding: '16px', backgroundColor: '#b71c1c', color: 'white', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px', letterSpacing: '1px' },
  actionBtn: { display: 'block', color: 'white', textAlign: 'center', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' },
  deliveryCard: { backgroundColor: '#1e1e2e', padding: '14px', borderRadius: '12px', marginBottom: '10px' },
  deliveryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' },
  deliveryText: { color: '#ccc', fontSize: '14px' },
  riskBadge: { color: 'white', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }
};

export default Dashboard;