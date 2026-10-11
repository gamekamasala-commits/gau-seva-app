import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MockMap } from '../../components/MockMap';
import { UrgencyBadge, StatusBadge } from '../../components/Badge';
import { 
  Filter, 
  MapPin, 
  Search, 
  ArrowRight, 
  List, 
  Layers, 
  AlertCircle,
  Inbox
} from 'lucide-react';

export const NearbyCases = () => {
  const { reports, navigateTo, selectedCaseId, setSelectedCaseId } = useApp();

  const [filterCategory, setFilterCategory] = useState('all'); // all, emergency, urgent, normal, completed
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('both'); // map, list, both

  const filteredReports = reports.filter(r => {
    const matchesCategory = 
      filterCategory === 'all' ? true :
      filterCategory === 'completed' ? r.status === 'completed' :
      (r.urgency || '').toLowerCase() === filterCategory.toLowerCase();

    const matchesSearch = 
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.problemType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.locationName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '2px' }}>
            Nearby Distress Cases
          </h1>
          <span className="hindi-subtitle">आसपास के सक्रिय केस एवं सहायता केंद्र</span>
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-surface-alt)', padding: '3px', borderRadius: 'var(--radius-md)' }}>
          <button 
            onClick={() => setViewMode('both')}
            className={`btn btn-sm ${viewMode === 'both' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ padding: '5px 10px', fontSize: '0.78rem' }}
          >
            Map + List
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`btn btn-sm ${viewMode === 'map' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ padding: '5px 10px', fontSize: '0.78rem' }}
          >
            Map Only
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ padding: '5px 10px', fontSize: '0.78rem' }}
          >
            List Only
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ position: 'relative', flex: '1 1 220px' }}>
            <Search size={16} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              className="form-input"
              style={{ paddingLeft: '36px', paddingBottom: '8px', paddingTop: '8px' }}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by case ID, location, injury..."
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'all', label: `All (${reports.length})` },
            { id: 'emergency', label: '🔴 Emergency', color: 'var(--color-emergency)' },
            { id: 'urgent', label: '🟠 Urgent', color: 'var(--color-urgent)' },
            { id: 'normal', label: '🟢 Normal', color: 'var(--color-normal)' },
            { id: 'completed', label: '🔵 Resolved', color: 'var(--color-resolved)' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterCategory(f.id)}
              className={`btn btn-sm ${filterCategory === f.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ whiteSpace: 'nowrap', padding: '5px 12px', fontSize: '0.8rem' }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Display */}
      {viewMode !== 'list' && (
        <div>
          <MockMap 
            reports={filteredReports}
            selectedCaseId={selectedCaseId}
            onSelectCase={(id) => {
              setSelectedCaseId(id);
              navigateTo('case-track', id);
            }}
            height="380px"
          />
        </div>
      )}

      {/* Case List Feed */}
      {viewMode !== 'map' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>
              Incident Feed ({filteredReports.length} {filteredReports.length === 1 ? 'case' : 'cases'})
            </h3>
          </div>

          {filteredReports.length === 0 ? (
            <div className="card text-center" style={{ padding: '40px 20px', color: 'var(--text-muted)' }}>
              <Inbox size={48} style={{ opacity: 0.3, margin: '0 auto 12px' }} />
              <h4 style={{ color: 'var(--text-main)', marginBottom: '4px' }}>No active cases nearby</h4>
              <p style={{ fontSize: '0.85rem' }}>Try clearing the search query or changing filter category.</p>
              <button 
                onClick={() => { setFilterCategory('all'); setSearchQuery(''); }}
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '12px' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px' }}>
              {filteredReports.map(rep => (
                <div 
                  key={rep.id}
                  onClick={() => navigateTo('case-track', rep.id)}
                  className="card card-interactive"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '16px',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <img 
                      src={rep.photo} 
                      alt={rep.problemType}
                      style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{rep.id}</span>
                        <UrgencyBadge urgency={rep.urgency} size="sm" />
                      </div>
                      <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)', margin: '0 0 2px' }}>
                        {rep.problemIcon} {rep.problemType}
                      </h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        📍 {rep.locationName}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {rep.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-card)', paddingTop: '10px' }}>
                    <StatusBadge status={rep.status} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Track Case <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
