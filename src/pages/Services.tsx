import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServiceGridCard from '../components/shared/ServiceGridCard';
import { navigationConfig } from '../config/navigationConfig';

export default function Services() {
  const servicesData = navigationConfig.find(item => item.label === 'Services')?.subItems || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6 tracking-tight">
              Services Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1E3F] to-[#C41E5E]">Enterprise Cyber Resilience</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide strategic, full-spectrum cybersecurity solutions designed to protect your assets and empower digital transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
            {servicesData.map((service, index) => {
              // ServiceGridCard expects a valid Icon component
              const Icon = service.LucideIcon as React.ElementType;
              return (
                <ServiceGridCard
                  key={service.href}
                  label={service.label}
                  href={service.href}
                  desc={service.desc}
                  Icon={Icon}
                  index={index}
                />
              );
            })}
          </div>

          {/* CTA Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl p-10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-center relative overflow-hidden border border-gray-800"
          >
            <div className="absolute inset-0 bg-[#8B1E3F]/10 mix-blend-overlay"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to fortify your defenses?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
                Speak with our experts to design a tailored security architecture meeting your business objectives.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-[#0F172A] font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300"
              >
                Schedule a Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}