import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UrgencyBadge, StatusBadge } from '../../components/Badge';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Flame,
  Filter
} from 'lucide-react';

export const VolunteerDashboard = () => {
  const { reports, advanceCaseStep, navigateTo, setSelectedCaseId } = useApp();

  const [filterPriority, setFilterPriority] = useState('all');

  const availableCases = reports.filter(r => r.status !== 'completed');
  const completedCount = reports.filter(r => r.status === 'completed').length;
  const assignedCount = reports.filter(r => ['assigned', 'on_the_way'].includes(r.status)).length;
  const activeRescueCount = reports.filter(r => ['reached', 'rescue'].includes(r.status)).length;
  const newRequestsCount = reports.filter(r => ['submitted', 'verified'].includes(r.status)).length;

  const filteredList = availableCases.filter(r => {
    if (filterPriority === 'all') return true;
    return (r.urgency || '').toLowerCase() === filterPriority.toLowerCase();
  });

  const handleAcceptCase = (caseId) => {
    advanceCaseStep(caseId, 'on_the_way');
    setSelectedCaseId(caseId);
    navigateTo('volunteer-active', caseId);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1F2A24, #2F6B4F)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px 20px',
        color: '#FFFFFF',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge" style={{ background: 'var(--accent)', color: '#1F2A24', fontWeight: 700, marginBottom: '6px' }}>
              🦺 Volunteer Responder Mode
            </span>
            <h1 style={{ fontSize: '1.5rem', color: '#FFFFFF', margin: '4px 0 2px' }}>
              Emergency Rescue Feed
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>
              Jaipur Central & Suburban Zone • Active Response Duty
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => navigateTo('volunteer-active', 'GS-1024')}
              className="btn btn-accent btn-sm"
            >
              <span>🚑 Open Active Mission (GS-1024)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Volunteer Counter Cards (Section 11 requirement) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '12px'
      }}>
        <div className="card" style={{ padding: '14px', borderLeft: '4px solid var(--color-emergency)', textAlign: 'center' }}>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-emergency)', display: 'block' }}>
            {newRequestsCount || 6}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>New Requests</span>
        </div>

        <div className="card" style={{ padding: '14px', borderLeft: '4px solid var(--accent)', textAlign: 'center' }}>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-hover)', display: 'block' }}>
            {assignedCount || 2}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Assigned</span>
        </div>

        <div className="card" style={{ padding: '14px', borderLeft: '4px solid var(--primary)', textAlign: 'center' }}>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', display: 'block' }}>
            {activeRescueCount || 1}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Rescues</span>
        </div>

        <div className="card" style={{ padding: '14px', borderLeft: '4px solid var(--color-resolved)', textAlign: 'center' }}>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-resolved-text)', display: 'block' }}>
            {completedCount || 48}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Completed</span>
        </div>
      </div>

      {/* Priority Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: 0 }}>
          Available Cases Near You
        </h2>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['all', 'emergency', 'urgent', 'normal'].map(p => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`btn btn-sm ${filterPriority === p ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '4px 10px', fontSize: '0.75rem', textTransform: 'capitalize' }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Available Requests List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredList.map(rep => (
          <div 
            key={rep.id}
            className="card"
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <img 
                  src={rep.photo} 
                  alt={rep.problemType}
                  style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.98rem' }}>{rep.id}</span>
                    <UrgencyBadge urgency={rep.urgency} size="sm" />
                    <StatusBadge status={rep.status} />
                  </div>
                  <h3 style={{ fontSize: '0.95rem', color: 'var(--text-main)', margin: '0 0 2px' }}>
                    {rep.problemIcon} {rep.problemType}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    📍 {rep.locationName} • <strong>{rep.distance}</strong>
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {rep.createdAt}
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
              {rep.description}
            </p>

            {/* Action Buttons: View vs Accept Case */}
            <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--border-card)', paddingTop: '12px' }}>
              <button 
                onClick={() => {
                  setSelectedCaseId(rep.id);
                  navigateTo('volunteer-active', rep.id);
                }}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                View Case Details
              </button>

              <button 
                onClick={() => handleAcceptCase(rep.id)}
                className="btn btn-accent btn-sm"
                style={{ flex: 1 }}
              >
                Accept Case 🚑
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
