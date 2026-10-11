import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  AlertCircle, 
  MapPin, 
  Building2, 
  User, 
  Compass, 
  FileSpreadsheet, 
  Users, 
  Activity,
  HeartHandshake
} from 'lucide-react';

export const BottomNav = () => {
  const { currentRole, currentRoute, navigateTo } = useApp();

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-card)',
      boxShadow: '0 -4px 16px rgba(31, 42, 36, 0.08)',
      zIndex: 80,
      padding: '8px 12px 10px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      backdropFilter: 'blur(10px)'
    }}>
      {/* Citizen Bottom Navigation */}
      {currentRole === 'citizen' && (
        <>
          <button 
            onClick={() => navigateTo('home')}
            style={navItemStyle(currentRoute === 'home')}
          >
            <Home size={20} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Home</span>
          </button>

          <button 
            onClick={() => navigateTo('nearby-cases')}
            style={navItemStyle(currentRoute === 'nearby-cases')}
          >
            <MapPin size={20} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Nearby</span>
          </button>

          {/* Floating Hero Report Button */}
          <button 
            onClick={() => navigateTo('report-flow')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-text)',
              marginTop: '-24px',
              boxShadow: '0 6px 18px rgba(232, 163, 61, 0.5)',
              border: '3px solid var(--bg-surface)',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'transform var(--transition-fast)'
            }}
            title="Report a Cow in Distress"
          >
            <span style={{ fontSize: '20px' }}>🚨</span>
          </button>

          <button 
            onClick={() => navigateTo('gaushalas')}
            style={navItemStyle(currentRoute === 'gaushalas')}
          >
            <Building2 size={20} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Gaushalas</span>
          </button>

          <button 
            onClick={() => navigateTo('profile')}
            style={navItemStyle(currentRoute === 'profile')}
          >
            <User size={20} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Profile</span>
          </button>
        </>
      )}

      {/* Volunteer Bottom Navigation */}
      {currentRole === 'volunteer' && (
        <>
          <button 
            onClick={() => navigateTo('volunteer-dashboard')}
            style={navItemStyle(currentRoute === 'volunteer-dashboard')}
          >
            <Compass size={20} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Available Cases</span>
          </button>

          <button 
            onClick={() => navigateTo('volunteer-active', 'GS-1024')}
            style={navItemStyle(currentRoute === 'volunteer-active')}
          >
            <Activity size={20} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Active Rescue</span>
          </button>

          <button 
            onClick={() => navigateTo('nearby-cases')}
            style={navItemStyle(currentRoute === 'nearby-cases')}
          >
            <MapPin size={20} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Map View</span>
          </button>

          <button 
            onClick={() => navigateTo('profile')}
            style={navItemStyle(currentRoute === 'profile')}
          >
            <User size={20} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>My Account</span>
          </button>
        </>
      )}

      {/* Admin Bottom Navigation */}
      {currentRole === 'admin' && (
        <>
          <button 
            onClick={() => navigateTo('admin-dashboard')}
            style={navItemStyle(currentRoute === 'admin-dashboard')}
          >
            <Activity size={20} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Overview</span>
          </button>

          <button 
            onClick={() => navigateTo('admin-cases')}
            style={navItemStyle(currentRoute === 'admin-cases')}
          >
            <FileSpreadsheet size={20} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>All Cases</span>
          </button>

          <button 
            onClick={() => navigateTo('admin-volunteers')}
            style={navItemStyle(currentRoute === 'admin-volunteers')}
          >
            <Users size={20} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Volunteers</span>
          </button>

          <button 
            onClick={() => navigateTo('gaushalas')}
            style={navItemStyle(currentRoute === 'gaushalas')}
          >
            <Building2 size={20} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Gaushalas</span>
          </button>
        </>
      )}
    </nav>
  );
};

const navItemStyle = (isActive) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3px',
  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
  transition: 'color var(--transition-fast)',
  minWidth: '60px',
  cursor: 'pointer'
});
