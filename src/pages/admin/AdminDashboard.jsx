import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UrgencyBadge, StatusBadge } from '../../components/Badge';
import { 
  Activity, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  FileSpreadsheet, 
  Search, 
  UserCheck, 
  Filter, 
  ChevronRight,
  Sparkles,
  TrendingUp,
  Clock
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    reports, 
    volunteers, 
    stats, 
    navigateTo, 
    assignVolunteer, 
    advanceCaseStep 
  } = useApp();

  const [filter, setFilter] = useState('all'); // all, emergency, urgent, normal, pending, active, completed
  const [search, setSearch] = useState('');
  const [assignModalCase, setAssignModalCase] = useState(null);
  const [selectedVolId, setSelectedVolId] = useState(volunteers[0]?.id || '');

  const pendingCount = reports.filter(r => ['submitted', 'verified'].includes(r.status)).length;
  const activeCount = reports.filter(r => ['assigned', 'on_the_way', 'reached', 'rescue'].includes(r.status)).length;
  const completedCount = reports.filter(r => r.status === 'completed').length;

  const filteredReports = reports.filter(r => {
    const matchesSearch = 
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.problemType.toLowerCase().includes(search.toLowerCase()) ||
      r.locationName.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === 'all') return true;
    if (filter === 'emergency') return (r.urgency || '').toLowerCase() === 'emergency';
    if (filter === 'urgent') return (r.urgency || '').toLowerCase() === 'urgent';
    if (filter === 'normal') return (r.urgency || '').toLowerCase() === 'normal';
    if (filter === 'pending') return ['submitted', 'verified'].includes(r.status);
    if (filter === 'active') return ['assigned', 'on_the_way', 'reached', 'rescue'].includes(r.status);
    if (filter === 'completed') return r.status === 'completed';
    return true;
  });

  const handleConfirmAssign = () => {
    if (assignModalCase && selectedVolId) {
      assignVolunteer(assignModalCase.id, selectedVolId);
      setAssignModalCase(null);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1E2922, #1B3F2E)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px 20px',
        color: '#FFFFFF',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge" style={{ background: '#4338CA', color: '#FFF', marginBottom: '6px' }}>
              🛡️ Central Control Desk
            </span>
            <h1 style={{ fontSize: '1.6rem', color: '#FFFFFF', margin: '4px 0 2px' }}>
              Gau Seva Master Dispatch & Operations
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>
              Jaipur Command Center • Live Triage & Volunteer Coordination
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => navigateTo('admin-volunteers')}
              className="btn btn-secondary btn-sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFF', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <Users size={15} />
              <span>Manage Volunteers ({volunteers.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Statistics Cards (Section 13 requirement) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '14px'
      }}>
        <div className="card" style={{ padding: '16px', borderTop: '4px solid var(--primary)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL REPORTS</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '4px 0' }}>
            {reports.length + 1244}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={12} /> +12 today
          </span>
        </div>

        <div className="card" style={{ padding: '16px', borderTop: '4px solid var(--color-urgent)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>PENDING TRIAGE</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-urgent-text)', margin: '4px 0' }}>
            {pendingCount}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-urgent-text)' }}>Requires desk verify</span>
        </div>

        <div className="card" style={{ padding: '16px', borderTop: '4px solid var(--accent)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE MISSIONS</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-hover)', margin: '4px 0' }}>
            {activeCount}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Ambulance en route</span>
        </div>

        <div className="card" style={{ padding: '16px', borderTop: '4px solid var(--color-normal)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>COMPLETED CASES</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-normal-text)', margin: '4px 0' }}>
            {completedCount + 935}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-normal-text)' }}>Safely sheltered</span>
        </div>

        <div className="card" style={{ padding: '16px', borderTop: '4px solid #4338CA' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>VOLUNTEER ROSTER</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4338CA', margin: '4px 0' }}>
            {volunteers.length}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>4 On Active Duty</span>
        </div>
      </div>

      {/* Case Management Table Section (Section 13 requirement) */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
              Master Case Management
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Showing {filteredReports.length} incidents in Jaipur division
            </span>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={15} style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input"
              style={{ paddingLeft: '32px', paddingTop: '6px', paddingBottom: '6px', fontSize: '0.85rem' }}
              placeholder="Search ID, condition, area..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '12px', borderBottom: '1px solid var(--border-card)', marginBottom: '16px' }}>
          {[
            { id: 'all', label: 'All Cases' },
            { id: 'emergency', label: '🔴 Emergency' },
            { id: 'urgent', label: '🟠 Urgent' },
            { id: 'normal', label: '🟢 Normal' },
            { id: 'pending', label: '⏳ Pending' },
            { id: 'active', label: '🚑 Active' },
            { id: 'completed', label: '✓ Completed' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`btn btn-sm ${filter === f.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.78rem', padding: '4px 10px', whiteSpace: 'nowrap' }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Responsive Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-surface-alt)', borderBottom: '1.5px solid var(--border-subtle)' }}>
                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Case ID</th>
                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Problem</th>
                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Location</th>
                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Priority</th>
                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Reported At</th>
                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Assigned Unit</th>
                <th style={{ padding: '10px 12px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((rep) => (
                <tr 
                  key={rep.id} 
                  style={{ borderBottom: '1px solid var(--border-card)', transition: 'background 150ms' }}
                >
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary-dark)' }}>
                    {rep.id}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{rep.problemIcon}</span>
                      <span style={{ fontWeight: 600 }}>{rep.problemType}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                    {rep.locationName}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <UrgencyBadge urgency={rep.urgency} size="sm" />
                  </td>
                  <td style={{ padding: '12px' }}>
                    <StatusBadge status={rep.status} />
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    {rep.createdAt}
                  </td>
                  <td style={{ padding: '12px', fontSize: '0.82rem' }}>
                    {rep.assignedTeam?.leadVolunteer ? (
                      <span style={{ color: 'var(--primary-dark)', fontWeight: 600 }}>
                        🧑‍⚕️ {rep.assignedTeam.leadVolunteer}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>Unassigned</span>
                    )}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button 
                        onClick={() => setAssignModalCase(rep)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                        title="Assign volunteer"
                      >
                        <UserCheck size={13} />
                        <span>Assign</span>
                      </button>

                      <button 
                        onClick={() => navigateTo('case-track', rep.id)}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                      >
                        <span>Details</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Volunteer Assignment Modal (Section 14 requirement) */}
      {assignModalCase && (
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
        }} onClick={() => setAssignModalCase(null)}>
          <div 
            className="card"
            style={{ maxWidth: '440px', width: '100%', padding: '24px' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span className="badge badge-primary">Dispatch Desk</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: '4px 0 0' }}>
                  Assign Volunteer to {assignModalCase.id}
                </h3>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.82rem' }}>
              <div><strong>Problem:</strong> {assignModalCase.problemType} ({assignModalCase.urgency})</div>
              <div><strong>Location:</strong> {assignModalCase.locationName}</div>
            </div>

            <div className="form-group">
              <label className="form-label">Select Available Volunteer</label>
              <select 
                className="form-select"
                value={selectedVolId}
                onChange={e => setSelectedVolId(e.target.value)}
              >
                {volunteers.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.area}) — {v.status}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button 
                onClick={() => setAssignModalCase(null)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmAssign}
                className="btn btn-accent btn-sm"
                style={{ flex: 1 }}
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
