// Mock data for Emeis website

export interface Review {
  id: string;
  author: string;
  relationship: string;
  rating: number;
  date: string;
  year: number;
  category: 'care' | 'facilities' | 'communication' | 'staff' | 'food';
  verified: boolean;
  content: string;
  improvement?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  relationship: string;
  quote: string;
  image?: string;
  videoUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'admission' | 'care' | 'transparency' | 'payment' | 'family';
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  documents?: string[];
}

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Margaret T.',
    relationship: "Daughter of resident",
    rating: 5,
    date: '2024-11-15',
    year: 2024,
    category: 'care',
    verified: true,
    content: "The transformation at Emeis has been remarkable. My mother receives attentive, personalized care. The daily updates through the app give me peace of mind.",
  },
  {
    id: '2',
    author: 'Robert L.',
    relationship: "Son of resident",
    rating: 5,
    date: '2024-10-22',
    year: 2024,
    category: 'communication',
    verified: true,
    content: "What sets Emeis apart is the transparency. I can see exactly what care my father receives each day. The staff proactively reaches out with updates.",
  },
  {
    id: '3',
    author: 'Sarah M.',
    relationship: "Granddaughter of resident",
    rating: 4,
    date: '2024-09-18',
    year: 2024,
    category: 'facilities',
    verified: true,
    content: "The facilities are clean and modern. My grandmother enjoys the garden areas and the activities. Would love to see more weekend events.",
    improvement: "Weekend activity programs expanded based on this feedback.",
  },
  {
    id: '4',
    author: 'James K.',
    relationship: "Son of resident",
    rating: 5,
    date: '2024-08-05',
    year: 2024,
    category: 'staff',
    verified: true,
    content: "The nursing staff treat my father with such dignity. They know his preferences and always take time to chat with him. It's not just care—it's genuine connection.",
  },
  {
    id: '5',
    author: 'Emily R.',
    relationship: "Daughter of resident",
    rating: 4,
    date: '2024-07-12',
    year: 2024,
    category: 'food',
    verified: true,
    content: "The meal quality has improved significantly. Mom has dietary restrictions and the kitchen accommodates them well. Fresh, nutritious options daily.",
  },
  {
    id: '6',
    author: 'Michael P.',
    relationship: "Son of resident",
    rating: 5,
    date: '2023-12-08',
    year: 2023,
    category: 'care',
    verified: true,
    content: "After researching many facilities, we chose Emeis for their commitment to transparency. The care tracking app changed everything for our family.",
  },
  {
    id: '7',
    author: 'Patricia H.',
    relationship: "Daughter of resident",
    rating: 4,
    date: '2023-11-20',
    year: 2023,
    category: 'communication',
    verified: true,
    content: "The weekly care summaries are incredibly detailed. When I had concerns, the nurse check-in feature got me answers within hours.",
  },
  {
    id: '8',
    author: 'David C.',
    relationship: "Son of resident",
    rating: 3,
    date: '2022-06-15',
    year: 2022,
    category: 'care',
    verified: true,
    content: "There were challenges initially. The new management has made significant improvements since then.",
    improvement: "Complete care protocol overhaul implemented Q3 2022.",
  },
  {
    id: '9',
    author: 'Linda W.',
    relationship: "Daughter of resident",
    rating: 3,
    date: '2022-04-10',
    year: 2022,
    category: 'facilities',
    verified: true,
    content: "Facilities needed updating. Happy to see the renovations that have taken place since.",
    improvement: "€15M facility modernization completed 2023.",
  },
  {
    id: '10',
    author: 'Thomas B.',
    relationship: "Son of resident",
    rating: 5,
    date: '2025-01-05',
    year: 2025,
    category: 'staff',
    verified: true,
    content: "The dedication of the care team is extraordinary. They've created a true community for residents. Dad has friends and purpose here.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Catherine D.',
    relationship: "Daughter of resident since 2023",
    quote: "The transparency app changed everything. I can see Mom's daily care, meals, and activities. When I can't visit, I still feel connected to her day.",
  },
  {
    id: '2',
    name: 'François M.',
    relationship: "Son of resident since 2024",
    quote: "After the challenges the industry faced, Emeis rebuilt trust the right way—with openness and accountability. I chose them because of that commitment.",
  },
  {
    id: '3',
    name: 'Anna L.',
    relationship: "Granddaughter of resident",
    quote: "The nurse check-in feature gives me peace of mind. I asked about Grandma's mobility and got a video call with her physiotherapist the same day.",
  },
];

export const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'How can I monitor my loved one\'s daily care?',
    answer: 'Through our Care Transparency App, families receive daily updates including meals, medications, activities, and wellness notes. You can also request real-time updates or schedule video calls with our care team.',
    category: 'transparency',
  },
  {
    id: '2',
    question: 'What happens during a facility visit?',
    answer: 'Visits are self-guided or accompanied. You\'ll see resident rooms, common areas, dining facilities, gardens, and activity spaces. Our team will explain care protocols, staffing ratios, and answer all questions transparently.',
    category: 'transparency',
  },
  {
    id: '3',
    question: 'How does the admission process work?',
    answer: 'Our guided admission process takes 2-3 weeks on average. It includes a needs assessment, facility tour, care plan discussion, and paperwork assistance. We handle most documentation digitally for convenience.',
    category: 'admission',
  },
  {
    id: '4',
    question: 'What are the payment options?',
    answer: 'We accept private pay, long-term care insurance, and work with regional assistance programs. All costs are transparent—no hidden fees. Secure payments are processed through our encrypted portal.',
    category: 'payment',
  },
  {
    id: '5',
    question: 'How is medication managed?',
    answer: 'Medications are managed by licensed nurses using our digital tracking system. Every dose is logged in real-time. Families can view medication schedules and confirmations through the app.',
    category: 'care',
  },
  {
    id: '6',
    question: 'Can I communicate directly with the care team?',
    answer: 'Yes. The Family Portal includes a 1-click Q&A feature with 4-hour response SLA during business hours. You can also schedule calls with nurses, doctors, or social workers.',
    category: 'family',
  },
  {
    id: '7',
    question: 'What quality improvements have been made recently?',
    answer: 'Since 2022, we\'ve implemented 24/7 care tracking, hired 200+ additional nursing staff, completed €15M in facility upgrades, and launched our transparency platform. View our full improvement report in the Transparency section.',
    category: 'transparency',
  },
  {
    id: '8',
    question: 'Is my payment information secure?',
    answer: 'Absolutely. We use bank-level encryption and are PCI-DSS compliant. Payment information is never stored on our servers—transactions are processed through certified payment providers.',
    category: 'payment',
  },
];

