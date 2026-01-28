'use client';

import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Grid from '@/components/Grid';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Heart } from 'lucide-react';

export default function About() {

  const timeline = [
    { year: '2019', event: 'Data Street Founded', description: 'Started with a vision to empower data innovators' },
    { year: '2020', event: '100+ Members', description: 'Rapid growth during pandemic, online community flourished' },
    { year: '2021', event: '25+ Projects Launched', description: 'First major research initiatives and collaborations' },
    { year: '2024', event: 'Industry Recognition', description: 'Became leading student organization in data science' },
  ];

  return (
    <>
      <NavBar />

      <Section
        title="About The Data Street"
        bgColor="bg-gradient-to-r from-teal to-navy"
        className="[&>div>h2]:text-teal [&>div>h2]:font-cursive"
        subtitle="A story of passion, innovation, and community"
        fullHeight={true}
      >
        <Grid columns={3}>
          <Card icon={<Target size={32} />} title="Mission">
            Empowering students to discover, learn, and innovate in data science through hands-on projects,
            mentorship, and collaboration.
          </Card>
          <Card icon={<Lightbulb size={32} />} title="Vision">
            To build a thriving community where data innovators transform insights into real-world impact.
          </Card>
          <Card icon={<Heart size={32} />} title="Values">
            Innovation, collaboration, transparency, continuous learning, and community impact.
          </Card>
        </Grid>

      </Section>

      <Footer />
    </>
  );
}
