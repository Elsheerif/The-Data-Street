'use client';

import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Grid from '@/components/Grid';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');

  const posts = [
    {
      id: 1,
      title: 'The Future of AI in Data Analysis',
      category: 'tech-insights',
      author: 'Ahmed Hassan',
      date: '2024-01-10',
      excerpt: 'Exploring how artificial intelligence is revolutionizing data analysis and unlocking new insights.',
      readTime: 5,
    },
    {
      id: 2,
      title: 'Meet Your Data Street Champions',
      category: 'spotlights',
      author: 'Noor El-Din',
      date: '2024-01-08',
      excerpt: 'Celebrating the achievements of our outstanding community members and their contributions.',
      readTime: 3,
    },
    {
      id: 3,
      title: 'Emerging Trends in Machine Learning 2024',
      category: 'ai-trends',
      author: 'Mohamed Ibrahim',
      date: '2024-01-05',
      excerpt: 'A comprehensive overview of the most exciting machine learning developments this year.',
      readTime: 7,
    },
    {
      id: 4,
      title: 'Data Street Q1 2024 Announcement',
      category: 'announcements',
      author: 'Fatima Al-Rashid',
      date: '2024-01-01',
      excerpt: 'Exciting updates on new initiatives, partnerships, and upcoming events for this quarter.',
      readTime: 4,
    },
    {
      id: 5,
      title: 'How to Get Started with GIS Analytics',
      category: 'tech-insights',
      author: 'Ahmed Hassan',
      date: '2023-12-28',
      excerpt: 'A beginner-friendly guide to geospatial analysis tools and techniques.',
      readTime: 6,
    },
    {
      id: 6,
      title: 'Student Spotlight: Building Solutions with Data',
      category: 'spotlights',
      author: 'Noor El-Din',
      date: '2023-12-25',
      excerpt: 'Discover how our members are using data to create meaningful impact.',
      readTime: 4,
    },
  ];

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'tech-insights', label: 'Tech Insights' },
    { id: 'ai-trends', label: 'AI Trends' },
    { id: 'spotlights', label: 'Student Spotlights' },
    { id: 'announcements', label: 'Announcements' },
  ];

  const filtered = posts.filter((p) => activeCategory === 'all' || p.category === activeCategory);

  return (
    <>
      <NavBar />

      <Hero
        title="Data Street Blog"
        subtitle="Insights, trends, and stories from our community"
        backgroundGradient="gradient-teal-navy"
      />

      <Section title="Latest Articles">
        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-lg font-heading font-bold transition-colors ${
                activeCategory === cat.id
                  ? 'bg-teal text-white'
                  : 'bg-gray-cool/20 text-navy dark:text-white hover:bg-gray-cool/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <Grid columns={2}>
          {filtered.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card title={post.title}>
                <p className="font-body text-sm text-gray-600 dark:text-gray-cool mb-4">
                  {post.excerpt}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-cool/20 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-cool">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </div>
                  </div>
                  <p className="text-xs font-body text-gray-600 dark:text-gray-cool">
                    {post.readTime} min read
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-teal hover:text-teal/80 font-body font-bold text-sm inline-block"
                  >
                    Read More →
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </Grid>
      </Section>

      <Section
        title="Subscribe to Our Newsletter"
        subtitle="Get the latest insights and announcements delivered to your inbox"
        bgColor="bg-gray-cool/10 dark:bg-navy/20"
      >
        <div className="max-w-md mx-auto">
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg border border-gray-cool/30 bg-white dark:bg-navy font-body text-navy dark:text-white placeholder-gray-600 dark:placeholder-gray-cool focus:outline-none focus:border-teal"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-teal text-white rounded-lg font-heading font-bold hover:bg-teal/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Section>

      <Footer />
    </>
  );
}
