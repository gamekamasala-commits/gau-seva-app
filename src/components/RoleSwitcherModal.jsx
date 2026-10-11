import React from 'react';
import { useApp } from '../context/AppContext';
import { User, ShieldCheck, HeartHandshake, Check, X } from 'lucide-react';

export const RoleSwitcherModal = () => {
  const { isRoleModalOpen, setIsRoleModalOpen, currentRole, switchRole } = useApp();

  if (!isRoleModalOpen) return null;

  const roles = [
    {
      id: 'citizen',
      title: 'Citizen / Reporter',
      hindiTitle: 'नागरिक / रिपोर्टर',
      badge: 'Public Mode',
      icon: '👤',
      color: 'var(--primary)',
      description: 'Report a cow in distress with photo & location pin, track live rescue timeline, find nearby gaushalas, and support animal care.',
      features: ['🚨 6-Step Cow Reporting', '📍 Live Case Tracking (GS-1024)', '🏛️ Gaushala Directory', '💝 Support & Donation']
    },
    {
      id: 'volunteer',
      title: 'Rescue Volunteer',
      hindiTitle: 'रेस्क्यू स्वयंसेवक',
      badge: 'Field Responder',
      icon: '🦺',
      color: 'var(--accent)',
      description: 'View unassigned nearby distress alerts, accept emergency rescue missions, update real-time field status, and upload post-treatment photos.',
      features: ['📋 Available Cases Feed', '🚑 Active Rescue Mode', '⏱️ 1-Click Status Progression', '📸 Before/After Photos']
    },
    {
      id: 'admin',
      title: 'Admin Control Desk',
      hindiTitle: 'प्रशासन कंट्रोल डेस्क',
      badge: 'Central Dispatch',
      icon: '🛡️',
      color: '#4338CA',
      description: 'Master case overview table, emergency triage verification, manual volunteer assignment, analytics, and partner gaushala coordination.',
      features: ['📊 High-Level KPI Stats', '🗂️ Full Case Management Table', '🧑‍⚕️ Volunteer Dispatch & Assignment', '📈 Resolution Analytics']
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(31, 42, 36, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '16px'
    }} onClick={() => setIsRoleModalOpen(false)}>
      <div 
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-xl)',
          padding: '24px',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={() => setIsRoleModalOpen(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: 'var(--text-muted)',
            padding: '6px',
            borderRadius: '50%',
            background: 'var(--bg-surface-alt)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: '20px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '6px' }}>Prototype Multi-Experience</span>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '4px' }}>
            Switch Role Experience
          </h2>
          <p style={{ fontSize: '0.9rem' }}>
            Select an experience to test the end-to-end flow from Citizen, Volunteer, or Admin perspective:
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {roles.map(r => {
            const isSelected = currentRole === r.id;
            return (
              <div 
                key={r.id}
                onClick={() => switchRole(r.id)}
                className="card card-interactive"
                style={{
                  border: isSelected ? `2px solid ${r.color}` : '1.5px solid var(--border-card)',
                  backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{r.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{r.title}</h3>
                      <span className="hindi-subtitle">{r.hindiTitle}</span>
                    </div>
                  </div>
                  {isSelected ? (
                    <span style={{
                      backgroundColor: 'var(--primary)',
                      color: '#FFF',
                      borderRadius: '50%',
                      padding: '4px',
                      display: 'flex'
                    }}>
                      <Check size={16} />
                    </span>
                  ) : (
                    <span className="badge" style={{ background: 'var(--bg-surface-alt)' }}>{r.badge}</span>
                  )}
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  {r.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                  {r.features.map((feat, idx) => (
                    <span 
                      key={idx} 
                      style={{ 
                        fontSize: '0.72rem', 
                        background: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--bg-surface-alt)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        color: 'var(--text-main)',
                        fontWeight: 500
                      }}
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            💡 All roles share the live synchronized mock database in your browser.
          </p>
        </div>
      </div>
    </div>
  );
};
