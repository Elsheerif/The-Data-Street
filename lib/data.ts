// ⚠️  DEPRECATED: Mock data for development (Phase 1)
// This file is no longer used - all data now comes from PostgreSQL via Prisma
// Kept only for reference. Remove after verification that Phase 2 (Real API) is working.

import type { Department, Project, Event, BlogPost, Member, Testimonial, Partner } from './types';

// ============================================================================
// NOTE: This data structure is outdated and incompatible with Phase 2 schema
// The application now uses:
// - Real PostgreSQL database (datastreet_dev)
// - Prisma ORM for database access
// - API routes at /api/members, /api/departments
// - Admin dashboard with real CRUD operations
// ============================================================================

// DEPRECATED - Do not use
export const departments: Department[] = [
  {
    id: 'strategic-ops',
    name: 'Strategic & Operations',
    description: 'Planning, strategy, and operational excellence',
    icon: 'Target',
    subcommittees: ['Strategy', 'Operations', 'Finance'],
  },
  {
    id: 'ai-ml',
    name: 'AI/ML Committee',
    description: 'Artificial Intelligence and Machine Learning research and projects',
    icon: 'Brain',
    subcommittees: ['Deep Learning', 'NLP', 'Computer Vision'],
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering',
    description: 'Building robust data pipelines and infrastructure',
    icon: 'Database',
    subcommittees: ['ETL', 'Data Warehousing', 'Cloud Infrastructure'],
  },
  {
    id: 'big-data',
    name: 'Big Data',
    description: 'Processing and analyzing large-scale datasets',
    icon: 'Server',
    subcommittees: ['Distributed Systems', 'Spark', 'Hadoop'],
  },
  {
    id: 'gis',
    name: 'GIS & Geospatial',
    description: 'Geographic Information Systems and spatial analysis',
    icon: 'Map',
    subcommittees: ['Mapping', 'Spatial Analysis', 'Remote Sensing'],
  },
  {
    id: 'branding',
    name: 'Branding & Design',
    description: 'Visual identity, design, and media production',
    icon: 'Palette',
    subcommittees: ['Graphic Design', 'Video Production', 'Social Media'],
  },
  {
    id: 'web-systems',
    name: 'Web & Systems',
    description: 'Web development and system architecture',
    icon: 'Code',
    subcommittees: ['Frontend', 'Backend', 'DevOps'],
  },
  {
    id: 'people-dev',
    name: 'People & Development',
    description: 'Member growth, recruitment, and community building',
    icon: 'Users',
    subcommittees: ['Recruitment', 'Training', 'Mentorship'],
  },
];

// DEPRECATED - Now using PostgreSQL database with Prisma
// Members are fetched from /api/members endpoint
// This empty export is kept to prevent import errors during migration
export const members: Member[] = [];

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'AI-Powered Healthcare Assistant',
    description: 'Machine learning model for disease prediction using patient data and medical history',
    domain: 'Healthcare',
    status: 'Active',
    tags: ['AI/ML', 'Healthcare', 'Python', 'TensorFlow'],
    department: 'ai-ml',
    startDate: new Date('2024-09-01'),
  },
  {
    id: 'proj-2',
    title: 'Smart City Traffic Analysis',
    description: 'Big data analytics platform for optimizing urban traffic flow and reducing congestion',
    domain: 'Urban Planning',
    status: 'Active',
    tags: ['Big Data', 'IoT', 'Spark', 'Real-time Analytics'],
    department: 'big-data',
    startDate: new Date('2024-10-15'),
  },
  {
    id: 'proj-3',
    title: 'Climate Data Visualization',
    description: 'Interactive dashboards tracking environmental changes and climate patterns',
    domain: 'Environment',
    status: 'Completed',
    tags: ['GIS', 'Visualization', 'D3.js', 'Python'],
    department: 'gis',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-11-30'),
  },
  {
    id: 'proj-4',
    title: 'Student Performance Analytics',
    description: 'Data pipeline analyzing educational outcomes and student engagement metrics',
    domain: 'Education',
    status: 'In Progress',
    tags: ['Data Engineering', 'ETL', 'PostgreSQL', 'Airflow'],
    department: 'data-engineering',
    startDate: new Date('2024-11-01'),
  },
  {
    id: 'proj-5',
    title: 'NLP-Based Sentiment Analyzer',
    description: 'Natural Language Processing tool for social media sentiment analysis',
    domain: 'Social Media',
    status: 'Research',
    tags: ['NLP', 'BERT', 'Python', 'Transformers'],
    department: 'ai-ml',
    startDate: new Date('2025-01-05'),
  },
];

