import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustIndicators from '../components/TrustIndicators';
import PlatformHighlights from '../components/PlatformHighlights';
import EnterpriseServices from '../components/EnterpriseServices';
import IndustrySnapshot from '../components/IndustrySnapshot';
import FeaturedInsights from '../components/FeaturedInsights';
import HomeFinalCTA from '../components/HomeFinalCTA';
import Footer from '../components/Footer';
import techNetBackdrop from '../assets/Tech_Net_Backdrop.png';

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <div className="fixed inset-0 z-[-1] pointer-events-none mix-blend-darken opacity-[0.15] w-screen h-screen bg-[#FDFDFD]">
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
        <IndustrySnapshot />
        <FeaturedInsights />
        <HomeFinalCTA />
      </main>
      <Footer />
    </div>
  );
}