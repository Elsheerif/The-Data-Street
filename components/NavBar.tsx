'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    setIsDark(savedMode ? JSON.parse(savedMode) : false);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Departments', href: '/departments' },
    { name: 'Partnerships', href: '/partnerships' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white dark:bg-navy shadow-lg'
          : 'bg-white/95 dark:bg-navy/95 backdrop-blur'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.jpeg"
              alt="Data Street Logo"
              className="w-10 h-11 rounded-full object-cover"
            />
            <span className="font-display font-bold text-navy dark:text-white hidden sm:inline">
             The Data Street
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-navy dark:text-white hover:text-teal transition-colors font-body text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-cool/20 rounded-lg transition-colors dark:bg-white"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              href="/join-us"
              className="hidden sm:inline px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors font-body text-sm "
            >
              Join Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-cool/20 rounded-lg transition-colors dark:bg-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-cool/20">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-navy dark:text-white hover:bg-gray-cool/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/join-us"
              className="block px-4 py-2 mt-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors text-center"
            >
              Join Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
