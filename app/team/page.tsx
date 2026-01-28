'use client';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import Grid from '@/components/Grid';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Search, X, Loader } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';

interface Member {
  id: number;
  name: string;
  email: string;
  roleTitle: string;
  bio: string;
  department: { id: number; name: string } | null;
  status: 'ACTIVE' | 'ALUMNI' | 'INACTIVE';
  skills: string[];
  socialLinkedIn: string | null;
  joinDate: string | null;
}

interface Department {
  id: number;
  name: string;
}

const seniorityLabels: Record<string, string> = {
  executive: 'Executive',
  senior: 'Senior',
  mid: 'Mid-Level',
  junior: 'Junior',
};

const seniorityColors: Record<string, string> = {
  executive: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
  senior: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
  mid: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300',
  junior: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
};

export default function Team() {
  const [members, setMembers] = useState<Member[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, deptRes] = await Promise.all([
          fetch('/api/members'),
          fetch('/api/departments'),
        ]);

        const membersData = await membersRes.json();
        const deptData = await deptRes.json();

        // Filter only active members for public view
        setMembers(membersData.filter((m: Member) => m.status === 'ACTIVE'));
        setDepartments(deptData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const departmentMatch = selectedDepartment === 'all' || member.department?.id === selectedDepartment;
      const searchMatch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.roleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.bio.toLowerCase().includes(searchTerm.toLowerCase());

      return departmentMatch && searchMatch;
    });
  }, [members, selectedDepartment, searchTerm]);

  const getInitialsBgColor = (name: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-indigo-500',
      'bg-cyan-500',
    ];
    const charCode = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
    return colors[charCode % colors.length];
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <main>
      <NavBar />

      {/* Hero Section */}
      <section className="bg-gradient-navy-teal text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="font-heading text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Team
          </motion.h1>
          <motion.p
            className="font-body text-xl text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Meet the talented individuals driving Data Street&apos;s mission forward across {departments.length} departments and {members.length} team members
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <Section
        title="Find Team Members"
        subtitle="Filter by department, seniority level, or search by name"
        bgColor="bg-white dark:bg-navy"
      >
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-4 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, role, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-cool/20 focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white font-body"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Department Filter */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-navy dark:text-white mb-3">Department</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedDepartment('all')}
                className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-all ${
                  selectedDepartment === 'all'
                    ? 'bg-teal text-white'
                    : 'bg-gray-100 text-navy dark:bg-navy/50 dark:text-gray-cool hover:bg-gray-200 dark:hover:bg-navy/70'
                }`}
              >
                All Departments
              </button>
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-all ${
                    selectedDepartment === dept.id
                      ? 'bg-teal text-white'
                      : 'bg-gray-100 text-navy dark:bg-navy/50 dark:text-gray-cool hover:bg-gray-200 dark:hover:bg-navy/70'
                  }`}
                >
                  {dept.name.split(' &')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Filter Removed - Using Department Only */}

          {/* Results Count */}
          <div className="text-center pt-4">
            <p className="font-body text-sm text-gray-600 dark:text-gray-cool">
              Showing <span className="font-semibold text-teal">{filteredMembers.length}</span> of{' '}
              <span className="font-semibold text-navy dark:text-white">{members.length}</span> team members
            </p>
          </div>
        </div>
      </Section>

      {/* Loading State */}
      {loading && (
        <Section bgColor="bg-gray-50 dark:bg-black/30">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="animate-spin text-teal mb-4" size={32} />
            <p className="font-body text-gray-600 dark:text-white/70">Loading team members...</p>
          </div>
        </Section>
      )}

      {/* Team Members Grid */}
      {!loading && (
        <Section bgColor="bg-gray-50 dark:bg-black/30">
        <AnimatePresence mode="wait">
          {filteredMembers.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Grid columns={4}>
                {filteredMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="bg-white dark:bg-navy rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                      {/* Avatar */}
                      <div className="flex justify-center pt-6">
                        <div
                          className={`w-20 h-20 rounded-full ${getInitialsBgColor(
                            getInitialsBgColor(member.name)
                          )} flex items-center justify-center text-white font-heading font-bold text-2xl`}
                        >
                          {getInitials(member.name)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-heading text-lg font-bold text-navy dark:text-white mb-1 text-center">
                          {member.name}
                        </h3>
                        <p className="font-body text-sm text-teal font-semibold text-center mb-3">{member.roleTitle}</p>

                        {/* Department Badge */}
                        <div className="flex justify-center mb-3">
                          <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 px-3 py-1 rounded-full">
                            {member.department?.name || 'Unassigned'}
                          </span>
                        </div>

                        {/* Bio */}
                        <p className="font-body text-xs text-gray-600 dark:text-gray-cool text-center mb-4 flex-1 line-clamp-3">
                          {member.bio}
                        </p>

                        {/* Contact Links */}
                        <div className="flex justify-center gap-3 pt-3 border-t border-gray-cool/20">
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-navy/50 hover:bg-teal hover:text-white transition-colors"
                            title="Send email"
                          >
                            <Mail size={16} />
                          </a>
                          {member.socialLinkedIn && (
                            <a
                              href={member.socialLinkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-navy/50 hover:bg-blue-600 hover:text-white transition-colors"
                              title="LinkedIn profile"
                            >
                              <Linkedin size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Grid>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <p className="font-body text-lg text-gray-600 dark:text-gray-cool mb-4">No team members found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('all');
                }}
                className="px-6 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors font-heading font-semibold"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        </Section>
      )}

      {/* Statistics Section */}
      <Section
        title="By The Numbers"
        subtitle="Data Street Team Overview"
        bgColor="bg-white dark:bg-navy"
      >
        <Grid columns={4}>
          <div className="text-center">
            <motion.div
              className="text-4xl font-heading font-bold text-teal mb-2"
              whileInView={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              viewport={{ once: true }}
            >
              {members.length}
            </motion.div>
            <p className="font-body text-sm text-gray-600 dark:text-gray-cool">Total Team Members</p>
          </div>
          <div className="text-center">
            <motion.div
              className="text-4xl font-heading font-bold text-teal mb-2"
              whileInView={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              viewport={{ once: true }}
            >
              {departments.length}
            </motion.div>
            <p className="font-body text-sm text-gray-600 dark:text-gray-cool">Departments</p>
          </div>
          <div className="text-center">
            <motion.div
              className="text-4xl font-heading font-bold text-teal mb-2"
              whileInView={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              viewport={{ once: true }}
            >
              {members.filter((m) => m.skills && m.skills.length > 0).length}
            </motion.div>
            <p className="font-body text-sm text-gray-600 dark:text-gray-cool">Skilled Experts</p>
          </div>
          <div className="text-center">
            <motion.div
              className="text-4xl font-heading font-bold text-teal mb-2"
              whileInView={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              viewport={{ once: true }}
            >
              {new Date().getFullYear() - 2022}+
            </motion.div>
            <p className="font-body text-sm text-gray-600 dark:text-gray-cool">Years of Experience</p>
          </div>
        </Grid>
      </Section>

      <Footer />
    </main>
  );
}
