import React from 'react';
import { useNavigate } from 'react-router-dom';

const riders = [
  {
    name: 'Shivam Kumar',
    age: 24,
    city: 'Delhi',
    company: 'Blinkit',
    dream: '🪖 Wanted to join Indian Army',
    deliveries: 54,
    kmPerDay: 180,
    earned: 847,
    fuelCost: 720,
    realProfit: 127,
    hoursWorked: 14,
    mealsSkipped: 2,
    incidents: 'Minor accident near Connaught Place — no insurance support',
    quote: '"I do 54 deliveries a day. I have not eaten lunch in 3 months."',
    color: '#fff3e0'
  },
  {
    name: 'Raju Singh',
    age: 28,
    city: 'Mumbai',
    company: 'Zomato',
    dream: '🏫 Wanted to open a small school',
    deliveries: 38,
    kmPerDay: 120,
    earned: 620,
    fuelCost: 480,
    realProfit: 140,
    hoursWorked: 12,
    mealsSkipped: 1,
    incidents: 'Vehicle puncture during delivery — penalty deducted for late delivery',
    quote: '"The app threatened to deactivate me because it was raining and I was 4 minutes late."',
    color: '#e8f5e9'
  },
  {
    name: 'Deepak Yadav',
    age: 22,
    city: 'Bangalore',
    company: 'Swiggy',
    dream: '💻 Wanted to study computer science',
    deliveries: 45,
    kmPerDay: 150,
    earned: 730,
    fuelCost: 600,
    realProfit: 130,
    hoursWorked: 13,
    mealsSkipped: 2,
    incidents: 'Worked 8 days straight in 42°C heat — no heat allowance given',
    quote: '"Nobody asks if I am okay. They only ask where is the order."',
    color: '#fce4ec'
  }
];

const RiderStory = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Back</button>
        <h2 style={styles.title}>👥 Meet the Riders</h2>
        <p style={styles.subtitle}>The people behind your 10-minute delivery</p>
      </div>

      {riders.map((rider, i) => (
        <div key={i} style={{...styles.card, backgroundColor: rider.color}}>
          <div style={styles.nameRow}>
            <h3 style={styles.name}>{rider.name}</h3>
            <span style={styles.company}>{rider.company}</span>
          </div>
          <p style={styles.meta}>📍 {rider.city} | Age {rider.age}</p>
          <p style={styles.dream}>{rider.dream}</p>

          <blockquote style={styles.quote}>{rider.quote}</blockquote>

          <div style={styles.statsGrid}>
            <div style={styles.stat}>
              <p style={styles.statLabel}>Daily Deliveries</p>
              <p style={styles.statValue}>{rider.deliveries}</p>
            </div>
            <div style={styles.stat}>
              <p style={styles.statLabel}>KM Per Day</p>
              <p style={styles.statValue}>{rider.kmPerDay} km</p>
            </div>
            <div style={styles.stat}>
              <p style={styles.statLabel}>Company Paid</p>
              <p style={styles.statValue}>₹{rider.earned}</p>
            </div>
            <div style={{...styles.stat, backgroundColor: '#ffebee'}}>
              <p style={styles.statLabel}>Real Profit</p>
              <p style={{...styles.statValue, color: rider.realProfit < 200 ? 'red' : 'green'}}>₹{rider.realProfit}</p>
            </div>
            <div style={styles.stat}>
              <p style={styles.statLabel}>Hours Worked</p>
              <p style={styles.statValue}>{rider.hoursWorked} hrs</p>
            </div>
            <div style={{...styles.stat, backgroundColor: '#fff9c4'}}>
              <p style={styles.statLabel}>Meals Skipped</p>
              <p style={{...styles.statValue, color: 'orange'}}>{rider.mealsSkipped}</p>
            </div>
          </div>

          <div style={styles.incidentBox}>
            <p style={styles.incidentLabel}>⚠️ Incident</p>
            <p style={styles.incidentText}>{rider.incidents}</p>
          </div>
        </div>
      ))}

      <div style={styles.footer}>
        <p style={styles.footerText}>These are representative stories based on real conditions faced by gig workers across India. Their names have been changed to protect their identity.</p>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f4f8', minHeight: '100vh' },
  header: { backgroundColor: '#1a1a2e', color: 'white', padding: '20px', borderRadius: '16px', marginBottom: '20px', textAlign: 'center' },
  backBtn: { backgroundColor: 'transparent', color: 'white', border: '1px solid white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '12px' },
  title: { margin: 0, fontSize: '24px' },
  subtitle: { margin: '8px 0 0', color: '#aaa', fontSize: '14px' },
  card: { padding: '20px', borderRadius: '16px', marginBottom: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' },
  nameRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' },
  name: { margin: 0, fontSize: '20px', color: '#1a1a2e' },
  company: { backgroundColor: '#1a1a2e', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' },
  meta: { color: '#666', margin: '4px 0', fontSize: '14px' },
  dream: { color: '#444', margin: '4px 0 12px', fontSize: '14px', fontStyle: 'italic' },
  quote: { borderLeft: '4px solid #ff6b35', paddingLeft: '12px', margin: '12px 0', color: '#333', fontSize: '15px', fontStyle: 'italic' },
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '16px 0' },
  stat: { backgroundColor: 'white', padding: '10px', borderRadius: '10px', textAlign: 'center' },
  statLabel: { margin: 0, fontSize: '11px', color: '#666' },
  statValue: { margin: '4px 0 0', fontSize: '18px', fontWeight: 'bold', color: '#1a1a2e' },
  incidentBox: { backgroundColor: '#fff3f3', padding: '12px', borderRadius: '10px', borderLeft: '4px solid red' },
  incidentLabel: { margin: '0 0 4px', fontWeight: 'bold', color: 'red', fontSize: '13px' },
  incidentText: { margin: 0, color: '#555', fontSize: '13px' },
  footer: { backgroundColor: 'white', padding: '16px', borderRadius: '12px', marginTop: '8px' },
  footerText: { margin: 0, color: '#888', fontSize: '12px', textAlign: 'center', lineHeight: '1.6' }
};

export default RiderStory;