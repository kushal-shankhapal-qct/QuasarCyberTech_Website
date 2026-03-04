import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustIndicators from '../components/TrustIndicators';
import PlatformHighlights from '../components/PlatformHighlights';
import EnterpriseServices from '../components/EnterpriseServices';
import Testimonials from '../components/Testimonials';
import FeaturedInsights from '../components/FeaturedInsights';
import HomeFinalCTA from '../components/HomeFinalCTA';
import Footer from '../components/Footer';
import techNetBackdrop from '../assets/Tech_Net_Backdrop.png';

import { themeConfig } from '../config/themeConfig';

export default function Home() {
  const bgColor = themeConfig.header.global.pageBackgroundColor || '#FDFDFD';

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <div
        className="fixed inset-0 z-[-1] pointer-events-none mix-blend-darken opacity-[0.10] w-screen h-screen"
        style={{ backgroundColor: bgColor }}
      >
        <img
          src={techNetBackdrop}
          alt="Network Backdrop"
          className="w-full h-full object-cover"
        />
      </div>
      <Header />
      <main>
        <Hero />
        <TrustIndicators />
        <PlatformHighlights />
        <EnterpriseServices />
        <Testimonials />
        <FeaturedInsights />
        <HomeFinalCTA />
      </main>
      <Footer />
    </div>
  );
}