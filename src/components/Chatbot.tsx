import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Mail, Github, Linkedin, Mic, Terminal, Minimize2, Maximize2 } from 'lucide-react';
import Typewriter from 'typewriter-effect';

interface Message {
  type: 'user' | 'bot';
  content: string | JSX.Element;
  timestamp: Date;
  isTyping?: boolean;
}

const AHMAD_INFO = {
  name: 'Ahmad Yasin',
  role: 'CEO of Nexariza Group',
  expertise: [
    'Artificial Intelligence (AI)',
    'Machine Learning',
    'Deep Learning',
    'Flask',
    'Django',
    'Python',
    'AI Model Deployment',
    'SQL',
    'API Integration',
    'HTML/CSS',
    'Next.js/Node.js',
    'Full Stack Development'
  ],
  education: [
    'B.S. in Artificial Intelligence from University of Central Punjab',
  ],
  experience: [
    'Tech Innovation Leader at Various Tech Giants (2021-2025)',
    'Lead Researcher at AI Labs (2024-2025)',
  ],
  projects: [
    'AI-Powered Object Detection System',
    'Neural Network Research',
    'Deep Learning Models',
    'Flask/Django Web Applications',
    'Full Stack AI Solutions',
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

  // AI/ML related queries
  if (normalizedInput.includes('ai') || normalizedInput.includes('artificial intelligence') || normalizedInput.includes('machine learning')) {
    return `I specialize in Artificial Intelligence and Machine Learning. My expertise includes:
    • Deep Learning and Neural Networks
    • AI Model Development and Deployment
    • Machine Learning Algorithms
    • Computer Vision and NLP
    • AI Research and Innovation`;
  }

  // Development skills
  if (normalizedInput.includes('programming') || normalizedInput.includes('coding') || normalizedInput.includes('development')) {
    return `My development stack includes:
    • Python (Django, Flask)
    • Full Stack Development
    • API Integration
    • Database Management (SQL)
    • Web Technologies (HTML/CSS, Next.js, Node.js)`;
  }

  // Project inquiries
  if (normalizedInput.includes('project') || normalizedInput.includes('work')) {
    return `Some of my notable projects include:
    • ${AHMAD_INFO.projects.join('\n• ')}
    
    Each project showcases my expertise in AI, ML, and full-stack development.`;
  }

  // Standard queries
  if (normalizedInput.includes('who') && normalizedInput.includes('you')) {
    return `I'm ${AHMAD_INFO.name}, ${AHMAD_INFO.role}. I'm an AI and Machine Learning expert with extensive experience in full-stack development and AI solutions.`;
  }

  if (normalizedInput.includes('education') || normalizedInput.includes('study')) {
    return `My educational background includes:\n${AHMAD_INFO.education.join('\n')}`;
  }

  if (normalizedInput.includes('experience') || normalizedInput.includes('work')) {
    return `My professional experience includes:\n${AHMAD_INFO.experience.join('\n')}`;
  }

  if (normalizedInput.includes('achievement') || normalizedInput.includes('award')) {
    return `My achievements include:\n${AHMAD_INFO.achievements.join('\n')}`;
  }

  if (normalizedInput.includes('contact') || normalizedInput.includes('email') || normalizedInput.includes('reach')) {
    return (
      <div>
        <p>You can reach me through:</p>
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
    return `${getGreeting()} I'm Ahmad's AI assistant. I can tell you about my expertise in AI, ML, development skills, projects, or how to get in touch. What would you like to know?`;
  }

  // Default response
  return `I can tell you about my expertise in:
  • AI and Machine Learning
  • Full Stack Development
  • Python Development
  • Projects and Achievements
  
What would you like to know more about?`;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          content: `${getGreeting()} I'm Ahmad's AI assistant. I can help you learn about my expertise in AI, ML, development, and more. What would you like to know?`,
          timestamp: new Date(),
          isTyping: true,
        },
      ]);
    }
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
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
      isTyping: true,
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

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const chatbotVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      height: '80vh',
      maxHeight: '80vh'
    },
    minimized: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      height: '60px'
    },
    exit: { opacity: 0, y: 100, scale: 0.8 },
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            initial="hidden"
            animate={isMinimized ? "minimized" : "visible"}
            exit="exit"
            variants={chatbotVariants}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-8 right-8 w-[90vw] max-w-[400px] bg-dark-200/95 backdrop-blur-xl border border-accent-purple/20 rounded-2xl shadow-xl overflow-hidden"
            style={{
              maxHeight: isMinimized ? '60px' : '80vh'
            }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="w-6 h-6 text-white" />
                  <span className="font-semibold text-white">AI Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMinimize}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-4 h-4 text-white" />
                    ) : (
                      <Minimize2 className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setMessages([]);
                    }}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              {!isMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[60vh]">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-accent-purple text-white ml-auto'
                              : 'bg-dark-300 text-white'
                          }`}
                        >
                          {message.type === 'bot' && message.isTyping ? (
                            <Typewriter
                              options={{
                                strings: [typeof message.content === 'string' ? message.content : ''],
                                autoStart: true,
                                delay: 20,
                                deleteSpeed: 9999999,
                                cursor: '',
                                
                              }}
                            />
                          ) : (
                            message.content
                          )}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <form onSubmit={handleSubmit} className="p-4 border-t border-dark-300">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={startVoiceInput}
                        className={`p-2 rounded-full ${
                          isListening ? 'bg-red-500' : 'bg-dark-300'
                        } transition-colors`}
                      >
                        <Mic className="w-5 h-5 text-white" />
                      </button>
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        className="flex-1 bg-dark-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                      />
                      <button
                        type="submit"
                        className="p-2 bg-accent-purple rounded-full hover:bg-accent-purple/80 transition-colors"
                      >
                        <Send className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}