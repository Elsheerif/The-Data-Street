'use client';

import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Grid from '@/components/Grid';
import AnimatedCounter from '@/components/AnimatedCounter';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Zap, BookOpen, Users, Code, Lightbulb, Award } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const stats = [
    { label: 'Active Members', value: 50, suffix: '+' },
    { label: 'Projects', value: 25, suffix: '+' },
    { label: 'Events', value: 30, suffix: '+/year' },
  ];

  const features = [
    {
      icon: <BookOpen size={32} />,
      title: 'Learn',
      description: 'Master cutting-edge data technologies and methodologies from industry experts.',
    },
    {
      icon: <Code size={32} />,
      title: 'Build',
      description: 'Work on real-world projects and create impactful solutions with your team.',
    },
    {
      icon: <Award size={32} />,
      title: 'Lead',
      description: 'Take charge, develop leadership skills, and guide the next generation.',
    },
  ];

  const departments = [
    { name: 'Strategic & Operations', icon: Zap },
    { name: 'Technical (AI/ML, Data Engineering)', icon: Code },
    { name: 'Branding & Design', icon: Lightbulb },
    { name: 'Web & Systems', icon: Zap },
    { name: 'People & Development', icon: Users },
  ];

  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <Hero
        title="Empowering the Next Generation of Data Innovators"
        subtitle="Where Data meets Discovery"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/join-us"
            className="px-8 py-3 bg-white text-navy rounded-lg font-heading font-bold hover:bg-gray-cool transition-colors"
          >
            Join Now
          </Link>

        </div>
      </Hero>

      {/* Impact Stats */}
      { /* <Section title="Our Impact" bgColor="bg-gray-cool/70 dark:bg-navy/80">
        <Grid columns={3}>
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-body text-gray-600 dark:text-gray-cool">{stat.label}</p>
            </motion.div>
          ))}
        </Grid>
      </Section> */}

      {/* Why Join Us */}
      <Section
        title="Why Join Data Street?"
        subtitle="Unlock your potential in a community dedicated to innovation"
      >
        <Grid columns={3}>
          {features.map((feature) => (
            <Card
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </Grid>
      </Section>


      {/* CTA Section */}
      <Section
        title="Ready to Join Us?"
        bgColor="gradient-navy-teal text-white"

      >
        <div className="text-center">
          <Link
            href="/join-us"
            className="inline-block px-8 py-4 bg-white text-navy rounded-lg font-heading font-bold hover:bg-gray-cool transition-colors text-lg"
          >
            Start Your Journey Today
          </Link>
        </div>
      </Section>

      <Footer />
    </>
  );
}
