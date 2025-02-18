import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Briefcase, GraduationCap, Award, Globe, Users, Rocket, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';
import ParticlesBackground from './components/ParticlesBackground';
import Chatbot from './components/Chatbot';
import SkillsCarousel from './components/SkillsCarousel';
import ThemeProvider from './components/ThemeProvider';
import LoadingScreen from './components/LoadingScreen';

// Lazy load components
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const ProjectForm = lazy(() => import('./pages/ProjectForm'));
const SignIn = lazy(() => import('./pages/SignIn'));
const ComingSoon = lazy(() => import('./pages/ComingSoon'));
const Certificates = lazy(() => import('./components/Certificates'));
const Education = lazy(() => import('./components/Education'));

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  return session ? <>{children}</> : <Navigate to="/signin" />;
}

function HomePage() {
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
    { title: '10+', subtitle: 'Years Experience', icon: Briefcase },
    { title: '50+', subtitle: 'Global Clients', icon: Globe },
    { title: '100+', subtitle: 'Team Members', icon: Users },
    { title: '20+', subtitle: 'Industry Awards', icon: Award },
  ];

  return (
    <motion.div className="overflow-hidden">
      {/* Enhanced Particles Background */}
      <div className="fixed inset-0 z-0">
        <ParticlesBackground 
          particleCount={window.innerWidth < 768 ? 100 : 200}
          particleColor="#6366f1"
          speedMultiplier={0.5}
        />
      </div>

      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-primary-600/5 to-dark-100" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative text-center space-y-8 max-w-4xl mx-auto px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold"
          >
            <span className="text-gradient">
              Ahmad Yasin
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
    
       
            <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
              Tech Visionary & AI Pioneer
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link
              to="/projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2 text-lg font-medium">
                Explore Projects
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link
              to="/contact"
              className="group px-8 py-4 rounded-full border border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white transition-all duration-300"
            >
              <span className="text-lg font-medium">Get in Touch</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-purple-400"
          >
            <ChevronDown className="h-8 w-8 animate-pulse" />
          </motion.div>
        </motion.div>
      </section>

      {/* Responsive Sections Container */}
      <div className="relative z-10 space-y-20 sm:space-y-32 py-20 sm:py-32 px-4 sm:px-6 lg:px-8">

        {/* Skills Section */}
        <section className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            <div className="text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Core Expertise
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
                Cutting-edge technologies powering next-generation solutions
              </p>
            </div>
            
            <div className="relative rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl p-6 sm:p-8">
              <SkillsCarousel />
            </div>
          </motion.div>
        </section>

        
        
        {/* Certificates & Education Sections */}
        <section className="max-w-7xl mx-auto space-y-20 sm:space-y-32">
          <Certificates />
          <Education />
        </section>

      </div>
    </motion.div>
  );
}

// App component remains the same

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-dark-100 via-dark-200 to-dark-100 dark:from-light-100 dark:via-light-200 dark:to-light-100 text-white dark:text-dark-900 transition-colors duration-300">
          <Navbar />
          <Suspense fallback={<LoadingScreen />}>
            <main className="container mx-auto px-4 py-8">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/coming-soon" element={<ComingSoon />} />
                  <Route
                    path="/admin"
                    element={
                      <PrivateRoute>
                        <Admin />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/admin/projects/new"
                    element={
                      <PrivateRoute>
                        <ProjectForm />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/admin/projects/:slug/edit"
                    element={
                      <PrivateRoute>
                        <ProjectForm />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </main>
          </Suspense>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;