export const events: Event[] = [
  {
    id: 'event-1',
    title: 'AI Workshop Series: Neural Networks 101',
    description: 'Hands-on introduction to neural networks and deep learning frameworks',
    type: 'Workshop',
    date: new Date('2025-12-15T18:00:00'),
    location: 'Engineering Building, Room 204',
    isOnline: false,
    capacity: 50,
    registered: 32,
  },
  {
    id: 'event-2',
    title: 'Data Science Hackathon 2026',
    description: '48-hour hackathon focused on solving real-world data challenges',
    type: 'Hackathon',
    date: new Date('2026-01-10T09:00:00'),
    endDate: new Date('2026-01-12T17:00:00'),
    location: 'Cairo University Campus',
    isOnline: false,
    capacity: 100,
    registered: 78,
  },
  {
    id: 'event-3',
    title: 'Industry Talk: Career in Data Science',
    description: 'Panel discussion with data professionals from leading tech companies',
    type: 'Talk',
    date: new Date('2025-12-20T19:00:00'),
    location: 'Virtual Event',
    isOnline: true,
    speakers: ['Dr. Ahmed Hassan', 'Sara Mahmoud', 'Omar Ali'],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Getting Started with Machine Learning: A Beginner\'s Guide',
    excerpt: 'Learn the fundamentals of machine learning and how to start your journey in AI',
    content: 'Full content here...',
    author: {
      id: 'member-1',
      name: 'Ahmed Mahmoud',
      role: 'AI/ML Committee Lead',
      isActive: true,
    },
    category: 'Tech Insights',
    tags: ['Machine Learning', 'AI', 'Tutorial'],
    publishedAt: new Date('2025-11-15'),
    readTime: 8,
  },
  {
    id: 'blog-2',
    title: 'The Future of Data Engineering in 2026',
    excerpt: 'Exploring emerging trends and technologies shaping the data engineering landscape',
    content: 'Full content here...',
    author: {
      id: 'member-2',
      name: 'Fatima Ali',
      role: 'Data Engineering Lead',
      isActive: true,
    },
    category: 'AI Trends',
    tags: ['Data Engineering', 'Cloud', 'Future Tech'],
    publishedAt: new Date('2025-11-20'),
    readTime: 6,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Sara Ahmed',
    role: 'AI/ML Committee',
    content: 'Data Street gave me the practical skills and confidence to land my dream internship at a top tech company.',
    rating: 5,
  },
  {
    id: 'test-2',
    author: 'Mohamed Hassan',
    role: 'Data Engineering Team',
    content: 'The mentorship and hands-on projects here are unmatched. I\'ve learned more in 6 months than in 2 years of coursework.',
    rating: 5,
  },
  {
    id: 'test-3',
    author: 'Nour Khalil',
    role: 'Leadership Team',
    content: 'Being part of Data Street helped me develop leadership skills and build a network of talented peers.',
    rating: 5,
  },
];

export const partners: Partner[] = [
  {
    id: 'partner-1',
    name: 'Microsoft',
    logo: '/partners/microsoft.png',
    website: 'https://microsoft.com',
  },
  {
    id: 'partner-2',
    name: 'Google',
    logo: '/partners/google.png',
    website: 'https://google.com',
  },
  {
    id: 'partner-3',
    name: 'IBM',
    logo: '/partners/ibm.png',
    website: 'https://ibm.com',
  },
];
