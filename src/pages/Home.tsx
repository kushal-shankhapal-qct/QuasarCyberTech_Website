import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustIndicators from '../components/TrustIndicators';
import QCTSecureFramework from '../components/QCTSecureFramework';
import EnterpriseServices from '../components/EnterpriseServices';
import PlatformHighlights from '../components/PlatformHighlights';
import IndustrySnapshot from '../components/IndustrySnapshot';
import FeaturedInsights from '../components/FeaturedInsights';
import LeadershipVision from '../components/LeadershipVision';
import HomeFinalCTA from '../components/HomeFinalCTA';
import Certifications from '../components/Certifications';
import Testimonials from '../components/Testimonials';

import Footer from '../components/Footer';

import { themeConfig, LAYOUT_CONTROLS } from '../config/themeConfig';

export default function Home() {
  return (
    <div className="min-h-screen w-full relative bg-canvas overflow-x-hidden selection:bg-brand-primary/20 selection:text-brand-primary">
      {/* 
        CONTINUOUS CANVAS GRADIENT OVERLAY
        A very soft, almost imperceptible gradient stretching across the entire height
        to give subtle depth to the flat canvas color.
      */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-gradient-to-b from-white/60 via-transparent to-white/30" />

      <Header />
      <main>
        <Hero />
        <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
          <TrustIndicators />
          <Certifications />
          <QCTSecureFramework />
          <EnterpriseServices />
          <PlatformHighlights />
          <IndustrySnapshot />
          <FeaturedInsights />
          <LeadershipVision />
          <Testimonials />
          <HomeFinalCTA />
        </div>
      </main>
      <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
        <Footer />
      </div>
    </div>
  );
}