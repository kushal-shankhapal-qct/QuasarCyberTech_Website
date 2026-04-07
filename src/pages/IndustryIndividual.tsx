import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import { useParams } from 'react-router-dom';
import { COLORS, TYPOGRAPHY, GRADIENTS, LAYOUT_CONTROLS } from '../config/themeConfig';
import { industriesData } from '../data/industriesData';
import { getCapabilityBySlug } from '../data/capabilitiesData';
import PageHero from '../components/PageHero';
import CapabilityCardSimple from '../components/capabilities/cards/CapabilityCardSimple';
import Seo from '../components/seo/Seo';
import NotFound from './NotFound';
import { createBreadcrumbSchema, createServiceSchema } from '../seo/schema';

const INDUSTRY_SEO: Record<string, { title: string; description: string }> = {
  'banking': {
    title: 'Cybersecurity for Banks & Financial Services — RBI Compliance India',
    description: 'Specialized cybersecurity for banks, NBFCs, and financial institutions. RBI cybersecurity framework compliance, core banking security, VAPT, and fintech data protection services in India.',
  },
  'fintech': {
    title: 'FinTech & Digital Payments Cybersecurity Services India',
    description: 'Payment security, API security testing, RBI compliance, and fintech data protection for digital payment platforms and FinTech startups in India. Protect your payment infrastructure.',
  },
  'saas': {
    title: 'SaaS & Technology Cybersecurity — DevSecOps & Cloud Security India',
    description: 'Application security, DevSecOps consulting, cloud-native security, SOC 2 readiness, and API security testing for SaaS platforms and technology companies in India.',
  },
  'ecommerce': {
    title: 'E-commerce Cybersecurity India — Payment Security & Fraud Prevention',
    description: 'Cybersecurity for e-commerce platforms — payment gateway security, web application penetration testing, online fraud prevention, and PCI DSS compliance in India.',
  },
  'healthcare': {
    title: 'Healthcare Cybersecurity India — Medical Data Security & DPDP Compliance',
    description: 'Healthcare cybersecurity services — medical data protection, DPDP Act and HIPAA compliance, hospital IT security, and health application security testing in India.',
  },
  'enterprise': {
    title: 'Enterprise & Manufacturing Cybersecurity — OT/ICS Security India',
    description: 'Enterprise cybersecurity solutions for manufacturing, OT security, ICS security, industrial network security, and operational technology protection in India.',
  },
};

