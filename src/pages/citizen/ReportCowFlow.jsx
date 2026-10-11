import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_COW_IMAGES } from '../../data/initialData';
import { MockMap } from '../../components/MockMap';
import { UrgencyBadge } from '../../components/Badge';
import { 
  Camera, 
  Upload, 
  MapPin, 
  AlertCircle, 
  AlertTriangle, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ReportCowFlow = () => {
  const { 
    reportDraft, 
    setReportDraft, 
    submitNewReport, 
    navigateTo, 
    language 
  } = useApp();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Problem Categories
  const problemTypes = [
    { id: 'Injured', label: 'Injured Cow', hindi: 'घायल गाय', icon: '🩹', desc: 'Bleeding, fracture, cuts, limping' },
    { id: 'Road Accident', label: 'Road Accident', hindi: 'सड़क दुर्घटना', icon: '🚗', desc: 'Hit by vehicle, unable to move' },
    { id: 'Sick Calf', label: 'Sick / Calf', hindi: 'बीमार / बछड़ा', icon: '🩺', desc: 'Fever, infection, dehydration' },
    { id: 'Trapped', label: 'Trapped / Ditch', hindi: 'फंसी हुई / नाला', icon: '⛓️', desc: 'Stuck in drainage, ditch or fence' },
    { id: 'Needs Food / Water', label: 'Needs Food / Water', hindi: 'भूख / प्यास', icon: '🌾', desc: 'Starving or dehydrated cow' },
    { id: 'Abandoned', label: 'Abandoned / Strays', hindi: 'असहाय / निराश्रित', icon: '🏷️', desc: 'Elderly cow requiring shelter' },
    { id: 'Other', label: 'Other Emergency', hindi: 'अन्य समस्या', icon: '❓', desc: 'Other immediate rescue needed' }
  ];

  // Urgency Categories
  const urgencyOptions = [
    { 
      id: 'Emergency', 
      level: 'emergency', 
      label: '🔴 Emergency', 
      hindi: 'आपातकालीन (तत्काल)', 
      sub: 'Immediate attention required. Life-threatening or major trauma within 30 mins.',
      color: 'var(--color-emergency)'
    },
    { 
      id: 'Urgent', 
      level: 'urgent', 
      label: '🟠 Urgent', 
      hindi: 'जरूरी (शीघ्र)', 
      sub: 'Prompt response needed. Significant pain or mobility restriction within 2-4 hours.',
      color: 'var(--color-urgent)'
    },
    { 
      id: 'Normal', 
      level: 'normal', 
      label: '🟢 Normal', 
      hindi: 'सामान्य', 
      sub: 'Routine care or shelter needed. Stable condition.',
      color: 'var(--color-normal)'
    }
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setReportDraft(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSamplePhoto = (sampleUrl) => {
    setReportDraft(prev => ({ ...prev, photo: sampleUrl }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newId = submitNewReport();
      setIsSubmitting(false);
      navigateTo('report-success', newId);
    }, 900);
  };

  return (
    <div className="animate-fade-in mobile-frame-container" style={{ paddingBottom: '32px' }}>
      
      {/* Top Header & Progress Stepper */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <button 
            onClick={() => step > 1 ? setStep(s => s - 1) : navigateTo('home')}
            className="btn btn-ghost btn-sm"
            style={{ padding: '6px 10px', gap: '4px' }}
          >
            <ArrowLeft size={16} />
            <span>{step === 1 ? 'Back to Home' : 'Back'}</span>
          </button>
          
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
            Step {step} of 6
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{
          height: '6px',
          backgroundColor: 'var(--border-card)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${(step / 6) * 100}%`,
            backgroundColor: 'var(--accent)',
            transition: 'width 300ms ease'
          }} />
        </div>
      </div>

      {/* STEP 1: PHOTO UPLOAD */}
      {step === 1 && (
        <div className="card animate-fade-in" style={{ padding: '24px 20px' }}>
          <div style={{ marginBottom: '18px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '6px' }}>Step 1</span>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>Upload Photo of Cow</h2>
            <p style={{ fontSize: '0.85rem' }}>
              Clear photos help our veterinary volunteers gauge injury severity and dispatch the right rescue team.
            </p>
          </div>

          {/* Current Photo Preview or Empty Uploader */}
          {reportDraft.photo ? (
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                maxHeight: '260px',
                border: '2px solid var(--primary)',
                boxShadow: 'var(--shadow-md)'
              }}>
                <img 
                  src={reportDraft.photo} 
                  alt="Distress Cow Preview" 
                  style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(31, 42, 36, 0.75)',
                  color: '#FFF',
                  padding: '8px 12px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={14} color="#86EFAC" /> Photo Attached
                  </span>
                  <button 
                    onClick={() => setReportDraft(prev => ({ ...prev, photo: null }))}
                    style={{ color: '#FCA5A5', fontWeight: 600, fontSize: '0.78rem' }}
                  >
                    Change Photo
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              border: '2px dashed var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px 16px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-surface-alt)',
              marginBottom: '20px'
            }}>
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
                <Camera size={28} />
              </div>
              
              <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                Capture or Upload Photo
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                JPG or PNG from camera / gallery
              </p>

              <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
                <Upload size={16} />
                <span>Upload from Device</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  onChange={handlePhotoUpload} 
                  style={{ display: 'none' }} 
                />
              </label>
            </div>
          )}

          {/* Prototype Demo Feature: Select sample photos */}
          <div style={{
            backgroundColor: 'var(--bg-surface-alt)',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-card)',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
              💡 Or Select Prototype Sample Photo:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {SAMPLE_COW_IMAGES.map(img => (
                <div 
                  key={img.id}
                  onClick={() => handleSelectSamplePhoto(img.url)}
                  style={{
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: reportDraft.photo === img.url ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                    position: 'relative'
                  }}
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    style={{ width: '100%', height: '54px', objectFit: 'cover' }}
                  />
                  <div style={{
                    fontSize: '0.65rem',
                    textAlign: 'center',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#FFF',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    padding: '1px 0'
                  }}>
                    {img.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1 Actions */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => {
                if (!reportDraft.photo) {
                  // Default sample 1
                  setReportDraft(prev => ({ ...prev, photo: SAMPLE_COW_IMAGES[0].url }));
                }
                setStep(2);
              }}
              className="btn btn-accent btn-block btn-lg"
            >
              <span>Continue to Problem Type</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PROBLEM SELECTION */}
      {step === 2 && (
        <div className="card animate-fade-in" style={{ padding: '24px 20px' }}>
          <div style={{ marginBottom: '18px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '6px' }}>Step 2</span>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>What is the problem?</h2>
            <p style={{ fontSize: '0.85rem' }}>Select the primary condition of the cow:</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {problemTypes.map(p => {
              const isSelected = reportDraft.problemType === p.id;
              return (
                <div 
                  key={p.id}
                  onClick={() => setReportDraft(prev => ({ ...prev, problemType: p.id, problemIcon: p.icon }))}
                  className="card card-interactive"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-card)',
                    backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{p.icon}</span>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', margin: 0 }}>{p.label}</h4>
                      <span className="hindi-subtitle">{p.hindi} • {p.desc}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div style={{
                      backgroundColor: 'var(--primary)',
                      color: '#FFF',
                      borderRadius: '50%',
                      padding: '4px',
                      display: 'flex'
                    }}>
                      <Check size={14} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button 
            onClick={() => setStep(3)}
            className="btn btn-accent btn-block btn-lg"
          >
            <span>Confirm Problem & Set Location</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 3: LOCATION CONFIRMATION */}
      {step === 3 && (
        <div className="card animate-fade-in" style={{ padding: '24px 20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '6px' }}>Step 3</span>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>Confirm Location</h2>
            <p style={{ fontSize: '0.85rem' }}>
              Pinpoint the incident spot on the map or type a landmark:
            </p>
          </div>

          {/* Interactive Map Picker */}
          <div style={{ marginBottom: '16px' }}>
            <MockMap 
              isPicker={true}
              pickerLocation={reportDraft.locationName}
              onPickLocation={(loc, coords) => {
                setReportDraft(prev => ({ 
                  ...prev, 
                  locationName: loc,
                  coordinates: coords
                }));
              }}
              height="300px"
            />
          </div>

          {/* Address and Landmark fields */}
          <div className="form-group">
            <label className="form-label">Address / Area</label>
            <input 
              type="text" 
              className="form-input"
              value={reportDraft.locationName}
              onChange={e => setReportDraft(prev => ({ ...prev, locationName: e.target.value }))}
              placeholder="e.g. MI Road, Near Ajmeri Gate"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nearby Landmark (Optional)</label>
            <input 
              type="text" 
              className="form-input"
              value={reportDraft.landmark}
              onChange={e => setReportDraft(prev => ({ ...prev, landmark: e.target.value }))}
              placeholder="e.g. Opposite Petrol Pump / Tea Stall"
            />
          </div>

          <button 
            onClick={() => setStep(4)}
            className="btn btn-accent btn-block btn-lg"
          >
            <span>Confirm Location & Next</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 4: URGENCY SELECTION */}
      {step === 4 && (
        <div className="card animate-fade-in" style={{ padding: '24px 20px' }}>
          <div style={{ marginBottom: '18px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '6px' }}>Step 4</span>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>Select Urgency Level</h2>
            <p style={{ fontSize: '0.85rem' }}>How fast does this cow need medical assistance?</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {urgencyOptions.map(u => {
              const isSelected = reportDraft.urgency === u.id;
              return (
                <div 
                  key={u.id}
                  onClick={() => setReportDraft(prev => ({ ...prev, urgency: u.id, urgencyLevel: u.level }))}
                  className="card card-interactive"
                  style={{
                    padding: '16px',
                    border: isSelected ? `2.5px solid ${u.color}` : '1px solid var(--border-card)',
                    backgroundColor: isSelected ? (u.level === 'emergency' ? 'var(--color-emergency-bg)' : u.level === 'urgent' ? 'var(--color-urgent-bg)' : 'var(--color-normal-bg)') : 'var(--bg-surface)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{u.label}</h4>
                    {isSelected && (
                      <span style={{ backgroundColor: u.color, color: '#FFF', borderRadius: '50%', padding: '3px', display: 'flex' }}>
                        <Check size={14} />
                      </span>
                    )}
                  </div>
                  <span className="hindi-subtitle" style={{ marginBottom: '4px' }}>{u.hindi}</span>
                  <p style={{ fontSize: '0.82rem', margin: 0 }}>{u.sub}</p>
                </div>
              );
            })}
          </div>

          <button 
            onClick={() => setStep(5)}
            className="btn btn-accent btn-block btn-lg"
          >
            <span>Continue to Description</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 5: DESCRIPTION */}
      {step === 5 && (
        <div className="card animate-fade-in" style={{ padding: '24px 20px' }}>
          <div style={{ marginBottom: '18px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '6px' }}>Step 5</span>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>Describe the Situation</h2>
            <p style={{ fontSize: '0.85rem' }}>Provide any additional details to help the rescue team:</p>
          </div>

          <div className="form-group">
            <label className="form-label">Problem Description</label>
            <textarea 
              className="form-textarea"
              rows={4}
              value={reportDraft.description}
              onChange={e => setReportDraft(prev => ({ ...prev, description: e.target.value }))}
              placeholder="e.g. The cow has a bleeding injury on left foreleg, cannot stand up, near roadside traffic..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Your Contact Name & Phone</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input 
                type="text"
                className="form-input"
                value={reportDraft.reporterName}
                onChange={e => setReportDraft(prev => ({ ...prev, reporterName: e.target.value }))}
                placeholder="Your Name"
              />
              <input 
                type="tel"
                className="form-input"
                value={reportDraft.reporterPhone}
                onChange={e => setReportDraft(prev => ({ ...prev, reporterPhone: e.target.value }))}
                placeholder="+91 98290..."
              />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              (Volunteers call only to locate the animal upon arrival)
            </span>
          </div>

          <button 
            onClick={() => setStep(6)}
            className="btn btn-accent btn-block btn-lg"
          >
            <span>Review & Finalize Report</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 6: REVIEW SUMMARY */}
      {step === 6 && (
        <div className="card animate-fade-in" style={{ padding: '24px 20px' }}>
          <div style={{ marginBottom: '18px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '6px' }}>Step 6 (Final)</span>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>Review & Submit</h2>
            <p style={{ fontSize: '0.85rem' }}>Please verify the distress report summary before dispatching:</p>
          </div>

          {/* Summary Card */}
          <div style={{
            backgroundColor: 'var(--bg-surface-alt)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-card)',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
              <img 
                src={reportDraft.photo || SAMPLE_COW_IMAGES[0].url} 
                alt="Report Photo" 
                style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <UrgencyBadge urgency={reportDraft.urgency} size="sm" />
                </div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: '0 0 2px' }}>
                  {reportDraft.problemIcon} {reportDraft.problemType}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  📍 {reportDraft.locationName}
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <strong>Description:</strong> {reportDraft.description || 'Cow in distress requiring urgent medical check and safe sheltering.'}
              {reportDraft.landmark && (
                <div style={{ marginTop: '4px' }}>
                  <strong>Landmark:</strong> {reportDraft.landmark}
                </div>
              )}
            </div>
          </div>

          {/* Submission CTA */}
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn btn-accent btn-block btn-lg"
            style={{ fontSize: '1.1rem', padding: '16px' }}
          >
            {isSubmitting ? (
              <span>⏳ Generating Case & Dispatching...</span>
            ) : (
              <>
                <span>🚨 Submit Report Now</span>
                <Check size={20} />
              </>
            )}
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>
            Simulated Prototype Network: Submitting instantly generates a mock case ID and notifies nearby rescue volunteers.
          </p>
        </div>
      )}

    </div>
  );
};
