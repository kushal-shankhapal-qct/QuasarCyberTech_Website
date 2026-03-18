import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Coffee, GraduationCap, Plane, ShieldCheck, Cpu } from 'lucide-react';

export default function Careers() {
  const perks = [
    { title: 'Continuous Learning', icon: GraduationCap, desc: 'We sponsor OSCP, CISSP, and other major certifications.' },
    { title: 'Remote-First', icon: Plane, desc: 'Work from anywhere securely.' },
    { title: 'Top-Tier Health', icon: Coffee, desc: 'Comprehensive medical, dental, and wellness programs.' }
  ];

  const jobs = [
    { title: 'Senior Penetration Tester', dept: 'Offensive Security', loc: 'Remote (US)' },
    { title: 'SOC Analyst L2', dept: 'Managed Defense', loc: 'London, UK' },
    { title: 'DevSecOps Engineer', dept: 'Specialized Engineering', loc: 'Remote (Global)' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20">
        <section className="max-w-7xl mx-auto px-6 mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-[#0F172A] mb-6 tracking-tight">
              Defend The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B1F3B] to-[#C41E5E]">Future</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are assembling a team of elite problem solvers, ethical hackers, and security engineers. Do the best work of your career protecting the organizations that power the world.
            </p>
          </motion.div>
        </section>

        <section className="bg-gray-50 py-24 mb-24 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">Life at QuasarCyberTech</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {perks.map((p, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <p.icon className="w-12 h-12 text-[#0B1F3B] mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                  <p className="text-gray-600">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 mb-24">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-10 text-center">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#0B1F3B] transition-colors">{job.title}</h3>
                  <div className="text-sm text-gray-500 mt-2 flex gap-4">
                    <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1" /> {job.dept}</span>
                    <span className="flex items-center"><Cpu className="w-4 h-4 mr-1" /> {job.loc}</span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-2 bg-gray-100 text-[#0F172A] font-bold rounded-lg group-hover:bg-[#0B1F3B] group-hover:text-white transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}