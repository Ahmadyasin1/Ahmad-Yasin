import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Parallax } from 'swiper/modules';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Brain, Code, Database, Cloud, Terminal, File as Mobile, Server, Lock } from 'lucide-react';
import { useThemeContext } from './ThemeProvider';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/parallax';

const skills = [
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    description: 'Deep learning, neural networks, and machine learning algorithms',
    color: 'from-blue-500 to-purple-500',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Full-stack development with modern frameworks and technologies',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'Big data processing, ETL pipelines, and data warehousing',
    color: 'from-pink-500 to-red-500',
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Scalable and resilient cloud infrastructure design',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Terminal,
    title: 'Software Development',
    description: 'Full-stack development with modern frameworks and technologies',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    icon: Mobile,
    title: 'AI model Development',
    description: 'Custom AI model Development & Training with api integration',
    color: 'from-yellow-500 to-green-500',
  },
  {
    icon: Server,
    title: 'IoT Development',
    description: 'Embedded systems and IoT solution architecture',
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: Lock,
    title: 'Research',
    description: 'Research on new technologies',
    color: 'from-teal-500 to-blue-500',
  },
];

export default function SkillsCarousel() {
  const { theme } = useThemeContext();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue('0px');
  const background = useMotionTemplate`radial-gradient(${radius} circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 80%)`;

  return (
    <div 
      className="w-full max-w-2xl mx-auto relative group"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
        radius.set('400px');
      }}
      onMouseLeave={() => radius.set('0px')}
    >
      <motion.div
        style={{ background }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />
      
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Autoplay, Parallax]}
        className="w-full h-[500px]"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        parallax={true}
        speed={1000}
      >
        {skills.map((skill, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`w-full h-full rounded-3xl p-8 flex flex-col items-center justify-center space-y-6 relative overflow-hidden border border-future-glow/20 backdrop-blur-xl ${
                theme === 'dark' ? 'bg-future-dark/80' : 'bg-white/80'
              }`}
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.1 }}
              >
                <skill.icon className={`w-20 h-20 bg-gradient-to-br ${skill.color} bg-clip-text text-transparent drop-shadow-glow`} />
              </motion.div>

              <div className="relative z-10 space-y-4 text-center">
                <h3 className={`text-3xl font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent drop-shadow-glow`}>
                  {skill.title}
                </h3>
                <p className={`text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-future-light/80' : 'text-gray-700'
                }`}>
                  {skill.description}
                </p>
              </div>

              <div className="absolute inset-0 bg-noise-pattern opacity-10 pointer-events-none" />
              <div className="absolute inset-0 border border-future-glow/10 rounded-3xl pointer-events-none" />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}