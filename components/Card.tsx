'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  title,
  description,
  children,
  icon,
  className = '',
  hover = true,
}: CardProps) {
  const hoverVariants = hover
    ? {
        rest: { y: 0, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' },
        hover: {
          y: -8,
          boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
        },
      }
    : { rest: {}, hover: {} };

  return (
    <motion.div
      className={`bg-gray-200 dark:bg-[#ebebeb] rounded-lg border border-gray-cool/20 p-6 transition-colors ${className}`}
      variants={hoverVariants}
      initial="rest"
      whileHover="hover"
    >
      {icon && <div className="mb-4 text-teal">{icon}</div>}
      <h3 className="font-heading text-xl font-bold text-navy dark:text-navy mb-2">{title}</h3>
      {description && (
        <p className="font-body text-gray-600 dark:text-gray-500 text-sm mb-4">{description}</p>
      )}
      {children}
    </motion.div>
  );
}
