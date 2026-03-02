import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    'Enterprise-grade security infrastructure',
    '24/7 monitoring and threat detection',
    'Compliance with industry standards',
    'Rapid incident response capabilities',
    'Advanced threat intelligence',
    'Dedicated security experts',
    'Real-time reporting and analytics',
    'Continuous vulnerability assessment'
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Why Choose QuasarCyberTech
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We combine cutting-edge technology with expert human insight to deliver comprehensive cybersecurity solutions that protect your most valuable assets.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={24} className="text-[#8B1E3F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#8B1E3F]/10 to-[#007AFF]/10 border border-gray-200">
              <img
                src="https://placehold.co/600x600"
                alt="Cybersecurity monitoring dashboard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;