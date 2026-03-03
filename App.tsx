import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { themeConfig } from './src/config/themeConfig';

import Home from './src/pages/Home';
import About from './src/pages/About';
import WhoWeAre from './src/pages/WhoWeAre';
import Products from './src/pages/Products';
import Platforms from './src/pages/Platforms';

import Services from './src/pages/Services';
import ApplicationSecurity from './src/pages/services/ApplicationSecurity';
import MobileSecurity from './src/pages/services/MobileSecurity';
import NetworkSecurity from './src/pages/services/NetworkSecurity';
import CloudSecurity from './src/pages/services/CloudSecurity';
import RedTeamAdversarySimulation from './src/pages/services/RedTeamAdversarySimulation';
import ManagedSecurityOperations from './src/pages/services/ManagedSecurityOperations';
import IncidentResponse from './src/pages/services/IncidentResponse';
import RiskCompliance from './src/pages/services/RiskCompliance';
import ArchitectureEngineering from './src/pages/services/ArchitectureEngineering';
import DigitalRiskMonitoring from './src/pages/services/DigitalRiskMonitoring';
import Resources from './src/pages/Resources';
import Blogs from './src/pages/resources/Blogs';
import CaseStudies from './src/pages/resources/CaseStudies';
import Advisories from './src/pages/resources/Advisories';
import InfosecDictionary from './src/pages/resources/InfosecDictionary';
import SecurityMindmap from './src/pages/resources/SecurityMindmap';

import Industries from './src/pages/Industries';
import BFSI from './src/pages/industries/BFSI';
import Healthcare from './src/pages/industries/Healthcare';
import Manufacturing from './src/pages/industries/Manufacturing';
import SaaS from './src/pages/industries/SaaS';
import Government from './src/pages/industries/Government';
import Retail from './src/pages/industries/Retail';

import Careers from './src/pages/Careers';
import Contact from './src/pages/Contact';
import NotFound from './src/pages/NotFound';

const App: React.FC = () => {
  React.useEffect(() => {
    const theme = (themeConfig.themes as any)[themeConfig.activeTheme];
    if (theme) {
      Object.keys(theme).forEach(key => {
        document.documentElement.style.setProperty(key, theme[key]);
      });
    }
  }, []);

  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <Router>
        <main className="min-h-screen font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/products" element={<Products />} />
            <Route path="/platforms" element={<Platforms />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services/application-security" element={<ApplicationSecurity />} />
            <Route path="/services/mobile-security" element={<MobileSecurity />} />
            <Route path="/services/network-security" element={<NetworkSecurity />} />
            <Route path="/services/cloud-security" element={<CloudSecurity />} />
            <Route path="/services/red-team-adversary-simulation" element={<RedTeamAdversarySimulation />} />
            <Route path="/services/managed-security-operations" element={<ManagedSecurityOperations />} />
            <Route path="/services/incident-response" element={<IncidentResponse />} />
            <Route path="/services/risk-compliance" element={<RiskCompliance />} />
            <Route path="/services/architecture-engineering" element={<ArchitectureEngineering />} />
            <Route path="/services/digital-risk-monitoring" element={<DigitalRiskMonitoring />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/blogs" element={<Blogs />} />
            <Route path="/resources/case-studies" element={<CaseStudies />} />
            <Route path="/resources/advisories" element={<Advisories />} />
            <Route path="/resources/infosec-dictionary" element={<InfosecDictionary />} />
            <Route path="/resources/security-mindmap" element={<SecurityMindmap />} />

            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/bfsi" element={<BFSI />} />
            <Route path="/industries/healthcare" element={<Healthcare />} />
            <Route path="/industries/manufacturing" element={<Manufacturing />} />
            <Route path="/industries/saas" element={<SaaS />} />
            <Route path="/industries/government" element={<Government />} />
            <Route path="/industries/retail" element={<Retail />} />

            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
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