'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy dark:bg-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.jpeg"
                alt="Data Street Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="font-display font-bold font-bold"> The Data Street</span>
            </div>
            <p className="text-gray-cool text-sm">
              Empowering the next generation of data innovators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-cool hover:text-teal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/departments" className="text-gray-cool hover:text-teal transition-colors">
                  Departments
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="text-gray-cool hover:text-teal transition-colors">
                  Our Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/join-us" className="text-gray-cool hover:text-teal transition-colors">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-teal mt-1 flex-shrink-0" />
                <span className="text-gray-cool">Cairo University, Egypt</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-teal mt-1 flex-shrink-0" />
                <a href="mailto:info@datastreet.org" className="text-gray-cool hover:text-teal transition-colors">
                  info@datastreet.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-cool/20 pt-8 mb-8">
          <div className="flex justify-center gap-6">
            <a
              href="https://www.facebook.com/TheDataStreet/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-teal/20 rounded-lg transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/the-data-street/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-teal/20 rounded-lg transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-cool text-sm border-t border-gray-cool/20 pt-8">
          <p>&copy; {currentYear} Data Street. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
