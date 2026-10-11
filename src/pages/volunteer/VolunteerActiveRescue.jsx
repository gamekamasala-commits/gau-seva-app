import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UrgencyBadge, StatusBadge } from '../../components/Badge';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Camera, 
  CheckCircle, 
  Play, 
  Upload, 
  Sparkles,
  Shield,
  Activity,
  AlertTriangle,
  FileCheck
} from 'lucide-react';

export const VolunteerActiveRescue = () => {
  const { 
    selectedCaseId, 
    reports, 
    advanceCaseStep, 
    navigateTo, 
    triggerConfetti 
  } = useApp();

  const [afterPhoto, setAfterPhoto] = useState(null);
  const [treatmentNotes, setTreatmentNotes] = useState('First-aid antiseptic applied. Leg stabilized with cotton bandage. Transferred safely into ambulance ward.');

  const currentCase = reports.find(r => r.id === selectedCaseId) || reports[0];

  const stepsOrder = [
    { key: 'assigned', label: '1. Case Accepted', hindi: 'केस स्वीकार किया' },
    { key: 'on_the_way', label: '2. On The Way (Ambulance)', hindi: 'रास्ते में' },
    { key: 'reached', label: '3. Reached Location', hindi: 'मौके पर पहुंचे' },
    { key: 'rescue', label: '4. Rescue & Treatment', hindi: 'उपचार जारी' },
    { key: 'completed', label: '5. Case Completed', hindi: 'सफलतापूर्वक पूर्ण' }
  ];

  const getCurrentStepIndex = () => {
    switch (currentCase.status) {
      case 'submitted':
      case 'verified':
      case 'assigned': return 0;
      case 'on_the_way': return 1;
      case 'reached': return 2;
      case 'rescue': return 3;
      case 'completed': return 4;
      default: return 0;
    }
  };

  const currentIndex = getCurrentStepIndex();

  const handleAfterPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAfterPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const selectSampleAfterPhoto = () => {
    setAfterPhoto('https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80');
  };

  return (
    <div className="animate-fade-in mobile-frame-container" style={{ paddingBottom: '36px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button 
          onClick={() => navigateTo('volunteer-dashboard')}
          className="btn btn-ghost btn-sm"
          style={{ padding: '6px 10px', gap: '4px' }}
        >
          <ArrowLeft size={16} />
          <span>Dashboard</span>
        </button>

        <span className="badge badge-urgent">
          🦺 Active Field Mission
        </span>
      </div>

      {/* Case Details Summary Card */}
      <div className="card" style={{ padding: '18px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Mission Case
            </span>
            <h1 style={{ fontSize: '1.4rem', color: 'var(--text-main)', margin: '2px 0' }}>
              {currentCase.id}
            </h1>
          </div>
          <UrgencyBadge urgency={currentCase.urgency} />
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
          <img 
            src={currentCase.photo} 
            alt={currentCase.problemType}
            style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover' }}
          />
          <div>
            <h3 style={{ fontSize: '0.98rem', color: 'var(--text-main)', margin: 0 }}>
              {currentCase.problemIcon} {currentCase.problemType}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              📍 {currentCase.locationName}
            </span>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Reporter: {currentCase.reporterName} ({currentCase.reporterPhone})
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-surface-alt)', padding: '10px 12px', borderRadius: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <strong>Citizen Note:</strong> {currentCase.description}
        </div>
      </div>

      {/* Field Status Progression Steps (Section 12 requirement) */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '14px' }}>
          Rescue Stage Sequence
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {stepsOrder.map((s, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div 
                key={s.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isCurrent ? 'var(--accent-light)' : isCompleted ? 'var(--primary-light)' : 'var(--bg-surface-alt)',
                  border: isCurrent ? '1.5px solid var(--accent)' : '1px solid var(--border-card)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: isCompleted ? 'var(--primary)' : 'var(--border-subtle)',
                    color: isCompleted ? '#FFF' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    {isCompleted ? '✓' : idx + 1}
                  </span>
                  <div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {s.label}
                    </span>
                    <span className="hindi-subtitle" style={{ fontSize: '0.75rem' }}>{s.hindi}</span>
                  </div>
                </div>

                {isCurrent && (
                  <span className="badge badge-urgent" style={{ fontSize: '0.72rem' }}>
                    Active Stage
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons to Simulate Progression */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {currentIndex === 0 && (
            <button 
              onClick={() => advanceCaseStep(currentCase.id, 'on_the_way')}
              className="btn btn-accent btn-block btn-lg"
            >
              <span>Mark as On The Way 🚑</span>
            </button>
          )}

          {currentIndex === 1 && (
            <button 
              onClick={() => advanceCaseStep(currentCase.id, 'reached')}
              className="btn btn-accent btn-block btn-lg"
            >
              <span>Mark as Reached Location 📍</span>
            </button>
          )}

          {currentIndex === 2 && (
            <button 
              onClick={() => advanceCaseStep(currentCase.id, 'rescue')}
              className="btn btn-accent btn-block btn-lg"
            >
              <span>Mark as Rescue & Treatment 🩺</span>
            </button>
          )}

          {currentIndex === 3 && (
            <button 
              onClick={() => {
                advanceCaseStep(currentCase.id, 'completed');
                triggerConfetti();
              }}
              className="btn btn-accent btn-block btn-lg"
            >
              <span>Mark as Completed & Sheltered 🎉</span>
            </button>
          )}

          {currentIndex === 4 && (
            <div style={{
              backgroundColor: 'var(--color-normal-bg)',
              color: 'var(--color-normal-text)',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '0.92rem'
            }}>
              🎉 Rescue Mission Completed Successfully!
            </div>
          )}
        </div>
      </div>

      {/* Before & After Photo Comparison Upload (Section 12 requirement) */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '4px' }}>
          Treatment Documentation (Before & After)
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          Veterinary record verification for Gaushala admission:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
          {/* Before Photo */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-emergency)', display: 'block', marginBottom: '4px' }}>
              BEFORE (Incident)
            </span>
            <img 
              src={currentCase.photo} 
              alt="Before"
              style={{ width: '100%', height: '110px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-card)' }}
            />
          </div>

          {/* After Photo */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-normal)', display: 'block', marginBottom: '4px' }}>
              AFTER (Treated / Bandaged)
            </span>
            {afterPhoto ? (
              <img 
                src={afterPhoto} 
                alt="After treatment"
                style={{ width: '100%', height: '110px', borderRadius: '8px', objectFit: 'cover', border: '2px solid var(--color-normal)' }}
              />
            ) : (
              <div 
                onClick={selectSampleAfterPhoto}
                style={{
                  width: '100%',
                  height: '110px',
                  borderRadius: '8px',
                  border: '2px dashed var(--border-subtle)',
                  backgroundColor: 'var(--bg-surface-alt)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '8px',
                  textAlign: 'center'
                }}
              >
                <Camera size={22} color="var(--primary)" />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Click to Attach After Photo
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ fontSize: '0.8rem' }}>Field Treatment Notes</label>
          <textarea 
            className="form-textarea"
            rows={3}
            value={treatmentNotes}
            onChange={e => setTreatmentNotes(e.target.value)}
            style={{ fontSize: '0.82rem' }}
          />
        </div>
      </div>

    </div>
  );
};
