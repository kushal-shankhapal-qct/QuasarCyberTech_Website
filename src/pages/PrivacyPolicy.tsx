import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { SECTION_BACKGROUNDS, TYPOGRAPHY, LAYOUT_CONTROLS } from '../config/themeConfig';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div style={{ background: SECTION_BACKGROUNDS.LIGHT, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <PageHero
        title="Privacy"
        highlight="Policy"
        subtitle="Last Updated: October 24, 2024"
        visualVariant="none"
        breadcrumbPaths={['Home']}
        currentName="Privacy Policy"
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
          <p style={{ marginBottom: '24px' }}>
            At Quasar CyberTech, your privacy is a priority. This Privacy Policy outlines how we collect, use, share, and protect any information you provide when using our website, www.quasarcybertech.com, domain and subdomain. We value your trust and strive to ensure you feel confident in our services and security practices as they relate to your personal information.
          </p>
          <p style={{ marginBottom: '40px' }}>
            We may update this policy from time to time, so please review it periodically. This policy is effective from October 24, 2024.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Information We Collect</h3>
          <p style={{ marginBottom: '16px' }}>We may collect the following information:</p>
          <ul style={{ paddingLeft: '24px', marginBottom: '40px' }}>
            <li>Name and Job Title</li>
            <li>Contact Information (e.g., email address, mobile number)</li>
            <li>Demographic Information (e.g., postcode, preferences, interests)</li>
            <li>Information relevant to customer surveys, offers, and households' classification data</li>
          </ul>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>How We Use Your Information</h3>
          <p style={{ marginBottom: '16px' }}>We collect this information to understand your needs, provide better services, and enhance your experience. Your data may be used in the following ways:</p>
          <ul style={{ paddingLeft: '24px', marginBottom: '40px' }}>
            <li>Internal record-keeping and website content updates</li>
            <li>Improving our products and services</li>
            <li>Analyzing website usage to tailor content to customer preferences</li>
            <li>Sending promotional emails about workshops, training, security best practices, and other relevant topics</li>
            <li>Contacting you for market research through email, phone, or mail</li>
            <li>Customizing the website according to your interests</li>
          </ul>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Marketing Use</h3>
          <p style={{ marginBottom: '40px' }}>
            With your permission, we may use your information for direct marketing, including sharing details about our products, services, or those of carefully selected third parties. You can adjust your marketing preferences by logging into your account.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Disclosure to Third Parties</h3>
          <p style={{ marginBottom: '16px' }}>Quasar CyberTech will not disclose personal information except in the following situations:</p>
          <ul style={{ paddingLeft: '24px', marginBottom: '40px' }}>
            <li>When required by law</li>
            <li>To protect and defend the rights or property of Quasar CyberTech</li>
          </ul>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Security</h3>
          <p style={{ marginBottom: '40px' }}>
            We are committed to protecting your information. We use physical, electronic, and managerial safeguards to prevent unauthorized access or disclosure. However, please be vigilant in protecting your password and computer from unauthorized access.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Cookies and Tracking Technologies</h3>
          <p style={{ marginBottom: '16px' }}>
            A cookie is a small file that requests permission to be placed on your computer's hard drive. To provide you with an optimal browsing experience and improve our services, we use cookies and other tracking technologies. These tools help us understand how our visitors engage with our website while ensuring it operates smoothly. The types of cookies we use include:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
            <li><strong>Essential Cookies:</strong> These are crucial for the website's core functionality, allowing you to navigate and use key features.</li>
            <li><strong>Functionality Cookies:</strong> These cookies remember your preferences and settings, providing a more personalized and convenient browsing experience.</li>
            <li><strong>Analytics & Performance Cookies:</strong> These track user behavior in a way that does not identify you personally, allowing us to analyze site traffic and improve performance.</li>
            <li><strong>Social Media Cookies:</strong> These enable seamless content sharing across social platforms such as Facebook and LinkedIn, making it easier to interact with us online.</li>
          </ul>
          <p style={{ marginBottom: '40px' }}>
            You have control over your cookie preferences and can manage them through your browser settings. Please note that disabling certain cookies may impact your browsing experience on our site.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Links to Other Websites</h3>
          <p style={{ marginBottom: '40px' }}>
            Our website may contain links to external sites of interest. We are not responsible for the content or privacy practices of these websites. We encourage you to review their privacy policies before providing personal information.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Managing Your Information</h3>
          <p style={{ marginBottom: '16px' }}>You can restrict the collection or use of your personal information in the following ways:</p>
          <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
            <li>Adjust your marketing preferences by contacting us at contact@quasarcybertech.com</li>
            <li>Opt-out of direct marketing when filling in forms on the website</li>
          </ul>
          <p style={{ marginBottom: '40px' }}>
            If you believe that any information, we hold is incorrect or incomplete, please email us, and we will promptly correct any inaccuracies.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Contact Us</h3>
          <p style={{ marginBottom: '40px' }}>
            For questions or concerns about this Privacy Policy or our privacy practices, please reach out at contactus@quasarcybertech.com.
          </p>

          <h3 style={{ color: '#0B1F3B', fontSize: '1.5rem', fontWeight: 700, fontFamily: TYPOGRAPHY.fontHeading, marginBottom: '16px' }}>Policy Updates</h3>
          <p style={{ marginBottom: '40px' }}>
            We may revise this Privacy Policy periodically. Changes will be reflected in this document, with your privacy and satisfaction remaining our top priority. We encourage you to review this policy whenever you visit our website.
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
