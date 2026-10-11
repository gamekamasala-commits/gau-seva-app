import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  Shield, 
  User, 
  Heart, 
  MapPin, 
  AlertCircle, 
  Globe, 
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentRole, 
    currentRoute, 
    navigateTo, 
    notifications, 
    setIsNotifOpen, 
    setIsRoleModalOpen,
    language,
    setLanguage,
    resetDemoData,
    t
  } = useApp();

  const unreadCount = notifications.filter(n => n.unread).length;

  const getRoleLabel = () => {
    if (currentRole === 'volunteer') return { name: 'Volunteer', icon: '🦺', color: '#E8A33D' };
    if (currentRole === 'admin') return { name: 'Admin Control', icon: '🛡️', color: '#2F6B4F' };
    return { name: 'Citizen', icon: '👤', color: '#2F6B4F' };
  };

  const roleInfo = getRoleLabel();

  return (
    <>
      {/* Prototype Indicator Top Bar */}
      <div className="demo-top-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge">PROTOTYPE DEMO</span>
          <span style={{ opacity: 0.9 }}>Simulated Rescue Network • Jaipur, RJ</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={resetDemoData}
            style={{ 
              color: '#FAF7F2', 
              fontSize: '0.75rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              background: 'rgba(255,255,255,0.12)',
              padding: '2px 8px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
            title="Reset to default mock cases"
          >
            <RotateCcw size={11} /> Reset Data
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-card)',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          {/* Logo & Tagline */}
          <div 
            onClick={() => {
              if (currentRole === 'citizen') navigateTo('home');
              else if (currentRole === 'volunteer') navigateTo('volunteer-dashboard');
              else navigateTo('admin-dashboard');
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2F6B4F, #1F4936)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(47, 107, 79, 0.25)',
              fontSize: '22px'
            }}>
              🐄
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontWeight: 800, 
                  fontSize: '1.25rem', 
                  color: 'var(--primary-dark)',
                  letterSpacing: '-0.02em'
                }}>
                  GAU SEVA
                </span>
                <span style={{
                  fontFamily: 'var(--font-hindi)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--accent-hover)',
                  background: 'var(--accent-light)',
                  padding: '1px 6px',
                  borderRadius: '4px'
                }}>
                  गौ सेवा
                </span>
              </div>
              <span style={{ 
                fontSize: '0.75rem', 
                color: 'var(--text-secondary)',
                display: 'block',
                lineHeight: 1
              }}>
                {language === 'hi' ? 'एक सूचना • एक सेवा भाव' : 'One report. One helping hand.'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none' }} className="desktop-nav-links">
            {currentRole === 'citizen' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  onClick={() => navigateTo('home')}
                  className={`btn btn-sm ${currentRoute === 'home' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => navigateTo('report-flow')}
                  className={`btn btn-sm ${currentRoute === 'report-flow' ? 'btn-accent' : 'btn-ghost'}`}
                >
                  Report a Cow
                </button>
                <button 
                  onClick={() => navigateTo('case-track', 'GS-1024')}
                  className={`btn btn-sm ${currentRoute === 'case-track' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Track Case
                </button>
                <button 
                  onClick={() => navigateTo('nearby-cases')}
                  className={`btn btn-sm ${currentRoute === 'nearby-cases' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Nearby
                </button>
                <button 
                  onClick={() => navigateTo('gaushalas')}
                  className={`btn btn-sm ${currentRoute === 'gaushalas' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Gaushalas
                </button>
                <button 
                  onClick={() => navigateTo('donation')}
                  className={`btn btn-sm ${currentRoute === 'donation' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Support
                </button>
              </div>
            )}

            {currentRole === 'volunteer' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  onClick={() => navigateTo('volunteer-dashboard')}
                  className={`btn btn-sm ${currentRoute === 'volunteer-dashboard' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Available Cases
                </button>
                <button 
                  onClick={() => navigateTo('volunteer-active', 'GS-1024')}
                  className={`btn btn-sm ${currentRoute === 'volunteer-active' ? 'btn-accent' : 'btn-ghost'}`}
                >
                  Active Rescue Mode
                </button>
              </div>
            )}

            {currentRole === 'admin' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  onClick={() => navigateTo('admin-dashboard')}
                  className={`btn btn-sm ${currentRoute === 'admin-dashboard' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => navigateTo('admin-cases')}
                  className={`btn btn-sm ${currentRoute === 'admin-cases' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Case Management
                </button>
                <button 
                  onClick={() => navigateTo('admin-volunteers')}
                  className={`btn btn-sm ${currentRoute === 'admin-volunteers' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Volunteers
                </button>
              </div>
            )}
          </nav>

          {/* Right Action Icons: Role Switcher, Language, Notification */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Language Switcher */}
            <button 
              onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
              className="btn btn-secondary btn-sm"
              style={{ padding: '6px 10px', fontSize: '0.8rem', gap: '4px' }}
              title="Toggle Language"
            >
              <Globe size={14} />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Notification Bell */}
            <button 
              onClick={() => setIsNotifOpen(true)}
              className="btn btn-secondary btn-sm"
              style={{ position: 'relative', padding: '8px 10px' }}
              title="Notifications"
            >
              <Bell size={17} color="var(--text-main)" />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--color-emergency)',
                  color: '#FFFFFF',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 2px #FFFFFF'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Interactive Role Switcher Pill */}
            <button 
              onClick={() => setIsRoleModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: currentRole === 'citizen' ? 'var(--primary-light)' : currentRole === 'volunteer' ? 'var(--accent-light)' : '#E0E7FF',
                border: `1.5px solid ${currentRole === 'citizen' ? 'var(--primary)' : currentRole === 'volunteer' ? 'var(--accent)' : '#4338CA'}`,
                color: 'var(--text-main)',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              title="Switch between Citizen, Volunteer & Admin flows"
            >
              <span>{roleInfo.icon}</span>
              <span style={{ display: 'inline-block' }}>{roleInfo.name}</span>
              <ChevronDown size={14} style={{ opacity: 0.6 }} />
            </button>
          </div>
        </div>
      </header>

      {/* Media query for desktop nav link toggle */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav-links {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
