// Realistic Mock Data for Gau Seva Prototype

// Curated SVG Cow illustration photos that look authentic and clean without broken external links
export const SAMPLE_COW_IMAGES = [
  {
    id: 'sample-1',
    title: 'Injured Foreleg & Bruises',
    tag: 'Road Injury',
    url: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🩹 🐄'
  },
  {
    id: 'sample-2',
    title: 'Roadside Accident',
    tag: 'Accident',
    url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🚗 🐄'
  },
  {
    id: 'sample-3',
    title: 'Weak / Sick Calf',
    tag: 'Sick / Weak',
    url: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🩺 🐮'
  },
  {
    id: 'sample-4',
    title: 'Trapped near Water Channel',
    tag: 'Trapped',
    url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '⛓️ 🐄'
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'GS-1024',
    userId: 'user-001',
    reporterName: 'Rajesh Sharma',
    reporterPhone: '+91 98290 12345',
    problemType: 'Injured',
    problemIcon: '🩹',
    urgency: 'Emergency',
    urgencyLevel: 'emergency', // emergency, urgent, normal
    locationName: 'MI Road, Near Ajmeri Gate, Jaipur',
    city: 'Jaipur, Rajasthan',
    coordinates: { lat: 26.9184, lng: 75.8152 },
    distance: '2.4 km away',
    photo: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
    description: 'A brown cow is lying on the roadside with a deep cut on her left front leg. Bleeding slightly and unable to stand. Traffic is heavy around the area.',
    landmark: 'Opposite Maharaja Sweets, MI Road',
    status: 'on_the_way', // submitted, verified, assigned, on_the_way, reached, rescue, completed
    createdAt: '2026-10-10 18:45',
    assignedTeam: {
      teamName: 'Jaipur Rescue Team — Central Unit',
      leadVolunteer: 'Rahul Sharma',
      phone: '+91 94140 98765',
      driver: 'Mahesh Kumawat',
      vehicle: 'Ambulance RJ-14-GA-2024',
      eta: '14 mins',
      distance: '1.8 km'
    },
    timeline: [
      { step: 'Report Submitted', status: 'done', time: '18:45', desc: 'Citizen submitted report with photo and live location pin.' },
      { step: 'Report Verified', status: 'done', time: '18:50', desc: 'Verified by Gau Seva Central Control desk as high priority.' },
      { step: 'Rescue Team Assigned', status: 'done', time: '18:55', desc: 'Assigned to Central Rapid Ambulance Unit (Rahul Sharma).' },
      { step: 'Team On The Way', status: 'current', time: '19:02', desc: 'Ambulance dispatched. Currently near Government Hostel crossing.' },
      { step: 'Team Reached', status: 'pending', time: '--', desc: 'Volunteer arriving on spot to secure area.' },
      { step: 'Rescue / Treatment', status: 'pending', time: '--', desc: 'First-aid bandaging and shifting to nearest shelter ward.' },
      { step: 'Case Completed', status: 'pending', time: '--', desc: 'Safe shelter handover & final medical status update.' }
    ]
  },
  {
    id: 'GS-1023',
    userId: 'user-002',
    reporterName: 'Sunita Meena',
    reporterPhone: '+91 97840 55432',
    problemType: 'Road Accident',
    problemIcon: '🚗',
    urgency: 'Urgent',
    urgencyLevel: 'urgent',
    locationName: 'Queens Road, Vaishali Nagar, Jaipur',
    city: 'Jaipur, Rajasthan',
    coordinates: { lat: 26.9056, lng: 75.7482 },
    distance: '4.1 km away',
    photo: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80',
    description: 'Cow hit by speeding two-wheeler. Bruised shoulder and sitting on divider median.',
    landmark: 'Near National Handloom, Vaishali Nagar',
    status: 'assigned',
    createdAt: '2026-10-10 17:30',
    assignedTeam: {
      teamName: 'Vaishali Nagar Gau Raksha Team',
      leadVolunteer: 'Priya Verma',
      phone: '+91 98280 44321',
      vehicle: 'Rescue Van RJ-14-VB-8890',
      eta: '25 mins',
      distance: '3.2 km'
    },
    timeline: [
      { step: 'Report Submitted', status: 'done', time: '17:30', desc: 'Report submitted by citizen Sunita.' },
      { step: 'Report Verified', status: 'done', time: '17:38', desc: 'Admin confirmed case details.' },
      { step: 'Rescue Team Assigned', status: 'done', time: '17:45', desc: 'Assigned to Volunteer Priya Verma.' },
      { step: 'Team On The Way', status: 'pending', time: '--', desc: 'En route.' },
      { step: 'Team Reached', status: 'pending', time: '--', desc: 'On site arrival.' },
      { step: 'Rescue / Treatment', status: 'pending', time: '--', desc: 'Veterinary inspection.' },
      { step: 'Case Completed', status: 'pending', time: '--', desc: 'Completed.' }
    ]
  },
  {
    id: 'GS-1022',
    userId: 'user-003',
    reporterName: 'Anil Agarwal',
    reporterPhone: '+91 94141 11223',
    problemType: 'Sick Calf',
    problemIcon: '🩺',
    urgency: 'Normal',
    urgencyLevel: 'normal',
    locationName: 'Sector 5, Mansarovar, Jaipur',
    city: 'Jaipur, Rajasthan',
    coordinates: { lat: 26.8522, lng: 75.7681 },
    distance: '6.8 km away',
    photo: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80',
    description: 'A 4-month old calf shivering under tin shed, seems dehydrated and not eating.',
    landmark: 'Near City Park Main Gate',
    status: 'verified',
    createdAt: '2026-10-10 16:15',
    assignedTeam: null,
    timeline: [
      { step: 'Report Submitted', status: 'done', time: '16:15', desc: 'Citizen report received.' },
      { step: 'Report Verified', status: 'done', time: '16:25', desc: 'Verified and queued for dispatch.' },
      { step: 'Rescue Team Assigned', status: 'pending', time: '--', desc: 'Looking for nearby volunteer.' },
      { step: 'Team On The Way', status: 'pending', time: '--', desc: 'Pending.' },
      { step: 'Team Reached', status: 'pending', time: '--', desc: 'Pending.' },
      { step: 'Rescue / Treatment', status: 'pending', time: '--', desc: 'Pending.' },
      { step: 'Case Completed', status: 'pending', time: '--', desc: 'Pending.' }
    ]
  },
  {
    id: 'GS-1021',
    userId: 'user-004',
    reporterName: 'Kavita Joshi',
    reporterPhone: '+91 99281 99887',
    problemType: 'Trapped',
    problemIcon: '⛓️',
    urgency: 'Emergency',
    urgencyLevel: 'emergency',
    locationName: 'Gopalpura Bypass, Tonk Road, Jaipur',
    city: 'Jaipur, Rajasthan',
    coordinates: { lat: 26.8655, lng: 75.8012 },
    distance: '5.2 km away',
    photo: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80',
    description: 'Cow stuck in open roadside storm drain. Multiple volunteers pulled her out safely and administered antiseptic.',
    landmark: 'Behind Triveni Flyover',
    status: 'completed',
    createdAt: '2026-10-10 14:00',
    assignedTeam: {
      teamName: 'Jaipur South Quick Response',
      leadVolunteer: 'Amit Meena',
      phone: '+91 93145 67890'
    },
    timeline: [
      { step: 'Report Submitted', status: 'done', time: '14:00', desc: 'Emergency alert.' },
      { step: 'Report Verified', status: 'done', time: '14:05', desc: 'Verified in 5 mins.' },
      { step: 'Rescue Team Assigned', status: 'done', time: '14:10', desc: 'Assigned Amit Meena.' },
      { step: 'Team On The Way', status: 'done', time: '14:15', desc: 'Dispatched with crane belt.' },
      { step: 'Team Reached', status: 'done', time: '14:28', desc: 'Reached spot.' },
      { step: 'Rescue / Treatment', status: 'done', time: '14:50', desc: 'Safely lifted and treated.' },
      { step: 'Case Completed', status: 'done', time: '15:20', desc: 'Transferred to Krishna Gaushala.' }
    ]
  }
];

