'use client';

import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Grid from '@/components/Grid';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, Users, Zap, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function JoinUs() {
  const steps = [
    {
      step: 1,
      title: 'Apply',
      icon: FileText,
      description: 'Submit your application through our online form and tell us about yourself.',
    },
    {
      step: 2,
      title: 'Interview',
      icon: Users,
      description: 'Meet with our team to discuss your interests and fit within Data Street.',
    },
    {
      step: 3,
      title: 'Orientation',
      icon: Zap,
      description: 'Get onboarded with training, resources, and introduction to the community.',
    },
    {
      step: 4,
      title: 'Contribute',
      icon: Trophy,
      description: 'Start working on projects and making an impact with your chosen department.',
    },
  ];

  const faqs = [
    {
      question: 'What are the requirements to join?',
      answer: 'We welcome students from all backgrounds and majors. Passion for data and willingness to learn are what matter most.',
    },
    {
      question: 'Is there a time commitment?',
      answer: 'It depends on your role and department. We offer flexible arrangements to accommodate your academic schedule.',
    },
    {
      question: 'Do I need to have experience in data science?',
      answer: 'No experience required! We provide training and mentorship to help you develop your skills.',
    },
    {
      question: 'Are there any membership fees?',
      answer: 'Data Street is free to join. We believe in making data science accessible to everyone.',
    },
    {
      question: 'What departments can I join?',
      answer: 'We have five departments: Technical, Branding & Design, Web & Systems, People & Development, and Strategic & Operations.',
    },
    {
      question: 'Can I switch departments later?',
      answer: 'Absolutely! Feel free to explore different departments and find where you fit best.',
    },
  ];

  const openAccordion = (index: number) => {
    // State management would be handled here
  };

  return (
    <>
      <NavBar />

      <Hero
        title="Join Data Street"
        subtitle="Become part of a thriving community of data innovators"
        backgroundGradient="gradient-teal-navy"
      >
        <Link href="https://forms.gle/MFPvi61ymBxU81Xa9" target="_blank">
          <button className="px-8 py-3 bg-white text-navy rounded-lg font-heading font-bold hover:bg-gray-cool transition-colors">
            Apply Now
          </button>
        </Link>
      </Hero>

      {/* Onboarding Process */}
      <Section title="Your Journey Starts Here" subtitle="A simple 4-step process to join our community">
        <div className="space-y-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                className="flex gap-6 md:gap-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center text-white mb-4">
                    <Icon size={32} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-1 h-32 bg-teal/30" />
                  )}
                </div>
                <div className="pb-8 pt-2">
                  <h3 className="font-heading text-xl font-bold text-navy dark:text-white mb-2">
                    Step {item.step}: {item.title}
                  </h3>
                  <p className="font-body text-gray-600 dark:text-gray-cool max-w-xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Why Join */}
      <Section
        title="Why Join Data Street?"
        bgColor="bg-teal dark:bg-navy/70"
      >
        <Grid columns={3}>
          <Card icon={<CheckCircle size={32} />} title="Learn New Skills">
            Master cutting-edge data technologies and methodologies from experienced mentors.
          </Card>
          <Card icon={<Zap size={32} />} title="Build Real Projects">
            Work on impactful projects that solve real-world problems and gain practical experience.
          </Card>
          <Card icon={<Users size={32} />} title="Network & Collaborate">
            Connect with like-minded individuals and build lasting relationships in the data community.
          </Card>
          <Card icon={<Trophy size={32} />} title="Career Growth">
            Get exposure to industry professionals and opportunities for internships and jobs.
          </Card>
          <Card icon={<FileText size={32} />} title="Leadership Experience">
            Take on leadership roles and develop skills that will serve you throughout your career.
          </Card>
          <Card icon={<Zap size={32} />} title="Fun & Community">
            Be part of an inclusive, supportive community that celebrates innovation and diversity.
          </Card>
        </Grid>
      </Section>

      {/* FAQ */}
      <Section title="Frequently Asked Questions">
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-gray-cool/70 bg-white rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-6 py-4 bg-gray-200 dark:bg-navy/50 hover:bg-gray-cool/10 dark:hover:bg-navy/70 transition-colors flex justify-between items-center"
                onClick={() => openAccordion(index)}
              >
                <h4 className="font-heading font-bold text-navy text-left">
                  {faq.question}
                </h4>
                <span className="text-teal">+</span>
              </button>
              <div className="px-6 py-4 bg-gray-cool/5 dark:bg-navy/20 border-t border-gray-cool/20">
                <p className="font-body text-navy ">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section
        title="Ready to Make an Impact?"

        bgColor="gradient-navy-teal text-white"
      >
        <div className="text-center">
            <Link href="https://forms.gle/MFPvi61ymBxU81Xa9" target="_blank">
          <button className="px-8 py-3 bg-white text-navy rounded-lg font-heading font-bold hover:bg-gray-cool transition-colors">
            Apply Now
          </button>
        </Link>
       
        </div>
      </Section>

      <Footer />
    </>
  );
}
