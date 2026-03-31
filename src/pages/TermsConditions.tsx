import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Seo from '../components/seo/Seo';
import { SECTION_BACKGROUNDS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';
import { createBreadcrumbSchema } from '../seo/schema';

const TermsConditions: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div style={{ background: SECTION_BACKGROUNDS.LIGHT, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Seo
        title="Terms and Conditions"
        description="Review the QuasarCyberTech terms and conditions governing use of the website, content, communications, and legal obligations."
        path="/terms-conditions"
        robots="noindex,follow"
        jsonLd={[
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Terms and Conditions', path: '/terms-conditions' },
          ]),
        ]}
      />
      <Navbar />

      <PageHero
        title="Terms &"
        highlight="Conditions"
        subtitle="Last Updated: October 24, 2024"
        visualVariant="none"
        breadcrumbPaths={['Home']}
        currentName="Terms & Conditions"
      />

      <section style={{
        paddingTop: LAYOUT_CONTROLS.section.paddingTop,
        paddingBottom: LAYOUT_CONTROLS.section.paddingBottom,
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        background: '#FFFFFF',
        flex: 1
      }}>
        <div style={{ maxWidth: '1280px', color: '#334155', fontFamily: TYPOGRAPHY.fontBody, lineHeight: 1.8, textAlign: 'left' }}>
          
          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Terms of Use</h3>
          <p style={{ marginBottom: '40px' }}>
            Welcome to the Quasar CyberTech website (the "Site"). Please read these Terms of Use ("Terms") carefully, as they govern your access to and use of the Site. By using the Site, you acknowledge that you have read, understood, and agree to abide by these Terms. If you do not agree, please do not access or use the Site.
            <br /><br />
            Quasar CyberTech reserves the right to update or modify these Terms at its sole discretion, without prior notice. Any changes will be effective immediately upon posting on the Site. It is your responsibility to review the Terms periodically. Your continued use of the Site following any updates constitutes acceptance of those changes.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Description of the Site</h3>
          <p style={{ marginBottom: '40px' }}>
            The Site provides information about Quasar CyberTech's products, services, and other related content. Visitors and users of the Site are referred to as "Users."
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Registration and Information</h3>
          <p style={{ marginBottom: '40px' }}>
            To access certain features of the Site, you may need to provide personal information such as your name, email address, and phone number. You agree to provide accurate and current information. You are responsible for maintaining the confidentiality of your account details and for all activities that occur under your account.
            <br /><br />
            By registering, you consent to receive communications from Quasar CyberTech, including emails, SMS, or phone calls. You can opt out of these communications by following the unsubscribe instructions in any message or by contacting us directly.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Authorized Use of the Site</h3>
          <p style={{ marginBottom: '16px' }}>
            You may use the Site for lawful purposes only. Quasar CyberTech reserves the right to modify or discontinue the Site at any time. Your use may be suspended or terminated for any violation of these Terms, at Quasar CyberTech's discretion, without notice. By using the Site, you agree to:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
            <li>Comply with applicable laws, regulations, and licenses.</li>
            <li>Avoid impersonating others or misrepresenting your identity.</li>
            <li>Refrain from using the Site for commercial gain without authorization.</li>
            <li>Avoid unauthorized access or interference with the Site's functionality.</li>
            <li>Respect copyright, trademark, and other proprietary rights.</li>
          </ul>
          <p style={{ marginBottom: '40px' }}>
            Quasar CyberTech may take appropriate action, including cooperating with law enforcement, for any violations.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>License and User Content</h3>
          <p style={{ marginBottom: '40px' }}>
            Quasar CyberTech grants you a limited, non-exclusive, non-transferable license to access and use the Site for lawful purposes. You may not download or modify any part of the Site without prior written consent. Unauthorized use will result in termination of your license.
            <br /><br />
            By submitting content to the Site, you grant Quasar CyberTech a perpetual, worldwide license to use, display, and distribute your submission. You warrant that you have the legal right to share this content and that it does not violate third-party rights.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Intellectual Property</h3>
          <p style={{ marginBottom: '40px' }}>
            All content on the Site, including trademarks, logos, text, graphics, and software, is the exclusive property of Quasar CyberTech or its licensors. You may not copy, reproduce, distribute, or otherwise exploit any part of the Site without explicit permission from Quasar CyberTech.
            <br /><br />
            You may view, download, or print content from the Site solely for personal, non-commercial use. Any unauthorized use is prohibited.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Third-Party Links</h3>
          <p style={{ marginBottom: '40px' }}>
            The Site may contain links to external websites. These links are provided for convenience only, and Quasar CyberTech does not endorse or assume responsibility for the content or privacy practices of those websites. Your use of third-party sites is at your own risk.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Privacy Policy</h3>
          <p style={{ marginBottom: '40px' }}>
            Quasar CyberTech respects your privacy. Please refer to our Privacy Policy, which governs the handling of your personal information. By accessing the Site, you agree to the terms of the Privacy Policy.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>DMCA Notice</h3>
          <p style={{ marginBottom: '40px' }}>
            Quasar CyberTech respects intellectual property rights. If you believe that content on the Site infringes your copyright, please contact us at contactus@quasarcybertech.com.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Notices</h3>
          <p style={{ marginBottom: '40px' }}>
            Notices may be sent to you via email, general posting on the Site, or conventional mail. You may contact Quasar CyberTech through the Contact Us form on the Site or via email.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Governing Law</h3>
          <p style={{ marginBottom: '40px' }}>
            These Terms are governed by the laws of India. All disputes will be resolved in the courts of competent jurisdiction in India, to which you submit and waive any objections.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Effective Date and Changes</h3>
          <p style={{ marginBottom: '40px' }}>
            These Terms were last updated on October 24, 2024. Quasar CyberTech reserves the right to modify these Terms, and you should check this page periodically for updates.
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsConditions;
