import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function Products() {
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
            <h1
              className="mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '56px', color: '#0F172A', lineHeight: 1.1 }}
            >
              Our Security Platforms
            </h1>
            <p
              className="max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: '#4A4A5A', lineHeight: 1.6 }}
            >
              Proprietary engineering designed for continuous visibility <br />and accelerated remediation at scale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-12 rounded-xl bg-gradient-to-br from-[#F8FAFC] to-white border-2 border-dashed border-gray-300 text-center"
          >
            <p className="text-gray-600 text-lg">
              Product details and specifications coming soon. Contact us to learn more about our solutions.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}