import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Search, 
  ExternalLink, 
  Heart, 
  Clock, 
  Info,
  Navigation
} from 'lucide-react';

export const GaushalaDirectory = () => {
  const { gaushalas, navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('all');
  const [contactModalGaushala, setContactModalGaushala] = useState(null);

  const facilitiesList = ['all', '24x7 Ambulance', 'Veterinary Surgeon on duty', 'Fodder Donation Center', 'Old & Retired Cow Sanctuary'];

  const filteredGaushalas = gaushalas.filter(g => {
    const matchesSearch = 
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.location.toLowerCase().includes(search.toLowerCase());

    const matchesFacility = 
      selectedFacility === 'all' ? true :
      g.facilities.some(f => f.toLowerCase().includes(selectedFacility.toLowerCase()));

    return matchesSearch && matchesFacility;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '2px' }}>
          Gaushala Directory
        </h1>
        <span className="hindi-subtitle">सहयोगी गौशालाएं एवं आश्रय केंद्र (जयपुर)</span>
      </div>

      {/* Disclaimer Banner (Section 16 requirement) */}
      <div style={{
        backgroundColor: 'var(--bg-surface-alt)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.78rem',
        color: 'var(--text-secondary)'
      }}>
        <Info size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Prototype Directory:</strong> All shelters listed are realistic demo entries created to demonstrate sanctuary coordination.
        </span>
      </div>

      {/* Search and Facility Filters */}
      <div className="card" style={{ padding: '16px' }}>
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <Search size={16} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-input"
            style={{ paddingLeft: '36px' }}
            placeholder="Search by Gaushala name, area, or facility..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {facilitiesList.map(f => (
            <button
              key={f}
              onClick={() => setSelectedFacility(f)}
              className={`btn btn-sm ${selectedFacility === f ? 'btn-primary' : 'btn-secondary'}`}
              style={{ whiteSpace: 'nowrap', fontSize: '0.78rem', padding: '4px 10px' }}
            >
              {f === 'all' ? 'All Facilities' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Gaushala Cards List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {filteredGaushalas.map(g => (
          <div 
            key={g.id}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '18px',
              gap: '14px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <span className="badge" style={{ background: 'var(--bg-surface-alt)', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Sample Listing • {g.distance} away
                  </span>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: '2px 0' }}>
                    {g.name}
                  </h3>
                  <span className="hindi-subtitle" style={{ fontSize: '0.85rem' }}>
                    {g.hindiName}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                <MapPin size={14} color="var(--primary)" />
                <span>{g.location}</span>
              </div>

              {/* Facilities tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                {g.facilities.map((fac, idx) => (
                  <span 
                    key={idx}
                    style={{
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary-dark)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    ✓ {fac}
                  </span>
                ))}
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Capacity: <strong>{g.capacity}</strong> • Rating: ⭐ <strong>{g.rating} / 5.0</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-card)', paddingTop: '12px' }}>
              <button 
                onClick={() => setContactModalGaushala(g)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, gap: '6px' }}
              >
                <Phone size={14} color="var(--primary)" />
                <span>Contact</span>
              </button>
              
              <button 
                onClick={() => navigateTo('donation')}
                className="btn btn-primary btn-sm"
                style={{ flex: 1, gap: '6px' }}
              >
                <Heart size={14} />
                <span>Donate Fodder</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Gaushala Simulated Modal */}
      {contactModalGaushala && (
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
        }} onClick={() => setContactModalGaushala(null)}>
          <div 
            className="card"
            style={{ maxWidth: '380px', width: '100%', padding: '24px', textAlign: 'center' }}
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
              <Building2 size={28} />
            </div>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{contactModalGaushala.name}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              📍 {contactModalGaushala.location}
            </p>

            <div style={{ backgroundColor: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
              <div>Helpline: <strong>{contactModalGaushala.phone}</strong></div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Open for fodder drops: 7:00 AM – 7:00 PM Daily
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setContactModalGaushala(null)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                Close
              </button>
              <button 
                onClick={() => {
                  alert(`Simulating phone call to ${contactModalGaushala.phone}`);
                  setContactModalGaushala(null);
                }}
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
