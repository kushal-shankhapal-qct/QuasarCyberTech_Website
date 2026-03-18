import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { BookOpen, FileText, AlertTriangle, BookA, Network, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Resources() {
  const categories = [
    { title: 'Cybersecurity Blog', icon: BookOpen, desc: 'Technical deep-dives, industry news, and thought leadership from our experts.' },
    { title: 'Case Studies', icon: FileText, desc: 'Real-world examples of how we defended enterprises and solved complex security problems.' },
    { title: 'Threat Advisories', icon: AlertTriangle, desc: 'Zero-day alerts and detailed intelligence reports on emerging threat actor campaigns.' },
    { title: 'Infosec Dictionary', icon: BookA, desc: 'A comprehensive glossary of modern cybersecurity terminology and acronyms.' },
    { title: 'Security Mindmaps', icon: Network, desc: 'Visual guides mapping out attack vectors, defensive strategies, and compliance frameworks.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20">
        <section className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-[#0F172A] mb-6 tracking-tight">
              Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B1F3B] to-[#C41E5E]">Center</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Arm your team with the latest intelligence, research, and strategies needed to defend against modern adversaries.
            </p>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-xl hover:border-[#0B1F3B]/30 transition-all duration-300">
                <cat.icon className="w-10 h-10 text-[#0B1F3B] mb-6" />
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{cat.title}</h3>
                <p className="text-gray-600 mb-6">{cat.desc}</p>
                <div className="text-[#0B1F3B] font-bold flex items-center cursor-pointer group-hover:unde">
                  Browse {cat.title} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="bg-[#0F172A] rounded-3xl p-10 md:p-14 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay ahead of the curve.</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Subscribe to The Quasar Brief. Get zero-day alerts and our monthly cybersecurity digest delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input type="email" placeholder="Your work email" className="px-6 py-4 rounded-xl flex-grow focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] bg-white/10 text-white border border-white/20" />
              <button className="px-8 py-4 bg-[#0B1F3B] text-white font-bold rounded-xl hover:bg-[#1F6FEB] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}