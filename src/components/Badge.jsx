import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock, Check } from 'lucide-react';

export const UrgencyBadge = ({ urgency, size = 'md' }) => {
  const normalized = (urgency || '').toLowerCase();

  if (normalized === 'emergency') {
    return (
      <span className={`badge badge-emergency ${size === 'sm' ? 'badge-sm' : ''}`}>
        <AlertCircle size={size === 'sm' ? 12 : 14} />
        <span>🔴 Emergency</span>
      </span>
    );
  }

  if (normalized === 'urgent') {
    return (
      <span className={`badge badge-urgent ${size === 'sm' ? 'badge-sm' : ''}`}>
        <AlertTriangle size={size === 'sm' ? 12 : 14} />
        <span>🟠 Urgent</span>
      </span>
    );
  }

  return (
    <span className={`badge badge-normal ${size === 'sm' ? 'badge-sm' : ''}`}>
      <Clock size={size === 'sm' ? 12 : 14} />
      <span>🟢 Normal</span>
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  const norm = (status || '').toLowerCase();

  switch (norm) {
    case 'submitted':
      return <span className="badge badge-primary">Submitted</span>;
    case 'verified':
      return <span className="badge badge-primary">Verified</span>;
    case 'assigned':
      return <span className="badge badge-urgent">Team Assigned</span>;
    case 'on_the_way':
      return <span className="badge badge-urgent animate-pulse-glow">🚑 En Route</span>;
    case 'reached':
      return <span className="badge badge-primary">📍 On Site</span>;
    case 'rescue':
      return <span className="badge badge-primary">🩺 Treatment</span>;
    case 'completed':
      return (
        <span className="badge badge-resolved">
          <Check size={13} /> Completed
        </span>
      );
    default:
      return <span className="badge badge-primary">{status}</span>;
  }
};
