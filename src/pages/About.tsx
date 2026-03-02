import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6">
              About QuasarCyberTech
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leading the cybersecurity industry with innovation, expertise, and unwavering commitment to protecting your digital assets.
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 p-8 rounded-xl bg-gradient-to-br from-[#F8FAFC] to-white border border-gray-200"
          >
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              To empower organizations worldwide with enterprise-grade cybersecurity solutions that enable digital transformation while maintaining the highest standards of protection and compliance.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-16 p-8 rounded-xl bg-gradient-to-br from-[#8B1E3F]/5 to-[#007AFF]/5 border border-gray-200"
          >
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Our Values</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="text-[#8B1E3F] font-bold">•</span>
                <span><strong>Excellence:</strong> We deliver superior cybersecurity solutions through continuous innovation and expertise.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#8B1E3F] font-bold">•</span>
                <span><strong>Integrity:</strong> We maintain the highest ethical standards in all our operations and client relationships.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#8B1E3F] font-bold">•</span>
                <span><strong>Partnership:</strong> We work collaboratively with our clients to achieve their security objectives.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#8B1E3F] font-bold">•</span>
                <span><strong>Innovation:</strong> We stay ahead of emerging threats through cutting-edge research and development.</span>
              </li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl bg-gradient-to-br from-[#F8FAFC] to-white border border-gray-200"
          >
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Why We're Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-[#8B1E3F] mb-2">Expert Team</h3>
                <p className="text-gray-700">Certified security professionals with decades of combined experience across industries.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#8B1E3F] mb-2">24/7 Support</h3>
                <p className="text-gray-700">Round-the-clock monitoring and incident response to protect your organization.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#8B1E3F] mb-2">Proven Track Record</h3>
                <p className="text-gray-700">Trusted by Fortune 500 companies and organizations worldwide.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#8B1E3F] mb-2">Custom Solutions</h3>
                <p className="text-gray-700">Tailored security strategies designed for your specific business needs.</p>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
}