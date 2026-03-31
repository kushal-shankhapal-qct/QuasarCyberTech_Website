import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CapabilitiesOverview from './src/pages/CapabilitiesOverview';
import { themeConfig } from './src/config/themeConfig';



import Home from './src/pages/Home';
import About from './src/pages/About';
import Platforms from './src/pages/Platforms';
import CapabilityPage from './src/pages/capabilities/[slug]';
import IndustryIndividual from './src/pages/IndustryIndividual';
import IndustriesOverview from './src/pages/IndustriesOverview';
import BlogsOverview from './src/pages/blogs/BlogsOverview';
import BlogIndividual from './src/pages/blogs/BlogIndividual';
import CaseStudies from './src/pages/resources/CaseStudies';
import Advisories from './src/pages/resources/Advisories';
import InfosecDictionary from './src/pages/resources/InfosecDictionary';
import SecurityMindmap from './src/pages/resources/SecurityMindmap';

import Careers from './src/pages/Careers';
import CareersApply from './src/pages/CareersApply';
import Contact from './src/pages/Contact';
import PrivacyPolicy from './src/pages/PrivacyPolicy';
import TermsConditions from './src/pages/TermsConditions';
import NotFound from './src/pages/NotFound';

const App: React.FC = () => {
  React.useEffect(() => {
    // Force scroll to top on load
    window.scrollTo(0, 0);

    const theme = (themeConfig.themes as any)[themeConfig.activeTheme];
    if (theme) {
      Object.keys(theme).forEach(key => {
        document.documentElement.style.setProperty(key, theme[key]);
      });
    }
  }, []);

  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <main className="min-h-screen font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/who-we-are" element={<About />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/capabilities" element={<CapabilitiesOverview />} />
            <Route path="/capabilities/:slug" element={<CapabilityPage />} />

            <Route path="/blogs" element={<BlogsOverview />} />
            <Route path="/blogs/:slug" element={<BlogIndividual />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/advisories" element={<Advisories />} />
            <Route path="/infosec-dictionary" element={<InfosecDictionary />} />
            <Route path="/security-mindmap" element={<SecurityMindmap />} />

            <Route path="/industries" element={<IndustriesOverview />} />
            <Route path="/industries/:slug" element={<IndustryIndividual />} />

            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/apply" element={<CareersApply />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
        </main>
      </Router>
    </Theme>
  );
};

export default App;