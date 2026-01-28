'use client';

import { ReactNode } from 'react';

interface GridProps {
  columns?: 1 | 2 | 3 | 4;
  children: ReactNode;
  gap?: string;
  className?: string;
}

export default function Grid({
  columns = 3,
  children,
  gap = 'gap-6',
  className = '',
}: GridProps) {
  const colClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${colClass[columns]} ${gap} ${className}`}>
      {children}
    </div>
  );
}
