import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Import the supabase client

export default function Education() {
  const [education, setEducation] = useState([]);

  // Fetch education data from Supabase
  useEffect(() => {
    const fetchEducation = async () => {
      const { data, error } = await supabase
        .from('education')  // Your Supabase table name
        .select('*');
      
      if (error) {
        console.error('Error fetching education data:', error);
      } else {
        setEducation(data);
      }
    };

    fetchEducation();
  }, []);

  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <GraduationCap className="h-8 w-8 text-accent-purple" />
        <h2 className="text-3xl font-bold">Education</h2>
      </motion.div>

      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative bg-dark-200 rounded-xl p-8 border border-dark-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-accent-blue/5 rounded-xl" />
            <div className="relative space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                  <div className="flex items-center gap-2 text-accent-purple mt-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{edu.institution}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{edu.period}</span>
                </div>
              </div>

              <p className="text-gray-400">{edu.description}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent-blue">
                  <Award className="h-5 w-5" />
                  <h4 className="font-semibold">Key Achievements</h4>
                </div>
                <ul className="space-y-2">
                  {edu.achievements?.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.2) + (i * 0.1) }}
                      className="flex items-start gap-2 text-gray-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