const IndustryIndividual: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = industriesData.find((i) => i.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!industry) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen w-full relative bg-canvas overflow-x-hidden selection:bg-brand-primary/20 selection:text-brand-primary">
      <Seo
        title={INDUSTRY_SEO[industry.slug]?.title || `${industry.name} Cybersecurity Services`}
        description={INDUSTRY_SEO[industry.slug]?.description || industry.subtitle}
        path={`/industries/${industry.slug}`}
        image={industry.image}
        jsonLd={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Industries', path: '/industries' },
            { name: industry.name, path: `/industries/${industry.slug}` },
          ]),
          createServiceSchema({
            name: `${industry.name} Cybersecurity Services`,
            description: industry.description,
            path: `/industries/${industry.slug}`,
            image: industry.image,
            serviceType: industry.eyebrow,
          }),
        ]}
      />
      <Navbar />

      <PageHero
        title={<>{industry.title}<br /></>}
        highlight={industry.highlight}
        subtitle={industry.subtitle}
        image={industry.image}
        imageScale={1.25}
        imageOpacity={0.65}
        visualFullWidth={false}
        visualWidth="55%"
        maskStart="0%"
        maskEnd="80%"
        imagePositionX="center"
        imagePositionY="center"
        imageBlendSoftness="70%"
        imageBlendStartPercent="0%"
        gradientCenter="15% 85%"
        gradientRadius="65%"
        scrollTargetId="industry-overview"
        scrollButtonText="See Details"
        breadcrumbPaths={["Home", "Industries"]}
        currentName={industry.name}
      />

      {/* ─── SECTION: INDUSTRY OVERVIEW ─── */}
      <section id="industry-overview" className="w-full bg-white pt-16 pb-24 border-t border-gray-100" style={{
        paddingLeft: LAYOUT_CONTROLS.section.paddingX,
        paddingRight: LAYOUT_CONTROLS.section.paddingX,
      }}>
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          <div className="text-left lg:col-span-7">
            <h2 style={{
              fontFamily: TYPOGRAPHY.fontHeading,
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              fontWeight: 700,
              color: COLORS.textOnLight,
              marginBottom: '16px',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}>
              <span style={{ color: COLORS.burgundy }}>Securing</span>{' '}
              {industry.overview.heading.replace(/^Securing\s*/i, '')} {industry.overview.highlight}
            </h2>
            <div className="flex flex-col gap-6">
              {industry.overview.body.map((paragraph, index) => (
                <p key={index} className="text-black/70 text-lg leading-relaxed text-justify" style={{ fontFamily: TYPOGRAPHY.fontBody }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 text-left flex flex-col justify-start lg:pt-0">
            <span className="text-sm font-bold text-[#6B1530] uppercase tracking-widest mb-3 block" style={{ fontFamily: TYPOGRAPHY.fontHeading }}>
              QuasarCyberTech Advantage
            </span>
            <h3 className="text-4xl font-bold text-black mb-8" style={{ fontFamily: TYPOGRAPHY.fontHeading, lineHeight: 1.1 }}>
              Deep <span style={{ color: '#6B1530' }}>Security</span> Expertise
            </h3>

            <div className="flex flex-col gap-6">
              {industry.whyQCT.map((item) => (
                <div key={item.title} className="flex items-start gap-4 text-left">
                  <span className="w-2 h-2 rounded-full bg-black mt-2.5 shrink-0" />
                  <div>
                    <p className="text-black font-bold mb-1" style={{ fontFamily: TYPOGRAPHY.fontBody }}>
                      {item.title}
                    </p>
                    <p className="text-black/70 leading-relaxed" style={{ fontFamily: TYPOGRAPHY.fontBody }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section 
        className="w-full py-20 relative overflow-hidden"
        style={{ 
          background: GRADIENTS.INDUSTRY_CHALLENGES_BG,
          paddingLeft: LAYOUT_CONTROLS.section.paddingX,
          paddingRight: LAYOUT_CONTROLS.section.paddingX,
        }}
      >
        <div className="w-full text-left">
          <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: TYPOGRAPHY.fontHeading }}>
            <span style={{ color: '#D6B05C' }}>Navigating</span> Risk
          </h2>
          <p className="text-white/70 text-lg" style={{ fontFamily: TYPOGRAPHY.fontBody }}>
            The specialized cybersecurity challenges facing your organization.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {industry.challenges.map((challenge) => {
            const Icon = challenge.icon;
            return (
              <div
                key={challenge.title}
                className="group bg-white/5 border border-white/10 p-8 rounded-xl relative overflow-hidden hover:border-[#D6B05C]/50 transition-colors"
              >
                <Icon
                  className="absolute -right-8 -bottom-8 w-40 h-40 text-white opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-500 pointer-events-none -rotate-12"
                  strokeWidth={1}
                />
                <h3 className="relative z-10 text-xl font-bold text-[#D6B05C] mb-3 text-left" style={{ fontFamily: TYPOGRAPHY.fontHeading }}>
                  {challenge.title}
                </h3>
                <p className="relative z-10 text-white/70 text-left" style={{ fontFamily: TYPOGRAPHY.fontBody }}>
                  {challenge.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="industry-related-services-section w-full py-20 bg-[#F5F7FA] border-t border-gray-200" style={{
        paddingLeft: LAYOUT_CONTROLS.section.paddingX,
        paddingRight: LAYOUT_CONTROLS.section.paddingX,
      }}>
        <div className="w-full text-left">
          <h2 className="text-4xl font-bold text-[#0B1F3B] mb-10" style={{ fontFamily: TYPOGRAPHY.fontHeading }}>
            Related <span style={{ color: '#D6B05C' }}>Services</span> We Provide
          </h2>

          <div className="industry-related-services-grid grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.overview.capabilities.map((capability) => {
              const capabilityData = getCapabilityBySlug(capability.slug);
              return (
                <CapabilityCardSimple
                  key={capability.slug}
                  title={capabilityData?.name || capability.name}
                  mobileTitle={capabilityData?.navLabel || capability.name}
                  desc={capabilityData?.cardDescription || `${capability.name} services tailored for ${industry.name}.`}
                  href={`/capabilities/${capability.slug}`}
                  img={capabilityData?.image || industry.image}
                />
              );
            })}
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: 40rem) {
                .industry-related-services-section {
                  padding-left: 1rem !important;
                  padding-right: 1rem !important;
                }

                .industry-related-services-grid {
                  gap: 0.875rem !important;
                }
              }
            `,
          }}
        />
      </section>

      <CTASection theme="dark" showEyebrow={true} />
      <Footer />
    </div>
  );
};

export default IndustryIndividual;
