import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { COLORS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { ChevronLeft } from 'lucide-react';
import { ASSETS } from '@/constants/assets';

const CareersApply: React.FC = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  const logoTextImg = ASSETS.logos.qct.textDark;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Standardized Google Form embed URL
  const googleFormEmbedUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfshcNxujjrPu2rXQlWk1Mup2DH1dP6fIgPL_98lStWw1zckg/viewform?embedded=true";

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: TYPOGRAPHY.fontBody }}>
      <Navbar />

      {/* ── 1: THE HERO (Dark) ── */}
      <PageHero 
        title={<>Join the <span style={{ color: COLORS.gold }}>Force.</span></>}
        highlight=""
        subtitle={role ? `Apply for the position of ${role}. Our talent acquisition team reviews all engineering and consulting applications within 5 business days.` : "Fill out the form below to begin your application process. Our team reviews all applications within 5 business days."}
        currentName="Apply"
        breadcrumbPaths={["Home", "Careers"]}
        visualVariant="none"
        compact={true}
        paddingTopOverride="clamp(8rem, 15vh, 12rem)"
        minHeightOverride="500px"
      />

      {/* ── 2: FORM SECTION ── */}
      <main style={{
        flexGrow: 1,
        paddingTop: '80px',
        paddingBottom: '120px',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        paddingLeft: LAYOUT_CONTROLS.section.paddingX,
        paddingRight: LAYOUT_CONTROLS.section.paddingX,
        textAlign: 'left'
      }}>
        <div style={{ maxWidth: '900px' }}>
          
          <div style={{ marginBottom: '48px' }}>
            <img src={logoTextImg} alt="QuasarCyberTech" style={{ height: '32px', width: 'auto', marginBottom: '24px' }} />
            <div style={{ height: '1px', width: '64px', background: COLORS.gold }} />
          </div>

          {/* ─── FORM IFRAME ─── */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #E2E8F0',
            boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
            minHeight: '1342px',
            width: '100%'
          }}>
            <iframe
              src={googleFormEmbedUrl}
              width="100%"
              height="1342"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              style={{ border: 'none' }}
              title="QuasarCyberTech Application Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CareersApply;
