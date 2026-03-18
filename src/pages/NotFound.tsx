import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FCFCFD] to-[#F8FAFC] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <h1 className="text-7xl font-bold text-[#0B1F3B] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3B] text-white font-semibold rounded-lg hover:bg-[#1F6FEB] transition-all duration-200 hover:scale-105"
        >
          Back to Home
          <ArrowRight size={20} />
        </Link>
      </motion.div>
    </div>
  );
}