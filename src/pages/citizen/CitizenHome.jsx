import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertCircle, 
  MapPin, 
  ShieldCheck, 
  HeartHandshake, 
  Building2, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  PhoneCall, 
  Sparkles,
  Compass
} from 'lucide-react';
import { UrgencyBadge, StatusBadge } from '../../components/Badge';

export const CitizenHome = () => {
  const { navigateTo, stats, reports, switchRole, language, t } = useApp();

  const recentCases = reports.slice(0, 3);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(145deg, #1B3F2E 0%, #2F6B4F 60%, #3B7E5F 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px 24px',
        color: '#FFFFFF',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background glow & shapes */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'rgba(232, 163, 61, 0.18)',
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '640px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: 'var(--radius-full)', marginBottom: '16px', backdropFilter: 'blur(4px)' }}>
            <span>🌿</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FEF6EB' }}>
              {language === 'hi' ? 'सामुदायिक गोवंश सेवा एवं रेस्क्यू' : 'Community Cow Care & Rescue'}
            </span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
            color: '#FFFFFF', 
            lineHeight: 1.15,
            marginBottom: '12px'
          }}>
            {t.heroTitle}
          </h1>

          <p style={{ 
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', 
            color: 'rgba(255, 255, 255, 0.9)', 
            lineHeight: 1.5,
            marginBottom: '24px'
          }}>
            {t.heroSub}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {/* Primary Action: Warm Amber with Strict Dark Text */}
            <button 
              onClick={() => navigateTo('report-flow')}
              className="btn btn-accent btn-lg"
              style={{ flex: '1 1 200px', fontSize: '1.05rem' }}
            >
              <span>🚨</span>
              <span>{t.reportCow}</span>
            </button>

            {/* Secondary Action */}
            <button 
              onClick={() => navigateTo('nearby-cases')}
              className="btn btn-secondary btn-lg"
              style={{ 
                flex: '1 1 180px', 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: 'var(--primary-dark)',
                border: 'none'
              }}
            >
              <Compass size={18} />
              <span>{t.viewNearby}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Action Grid */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>{t.quickActions}</h2>
            <span className="hindi-subtitle">{t.quickActionsHindi}</span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '14px'
        }}>
          {/* Card 1: Report a Cow */}
          <div 
            onClick={() => navigateTo('report-flow')}
            className="card card-interactive"
            style={{ 
              background: 'linear-gradient(145deg, #FFF9F0, #FFF)', 
              borderColor: 'rgba(232, 163, 61, 0.4)',
              textAlign: 'center',
              padding: '18px 12px'
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'var(--accent-light)',
              color: 'var(--accent-hover)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px',
              fontSize: '24px'
            }}>
              🚨
            </div>
            <h3 style={{ fontSize: '0.98rem', marginBottom: '4px' }}>Report a Cow</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Instant Distress Alert</span>
          </div>

          {/* Card 2: Nearby Cases */}
          <div 
            onClick={() => navigateTo('nearby-cases')}
            className="card card-interactive"
            style={{ textAlign: 'center', padding: '18px 12px' }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px'
            }}>
              <MapPin size={24} />
            </div>
            <h3 style={{ fontSize: '0.98rem', marginBottom: '4px' }}>Nearby Cases</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Live Map & Incidents</span>
          </div>

          {/* Card 3: Volunteer */}
          <div 
            onClick={() => switchRole('volunteer')}
            className="card card-interactive"
            style={{ textAlign: 'center', padding: '18px 12px' }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: '#E0E7FF',
              color: '#4338CA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px'
            }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '0.98rem', marginBottom: '4px' }}>Volunteer Mode</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Field Rescue Desk</span>
          </div>

          {/* Card 4: Support & Donation */}
          <div 
            onClick={() => navigateTo('donation')}
            className="card card-interactive"
            style={{ textAlign: 'center', padding: '18px 12px' }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: '#FCE7F3',
              color: '#DB2777',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px'
            }}>
              <HeartHandshake size={24} />
            </div>
            <h3 style={{ fontSize: '0.98rem', marginBottom: '4px' }}>Support & Feed</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Fodder & Treatment</span>
          </div>

          {/* Card 5: Gaushala Directory */}
          <div 
            onClick={() => navigateTo('gaushalas')}
            className="card card-interactive"
            style={{ textAlign: 'center', padding: '18px 12px' }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'var(--bg-surface-alt)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px'
            }}>
              <Building2 size={24} />
            </div>
            <h3 style={{ fontSize: '0.98rem', marginBottom: '4px' }}>Gaushalas</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Verified Shelters</span>
          </div>
        </div>
      </section>

      {/* Live Impact & Statistics Section (Section 6 requirement) */}
      <section style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-card)',
        padding: '24px 20px',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>Impact & Rescue Network</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Simulated Prototype Network Statistics</span>
          </div>
          <span className="badge badge-primary">
            <Sparkles size={13} /> Active in Jaipur Metro
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '16px',
          textAlign: 'center'
        }}>
          <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-alt)' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', display: 'block' }}>
              {stats.totalReports.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Reports</span>
          </div>

          <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--color-normal-bg)' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-normal-text)', display: 'block' }}>
              {stats.resolvedCases.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-normal-text)', fontWeight: 600 }}>Cases Resolved</span>
          </div>

          <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--accent-light)' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-hover)', display: 'block' }}>
              {stats.activeVolunteers}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 600 }}>Active Volunteers</span>
          </div>

          <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-alt)' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', display: 'block' }}>
              {stats.rescuePartners}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Rescue Partners</span>
          </div>
        </div>
      </section>

      {/* Urgent Live Rescues Carousel / List */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Live Rescue Operations</h2>
            <span className="hindi-subtitle">सक्रिय रेस्क्यू कार्यवाहियां</span>
          </div>
          <button 
            onClick={() => navigateTo('nearby-cases')}
            className="btn btn-ghost btn-sm"
            style={{ gap: '4px' }}
          >
            <span>View All</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recentCases.map(c => (
            <div 
              key={c.id}
              onClick={() => navigateTo('case-track', c.id)}
              className="card card-interactive"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                gap: '14px',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img 
                  src={c.photo} 
                  alt={c.problemType}
                  style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>{c.id}</span>
                    <UrgencyBadge urgency={c.urgency} size="sm" />
                    <StatusBadge status={c.status} />
                  </div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: '0 0 2px' }}>
                    {c.problemIcon} {c.problemType}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    📍 {c.locationName} • {c.distance}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  className="btn btn-secondary btn-sm"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Track Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Step "How Gau Seva Works" Guide */}
      <section style={{
        backgroundColor: 'var(--primary-light)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px 20px',
        border: '1.5px solid rgba(47, 107, 79, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', marginBottom: '4px' }}>
            {t.howItWorks}
          </h2>
          <p style={{ fontSize: '0.85rem' }}>Simple, fast & compassionate community response</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>📸</div>
            <h3 style={{ fontSize: '1rem', color: 'var(--primary-dark)', marginBottom: '4px' }}>{t.step1Title}</h3>
            <p style={{ fontSize: '0.82rem' }}>{t.step1Desc}</p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🚑</div>
            <h3 style={{ fontSize: '1rem', color: 'var(--primary-dark)', marginBottom: '4px' }}>{t.step2Title}</h3>
            <p style={{ fontSize: '0.82rem' }}>{t.step2Desc}</p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏡</div>
            <h3 style={{ fontSize: '1rem', color: 'var(--primary-dark)', marginBottom: '4px' }}>{t.step3Title}</h3>
            <p style={{ fontSize: '0.82rem' }}>{t.step3Desc}</p>
          </div>
        </div>
      </section>

    </div>
  );
};
