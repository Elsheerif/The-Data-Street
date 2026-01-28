'use client';

import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Grid from '@/components/Grid';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Zap, Code, Lightbulb, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function Departments() {
  const departments = [
    {
      id: 'data-engineering-committee',
      name: 'Data Engineering Committee',
      icon: Code,
      description: 'Designing and maintaining robust data infrastructure and pipelines for the organization.',
      subcommittees: ['Data Pipeline', 'Database Design', 'Data Quality'],
    },
    {
      id: 'ai-committee',
      name: 'AI Committee',
      icon: Zap,
      description: 'Leading AI initiatives, research, and strategic implementation across the organization.',
      subcommittees: ['AI Research', 'Ethics', 'Innovation'],
      //  teamSize: 12,
    },
    {
      id: 'data-analytics-committee',
      name: 'Data Analytics Committee',
      icon: Code,
      description: 'Transforming raw data into actionable insights and driving data-driven decision making.',
      subcommittees: ['Business Intelligence', 'Reporting', 'Visualization'],
      // teamSize: 18,
    },

    {
      id: 'graphic-design-committee',
      name: 'Graphic Design Committee',
      icon: Lightbulb,
      description: 'Creating stunning visuals, branding materials, and digital content for the community.',
      subcommittees: ['Branding', 'Digital Art', 'UI/UX'],
      // teamSize: 10,
    },
    {
      id: 'marketing-committee',
      name: 'Marketing Committee',
      icon: Lightbulb,
      description: 'Driving community growth through strategic marketing and outreach initiatives.',
      subcommittees: ['Digital Marketing', 'Content Creation', 'Events'],
      //teamSize: 12,
    },
    {
      id: 'Web Development-committee',
      name: 'Web Development Committee',
      icon: Lightbulb,
      description: 'Building and maintaining our website, applications, and digital platforms.',
      subcommittees: ['Frontend', 'Backend', 'DevOps'],
      // teamSize: 10,
    },
    {
      id: 'Business Development-committee',
      name: 'Business Development Committee',
      icon: Lightbulb,
      description: 'Creating stunning visuals, branding materials, and digital content for the community.',
      subcommittees: ['Branding', 'Digital Art', 'UI/UX'],
      teamSize: 10,
    },
    {
      id: 'research-development-committee',
      name: 'R & D Committee',
      icon: Lightbulb,
      description: 'Exploring emerging technologies and driving innovation through cutting-edge research initiatives.',
      subcommittees: ['Technology Research', 'Innovation Lab', ],
    },
    {
      id: 'human-resources-committee',
      name: 'Human Resources Committee',
      icon: Users,
      description: 'Building a thriving community culture and managing organizational development and talent.',
      subcommittees: ['Recruitment', 'Learning & Development'],
    },

  ];

  return (
    <>
      <NavBar />

      <Hero
        title="Our Departments"
        subtitle="Explore the diverse teams shaping Data Street"
        backgroundGradient="gradient-navy-teal"
      />

      <Section title="Where Innovation Happens" isAnimated className="[&>div>h2]:font-Cursive">
        <Grid columns={3}>
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <motion.div key={dept.id} whileHover={{ scale: 1.02 }}>
                <Card
                  icon={<Icon size={32} />}
                  title={dept.name}
                  description={dept.description}
                >
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="font-heading font-bold text-sm text-navy  mb-2">
                        Subcommittees:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {dept.subcommittees.map((sub) => (
                          <span
                            key={sub}
                            className="text-xs px-2 py-1 bg-teal/10 text-teal rounded"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* <Link
                      href={`/departments/${dept.id}`}
                      className="text-teal hover:text-teal/80 font-body font-bold text-sm inline-block"
                    >
                      View Details →
                    </Link> */}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </Grid>
      </Section>

      <Section
        title="Join a Department"
         bgColor="gradient-teal-navy"
        className="[&>div>h2]:font-cursive"
      >
        <div className="text-center">
          <p className="font-body text-lg text-white mb-6">
            Whether you&apos;re passionate about data science, design, development, or operations,
            there&apos;s a place for you in Data Street.
          </p>
          <Link
            href="/join-us"
            className="inline-block px-8 py-3 bg-teal text-white rounded-lg font-heading font-bold hover:bg-teal/90 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </Section>

      <Footer />
    </>
  );
}
