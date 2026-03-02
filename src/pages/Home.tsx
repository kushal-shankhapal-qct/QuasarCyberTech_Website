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

export default function Home() {
  return (
    <div className="min-h-screen progressive-gradient-bg">
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