import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';  // Import the supabase client

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);

  // Fetch certificates data from Supabase
  useEffect(() => {
    const fetchCertificates = async () => {
      const { data, error } = await supabase
        .from('certificates')  // Your Supabase table name
        .select('*');
      
      if (error) {
        console.error('Error fetching certificates:', error);
      } else {
        setCertificates(data);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Award className="h-8 w-8 text-accent-purple" />
        <h2 className="text-3xl font-bold">Certifications</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.credential}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-dark-200 rounded-xl p-6 border border-dark-300 hover:border-accent-purple transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-accent-blue/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-accent-purple transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-gray-400">{cert.issuer}</p>
                </div>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent-purple transition-colors duration-200"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>

              {/* Display certificate image */}
              {cert.image_url && (
                <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden mt-4">
                  <img
                    src={cert.image_url}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex justify-between items-center text-sm mt-4">
                <span className="text-accent-blue">{cert.date}</span>
                <span className="text-gray-400">ID: {cert.credential}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
