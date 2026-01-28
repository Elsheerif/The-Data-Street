// Type definitions for Data Street website

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcommittees?: string[];
  members?: Member[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  domain: string;
  status: 'Active' | 'Completed' | 'In Progress' | 'Research';
  tags: string[];
  department?: string;
  team?: Member[];
  startDate: Date;
  endDate?: Date;
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'Workshop' | 'Talk' | 'Hackathon' | 'Meetup' | 'Conference';
  date: Date;
  endDate?: Date;
  location: string;
  isOnline: boolean;
  registrationUrl?: string;
  capacity?: number;
  registered?: number;
  image?: string;
  speakers?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Member;
  category: 'Tech Insights' | 'AI Trends' | 'Student Spotlights' | 'Announcements';
  tags: string[];
  publishedAt: Date;
  updatedAt?: Date;
  image?: string;
  readTime?: number;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  department?: string;
  bio?: string;
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  image?: string;
  joinedDate?: Date;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  image?: string;
  rating?: number;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
}

export interface FormData {
  name: string;
  email: string;
  message?: string;
  department?: string;
  experience?: string;
  [key: string]: any;
}

export interface NavLink {
  name: string;
  href: string;
  children?: NavLink[];
}

export interface SocialLink {
  platform: 'Facebook' |  'LinkedIn' 
  url: string;
  icon: string;
}

// Admin Dashboard Types (Phase 2)
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Editor' | 'Department Lead' | 'Member';
  permissions: string[];
  createdAt: Date;
  lastLogin?: Date;
}

export interface PageConfig {
  id: string;
  pageName: string;
  isVisible: boolean;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface Analytics {
  pageViews: number;
  uniqueVisitors: number;
  newsletterSubscribers: number;
  eventRegistrations: number;
  projectViews: number;
  period: 'day' | 'week' | 'month' | 'year';
}
