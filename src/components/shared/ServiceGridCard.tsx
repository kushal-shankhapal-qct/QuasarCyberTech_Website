import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ServiceGridCardProps {
  label: string;
  href: string;
  desc: string;
  Icon: LucideIcon;
  index: number;
}

export default function ServiceGridCard({ label, href, desc, Icon, index }: ServiceGridCardProps) {
  return (
    <Link to={href} className="group h-full block">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        viewport={{ once: true }}
        className="h-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-8 rounded-3xl border border-[#334155] hover:border-[#8B1E3F]/50 hover:shadow-2xl hover:shadow-[#8B1E3F]/20 transition-all duration-300 relative overflow-hidden flex flex-col"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B1E3F]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#8B1E3F]/20 transition-all duration-500"></div>
        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-[#8B1E3F] group-hover:scale-110 group-hover:bg-[#8B1E3F] group-hover:text-white transition-all duration-300 relative z-10 shrink-0">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 relative z-10 leading-tight">
          {label}
        </h3>
        <p className="text-gray-400 mb-6 leading-relaxed relative z-10 font-medium line-clamp-2">
          {desc}
        </p>
        <div className="mt-auto flex items-center text-[#8B1E3F] font-bold group-hover:text-white transition-colors relative z-10">
          Explore Service <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
        </div>
      </motion.div>
    </Link>
  );
}
