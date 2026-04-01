import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustIndicators from '../components/TrustIndicators';
import QCTSecureFramework from '../components/QCTSecureFramework';
import CapabilitiesGrid from '../components/CapabilitiesGrid';
import PlatformHighlights from '../components/PlatformHighlights';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import FeaturedInsights from '../components/FeaturedInsights';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
// import AccreditationBar from '../components/AccreditationBar';
import { LAYOUT_CONTROLS } from '../config/themeConfig';
import Seo from '../components/seo/Seo';
import { ASSETS } from '@/constants/assets';
import { DEFAULT_OG_IMAGE_SOCIAL } from '../seo/site';

export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-canvas">
      <Seo
        title="Enterprise Cybersecurity Consulting, Managed Defense & Security Engineering"
        description="QuasarCyberTech helps enterprises strengthen cyber resilience through advisory, offensive security, managed defense, cloud security, and platform-led security engineering."
        path="/"
        image={DEFAULT_OG_IMAGE_SOCIAL}
        jsonLd={[]}
      />
      <Navbar />
      <main>
        {/* 1. DARK: Hero */}
        <Hero />

        {/* 2. LIGHT: Accreditation Ticker & Metrics */}
        <div style={{ zoom: LAYOUT_CONTROLS.globalScale, background: '#FFFFFF' }}>
          {/* <AccreditationBar /> */}
          <TrustIndicators centered={true} />
          <Partners centered={true} />
        </div>

        {/* 3. DARK: The QCT SECURE Framework */}
        <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
          <QCTSecureFramework />
        </div>

        {/* 4. LIGHT: Core Capabilities */}
        <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
          <CapabilitiesGrid />
        </div>

        {/* 5. DARK: Security Platforms & Ecosystem */}
        <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
          <PlatformHighlights />
        </div>

        {/* 6. DARK: Trusted by Enterprise Leaders Across Industries */}
        <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
          <Testimonials />
        </div>

        {/* 7. DARK: Cybersecurity Insights & Research (Blogs) */}
        <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
          <FeaturedInsights />
        </div>

        {/* 8. LIGHT: Final CTA */}
        <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
          <CTASection theme="light" showEyebrow={true} />
        </div>
      </main>

      <div style={{ zoom: LAYOUT_CONTROLS.globalScale }}>
        <Footer />
      </div>
    </div>
  );
}