export const MOCK_VOLUNTEERS = [
  {
    id: 'vol-1',
    name: 'Rahul Sharma',
    phone: '+91 94140 98765',
    area: 'Jaipur Central / MI Road',
    rating: 4.9,
    rescuesCount: 42,
    badge: 'Senior Gau Mitra',
    status: 'Busy (On GS-1024)',
    activeCaseId: 'GS-1024'
  },
  {
    id: 'vol-2',
    name: 'Priya Verma',
    phone: '+91 98280 44321',
    area: 'Vaishali Nagar & Queens Rd',
    rating: 4.8,
    rescuesCount: 28,
    badge: 'Paramedic Volunteer',
    status: 'Assigned (GS-1023)',
    activeCaseId: 'GS-1023'
  },
  {
    id: 'vol-3',
    name: 'Amit Meena',
    phone: '+91 93145 67890',
    area: 'Mansarovar & Sanganer',
    rating: 4.95,
    rescuesCount: 56,
    badge: 'Rapid Response Lead',
    status: 'Available',
    activeCaseId: null
  },
  {
    id: 'vol-4',
    name: 'Dr. Suresh Joshi (Vet)',
    phone: '+91 98299 11234',
    area: 'Malviya Nagar & Jagatpura',
    rating: 5.0,
    rescuesCount: 89,
    badge: 'Honorary Vet Surgeon',
    status: 'Available',
    activeCaseId: null
  }
];

