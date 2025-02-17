import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Mail, Github, Linkedin, Mic, Terminal, Minimize2 } from 'lucide-react';
import Typewriter from 'typewriter-effect';

interface Message {
  type: 'user' | 'bot';
  content: string | JSX.Element;
  timestamp: Date;
}

const AHMAD_INFO = {
  name: 'Ahmad Yasin',
  role: 'CEO of Nexariza Group',
  expertise: ['AI', 'IoT', 'Machine Learning', 'Robotics', 'Quantum Computing'],
  education: [
    'Ph.D. in Artificial Intelligence from Stanford University',
    'M.S. in Computer Science from MIT',
    'B.S. in Computer Engineering from UC Berkeley',
  ],
  experience: [
    'CEO & Founder at Nexariza Group (2018-Present)',
    'Tech Innovation Leader at Various Tech Giants (2015-2018)',
    'Lead Researcher at AI Labs (2012-2015)',
  ],
  projects: [
    'AI-Powered Object Detection System',
    'Smart Home Automation Hub',
    'Neural Network Research',
    'Quantum Computing Algorithms',
    'Autonomous Drone Navigation',
  ],
  achievements: [
    'Forbes 30 Under 30 in Technology',
    'IEEE Outstanding Young Engineer Award',
    'Top Innovator in AI by TechCrunch',
  ],
  contact: {
    email: 'ahmadyasin.info@gmail.com',
    github: 'https://github.com/Ahmadyasin1',
    linkedin: 'https://linkedin.com/in/mian-ahmad-yasin',
  },
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning!';
  if (hour < 18) return 'Good afternoon!';
  return 'Good evening!';
};

const processUserInput = (input: string): string | JSX.Element => {
  const normalizedInput = input.toLowerCase();

  if (normalizedInput.includes('who') && normalizedInput.includes('you')) {
    return `I'm Ahmad Yasin, ${AHMAD_INFO.role}. I specialize in ${AHMAD_INFO.expertise.join(', ')}.`;
  }

  if (normalizedInput.includes('education') || normalizedInput.includes('study')) {
    return `My educational background includes:\n${AHMAD_INFO.education.join('\n')}`;
  }

  if (normalizedInput.includes('experience') || normalizedInput.includes('work')) {
    return `My professional experience includes:\n${AHMAD_INFO.experience.join('\n')}`;
  }

  if (normalizedInput.includes('project')) {
    return `Some of my notable projects include:\n${AHMAD_INFO.projects.join('\n')}`;
  }

  if (normalizedInput.includes('achievement') || normalizedInput.includes('award')) {
    return `My achievements include:\n${AHMAD_INFO.achievements.join('\n')}`;
  }

  if (normalizedInput.includes('contact') || normalizedInput.includes('email') || normalizedInput.includes('reach')) {
    return (
      <div>
        <p>You can reach me at:</p>
        <div className="flex items-center gap-2 mt-2">
          <Mail className="w-4 h-4" />
          <a href={`mailto:${AHMAD_INFO.contact.email}`} className="text-future-light hover:underline">
            {AHMAD_INFO.contact.email}
          </a>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Github className="w-4 h-4" />
          <a href={AHMAD_INFO.contact.github} target="_blank" rel="noopener noreferrer" className="text-future-light hover:underline">
            GitHub
          </a>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Linkedin className="w-4 h-4" />
          <a href={AHMAD_INFO.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-future-light hover:underline">
            LinkedIn
          </a>
        </div>
      </div>
    );
  }

  if (normalizedInput.includes('hello') || normalizedInput.includes('hi')) {
    return `${getGreeting()} I'm Ahmad's AI assistant. How can I help you today?`;
  }

  return "I can tell you about Ahmad's background, education, experience, projects, achievements, or how to contact him. What would you like to know?";
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          content: `${getGreeting()} I'm Ahmad's AI assistant. How can I help you learn more about Ahmad Yasin?`,
          timestamp: new Date(),
        },
      ]);
    }
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    const botResponse: Message = {
      type: 'bot',
      content: processUserInput(input),
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, botResponse]);
    setInput('');
  };

  const startVoiceInput = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setIsListening(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.start();
    }
  };

  useEffect(() => {
    controls.start({
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    });
  }, [controls]);

  return (
    <>
      <motion.button
        animate={controls}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
      >
        <div className="relative">
          <MessageCircle className="w-8 h-8 text-white" />
          <div className="absolute inset-0 rounded-full bg-blue-300/20 animate-ping-slow" />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-8 right-8 w-[90vw] max-w-[500px] h-[80vh] max-h-[700px] bg-gray-800 backdrop-blur-2xl border border-indigo-600/30 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 pointer-events-none" />
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 bg-gray-800 border-b border-indigo-600/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Bot className="w-8 h-8 text-white" />
                    <div className="absolute -inset-2 bg-blue-500/20 blur-xl" />
                  </div>
                  <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                    Ahmad Yasin's AI Assistant
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-gray-700/30 rounded-full transition-all"
                  >
                    <Minimize2 className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-700/30 rounded-full transition-all"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              {!isMinimized && (
                <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: message.type === 'user' ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`p-4 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                            : 'bg-gray-700 border border-indigo-600/20'
                        } relative max-w-[80%]`}
                      >
                        <div className="absolute -inset-1 bg-blue-500/10 blur-lg" />
                        <div className="relative z-10 flex items-start gap-3">
                          {message.type === 'bot' ? (
                            <Terminal className="w-5 h-5 mt-1 text-purple-500" />
                          ) : (
                            <User className="w-5 h-5 mt-1 text-blue-500" />
                          )}
                          <div className="flex-1">
                            {typeof message.content === 'string' ? (
                              <Typewriter
                                options={{
                                  strings: [message.content],
                                  autoStart: true,
                                  delay: 20,
                                  deleteSpeed: 10000000, // Disable text deletion
                                  loop: false,    // Do not loop the animation
                                  cursor: '',     // Hide the cursor
                                }}
                              />
                            ) : (
                              message.content
                            )}
                            <div className="mt-2 text-xs text-white/60 flex items-center gap-2">
                              <span>{message.timestamp.toLocaleTimeString()}</span>
                              <span className="text-indigo-500">✦</span>
                              <span>{message.type.toUpperCase()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* Input */}
              {!isMinimized && (
                <form onSubmit={handleSubmit} className="p-4 border-t border-indigo-600/20">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={startVoiceInput}
                      className={`p-3 rounded-xl ${
                        isListening ? 'bg-red-500/30' : 'bg-gray-700/30'
                      } transition-all`}
                    >
                      <Mic className={`w-5 h-5 ${isListening ? 'text-red-500' : 'text-white'}`} />
                    </button>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about Ahmad's work..."
                      className="flex-1 bg-gray-700/50 border border-indigo-600/30 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/50"
                    />
                    <button
                      type="submit"
                      className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-all group"
                    >
                      <Send className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
