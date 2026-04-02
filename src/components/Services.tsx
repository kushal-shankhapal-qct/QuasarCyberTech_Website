import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Server, Shield, Grid, Network, Layers, Image as ImageIcon } from 'lucide-react';

import { ASSETS } from '@/constants/assets';

// ---------------------------------------------------------
// SERVICES PANEL CONFIGURATION
// ---------------------------------------------------------
const servicesVars = {
  // Width of the colored accent line below the active service title
  titleAccentLineWidth: '100%', // Change to '32px', '50%', etc. to adjust
  topCardBorderGradient: 'from-[#2F6F78] to-[#1E2A38]', // Deep teal and slate
  titleUnderlineColor: 'bg-[#0B1F3B]', // Deep magenta
};

const servicesData = [
  {
    id: 'consulting',
    title: 'Technology Consulting',
    icon: Grid,
    description: 'Strategic IT advisory and transformation roadmaps aligned to your business objectives. We assess your technology landscape, identify performance gaps, and deliver actionable strategies that improve efficiency, reduce operational costs, and drive sustainable innovation.',
    features: ['IT Strategy & Architecture', 'Cost Optimization', 'Digital Transformation'],
    image: ASSETS.services.techConsulting,
  },
  {
    id: 'managed',
    title: 'Managed IT Services',
    icon: Server,
    description: 'End-to-end infrastructure management ensuring performance, availability, and scalability. We proactively monitor, maintain, and optimize your IT environment so your teams can focus on growth while we handle operational continuity.',
    features: ['24/7 Monitoring', 'Lifecycle Management', 'Performance Optimization'],
    image: ASSETS.services.managedIT,
  },
  {
    id: 'security',
    title: 'Cyber Security & SOC',
    icon: Shield,
    description: 'Comprehensive protection against evolving cyber threats through proactive defense and continuous monitoring. From vulnerability management to real-time incident response, we secure your infrastructure, applications, and cloud environments.',
    features: ['Managed SOC', 'Threat Detection & Response', 'DevSecOps & Cloud Security'],
    image: null, // Fallback to icon if no image
  },
  {
    id: 'software',
    title: 'Software Engineering & Solutioning',
    icon: Share2,
    description: 'Designing and delivering secure, scalable digital solutions tailored to your operational needs. We engineer robust platforms that integrate seamlessly with your ecosystem while maintaining performance and security at scale.',
    features: ['Custom Application Development', 'Secure System Integration', 'Next-Gen Solutioning'],
    image: null,
  },
  {
    id: 'staffing',
    title: 'Staff Augmentation',
    icon: Network,
    description: 'On-demand access to experienced IT and cybersecurity professionals who integrate seamlessly into your operations. Whether short-term or long-term engagements, we extend your capabilities without operational disruption.',
    features: ['Specialized IT Talent', 'CISO & Security Experts', 'Flexible Engagement Models'],
    image: null,
  },
  {
    id: 'training',
    title: 'Training & Capability Development',
    icon: Layers,
    description: 'Structured programs designed to elevate technical proficiency and organizational readiness. We equip teams with the skills required to manage modern technology landscapes securely and efficiently.',
    features: ['Technical Skill Development', 'Cybersecurity Awareness', 'Advanced Professional Training'],
    image: null,
  }
];

