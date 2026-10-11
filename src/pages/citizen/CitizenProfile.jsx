import React from 'react';
import { useApp } from '../../context/AppContext';
import { UrgencyBadge, StatusBadge } from '../../components/Badge';
import { 
  User, 
  Phone, 
  MapPin, 
  Award, 
  FileText, 
  Settings, 
  RotateCcw, 
  Bell, 
  ArrowRight, 
  ShieldCheck,
  Heart
} from 'lucide-react';

export const CitizenProfile = () => {
  const { 
    userProfile, 
    reports, 
    navigateTo, 
    resetDemoData, 
    switchRole, 
    language, 
    setLanguage 
  } = useApp();

  const myReports = reports.filter(r => r.userId === 'user-001' || r.reporterName.includes('Rajesh'));
  const activeCount = myReports.filter(r => r.status !== 'completed').length;
  const resolvedCount = myReports.filter(r => r.status === 'completed').length;

  return (
    <div className="animate-fade-in mobile-frame-container" style={{ paddingBottom: '36px' }}>
      
      {/* Profile Header Card */}
      <div className="card" style={{ padding: '24px 20px', textAlign: 'center', marginBottom: '20px' }}>
        <div style={{
          position: 'relative',
          width: '84px',
          height: '84px',
          margin: '0 auto 12px'
        }}>
          <img 
            src={userProfile.avatar} 
            alt={userProfile.name}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--primary)',
              boxShadow: 'var(--shadow-md)'
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'var(--accent)',
            color: '#1F2A24',
            borderRadius: '50%',
            padding: '4px',
            fontSize: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
          }}>
            🌿
          </div>
        </div>

        <h2 style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '2px' }}>
          {userProfile.name}
        </h2>
        <span className="badge badge-primary" style={{ marginBottom: '10px' }}>
          <Award size={13} /> {userProfile.badge}
        </span>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Phone size={13} /> {userProfile.phone}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={13} /> {userProfile.city}
          </span>
        </div>
      </div>

      {/* Activity Counters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div className="card" style={{ padding: '14px 8px' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', display: 'block' }}>
            {myReports.length}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>My Reports</span>
        </div>

        <div className="card" style={{ padding: '14px 8px' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-urgent-text)', display: 'block' }}>
            {activeCount}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Rescues</span>
        </div>

        <div className="card" style={{ padding: '14px 8px' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-normal-text)', display: 'block' }}>
            {resolvedCount}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Resolved</span>
        </div>
      </div>

      {/* My Submitted Reports List */}
      <div className="card" style={{ padding: '18px 16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0 }}>
            My Submitted Cases
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {myReports.length} cases
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {myReports.map(r => (
            <div 
              key={r.id}
              onClick={() => navigateTo('case-track', r.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-alt)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                  src={r.photo} 
                  alt={r.problemType}
                  style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{r.id}</span>
                    <UrgencyBadge urgency={r.urgency} size="sm" />
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {r.problemIcon} {r.problemType}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <StatusBadge status={r.status} />
                <ArrowRight size={14} color="var(--text-muted)" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Settings & Role Switcher */}
      <div className="card" style={{ padding: '18px 16px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '14px' }}>
          Preferences & Controls
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
            className="btn btn-secondary btn-sm"
            style={{ justifyContent: 'space-between', padding: '12px' }}
          >
            <span>App Language</span>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
              {language === 'en' ? 'English (Switch to हिन्दी)' : 'हिन्दी (Switch to English)'}
            </span>
          </button>

          <button 
            onClick={() => switchRole('volunteer')}
            className="btn btn-secondary btn-sm"
            style={{ justifyContent: 'space-between', padding: '12px' }}
          >
            <span>Switch to Volunteer Experience</span>
            <span style={{ color: 'var(--accent-hover)' }}>🦺 Open</span>
          </button>

          <button 
            onClick={() => switchRole('admin')}
            className="btn btn-secondary btn-sm"
            style={{ justifyContent: 'space-between', padding: '12px' }}
          >
            <span>Switch to Admin Control Desk</span>
            <span style={{ color: 'var(--primary)' }}>🛡️ Open</span>
          </button>

          <button 
            onClick={resetDemoData}
            className="btn btn-secondary btn-sm"
            style={{ justifyContent: 'space-between', padding: '12px', color: 'var(--color-emergency-text)' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RotateCcw size={14} /> Reset Prototype Mock Data
            </span>
            <span>Defaults</span>
          </button>
        </div>
      </div>

    </div>
  );
};
