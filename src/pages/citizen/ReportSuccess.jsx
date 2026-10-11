import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, ArrowRight, Home, Shield, PhoneCall, Sparkles } from 'lucide-react';

export const ReportSuccess = () => {
  const { selectedCaseId, navigateTo, reports } = useApp();

  const currentCase = reports.find(r => r.id === selectedCaseId) || reports[0];

  return (
    <div className="animate-fade-in mobile-frame-container" style={{ textAlign: 'center', padding: '20px 0 40px' }}>
      
      {/* Celebration Icon */}
      <div style={{
        width: '84px',
        height: '84px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-normal-bg)',
        color: 'var(--color-normal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        boxShadow: '0 8px 24px rgba(22, 163, 74, 0.25)',
        border: '4px solid #FFFFFF'
      }}>
        <CheckCircle size={48} />
      </div>

      <span className="badge badge-normal" style={{ marginBottom: '10px' }}>
        <Sparkles size={13} /> Immediate Dispatch Triggered
      </span>

      <h1 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '8px' }}>
        Report Successfully Submitted
      </h1>
      
      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '380px', margin: '0 auto 24px' }}>
        Your report has been received by the Gau Seva network. A nearby volunteer team is being alerted.
      </p>

      {/* Case ID Highlight Card */}
      <div className="card" style={{
        backgroundColor: 'var(--primary-light)',
        borderColor: 'rgba(47, 107, 79, 0.3)',
        padding: '20px',
        marginBottom: '28px',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Assigned Case Identifier
        </span>
        <div style={{ 
          fontSize: '2.2rem', 
          fontWeight: 800, 
          color: 'var(--primary-dark)',
          fontFamily: 'var(--font-heading)',
          margin: '4px 0'
        }}>
          {selectedCaseId}
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          {currentCase?.problemType} • {currentCase?.locationName}
        </p>
      </div>

      {/* Dispatch Simulation Status Snippet */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        marginBottom: '28px',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px'
          }}>
            🚑
          </div>
          <div>
            <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)', margin: 0 }}>
              Jaipur Central Rescue Team
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Estimated arrival: ~14 mins
            </span>
          </div>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
          You can track real-time status, photos, and team arrival from the Case Tracking dashboard.
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button 
          onClick={() => navigateTo('case-track', selectedCaseId)}
          className="btn btn-accent btn-block btn-lg"
          style={{ fontSize: '1.05rem' }}
        >
          <span>Track Case Live</span>
          <ArrowRight size={18} />
        </button>

        <button 
          onClick={() => navigateTo('home')}
          className="btn btn-secondary btn-block"
        >
          <Home size={16} />
          <span>Back to Home</span>
        </button>
      </div>

    </div>
  );
};
