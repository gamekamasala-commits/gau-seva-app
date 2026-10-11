import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Phone, 
  MapPin, 
  Star, 
  Award, 
  ShieldCheck, 
  Plus, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export const AdminVolunteerManagement = () => {
  const { volunteers, navigateTo } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button 
              onClick={() => navigateTo('admin-dashboard')}
              className="btn btn-ghost btn-sm"
              style={{ padding: '4px 8px' }}
            >
              <ArrowLeft size={16} />
            </button>
            <h1 style={{ fontSize: '1.5rem', color: 'var(--text-main)', margin: 0 }}>
              Volunteer Roster & Fleet
            </h1>
          </div>
          <span className="hindi-subtitle" style={{ marginLeft: '34px' }}>
            सक्रिय स्वयंसेवक एवं रेस्क्यू यूनिट प्रबंधन
          </span>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-sm"
          style={{ gap: '6px' }}
        >
          <Plus size={16} />
          <span>Add New Volunteer</span>
        </button>
      </div>

      {/* Volunteer Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {volunteers.map(v => (
          <div 
            key={v.id}
            className="card"
            style={{
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: '0 0 2px' }}>
                    {v.name}
                  </h3>
                  <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                    <Award size={12} /> {v.badge}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: '#FEF3C7', padding: '2px 8px', borderRadius: 'var(--radius-full)', color: '#92400E', fontSize: '0.78rem', fontWeight: 700 }}>
                  <Star size={13} fill="#D97706" color="#D97706" />
                  <span>{v.rating}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--primary)" />
                  <span>{v.area}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} color="var(--text-muted)" />
                  <span>{v.phone}</span>
                </div>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-surface-alt)',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Total Rescues: <strong>{v.rescuesCount}</strong></span>
                <span style={{
                  color: v.status.includes('Busy') ? 'var(--color-urgent-text)' : 'var(--color-normal-text)',
                  fontWeight: 600
                }}>
                  ● {v.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-card)', paddingTop: '12px' }}>
              <button 
                onClick={() => alert(`Calling volunteer ${v.name} (${v.phone})`)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                Call Unit
              </button>
              {v.activeCaseId && (
                <button 
                  onClick={() => navigateTo('case-track', v.activeCaseId)}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  View Case
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Volunteer Demo Modal */}
      {showAddModal && (
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
        }} onClick={() => setShowAddModal(false)}>
          <div 
            className="card"
            style={{ maxWidth: '400px', width: '100%', padding: '24px' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Register New Volunteer (Demo)</h3>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" placeholder="e.g. Ramesh Saini" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="tel" className="form-input" placeholder="+91 98..." />
            </div>
            <div className="form-group">
              <label className="form-label">Operating Zone (Jaipur)</label>
              <input type="text" className="form-input" placeholder="e.g. Malviya Nagar" />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => setShowAddModal(false)} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Demo Volunteer Registered!');
                  setShowAddModal(false);
                }} 
                className="btn btn-primary btn-sm" 
                style={{ flex: 1 }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
