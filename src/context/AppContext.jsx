import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_REPORTS, 
  MOCK_VOLUNTEERS, 
  MOCK_GAUSHALAS, 
  INITIAL_STATS, 
  INITIAL_NOTIFICATIONS 
} from '../data/initialData';
import { translations } from '../data/translations';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Role: 'citizen' | 'volunteer' | 'admin'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('gauseva_role') || 'citizen';
  });

  // Active Route
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedCaseId, setSelectedCaseId] = useState('GS-1024');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' | 'hi'

  // Data layers persisted in localStorage
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('gauseva_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [volunteers, setVolunteers] = useState(() => {
    const saved = localStorage.getItem('gauseva_volunteers');
    return saved ? JSON.parse(saved) : MOCK_VOLUNTEERS;
  });

  const [gaushalas] = useState(MOCK_GAUSHALAS);

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('gauseva_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('gauseva_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  const [userProfile, setUserProfile] = useState({
    name: 'Rajesh Sharma',
    phone: '+91 98290 12345',
    city: 'Jaipur, Rajasthan',
    badge: 'Gau Mitra (Level 2)',
    points: 450,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  // Report Form Draft for Multi-Step wizard
  const [reportDraft, setReportDraft] = useState({
    step: 1,
    photo: null,
    problemType: 'Injured',
    problemIcon: '🩹',
    urgency: 'Emergency',
    urgencyLevel: 'emergency',
    locationName: 'MI Road, Near Ajmeri Gate, Jaipur',
    city: 'Jaipur, Rajasthan',
    coordinates: { lat: 26.9184, lng: 75.8152 },
    description: '',
    landmark: '',
    reporterName: 'Rajesh Sharma',
    reporterPhone: '+91 98290 12345'
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('gauseva_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('gauseva_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('gauseva_volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem('gauseva_notifs', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('gauseva_stats', JSON.stringify(stats));
  }, [stats]);

  // Navigation helper
  const navigateTo = (route, caseId = null) => {
    if (caseId) {
      setSelectedCaseId(caseId);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Role Switcher helper
  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'citizen') {
      setCurrentRoute('home');
    } else if (newRole === 'volunteer') {
      setCurrentRoute('volunteer-dashboard');
    } else if (newRole === 'admin') {
      setCurrentRoute('admin-dashboard');
    }
    setIsRoleModalOpen(false);
  };

  // Trigger celebratory confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2F6B4F', '#E8A33D', '#FAF7F2', '#3B82F6']
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  };

  // Submit New Report
  const submitNewReport = (customData = null) => {
    const dataToSubmit = customData || reportDraft;
    const newIdNum = reports.length + 1021;
    const newCaseId = `GS-${newIdNum}`;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${timeStr}`;

    const newReport = {
      id: newCaseId,
      userId: 'user-001',
      reporterName: dataToSubmit.reporterName || userProfile.name,
      reporterPhone: dataToSubmit.reporterPhone || userProfile.phone,
      problemType: dataToSubmit.problemType || 'Injured',
      problemIcon: dataToSubmit.problemIcon || '🩹',
      urgency: dataToSubmit.urgency || 'Emergency',
      urgencyLevel: dataToSubmit.urgencyLevel || 'emergency',
      locationName: dataToSubmit.locationName || 'Jaipur, Rajasthan',
      city: dataToSubmit.city || 'Jaipur, Rajasthan',
      coordinates: dataToSubmit.coordinates || { lat: 26.9124, lng: 75.7873 },
      distance: '1.2 km away',
      photo: dataToSubmit.photo || 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
      description: dataToSubmit.description || 'Cow spotted in distress. Needs medical inspection and assistance.',
      landmark: dataToSubmit.landmark || 'Near main road',
      status: 'submitted',
      createdAt: dateStr,
      assignedTeam: {
        teamName: 'Jaipur Rescue Team — Central Unit',
        leadVolunteer: 'Rahul Sharma',
        phone: '+91 94140 98765',
        driver: 'Mahesh Kumawat',
        vehicle: 'Ambulance RJ-14-GA-2024',
        eta: '18 mins',
        distance: '2.1 km'
      },
      timeline: [
        { step: 'Report Submitted', status: 'done', time: timeStr, desc: 'Report submitted by citizen with photo.' },
        { step: 'Report Verified', status: 'done', time: timeStr, desc: 'Auto-verified by Central Gau Seva Desk.' },
        { step: 'Rescue Team Assigned', status: 'done', time: timeStr, desc: 'Assigned to Jaipur Rescue Team.' },
        { step: 'Team On The Way', status: 'current', time: `${timeStr} (Dispatched)`, desc: 'Ambulance on the way with medical kit.' },
        { step: 'Team Reached', status: 'pending', time: '--', desc: 'Arriving on spot.' },
        { step: 'Rescue / Treatment', status: 'pending', time: '--', desc: 'First aid and treatment.' },
        { step: 'Case Completed', status: 'pending', time: '--', desc: 'Sheltered safely.' }
      ]
    };

    setReports(prev => [newReport, ...prev]);
    setStats(prev => ({ ...prev, totalReports: prev.totalReports + 1 }));

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: `Report Submitted (${newCaseId})`,
      hindiTitle: `रिपोर्ट दर्ज की गई (${newCaseId})`,
      message: `Your report for ${newReport.problemType} has been received. Rescue team dispatched!`,
      time: 'Just now',
      caseId: newCaseId,
      unread: true,
      type: 'dispatch'
    };
    setNotifications(prev => [newNotif, ...prev]);

    setSelectedCaseId(newCaseId);
    triggerConfetti();

    // Reset draft
    setReportDraft({
      step: 1,
      photo: null,
      problemType: 'Injured',
      problemIcon: '🩹',
      urgency: 'Emergency',
      urgencyLevel: 'emergency',
      locationName: 'MI Road, Near Ajmeri Gate, Jaipur',
      city: 'Jaipur, Rajasthan',
      coordinates: { lat: 26.9184, lng: 75.8152 },
      description: '',
      landmark: '',
      reporterName: 'Rajesh Sharma',
      reporterPhone: '+91 98290 12345'
    });

    return newCaseId;
  };

  // Volunteer advances case steps
  const advanceCaseStep = (caseId, targetStatus) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setReports(prev => prev.map(rep => {
      if (rep.id !== caseId) return rep;

      const updatedTimeline = rep.timeline.map(item => {
        if (targetStatus === 'on_the_way') {
          if (item.step === 'Team On The Way') return { ...item, status: 'current', time: timeStr };
          if (['Report Submitted', 'Report Verified', 'Rescue Team Assigned'].includes(item.step)) return { ...item, status: 'done' };
        }
        if (targetStatus === 'reached') {
          if (item.step === 'Team Reached') return { ...item, status: 'current', time: timeStr };
          if (['Report Submitted', 'Report Verified', 'Rescue Team Assigned', 'Team On The Way'].includes(item.step)) return { ...item, status: 'done' };
        }
        if (targetStatus === 'rescue') {
          if (item.step === 'Rescue / Treatment') return { ...item, status: 'current', time: timeStr };
          if (['Report Submitted', 'Report Verified', 'Rescue Team Assigned', 'Team On The Way', 'Team Reached'].includes(item.step)) return { ...item, status: 'done' };
        }
        if (targetStatus === 'completed') {
          return { ...item, status: 'done', time: item.time === '--' ? timeStr : item.time };
        }
        return item;
      });

      return {
        ...rep,
        status: targetStatus,
        timeline: updatedTimeline
      };
    }));

    if (targetStatus === 'completed') {
      setStats(prev => ({ ...prev, resolvedCases: prev.resolvedCases + 1 }));
      triggerConfetti();
    }
  };

  // Admin assigns volunteer to case
  const assignVolunteer = (caseId, volunteerId) => {
    const vol = volunteers.find(v => v.id === volunteerId);
    if (!vol) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setReports(prev => prev.map(rep => {
      if (rep.id !== caseId) return rep;
      return {
        ...rep,
        status: 'assigned',
        assignedTeam: {
          teamName: `${vol.name} — Gau Raksha Unit`,
          leadVolunteer: vol.name,
          phone: vol.phone,
          vehicle: 'Rescue Vehicle',
          eta: '15 mins',
          distance: '2.0 km'
        },
        timeline: rep.timeline.map(t => {
          if (t.step === 'Rescue Team Assigned') {
            return { ...t, status: 'done', time: timeStr, desc: `Assigned to ${vol.name}` };
          }
          if (t.step === 'Team On The Way') {
            return { ...t, status: 'current', time: timeStr };
          }
          return t;
        })
      };
    }));

    setVolunteers(prev => prev.map(v => {
      if (v.id === volunteerId) {
        return { ...v, status: `Assigned (${caseId})`, activeCaseId: caseId };
      }
      return v;
    }));
  };

  // Reset demo data
  const resetDemoData = () => {
    setReports(INITIAL_REPORTS);
    setVolunteers(MOCK_VOLUNTEERS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setStats(INITIAL_STATS);
    setSelectedCaseId('GS-1024');
    localStorage.clear();
    alert('Demo data restored to initial state!');
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider value={{
      currentRole,
      switchRole,
      currentRoute,
      navigateTo,
      selectedCaseId,
      setSelectedCaseId,
      reports,
      volunteers,
      gaushalas,
      notifications,
      stats,
      userProfile,
      setUserProfile,
      reportDraft,
      setReportDraft,
      submitNewReport,
      advanceCaseStep,
      assignVolunteer,
      resetDemoData,
      isNotifOpen,
      setIsNotifOpen,
      isRoleModalOpen,
      setIsRoleModalOpen,
      language,
      setLanguage,
      triggerConfetti,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
