import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  Plus, 
  Minus, 
  LocateFixed, 
  AlertCircle, 
  ExternalLink,
  CheckCircle2,
  Crosshair
} from 'lucide-react';
import { UrgencyBadge, StatusBadge } from './Badge';

export const MockMap = ({ 
  reports = [], 
  selectedCaseId = null, 
  onSelectCase = null, 
  isPicker = false,
  pickerLocation = 'MI Road, Jaipur',
  onPickLocation = null,
  height = '420px'
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activePin, setActivePin] = useState(selectedCaseId || (reports[0]?.id || null));
  const [mapMode, setMapMode] = useState('streets'); // streets, satellite, heatmap
  const [pickerCoord, setPickerCoord] = useState({ x: 50, y: 48 });

  // Map pin positions mapped visually across Jaipur grid
  const defaultCoordinates = {
    'GS-1024': { x: 48, y: 46, name: 'MI Road (Ajmeri Gate)' },
    'GS-1023': { x: 30, y: 38, name: 'Vaishali Nagar' },
    'GS-1022': { x: 36, y: 72, name: 'Mansarovar Sector 5' },
    'GS-1021': { x: 62, y: 64, name: 'Gopalpura Bypass (Tonk Rd)' },
    'GS-1020': { x: 68, y: 52, name: 'Malviya Nagar' }
  };

  const handleMapClick = (e) => {
    if (!isPicker) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setPickerCoord({ x, y });

    // Mock realistic Jaipur landmark names based on sector
    let newLocation = 'MI Road, Near Ajmeri Gate, Jaipur';
    if (x < 40 && y < 50) newLocation = 'Queens Road, Vaishali Nagar, Jaipur';
    else if (x < 45 && y >= 50) newLocation = 'Sector 5, Mansarovar, Jaipur';
    else if (x >= 55 && y >= 55) newLocation = 'Gopalpura Bypass, Tonk Road, Jaipur';
    else if (x >= 55 && y < 55) newLocation = 'JLN Marg, Near Malviya Nagar, Jaipur';
    else if (y < 35) newLocation = 'Amer Road, Pink City Northern Belt, Jaipur';

    if (onPickLocation) {
      onPickLocation(newLocation, { lat: 26.9 + (y / 1000), lng: 75.8 + (x / 1000) });
    }
  };

  const activeReport = reports.find(r => r.id === activePin);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: height,
      backgroundColor: mapMode === 'satellite' ? '#1E2922' : '#E9E4DC',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1.5px solid var(--border-card)',
      boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.06)'
    }}>
      {/* Interactive Map SVG Background: Realistic Jaipur Grid & Landmarks */}
      <div 
        onClick={handleMapClick}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          cursor: isPicker ? 'crosshair' : 'grab',
          transform: `scale(${zoomLevel})`,
          transition: 'transform 300ms ease'
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1000 700" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={mapMode === 'satellite' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'} strokeWidth="1" />
            </pattern>
            <radialGradient id="rescueGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(232, 163, 61, 0.4)" />
              <stop offset="100%" stopColor="rgba(232, 163, 61, 0)" />
            </radialGradient>
          </defs>

          {/* Background Grid */}
          <rect width="1000" height="700" fill="url(#grid)" />

          {/* Green Parks / Forests / Gaushala Sanctuary Zones */}
          <path d="M 50,40 Q 180,60 220,180 Q 120,240 60,180 Z" fill={mapMode === 'satellite' ? '#274431' : '#D2E7D6'} opacity="0.8" />
          <path d="M 700,50 Q 860,120 820,300 Q 740,260 680,180 Z" fill={mapMode === 'satellite' ? '#274431' : '#D2E7D6'} opacity="0.8" />
          <path d="M 320,500 Q 480,520 460,650 Q 340,660 300,580 Z" fill={mapMode === 'satellite' ? '#274431' : '#D2E7D6'} opacity="0.8" />

          {/* Water Bodies (e.g. Jal Mahal / Dravyavati River canal) */}
          <path d="M 400,20 Q 550,60 520,160 Q 440,150 400,20 Z" fill={mapMode === 'satellite' ? '#1D3B4E' : '#C7E2EE'} />
          <path d="M 120,680 Q 400,620 650,660 Q 900,640 980,690" stroke={mapMode === 'satellite' ? '#1D3B4E' : '#BEDEEB'} strokeWidth="14" fill="none" />

          {/* Major Jaipur Expressways & Arterial Roads */}
          {/* MI Road & Highway 21 */}
          <path d="M 0,340 Q 300,350 500,340 T 1000,320" stroke={mapMode === 'satellite' ? '#68776B' : '#FFFFFF'} strokeWidth="16" fill="none" />
          <path d="M 0,340 Q 300,350 500,340 T 1000,320" stroke="var(--accent)" strokeWidth="4" strokeDasharray="12,12" fill="none" opacity="0.7" />

          {/* Tonk Road (North-South) */}
          <path d="M 500,0 Q 510,340 560,700" stroke={mapMode === 'satellite' ? '#68776B' : '#FFFFFF'} strokeWidth="18" fill="none" />

          {/* Ajmer Road (South-West) */}
          <path d="M 480,345 L 50,620" stroke={mapMode === 'satellite' ? '#68776B' : '#FFFFFF'} strokeWidth="14" fill="none" />

          {/* JLN Marg (South-East) */}
          <path d="M 500,350 Q 640,480 820,700" stroke={mapMode === 'satellite' ? '#68776B' : '#FFFFFF'} strokeWidth="14" fill="none" />

          {/* Sikar Road (North-West) */}
          <path d="M 480,335 L 180,20" stroke={mapMode === 'satellite' ? '#68776B' : '#FFFFFF'} strokeWidth="12" fill="none" />

          {/* Walled City Pink City Grid Lines */}
          <rect x="460" y="200" width="160" height="130" fill="none" stroke={mapMode === 'satellite' ? 'rgba(255,255,255,0.2)' : 'rgba(232, 163, 61, 0.4)'} strokeWidth="3" strokeDasharray="6,6" rx="8" />

          {/* Area Labels */}
          <text x="490" y="265" fill={mapMode === 'satellite' ? '#FFF' : '#2F6B4F'} fontSize="16" fontWeight="700" opacity="0.8">PINK CITY (JAIPUR)</text>
          <text x="140" y="320" fill={mapMode === 'satellite' ? '#AAA' : '#777'} fontSize="14" fontWeight="600">Vaishali Nagar</text>
          <text x="260" y="560" fill={mapMode === 'satellite' ? '#AAA' : '#777'} fontSize="14" fontWeight="600">Mansarovar</text>
          <text x="640" y="520" fill={mapMode === 'satellite' ? '#AAA' : '#777'} fontSize="14" fontWeight="600">Malviya Nagar</text>
          <text x="600" y="660" fill={mapMode === 'satellite' ? '#AAA' : '#777'} fontSize="14" fontWeight="600">Tonk Road / Sanganer</text>
        </svg>

        {/* User / Reporter Pulsing Blue GPS Beacon (Simulated) */}
        {!isPicker && (
          <div style={{
            position: 'absolute',
            top: '48%',
            left: '49%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#2563EB',
              border: '3px solid #FFFFFF',
              boxShadow: '0 0 14px rgba(37, 99, 235, 0.8)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: '2px solid rgba(37, 99, 235, 0.5)',
                animation: 'ripple 2s infinite ease-out'
              }} />
            </div>
            <div style={{
              position: 'absolute',
              top: '22px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(31, 42, 36, 0.85)',
              color: '#FFF',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.65rem',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}>
              You (GPS)
            </div>
          </div>
        )}

        {/* Location Picker Mode: Movable Crosshair Pin */}
        {isPicker && (
          <div style={{
            position: 'absolute',
            top: `${pickerCoord.y}%`,
            left: `${pickerCoord.x}%`,
            transform: 'translate(-50%, -100%)',
            transition: 'all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 30
          }}>
            <div style={{
              backgroundColor: 'var(--color-emergency)',
              color: '#FFFFFF',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              boxShadow: '0 6px 16px rgba(220, 38, 38, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}>
              <MapPin size={16} />
              <span>Incident Location</span>
            </div>
            <div style={{
              width: '4px',
              height: '14px',
              backgroundColor: 'var(--color-emergency)',
              margin: '0 auto'
            }} />
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'rgba(220, 38, 38, 0.4)',
              margin: '-4px auto 0'
            }} />
          </div>
        )}

        {/* Case Report Markers */}
        {!isPicker && reports.map((rep, idx) => {
          const coord = defaultCoordinates[rep.id] || { 
            x: 45 + ((idx * 14) % 40), 
            y: 35 + ((idx * 16) % 40) 
          };
          const isEmergency = (rep.urgency || '').toLowerCase() === 'emergency';
          const isUrgent = (rep.urgency || '').toLowerCase() === 'urgent';
          const isResolved = rep.status === 'completed';
          const isSelected = activePin === rep.id;

          let pinBg = 'var(--color-normal)';
          if (isEmergency) pinBg = 'var(--color-emergency)';
          else if (isUrgent) pinBg = 'var(--color-urgent)';
          else if (isResolved) pinBg = 'var(--color-resolved)';

          return (
            <div
              key={rep.id}
              onClick={(e) => {
                e.stopPropagation();
                setActivePin(rep.id);
                if (onSelectCase) onSelectCase(rep.id);
              }}
              style={{
                position: 'absolute',
                top: `${coord.y}%`,
                left: `${coord.x}%`,
                transform: `translate(-50%, -100%) scale(${isSelected ? 1.15 : 1})`,
                zIndex: isSelected ? 25 : 10,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{
                backgroundColor: pinBg,
                color: '#FFFFFF',
                padding: '4px 8px',
                borderRadius: 'var(--radius-full)',
                boxShadow: isSelected ? '0 0 0 3px #FFFFFF, 0 8px 16px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                <span>{rep.problemIcon || '🐄'}</span>
                <span>{rep.id}</span>
              </div>
              <div style={{
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `6px solid ${pinBg}`,
                margin: '0 auto'
              }} />
            </div>
          );
        })}
      </div>

      {/* Map Control Buttons (Zoom, Recenter, Layer Switcher) */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        zIndex: 40
      }}>
        <button
          onClick={() => setZoomLevel(z => Math.min(z + 0.2, 1.8))}
          className="btn btn-secondary btn-sm"
          style={{ padding: '6px 8px', backgroundColor: 'var(--bg-surface)' }}
          title="Zoom in"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={() => setZoomLevel(z => Math.max(z - 0.2, 0.8))}
          className="btn btn-secondary btn-sm"
          style={{ padding: '6px 8px', backgroundColor: 'var(--bg-surface)' }}
          title="Zoom out"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={() => {
            setZoomLevel(1);
            setMapMode(m => m === 'streets' ? 'satellite' : 'streets');
          }}
          className="btn btn-secondary btn-sm"
          style={{ padding: '6px 8px', backgroundColor: 'var(--bg-surface)' }}
          title="Toggle Streets / Satellite"
        >
          <Layers size={16} />
        </button>
      </div>

      {/* Map Legend Overlay */}
      <div style={{
        position: 'absolute',
        bottom: isPicker || activeReport ? '75px' : '12px',
        left: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(4px)',
        padding: '6px 12px',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.72rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
        zIndex: 35
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-emergency)' }} />
          <span>Emergency</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-urgent)' }} />
          <span>Urgent</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-normal)' }} />
          <span>Normal</span>
        </div>
      </div>

      {/* Location Picker Prompt Bar */}
      {isPicker && (
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          backgroundColor: 'var(--bg-surface)',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          border: '1.5px solid var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 40
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
            <MapPin size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Selected Spot (Click map to change)</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
                {pickerLocation}
              </span>
            </div>
          </div>
          <button 
            type="button"
            className="btn btn-primary btn-sm"
            style={{ flexShrink: 0 }}
          >
            Confirmed
          </button>
        </div>
      )}

      {/* Active Case Popup Card (Section 10 requirement) */}
      {!isPicker && activeReport && (
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          backgroundColor: 'var(--bg-surface)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          zIndex: 40,
          animation: 'fadeIn 200ms ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <img 
              src={activeReport.photo} 
              alt={activeReport.problemType}
              style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  {activeReport.id}
                </span>
                <UrgencyBadge urgency={activeReport.urgency} size="sm" />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {activeReport.problemType} • {activeReport.distance || '2.4 km away'}
              </p>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                📍 {activeReport.locationName}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              if (onSelectCase) onSelectCase(activeReport.id);
            }}
            className="btn btn-accent btn-sm"
            style={{ flexShrink: 0 }}
          >
            <span>View Case</span>
            <ExternalLink size={13} />
          </button>
        </div>
      )}
    </div>
  );
};
