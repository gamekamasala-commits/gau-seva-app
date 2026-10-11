import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UrgencyBadge, StatusBadge } from '../../components/Badge';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Shield, 
  AlertCircle, 
  ArrowLeft, 
  Play, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const CaseTracking = () => {
  const { 
    selectedCaseId, 
    reports, 
    advanceCaseStep, 
    navigateTo, 
    switchRole 
  } = useApp();

  const [callModalOpen, setCallModalOpen] = useState(false);

  // Find the selected report or fallback to first
  const currentCase = reports.find(r => r.id === selectedCaseId) || reports[0];

  if (!currentCase) {
    return (
      <div className="card text-center" style={{ padding: '40px' }}>
        <h3>No Case Selected</h3>
        <button onClick={() => navigateTo('home')} className="btn btn-primary btn-sm" style={{ marginTop: '12px' }}>
          Back to Home
        </button>
      </div>
    );
  }

  // Calculate next step for prototype simulation button
  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'submitted': return 'verified';
      case 'verified': return 'assigned';
      case 'assigned': return 'on_the_way';
      case 'on_the_way': return 'reached';
      case 'reached': return 'rescue';
      case 'rescue': return 'completed';
      default: return null;
    }
  };

  const nextStatus = getNextStatus(currentCase.status);

  return (
    <div className="animate-fade-in mobile-frame-container" style={{ paddingBottom: '36px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button 
          onClick={() => navigateTo('home')}
          className="btn btn-ghost btn-sm"
          style={{ padding: '6px 10px', gap: '4px' }}
        >
          <ArrowLeft size={16} />
          <span>Home</span>
        </button>

        <span className="badge badge-primary">
          <Sparkles size={12} /> Live Simulation
        </span>
      </div>

      {/* Case Header Card */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Tracking Case
            </span>
            <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', margin: '2px 0 6px' }}>
              {currentCase.id}
            </h1>
          </div>
          <UrgencyBadge urgency={currentCase.urgency} />
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <img 
            src={currentCase.photo} 
            alt={currentCase.problemType}
            style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border-card)' }}
          />
          <div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: '0 0 4px' }}>
              {currentCase.problemIcon} {currentCase.problemType}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <MapPin size={14} color="var(--primary)" />
              <span>{currentCase.locationName}</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
              Reported: {currentCase.createdAt}
            </span>
          </div>
        </div>
      </div>

      {/* Rescue Team Card (Section 9 requirement) */}
      <div className="card" style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1.5px solid var(--border-card)',
        padding: '18px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'var(--accent-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              🚑
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', margin: 0 }}>
                {currentCase.assignedTeam?.teamName || 'Jaipur Rescue Team — Central Unit'}
              </h4>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Lead Volunteer: {currentCase.assignedTeam?.leadVolunteer || 'Rahul Sharma'}
              </span>
            </div>
          </div>

          <StatusBadge status={currentCase.status} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          backgroundColor: 'var(--bg-surface-alt)',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '12px',
          fontSize: '0.82rem'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>Status</span>
            <strong style={{ color: 'var(--primary-dark)' }}>
              {currentCase.status === 'completed' ? 'Safely Resolved' : 'On the way to spot'}
            </strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>Estimated Arrival</span>
            <strong style={{ color: 'var(--accent-hover)' }}>
              {currentCase.status === 'completed' ? 'Arrived & Treated' : (currentCase.assignedTeam?.eta || '18 min')}
            </strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setCallModalOpen(true)}
            className="btn btn-secondary btn-sm" 
            style={{ flex: 1, gap: '6px' }}
          >
            <Phone size={14} color="var(--primary)" />
            <span>Call Rescue Team</span>
          </button>
          <button 
            onClick={() => switchRole('volunteer')}
            className="btn btn-primary btn-sm"
            style={{ flex: 1, gap: '6px' }}
          >
            <Shield size={14} />
            <span>Volunteer View</span>
          </button>
        </div>
      </div>

      {/* Vertical Status Timeline (Section 9 requirement) */}
      <div className="card" style={{ padding: '22px 20px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '16px' }}>
          Live Rescue Timeline
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {currentCase.timeline.map((item, idx) => {
            const isDone = item.status === 'done';
            const isCurrent = item.status === 'current';
            const isLast = idx === currentCase.timeline.length - 1;

            return (
              <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative', paddingBottom: isLast ? '0' : '22px' }}>
                
                {/* Vertical Connector Line */}
                {!isLast && (
                  <div style={{
                    position: 'absolute',
                    top: '24px',
                    left: '13px',
                    bottom: '0',
                    width: '2px',
                    backgroundColor: isDone ? 'var(--primary)' : 'var(--border-subtle)',
                    zIndex: 1
                  }} />
                )}

                {/* Timeline Icon / Dot */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: isDone ? 'var(--primary)' : isCurrent ? 'var(--accent)' : 'var(--bg-surface-alt)',
                  color: isDone || isCurrent ? '#FFF' : 'var(--text-muted)',
                  border: isCurrent ? '3px solid var(--accent-light)' : '2px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  zIndex: 2,
                  boxShadow: isCurrent ? '0 0 10px rgba(232, 163, 61, 0.6)' : 'none',
                  flexShrink: 0
                }}>
                  {isDone ? '✓' : isCurrent ? '🚑' : '○'}
                </div>

                {/* Step Details */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h4 style={{ 
                      fontSize: '0.92rem', 
                      color: isDone || isCurrent ? 'var(--text-main)' : 'var(--text-muted)',
                      fontWeight: isCurrent ? 700 : 600,
                      margin: 0
                    }}>
                      {item.step}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: isDone || isCurrent ? 'var(--text-secondary)' : 'var(--text-muted)', fontWeight: 500 }}>
                      {item.time}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: isDone || isCurrent ? 'var(--text-secondary)' : 'var(--text-muted)', margin: '2px 0 0' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Prototype Simulation Controls */}
      <div style={{
        backgroundColor: 'var(--primary-light)',
        border: '1.5px dashed var(--primary)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '18px' }}>🎮</span>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', margin: 0 }}>
            Prototype Simulation Controller
          </h4>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Advance the case status to demonstrate the simulated rescue progression:
        </p>

        {nextStatus ? (
          <button 
            onClick={() => advanceCaseStep(currentCase.id, nextStatus)}
            className="btn btn-primary btn-block btn-sm"
          >
            <Play size={14} />
            <span>Simulate Next Stage: {nextStatus.replace('_', ' ').toUpperCase()}</span>
          </button>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--color-normal-text)', fontWeight: 600, fontSize: '0.85rem' }}>
            🎉 Case has completed full simulated rescue cycle!
          </div>
        )}
      </div>

      {/* Call Volunteer Simulation Modal */}
      {callModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(31, 42, 36, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300,
          padding: '16px'
        }} onClick={() => setCallModalOpen(false)}>
          <div 
            className="card"
            style={{ maxWidth: '360px', width: '100%', textAlign: 'center', padding: '24px' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <Phone size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Simulated Helpline Call</h3>
            <p style={{ fontSize: '0.85rem', marginBottom: '16px' }}>
              Connected to <strong>Rahul Sharma</strong> (Rescue Ambulance RJ-14-GA-2024).
            </p>
            <div style={{ background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '16px' }}>
              "Namaste! We are 4 minutes away from Ajmeri Gate crossing. Please keep traffic clear."
            </div>
            <button 
              onClick={() => setCallModalOpen(false)}
              className="btn btn-secondary btn-block btn-sm"
            >
              End Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
