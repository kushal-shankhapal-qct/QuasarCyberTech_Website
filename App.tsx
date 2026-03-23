import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { themeConfig } from './src/config/themeConfig';
import { DevToggleProvider } from './src/devToggles';
import DevTogglePanel from './src/components/DevTogglePanel';

import Home from './src/pages/Home';
import About from './src/pages/About';
import WhoWeAre from './src/pages/WhoWeAre';
import Products from './src/pages/Products';
import Platforms from './src/pages/Platforms';
import Services from './src/pages/Services';
import Industries from './src/pages/Industries';
import CapabilityPage from './src/pages/CapabilityPage';
import IndustryPage from './src/pages/IndustryPage';
import Resources from './src/pages/Resources';
import Blogs from './src/pages/resources/Blogs';
import CaseStudies from './src/pages/resources/CaseStudies';
import Advisories from './src/pages/resources/Advisories';
import InfosecDictionary from './src/pages/resources/InfosecDictionary';
import SecurityMindmap from './src/pages/resources/SecurityMindmap';

import Careers from './src/pages/Careers';
import Contact from './src/pages/Contact';
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
      <DevToggleProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <main className="min-h-screen font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/products" element={<Products />} />
            <Route path="/platforms" element={<Platforms />} />

            <Route path="/capabilities" element={<Services />} />
            <Route path="/capabilities/:slug" element={<CapabilityPage />} />
            
            <Route path="/insights" element={<Resources />} />
            <Route path="/insights/blogs" element={<Blogs />} />
            <Route path="/insights/case-studies" element={<CaseStudies />} />
            <Route path="/insights/advisories" element={<Advisories />} />
            <Route path="/insights/infosec-dictionary" element={<InfosecDictionary />} />
            <Route path="/insights/security-mindmap" element={<SecurityMindmap />} />

            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryPage />} />

            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <DevTogglePanel />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
        </main>
      </Router>
      </DevToggleProvider>
    </Theme>
  );
};

export default App;