export const MOCK_GAUSHALAS = [
  {
    id: 'gsh-1',
    name: 'Shri Gau Seva Kendra & Emergency Hospital',
    hindiName: 'श्री गौ सेवा केंद्र एवं आपातकालीन चिकित्सालय',
    location: 'Sanganer, Tonk Road, Jaipur, Rajasthan',
    distance: '2.4 km',
    capacity: '450+ Cows',
    phone: '+91 141 2780123',
    facilities: ['24x7 Ambulance', 'Veterinary Surgeon on duty', 'Fodder Donation Center', 'ICU Ward'],
    isSample: true,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'gsh-2',
    name: 'Krishna Gaushala Mandir Trust',
    hindiName: 'कृष्णा गौशाला मंदिर ट्रस्ट',
    location: 'Near Nursery Circle, Vaishali Nagar, Jaipur',
    distance: '4.1 km',
    capacity: '320+ Cows',
    phone: '+91 141 2351980',
    facilities: ['Daily Green Fodder Feed', 'Old & Retired Cow Sanctuary', 'Visitor Timings 8 AM - 6 PM'],
    isSample: true,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'gsh-3',
    name: 'Kamdhenu Dham Rescue Ashram',
    hindiName: 'कामधेनु धाम रेस्क्यू आश्रम',
    location: 'Durgapura Flyover Link, Jaipur',
    distance: '5.8 km',
    capacity: '600+ Cows',
    phone: '+91 141 2554433',
    facilities: ['Fracture & Trauma Ward', 'Cow Adoption Program', 'Hydro-therapy Tank'],
    isSample: true,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'gsh-4',
    name: 'Govardhan Gau Dham Parisar',
    hindiName: 'गोवर्धन गौ धाम परिसर',
    location: 'Vidhyadhar Nagar Sector 2, Jaipur',
    distance: '7.2 km',
    capacity: '280+ Cows',
    phone: '+91 141 2233445',
    facilities: ['Community Fodder Point', 'Calf Nursery Care', 'Ayurvedic Herb Garden'],
    isSample: true,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=400&q=80'
  }
];

export const INITIAL_STATS = {
  totalReports: 1248,
  resolvedCases: 936,
  activeVolunteers: 84,
  rescuePartners: 32,
  averageResponseMinutes: 18,
  feedDonatedKg: '42,500'
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Rescue team is on the way!',
    hindiTitle: 'रेस्क्यू टीम रास्ते में है!',
    message: 'Jaipur Rescue Team has been dispatched for case GS-1024 at MI Road.',
    time: '8 mins ago',
    caseId: 'GS-1024',
    unread: true,
    type: 'dispatch'
  },
  {
    id: 'notif-2',
    title: 'Report Verified (GS-1024)',
    hindiTitle: 'रिपोर्ट सत्यापित (GS-1024)',
    message: 'Your report for Injured Cow was verified by admin and marked as Emergency.',
    time: '20 mins ago',
    caseId: 'GS-1024',
    unread: false,
    type: 'verify'
  },
  {
    id: 'notif-3',
    title: 'Case GS-1021 Completed',
    hindiTitle: 'केस GS-1021 पूर्ण हुआ',
    message: 'The trapped cow at Gopalpura has been successfully rescued and moved to shelter.',
    time: '4 hours ago',
    caseId: 'GS-1021',
    unread: false,
    type: 'success'
  }
];
