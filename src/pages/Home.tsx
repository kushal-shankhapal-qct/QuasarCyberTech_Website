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
import { DEFAULT_OG_IMAGE_SOCIAL, absoluteUrl } from '../seo/site';
import { createBreadcrumbSchema, createServiceSchema } from '../seo/schema';

export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-canvas">
      <Seo
        title="Best Cybersecurity Consulting Company in India | Enterprise Security Services"
        description="QuasarCyberTech is India's leading cybersecurity consulting company. We deliver VAPT, penetration testing, managed SOC, cloud security, compliance assurance, and cyber risk advisory for enterprises across India and globally."
        path="/"
        image={DEFAULT_OG_IMAGE_SOCIAL}
        jsonLd={[
          createBreadcrumbSchema([{ name: 'Home', path: '/' }]),
          createServiceSchema({
            name: 'Enterprise Cybersecurity Consulting',
            description: 'QuasarCyberTech delivers enterprise cybersecurity consulting, offensive security testing, managed detection and response, cloud security, compliance assurance, and cyber intelligence services to organizations worldwide.',
            path: '/capabilities',
            serviceType: 'Cybersecurity Consulting',
          }),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'QuasarCyberTech Cybersecurity Services',
            description: 'Enterprise cybersecurity capabilities across advisory, offensive security, managed defense, cloud security, compliance, and cyber intelligence',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Cyber Advisory & Risk Governance', url: absoluteUrl('/capabilities/cyber-advisory') },
              { '@type': 'ListItem', position: 2, name: 'Regulatory Compliance & Assurance', url: absoluteUrl('/capabilities/compliance-assurance') },
              { '@type': 'ListItem', position: 3, name: 'Offensive Security & Resilience Engineering', url: absoluteUrl('/capabilities/offensive-security') },
              { '@type': 'ListItem', position: 4, name: 'Cloud, Infrastructure & Platform Security', url: absoluteUrl('/capabilities/cloud-infrastructure') },
              { '@type': 'ListItem', position: 5, name: 'Managed Detection, Response & SOC Operations', url: absoluteUrl('/capabilities/managed-defense') },
              { '@type': 'ListItem', position: 6, name: 'Cyber Intelligence & Security Research', url: absoluteUrl('/capabilities/cyber-intelligence') },
            ],
          },
        ]}
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
