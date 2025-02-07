import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, GraduationCap, Award, Globe, Users, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const companies = [
  {
    name: 'Nexariza Tech Solutions',
    description: 'Innovative software solutions and digital transformation services',
    icon: Rocket,
  },
  {
    name: 'Nexariza Learning Hub',
    description: 'Educational platform for tech skills and professional development',
    icon: GraduationCap,
  },
];

const achievements = [
  {
    title: '10+',
    subtitle: 'Years Experience',
    icon: Briefcase,
  },
  {
    title: '50+',
    subtitle: 'Global Clients',
    icon: Globe,
  },
  {
    title: '100+',
    subtitle: 'Team Members',
    icon: Users,
  },
  {
    title: '20+',
    subtitle: 'Industry Awards',
    icon: Award,
  },
];

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-20"
    >
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-3xl" />
        <div className="relative py-20 px-6 text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold"
          >
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Ahmad Yasin
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl text-gray-400 max-w-3xl mx-auto"
          >
            CEO of Nexariza Group | Tech Visionary | AI & IoT Pioneer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/projects"
              className="px-8 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors duration-200 flex items-center gap-2"
            >
              View Projects <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-primary-500 text-primary-500 rounded-full hover:bg-primary-500 hover:text-white transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">Nexariza Group Companies</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-dark-200 rounded-xl p-8 hover:bg-dark-300 transition-colors duration-200"
            >
              <company.icon className="h-12 w-12 text-primary-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">{company.name}</h3>
              <p className="text-gray-400">{company.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">Achievements & Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center space-y-4"
            >
              <achievement.icon className="h-8 w-8 text-primary-400 mx-auto" />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                {achievement.title}
              </h3>
              <p className="text-gray-400">{achievement.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative bg-dark-200 rounded-3xl p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-600/5" />
        <div className="relative space-y-6 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Our Vision</h2>
          <p className="text-gray-400 text-lg">
            At Nexariza Group, we're committed to pushing the boundaries of technology
            through innovation in AI, IoT, and educational solutions. Our mission is to
            create transformative technologies that empower businesses and individuals
            to thrive in the digital age.
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;