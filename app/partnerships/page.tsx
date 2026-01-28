'use client';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Grid from '@/components/Grid';
import { motion } from 'framer-motion';
import { Zap, Target, TrendingUp, Users, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const iconMap: { [key: string]: React.ReactNode } = {
  technology: <Zap size={40} />,
  academic: <Users size={40} />,
  industry: <TrendingUp size={40} />,
  community: <Target size={40} />,
};

export default function Partnerships() {
  const currentPartners = [
    {
      name: 'DataCamp',
      logo: '/datacamp.png',
      description: 'DataCamp gives us access to learning paths and certifications in data analytics, data science, and AI',
      focus: 'Technology & Learning',
      website: 'https://www.datacamp.com/',
    },
    {
      name: 'Creativa',
      logo: '/creativa.png',
      description: 'Educational partnership with Creativa supporting training programs and community engagement',
      focus: 'Cloud & Analytics',
      website: 'https://creativa.gov.eg/',
    },
    {
      name: 'Divenore',
      logo: '/divenore.jpeg',
      description: 'Collaborative partnership with Divenore in coaching, training, and personal development',
      focus: 'Enterprise Solutions',
      website: 'https://ascend-wellbeing-hub.lovable.app/#',
    },

  ];

  const partnershipTypes = [
    {
      title: 'Technology Partners',
      description: 'Provide tools, platforms, and cloud services for our projects and learning initiatives',
      iconType: 'technology',
      examples: 'Cloud platforms, AI/ML frameworks, development tools',
    },
    {
      title: 'Academic Partners',
      description: 'Collaborate on research, provide facilities, and support student development',
      iconType: 'academic',
      examples: 'Universities, research institutions, educational organizations',
    },
    {
      title: 'Industry Partners',
      description: 'Share expertise, provide mentorship, and offer internship opportunities',
      iconType: 'industry',
      examples: 'Tech companies, consultancies, Fortune 500 enterprises',
    },
    {
      title: 'Community Partners',
      description: 'Support events, knowledge sharing, and community building initiatives',
      iconType: 'community',
      examples: 'Tech communities, non-profits, local organizations',
    },
  ];

  const whyPartner = [
    {
      title: 'Reach Talented Students',
      description: 'Connect with over 150 skilled data science students and future leaders',
    },
    {
      title: 'Showcase Innovation',
      description: 'Feature your products and services to an engaged, tech-savvy audience',
    },
    {
      title: 'Research Collaboration',
      description: 'Partner on real-world projects and research initiatives with practical impact',
    },
    {
      title: 'Brand Visibility',
      description: 'Gain recognition as a supporter of data science education and innovation',
    },
    {
      title: 'Event Sponsorship',
      description: 'Sponsor workshops, hackathons, and conferences to build your brand presence',
    },
    {
      title: 'Talent Pipeline',
      description: 'Access pre-screened, highly motivated candidates for internships and hiring',
    },
  ];

  return (
    <main>
      <NavBar />

      {/* Current Partners */}
      <Section
        title="Our Current Partners"
        bgColor="bg-gradient-to-r from-teal to-navy"
        className="[&>div>h2]:text-teal [&>div>h2]:font-cursive"
        fullHeight={true}
      >
        <Grid columns={3}>
          {currentPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card title={partner.name} hover={true}>
                <div className="flex items-center gap-4 mb-4">
                  {partner.logo.startsWith('/') ? (
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <span className="text-4xl">{partner.logo}</span>
                  )}
                  <div>
                    <span className="text-xs bg-teal/10 text-teal px-2 py-1 rounded">
                      {partner.focus}
                    </span>
                  </div>
                </div>
                <p className="font-body text-sm text-gray-900 dark:text-gray-700 mb-4">
                  {partner.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </Grid>
      </Section>


      {/* Why Partner */}
      <Section
        title="Why Partner With Data Street?"
        bgColor="bg-teal dark:bg-navy/100"
      >
        <Grid columns={3}>
          {whyPartner.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card
                title={benefit.title}
                description={benefit.description}
                hover={true}
              />
            </motion.div>
          ))}
        </Grid>
      </Section>

      {/* Partnership Application */}
      <Section
        title="Become Our Partner"
          bgColor="bg-gradient-to-r from-teal to-navy"

      >
        <div className="max-w-md mx-auto text-center">
          <p className="font-body text-lg text-gray-200 mb-8">
            Ready to partner with Data Street? Fill out our partnership application form to get started.
          </p>
          <a
            href="https://forms.gle/ZXjFNM2YzF8TAaqo6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors font-heading font-bold text-lg"
          >
            Apply for Partnership
          </a>
        </div>
      </Section>


      <Footer />
    </main>
  );
}