export const admissionChecklist: ChecklistItem[] = [
  {
    id: '1',
    title: 'Initial Consultation',
    description: 'Schedule a call with our admissions team to discuss needs and answer questions.',
  },
  {
    id: '2',
    title: 'Facility Tour',
    description: 'Visit our facility in person or take a virtual 360° tour.',
  },
  {
    id: '3',
    title: 'Medical Assessment',
    description: 'Provide medical history and current care needs for personalized care planning.',
    documents: ['Medical records', 'Current medications list', 'Physician referral'],
  },
  {
    id: '4',
    title: 'Care Plan Review',
    description: 'Review and approve the personalized care plan with our clinical team.',
  },
  {
    id: '5',
    title: 'Financial Discussion',
    description: 'Transparent cost breakdown and payment options discussion.',
    documents: ['Insurance information', 'Power of attorney (if applicable)'],
  },
  {
    id: '6',
    title: 'Documentation',
    description: 'Complete admission paperwork securely online.',
    documents: ['ID verification', 'Emergency contacts', 'Advance directives'],
  },
  {
    id: '7',
    title: 'Move-In Preparation',
    description: 'Coordinate move-in date and room personalization.',
  },
  {
    id: '8',
    title: 'Welcome & Orientation',
    description: 'Family orientation and introduction to the care team.',
  },
];

export const improvements = [
  {
    year: '2022',
    title: 'Leadership Restructure',
    description: 'New CEO and care leadership team focused on transparency and quality.',
    metric: '100% new executive team',
  },
  {
    year: '2022',
    title: 'Care Protocol Overhaul',
    description: 'Comprehensive review and update of all care protocols.',
    metric: '47 protocols updated',
  },
  {
    year: '2023',
    title: 'Staff Expansion',
    description: 'Significant increase in nursing and care staff across all facilities.',
    metric: '+200 nurses hired',
  },
  {
    year: '2023',
    title: 'Facility Modernization',
    description: 'Major investment in facility upgrades, safety, and comfort.',
    metric: '€15M invested',
  },
  {
    year: '2023',
    title: 'Transparency Platform Launch',
    description: 'Launched family care tracking app with real-time updates.',
    metric: '85% family adoption',
  },
  {
    year: '2024',
    title: 'Quality Certification',
    description: 'Achieved highest care quality certification in all facilities.',
    metric: '100% certified',
  },
];

export const careTrackingDemo = {
  meals: [
    { time: '08:00', meal: 'Breakfast', items: ['Oatmeal with berries', 'Toast', 'Orange juice'], eaten: 'full' },
    { time: '12:30', meal: 'Lunch', items: ['Grilled chicken salad', 'Soup', 'Fresh fruit'], eaten: 'most' },
    { time: '18:00', meal: 'Dinner', items: ['Salmon with vegetables', 'Rice', 'Yogurt'], eaten: 'full' },
  ],
  medication: [
    { time: '08:00', name: 'Morning medications', administered: true, notes: 'Taken with breakfast' },
    { time: '12:00', name: 'Blood pressure check', administered: true, notes: '120/80 - normal' },
    { time: '20:00', name: 'Evening medications', administered: true, notes: 'No issues' },
  ],
  hygiene: [
    { time: '07:30', activity: 'Morning routine', assisted: true, notes: 'Good spirits' },
    { time: '14:00', activity: 'Afternoon rest', assisted: false, notes: 'Independent' },
    { time: '19:30', activity: 'Evening routine', assisted: true, notes: 'Relaxed' },
  ],
  communication: [
    { time: '10:00', type: 'Activity', description: 'Joined morning exercise group' },
    { time: '14:30', type: 'Visit', description: 'Video call with family' },
    { time: '16:00', type: 'Social', description: 'Tea time with fellow residents' },
  ],
};

export const todaySnapshot = {
  mood: 'Good',
  moodEmoji: '😊',
  mealsEaten: '3/3',
  mobilityLevel: 'Active',
  highlight: 'Enjoyed garden walk and art class today',
  lastCheckin: '2 hours ago',
};
export const loyaltyFeatures = [
  {
    id: 'weekly-summary',
    title: 'Weekly Personalized Summary',
    description: 'Comprehensive care report delivered every Sunday with photos and caregiver notes.',
    icon: 'FileText',
  },
  {
    id: 'nurse-checkin',
    title: 'Proactive Nurse Check-in',
    description: 'Scheduled calls from our nursing team to discuss your loved one\'s wellbeing.',
    icon: 'Phone',
  },
  {
    id: 'qa-feature',
    title: '1-Click Q&A',
    description: 'Ask any question and receive a response within our guaranteed SLA (typically under 4 hours).',
    icon: 'MessageSquare',
  },
  {
    id: 'safety-banner',
    title: 'Weekly Safety Checks',
    description: 'Visual confirmation that all safety protocols have been completed.',
    icon: 'ShieldCheck',
  },
];
