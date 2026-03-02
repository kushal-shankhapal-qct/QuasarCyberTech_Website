import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20">
        <section className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-7xl font-bold text-[#0F172A] mb-6 tracking-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1E3F] to-[#C41E5E]">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connect with our experts to discuss your security posture, request a demo, or report an incident.
            </p>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20 resize-none" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
              </div>
              <button type="submit" className="w-full py-4 bg-[#8B1E3F] text-white font-bold rounded-xl hover:bg-[#6B1530] transition-colors">Submit Request</button>
            </form>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-[#0F172A] mb-10">Global Offices</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mr-6 shrink-0"><MapPin className="text-[#8B1E3F]" /></div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">San Francisco, CA (HQ)</h3>
                  <p className="text-gray-600 mb-1">100 Market St, Suite 400</p>
                  <p className="text-gray-600">San Francisco, CA 94105</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mr-6 shrink-0"><Globe2 className="text-[#8B1E3F]" /></div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">London, UK</h3>
                  <p className="text-gray-600 mb-1">1 Canada Square, Level 39</p>
                  <p className="text-gray-600">Canary Wharf, London E14 5AB</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-8 mt-8 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#0F172A] mb-2 flex items-center"><Phone className="w-4 h-4 mr-2 text-[#8B1E3F]" /> General Support</h4>
                  <p className="text-gray-600">+1 (800) 555-0199</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] mb-2 flex items-center"><Mail className="w-4 h-4 mr-2 text-[#8B1E3F]" /> Email Us</h4>
                  <p className="text-gray-600">hello@quasarcybertech.com</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-10 h-64 bg-gray-200 rounded-2xl overflow-hidden relative border border-gray-300">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-50 grayscale"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-6 py-3 bg-white/90 backdrop-blur-sm shadow-lg font-bold text-[#0F172A] rounded-lg">Interactive Map View</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 text-center">
          <div className="bg-[#0F172A] rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B1E3F]/20 to-transparent mix-blend-overlay"></div>
            <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Experiencing an Active Incident?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Our Incident Response team is available 24/7. Call our emergency hotline for immediate assistance.
            </p>
            <div className="inline-block px-8 py-4 bg-red-600 text-white font-bold rounded-xl relative z-10 text-xl tracking-wider">
              1-800-BREACH-0
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}