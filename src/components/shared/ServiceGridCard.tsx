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
        className="h-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-8 rounded-3xl border border-[#334155] hover:border-[#0B1F3B]/50 hover:shadow-2xl hover:shadow-[#0B1F3B]/20 transition-all duration-300 relative overflow-hidden flex flex-col"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0B1F3B]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#0B1F3B]/20 transition-all duration-500"></div>
        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-[#0B1F3B] group-hover:scale-110 group-hover:bg-[#0B1F3B] group-hover:text-white transition-all duration-300 relative z-10 shrink-0">
          <Icon className="w-7 h-7" />
        </div>
        <h3
          className="relative z-10 leading-tight"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '24px', color: '#FFFFFF', marginBottom: '12px' }}
        >
          {label}
        </h3>
        <p
          className="relative z-10 line-clamp-2"
          style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: '24px' }}
        >
          {desc}
        </p>
        <div
          className="mt-auto flex items-center transition-colors relative z-10 font-bold"
          style={{ fontFamily: 'var(--font-hero)', fontSize: '13px', color: '#FF4D6D' }}
        >
          Explore Service <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
        </div>
      </motion.div>
    </Link>
  );
}
