import React from 'react';
import { useNavigate } from 'react-router-dom';

const companies = [
  {
    name: 'Blinkit',
    color: '#fff9c4',
    score: 34,
    criteria: [
      { label: 'Pays return trip fuel', status: false },
      { label: 'Accident insurance provided', status: false },
      { label: 'Allows meal breaks', status: false },
      { label: 'Fair penalty system', status: false },
      { label: 'Weather delay accepted', status: false },
      { label: 'Human support available', status: true },
      { label: 'Transparent pay structure', status: true },
    ],
    verdict: '❌ Poor — Riders bear most costs and risks'
  },
  {
    name: 'Swiggy',
    color: '#fff3e0',
    score: 52,
    criteria: [
      { label: 'Pays return trip fuel', status: false },
      { label: 'Accident insurance provided', status: true },
      { label: 'Allows meal breaks', status: false },
      { label: 'Fair penalty system', status: false },
      { label: 'Weather delay accepted', status: true },
      { label: 'Human support available', status: true },
      { label: 'Transparent pay structure', status: true },
    ],
    verdict: '⚠️ Average — Some policies exist but gaps remain'
  },
  {
    name: 'Zomato',
    color: '#fce4ec',
    score: 61,
    criteria: [
      { label: 'Pays return trip fuel', status: false },
      { label: 'Accident insurance provided', status: true },
      { label: 'Allows meal breaks', status: true },
      { label: 'Fair penalty system', status: false },
      { label: 'Weather delay accepted', status: true },
      { label: 'Human support available', status: true },
      { label: 'Transparent pay structure', status: true },
    ],
    verdict: '⚠️ Below Average — Better than others but still lacking'
  }
];

const WelfareScore = () => {
  const navigate = useNavigate();

  const getScoreColor = (score) => {
    if (score < 40) return '#cc0000';
    if (score < 60) return '#ff6b35';
    return '#f9a825';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Back</button>
        <h2 style={styles.title}>🏆 Company Welfare Score</h2>
        <p style={styles.subtitle}>How well do these companies treat their riders?</p>
      </div>

      <div style={styles.infoBox}>
        <p style={styles.infoText}>⚠️ These scores are based on publicly reported rider experiences and documented company policies. No company currently scores above 70/100.</p>
      </div>

      {companies.map((company, i) => (
        <div key={i} style={{...styles.card, backgroundColor: company.color}}>
          <div style={styles.topRow}>
            <h3 style={styles.companyName}>{company.name}</h3>
            <div style={{...styles.scoreBadge, backgroundColor: getScoreColor(company.score)}}>
              <p style={styles.scoreNumber}>{company.score}</p>
              <p style={styles.scoreLabel}>/100</p>
            </div>
          </div>

          <div style={styles.progressBar}>
            <div style={{...styles.progressFill, width: `${company.score}%`, backgroundColor: getScoreColor(company.score)}} />
          </div>

          <div style={styles.criteriaList}>
            {company.criteria.map((c, j) => (
              <div key={j} style={styles.criteriaItem}>
                <span style={{color: c.status ? 'green' : 'red', fontSize: '16px'}}>
                  {c.status ? '✅' : '❌'}
                </span>
                <span style={{...styles.criteriaText, color: c.status ? '#333' : '#888'}}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>

          <div style={{...styles.verdictBox, borderColor: getScoreColor(company.score)}}>
            <p style={{...styles.verdictText, color: getScoreColor(company.score)}}>{company.verdict}</p>
          </div>
        </div>
      ))}

      <div style={styles.footer}>
        <p style={styles.footerText}>💡 None of these companies currently reimburse return trip fuel. Every rider in India is losing money on every delivery they make.</p>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f4f8', minHeight: '100vh' },
  header: { backgroundColor: '#1a1a2e', color: 'white', padding: '20px', borderRadius: '16px', marginBottom: '20px', textAlign: 'center' },
  backBtn: { backgroundColor: 'transparent', color: 'white', border: '1px solid white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '12px' },
  title: { margin: 0, fontSize: '22px' },
  subtitle: { margin: '8px 0 0', color: '#aaa', fontSize: '14px' },
  infoBox: { backgroundColor: '#fff8e1', padding: '14px', borderRadius: '12px', marginBottom: '16px', borderLeft: '4px solid #f9a825' },
  infoText: { margin: 0, fontSize: '13px', color: '#555', lineHeight: '1.6' },
  card: { padding: '20px', borderRadius: '16px', marginBottom: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  companyName: { margin: 0, fontSize: '22px', color: '#1a1a2e' },
  scoreBadge: { padding: '8px 16px', borderRadius: '12px', textAlign: 'center' },
  scoreNumber: { margin: 0, fontSize: '28px', fontWeight: 'bold', color: 'white' },
  scoreLabel: { margin: 0, fontSize: '12px', color: 'white' },
  progressBar: { backgroundColor: '#e0e0e0', borderRadius: '10px', height: '10px', marginBottom: '16px' },
  progressFill: { height: '10px', borderRadius: '10px', transition: 'width 0.5s' },
  criteriaList: { marginBottom: '16px' },
  criteriaItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' },
  criteriaText: { fontSize: '14px' },
  verdictBox: { padding: '12px', borderRadius: '10px', borderLeft: '4px solid', backgroundColor: 'white' },
  verdictText: { margin: 0, fontWeight: 'bold', fontSize: '14px' },
  footer: { backgroundColor: '#1a1a2e', padding: '16px', borderRadius: '12px', marginTop: '8px' },
  footerText: { margin: 0, color: '#ff6b35', fontSize: '13px', textAlign: 'center', lineHeight: '1.6' }
};

export default WelfareScore;