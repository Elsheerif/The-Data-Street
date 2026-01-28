'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  bgColor?: string;
  isAnimated?: boolean;
  fullHeight?: boolean;
}

export default function Section({
  title,
  subtitle,
  children,
  className = '',
  bgColor = 'bg-white dark:bg-navy',
  isAnimated = true,
  fullHeight = false,
}: SectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className={`${fullHeight ? 'min-h-screen flex items-center justify-center' : 'py-16 md:py-24'} ${bgColor} ${className}`}>
      <div className={`${fullHeight ? 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        {isAnimated ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {title && (
              <motion.div className="text-center mb-12" variants={itemVariants}>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#00002b] dark:text-white mb-4">
                  {title}
                </h2>
                {subtitle && (
                  <p className="font-body text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {subtitle}
                  </p>
                )}
              </motion.div>
            )}
            <motion.div variants={itemVariants}>{children}</motion.div>
          </motion.div>
        ) : (
          <>
            {title && (
              <div className="text-center mb-12">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#4B5F8F] dark:text-white mb-4">
                  {title}
                </h2>
                {subtitle && (
                  <p className="font-body text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            {children}
          </>
        )}
      </div>
    </section>
  );
}
