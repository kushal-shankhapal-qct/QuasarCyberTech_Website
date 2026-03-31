import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { COLORS, TYPOGRAPHY, SECTION_BACKGROUNDS } from '../config/themeConfig';
import { ChevronLeft } from 'lucide-react';
import { ASSETS } from '@/constants/assets';

const CareersApply: React.FC = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  const logoTextImg = ASSETS.logos.qct.textDark;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Placeholder for Google Form URL. 
  // In a real scenario, you'd append ?entry.12345={role} if pre-fill is configured.
  const googleFormBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfshcNxujjrPu2rXQlWk1Mup2DH1dP6fIgPL_98lStWw1zckg/viewform?usp=dialog";
  const iframeUrl = role ? `${googleFormBaseUrl}&entry.ROLE_FIELD_ID=${encodeURIComponent(role)}` : googleFormBaseUrl;

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{
        flexGrow: 1,
        paddingTop: '140px',
        paddingBottom: '80px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
        paddingLeft: '20px',
        paddingRight: '20px'
      }}>
        {/* ─── HEADER ─── */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <Link to="/careers" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: COLORS.textSub,
            textDecoration: 'none',
            fontSize: '14px',
            marginBottom: '32px',
            fontWeight: 500
          }}>
            <ChevronLeft size={16} /> Back to Careers
          </Link>

          <div style={{ marginBottom: '24px' }}>
            <img src={logoTextImg} alt="QuasarCyberTech" style={{ height: '32px', width: 'auto' }} />
          </div>

          <h1 style={{ ...TYPOGRAPHY.sectionTitle, color: COLORS.textOnLight, marginBottom: '12px' }}>Apply to QuasarCyberTech</h1>
          <p style={{ ...TYPOGRAPHY.bodyBase, color: COLORS.textSub }}>Fill out the form below and our team will review your application within 5 business days.</p>

          {role && (
            <div style={{ marginTop: '24px' }}>
              <span style={{
                background: COLORS.gold,
                color: '#000',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Applying for: {role}
              </span>
            </div>
          )}
        </div>

        {/* ─── FORM IFRAME ─── */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.06)',
          minHeight: '900px'
        }}>
          <iframe
            src={googleFormBaseUrl} // Using base URL as placeholder
            width="100%"
            height="1000"
            style={{ border: 'none' }}
            title="QuasarCyberTech Application Form"
          >
            Loading…
          </iframe>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CareersApply;