const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(servicesData[0].id);

  const activeService = servicesData.find(s => s.id === activeTab) || servicesData[0];

  // Snapping logic has been temporarily removed based on request
  useEffect(() => {
    document.documentElement.style.scrollSnapType = 'none';
  }, []);

  return (
    <section
      id="services"
      className="relative w-full min-h-screen flex items-center bg-[#F4F7FA] pt-8 pb-20 border-t border-[#E1E6EB]"
    >

      {/* 1% Faint Background Grid Texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1E2A38 1px, transparent 1px),
            linear-gradient(to bottom, #1E2A38 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-[1920px] w-full mx-auto px-4 md:px-8 xl:px-12 flex flex-col lg:flex-row gap-6 xl:gap-12">

        {/* LEFT COLUMN: Service Tabs */}
        <div className="w-full lg:w-[340px] shrink-0 flex flex-col z-20 justify-start pt-2">
          <div className="mb-8 p-3 rounded-lg flex flex-col">
            <h2 className="text-[12px] font-bold tracking-widest text-[#52606D] uppercase mb-1">Capabilities</h2>
            <h3 className="text-[32px] font-bold text-[#1F2933] tracking-tight leading-[1.2]">
              Our <span className="text-[#2F6F78]">Services</span>
            </h3>
          </div>

          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-[#EEF2F6] border border-[#E1E6EB]">
            {servicesData.map((service) => {
              const isActive = activeTab === service.id;
              const Icon = service.icon;

              return (
                <button
                  key={service.id}
                  onMouseEnter={() => setActiveTab(service.id)}
                  onClick={() => setActiveTab(service.id)}
                  className={`group relative w-full text-left px-4 h-[44px] rounded-[8px] flex items-center overflow-hidden transition-colors duration-150 border border-transparent ${isActive
                    ? 'bg-[rgba(47,111,120,0.08)] shadow-sm border-[rgba(47,111,120,0.1)]'
                    : 'hover:bg-black/[0.03] border-transparent'
                    }`}
                >
                  {/* Active Indicator Accent Line */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[2px] transition-colors duration-200 rounded-r-md ${isActive ? 'bg-[#2F6F78]' : 'bg-transparent'}`} />

                  <div className="flex items-center gap-3 w-full pl-2 relative z-10">
                    <div className={`shrink-0 transition-colors duration-200 ${isActive ? 'text-[#1E2A38]' : 'text-[#52606D]'}`}>
                      <Icon strokeWidth={isActive ? 2 : 1.5} size={16} />
                    </div>
                    <span className={`text-[14px] leading-none tracking-tight transition-colors duration-200 truncate ${isActive ? 'text-[#1F2933] font-semibold' : 'text-[#52606D] font-medium'}`}>
                      {service.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Intelligence Panel */}
        <div className="flex-1 z-10 w-full flex items-start">
          {/* Main Card */}
          <div className="bg-[#FFFFFF] border border-[#E1E6EB] rounded-b-[12px] rounded-t-none shadow-[0_6px_15px_rgba(30,42,56,0.04)] relative overflow-hidden flex flex-col h-auto min-h-[300px] w-full mt-2 lg:mt-0">

            {/* Top Accent Strip (Mirroring Header/Nav Dropdown Behavior) */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${servicesVars.topCardBorderGradient} opacity-90 z-20`} />

            <div className="flex-1 relative z-10 h-full flex flex-col justify-start p-8 lg:p-[32px] pt-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex flex-col h-full relative"
                >

                  {/* Title & Divider */}
                  <div className="mb-6">
                    <div className="inline-block"> {/* Restricts width to text length */}
                      <h4 className="text-[24px] font-bold text-[#1F2933] tracking-tight leading-tight whitespace-nowrap z-20">
                        {activeService.title}
                      </h4>
                      {/* Micro Accent Line */}
                      <div className={`h-[2px] ${servicesVars.titleUnderlineColor} mt-3 rounded-full opacity-80`} style={{ width: servicesVars.titleAccentLineWidth }} />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 lg:gap-10 relative z-20 items-stretch h-full">

                    {/* Left Inner Content (Description only) */}
                    <div className="flex-1 flex flex-col justify-start mt-2">
                      <p className="text-[15.5px] text-[#52606D] leading-[1.8] font-medium text-justify">
                        {activeService.description}
                      </p>
                    </div>

                    {/* Right Inner Content: Visualization Area */}
                    <div className="w-full md:w-[260px] lg:w-[280px] shrink-0 flex flex-col justify-start h-full pt-1">
                      <div className="w-full h-[140px] bg-[#EEF2F6] rounded-[8px] border border-[#E1E6EB] shadow-inner flex flex-col items-center justify-center text-[#52606D] gap-3 relative overflow-hidden">
                        {activeService.image ? (
                          <img src={activeService.image} alt={activeService.title} className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <ImageIcon className="w-8 h-8 opacity-60 text-[#1E2A38]" strokeWidth={1} />
                            <span className="text-[12px] font-medium tracking-wide uppercase opacity-70">Architecture Visualization</span>
                          </>
                        )}
                      </div>
                    </div>

                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
