import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { NotificationDrawer } from './components/NotificationDrawer';
import { RoleSwitcherModal } from './components/RoleSwitcherModal';

// Citizen Pages
import { CitizenHome } from './pages/citizen/CitizenHome';
import { ReportCowFlow } from './pages/citizen/ReportCowFlow';
import { ReportSuccess } from './pages/citizen/ReportSuccess';
import { CaseTracking } from './pages/citizen/CaseTracking';
import { NearbyCases } from './pages/citizen/NearbyCases';
import { DonationPage } from './pages/citizen/DonationPage';
import { GaushalaDirectory } from './pages/citizen/GaushalaDirectory';
import { CitizenProfile } from './pages/citizen/CitizenProfile';

// Volunteer Pages
import { VolunteerDashboard } from './pages/volunteer/VolunteerDashboard';
import { VolunteerActiveRescue } from './pages/volunteer/VolunteerActiveRescue';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminVolunteerManagement } from './pages/admin/AdminVolunteerManagement';

export const App = () => {
  const { currentRoute, currentRole } = useApp();

  const renderCurrentView = () => {
    switch (currentRoute) {
      // Citizen Routes
      case 'home':
        return <CitizenHome />;
      case 'report-flow':
        return <ReportCowFlow />;
      case 'report-success':
        return <ReportSuccess />;
      case 'case-track':
        return <CaseTracking />;
      case 'nearby-cases':
        return <NearbyCases />;
      case 'donation':
        return <DonationPage />;
      case 'gaushalas':
        return <GaushalaDirectory />;
      case 'profile':
        return <CitizenProfile />;

      // Volunteer Routes
      case 'volunteer-dashboard':
        return <VolunteerDashboard />;
      case 'volunteer-active':
        return <VolunteerActiveRescue />;

      // Admin Routes
      case 'admin-dashboard':
      case 'admin-cases':
        return <AdminDashboard />;
      case 'admin-volunteers':
        return <AdminVolunteerManagement />;

      default:
        return <CitizenHome />;
    }
  };

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="main-content">
        {renderCurrentView()}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Slide-out / Overlays */}
      <NotificationDrawer />
      <RoleSwitcherModal />
    </div>
  );
};
