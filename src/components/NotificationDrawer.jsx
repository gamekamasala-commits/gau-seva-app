import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, CheckCheck, Siren, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const NotificationDrawer = () => {
  const { 
    isNotifOpen, 
    setIsNotifOpen, 
    notifications, 
    navigateTo, 
    language 
  } = useApp();

  if (!isNotifOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(31, 42, 36, 0.6)',
      backdropFilter: 'blur(3px)',
      zIndex: 210,
      display: 'flex',
      justifyContent: 'flex-end'
    }} onClick={() => setIsNotifOpen(false)}>
      <div 
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'var(--bg-surface)',
          height: '100%',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 250ms ease-out'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-surface-alt)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>
              {language === 'hi' ? 'सूचनाएं' : 'Notifications'}
            </h3>
          </div>
          <button 
            onClick={() => setIsNotifOpen(false)}
            style={{
              padding: '6px',
              borderRadius: '50%',
              color: 'var(--text-muted)',
              background: 'var(--bg-surface)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* List of notifications */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-muted)' }}>
              <CheckCheck size={48} style={{ opacity: 0.3, margin: '0 auto 12px' }} />
              <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>You're all caught up!</p>
              <p style={{ fontSize: '0.85rem' }}>No new dispatch alerts or updates.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {notifications.map((n) => (
                <div 
                  key={n.id}
                  onClick={() => {
                    if (n.caseId) {
                      navigateTo('case-track', n.caseId);
                      setIsNotifOpen(false);
                    }
                  }}
                  className="card card-interactive"
                  style={{
                    padding: '14px',
                    borderLeft: `4px solid ${n.type === 'dispatch' ? 'var(--accent)' : n.type === 'verify' ? 'var(--primary)' : 'var(--color-resolved)'}`,
                    backgroundColor: n.unread ? 'var(--primary-light)' : 'var(--bg-surface)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                      {language === 'hi' ? (n.hindiTitle || n.title) : n.title}
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{n.time}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    {n.message}
                  </p>
                  {n.caseId && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>
                      <span>View Case {n.caseId}</span>
                      <ArrowRight size={13} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border-card)', textAlign: 'center' }}>
          <button 
            onClick={() => setIsNotifOpen(false)}
            className="btn btn-secondary btn-sm btn-block"
          >
            Close Panel
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
