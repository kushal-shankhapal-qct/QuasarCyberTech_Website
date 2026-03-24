// src/constants/assets.ts
import { cld } from '@/config/cloudinary';

/**
 * Global toggle to switch between local assets and Cloudinary CDN.
 */
const USE_CLOUDINARY = false;

/**
 * Converts a local file path to a Cloudinary-friendly delivery path.
 * - Replaces spaces with underscores.
 * - Replaces '&' with 'and'.
 * 
 * @param path The relative path from src/assets/
 */
const toCloudinaryPath = (path: string): string => {
  return path
    .replace(/\s+/g, '_')
    .replace(/&/g, 'and');
};

/**
 * Higher-order utility to resolve an asset path based on the CDN toggle.
 * 
 * @param localImport The Vite-imported local module.
 * @param originalPath The raw relative path within src/assets/
 */
const getAsset = (localImport: string, originalPath: string): string => {
  if (USE_CLOUDINARY) {
    return cld(toCloudinaryPath(originalPath));
  }
  return localImport;
};


// --- LOGOS ---
// QuasarCyberTech
import qctIcon from '@/assets/Logos/QuasarCyberTech/icononly_transparent_nobuffer.png';
import qctFull from '@/assets/Logos/QuasarCyberTech/fulllogo_transparent_nobuffer.png';
import qctTextLight from '@/assets/Logos/QuasarCyberTech/Qtextonly_Light.png';
import qctTextDark from '@/assets/Logos/QuasarCyberTech/Qtextonly_Dark.png';

// Platforms
import qStellarLogo from '@/assets/Logos/Platforms/QStelllar_fulllogo_transparent_No_Buffer.png';
import qPulseLogo from '@/assets/Logos/Platforms/QPulse_Logo_No_Buffer.png';
import qLeapLogo from '@/assets/Logos/Platforms/QLeap_Logo.png';
import qrgtLogo from '@/assets/Logos/Platforms/QRGT.png';

// --- INDUSTRIES ---
import indBanking from '@/assets/Industries_Images/Banking_and_Financial Services.jpg';
import indEcommerce from '@/assets/Industries_Images/E-commerce & Digital Platforms.jpg';
import indEnterprise from '@/assets/Industries_Images/Enterprise_and_Manufacturing.jpg';
import indFintech from '@/assets/Industries_Images/FinTech & Digital Payments.jpg';
import indHealthcare from '@/assets/Industries_Images/Healthcare & HealthTech.png';
import indSaas from '@/assets/Industries_Images/saas_optimized.jpg';

// --- CAPABILITIES ---
import capAdvisory from '@/assets/Capabilities_Images/Cyber Advisory & Risk Governance.jpg';
import capCompliance from '@/assets/Capabilities_Images/Compliance & Regulatory Assurance.jpg';
import capOffensive from '@/assets/Capabilities_Images/Offensive Security Engineering.jpg';
import capCloud from '@/assets/Capabilities_Images/Cloud & Infrastructure Security.jpg';
import capDefense from '@/assets/Capabilities_Images/Managed Defense Operations_2.jpeg';
import capIntelligence from '@/assets/Capabilities_Images/Cyber Intelligence & Security Research.webp';

// Advisory Sub-capabilities
import capSubStrategy from '@/assets/Capabilities_Images/Cyber Advisory & Risk Governance/strategy_consulting.png';
import capSubArch from '@/assets/Capabilities_Images/Cyber Advisory & Risk Governance/architecture_review.png';
import capSubVciso from '@/assets/Capabilities_Images/Cyber Advisory & Risk Governance/vciso_services.png';
import capSubZeroTrust from '@/assets/Capabilities_Images/Cyber Advisory & Risk Governance/zero_trust.png';
import capSubTabletop from '@/assets/Capabilities_Images/Cyber Advisory & Risk Governance/tabletop_war_game.png';

// --- BACKDROPS ---
import bgQuasar from '@/assets/Backdrops/Cyber_Quasar_Backdrop.png';
import bgTechNet from '@/assets/Backdrops/Tech_Net_Backdrop.png';

// --- FOUNDER ---
import founderKishor from '@/assets/Founder_Image/Kishor_Sir.png';

// --- PLATFORM SCREENSHOTS ---
import screenshotQStellar from '@/assets/Platforms_Screenshots/QStellar/Screenshot 2026-03-03 124540.png';
import screenshotQPulse from '@/assets/Platforms_Screenshots/QPulse/QPulse_New.png';

// --- PARTNERS ---
import partnerBurp from '@/assets/Logos/Partners_Logo_Cropped_No_Buffer/Burp_Suite_Cropped.png';
import partnerDLink from '@/assets/Logos/Partners_Logo_Cropped_No_Buffer/D_link_Cropped.png';
import partnerNinja from '@/assets/Logos/Partners_Logo_Cropped_No_Buffer/NinjaOne_Cropped.png';
import partnerRAH from '@/assets/Logos/Partners_Logo_Cropped_No_Buffer/RAH_Infotech_Cropped.png';
import partnerRapid7 from '@/assets/Logos/Partners_Logo_Cropped_No_Buffer/Rapid_7_Cropped.png';
import partnerSatcom from '@/assets/Logos/Partners_Logo_Cropped_No_Buffer/Satcom_Infotech_Cropped.png';
import partnerSophos from '@/assets/Logos/Partners_Logo_Cropped_No_Buffer/Sophos_Cropped.png';
import partnerTenable from '@/assets/Logos/Partners_Logo_Cropped_No_Buffer/Tenable_Cropped.png';
import partnerVicarius from '@/assets/Logos/Partners_Logo_Cropped_No_Buffer/Vicarius_Cropped.png';
import partnerCaniphish from '@/assets/Logos/Partners_Logo_Cropped_No_Buffer/caniphish_Cropped.png';

// --- BLOGS ---
import blogThreats from '@/assets/Blogs_Images/Top Cybersecurity Threats Businesses Should Watch Out for in 2025.png';
import blogAI from '@/assets/Blogs_Images/AI in Cybersecurity_A Powerful Ally or a Looming Threat.png';
import blogMoneygram from '@/assets/Blogs_Images/Moneygram Suffers Data Breach, Exposing Customer Information.png';

// --- SERVICES ---
import svcTechConsulting from '@/assets/Capabilities_Images/Tech_Consulting.png';
import svcManagedIT from '@/assets/Capabilities_Images/Managed_IT_Services.jpg';

// --- ORBITAL ICONS ---
import orbital1 from '@/assets/Capabilities_Images/SVCs_Set_2/SVC_1.png';
import orbital2 from '@/assets/Capabilities_Images/SVCs_Set_2/SVC_2.png';
import orbital3 from '@/assets/Capabilities_Images/SVCs_Set_2/SVC_3.png';
import orbital4 from '@/assets/Capabilities_Images/SVCs_Set_2/SVC_4.png';
import orbital5 from '@/assets/Capabilities_Images/SVCs_Set_2/SVC_5.png';
import orbital6 from '@/assets/Capabilities_Images/SVCs_Set_2/SVC_6.png';

export const ASSETS = {
  logos: {
    qct: {
      icon: getAsset(qctIcon, 'Logos/QuasarCyberTech/icononly_transparent_nobuffer.png'),
      full: getAsset(qctFull, 'Logos/QuasarCyberTech/fulllogo_transparent_nobuffer.png'),
      textLight: getAsset(qctTextLight, 'Logos/QuasarCyberTech/Qtextonly_Light.png'),
      textDark: getAsset(qctTextDark, 'Logos/QuasarCyberTech/Qtextonly_Dark.png'),
    },
    platforms: {
      qstellar: getAsset(qStellarLogo, 'Logos/Platforms/QStelllar_fulllogo_transparent_No_Buffer.png'),
      qpulse: getAsset(qPulseLogo, 'Logos/Platforms/QPulse_Logo_No_Buffer.png'),
      qleap: getAsset(qLeapLogo, 'Logos/Platforms/QLeap_Logo.png'),
      qrgt: getAsset(qrgtLogo, 'Logos/Platforms/QRGT.png'),
    },
  },
  industries: {
    banking: getAsset(indBanking, 'Industries_Images/Banking_and_Financial Services.jpg'),
    ecommerce: getAsset(indEcommerce, 'Industries_Images/E-commerce & Digital Platforms.jpg'),
    enterprise: getAsset(indEnterprise, 'Industries_Images/Enterprise_and_Manufacturing.jpg'),
    fintech: getAsset(indFintech, 'Industries_Images/FinTech & Digital Payments.jpg'),
    healthcare: getAsset(indHealthcare, 'Industries_Images/Healthcare & HealthTech.png'),
    saas: getAsset(indSaas, 'Industries_Images/saas_optimized.jpg'),
  },
  capabilities: {
    advisory: getAsset(capAdvisory, 'Capabilities_Images/Cyber Advisory & Risk Governance.jpg'),
    compliance: getAsset(capCompliance, 'Capabilities_Images/Compliance & Regulatory Assurance.jpg'),
    offensive: getAsset(capOffensive, 'Capabilities_Images/Offensive Security Engineering.jpg'),
    cloud: getAsset(capCloud, 'Capabilities_Images/Cloud & Infrastructure Security.jpg'),
    defense: getAsset(capDefense, 'Capabilities_Images/Managed Defense Operations_2.jpeg'),
    intelligence: getAsset(capIntelligence, 'Capabilities_Images/Cyber Intelligence & Security Research.webp'),
    subCapabilities: {
      advisory: {
        strategy: getAsset(capSubStrategy, 'Capabilities_Images/Cyber Advisory & Risk Governance/strategy_consulting.png'),
        architecture: getAsset(capSubArch, 'Capabilities_Images/Cyber Advisory & Risk Governance/architecture_review.png'),
        vciso: getAsset(capSubVciso, 'Capabilities_Images/Cyber Advisory & Risk Governance/vciso_services.png'),
        zeroTrust: getAsset(capSubZeroTrust, 'Capabilities_Images/Cyber Advisory & Risk Governance/zero_trust.png'),
        tabletop: getAsset(capSubTabletop, 'Capabilities_Images/Cyber Advisory & Risk Governance/tabletop_war_game.png'),
      }
    }
  },
  backdrops: {
    quasar: getAsset(bgQuasar, 'Backdrops/Cyber_Quasar_Backdrop.png'),
    technet: getAsset(bgTechNet, 'Backdrops/Tech_Net_Backdrop.png'),
  },
  founder: {
    kishor: getAsset(founderKishor, 'Founder_Image/Kishor_Sir.png'),
  },
  screenshots: {
    qstellar: getAsset(screenshotQStellar, 'Platforms_Screenshots/QStellar/Screenshot 2026-03-03 124540.png'),
    qpulse: getAsset(screenshotQPulse, 'Platforms_Screenshots/QPulse/QPulse_New.png'),
  },
  platforms: {
    screenshots: {
      qstellar: getAsset(screenshotQStellar, 'Platforms_Screenshots/QStellar/Screenshot 2026-03-03 124540.png'),
      qpulse: getAsset(screenshotQPulse, 'Platforms_Screenshots/QPulse/QPulse_New.png'),
    }
  },
  partners: {
    burp: getAsset(partnerBurp, 'Logos/Partners_Logo_Cropped_No_Buffer/Burp_Suite_Cropped.png'),
    dlink: getAsset(partnerDLink, 'Logos/Partners_Logo_Cropped_No_Buffer/D_link_Cropped.png'),
    ninja: getAsset(partnerNinja, 'Logos/Partners_Logo_Cropped_No_Buffer/NinjaOne_Cropped.png'),
    rah: getAsset(partnerRAH, 'Logos/Partners_Logo_Cropped_No_Buffer/RAH_Infotech_Cropped.png'),
    rapid7: getAsset(partnerRapid7, 'Logos/Partners_Logo_Cropped_No_Buffer/Rapid_7_Cropped.png'),
    satcom: getAsset(partnerSatcom, 'Logos/Partners_Logo_Cropped_No_Buffer/Satcom_Infotech_Cropped.png'),
    sophos: getAsset(partnerSophos, 'Logos/Partners_Logo_Cropped_No_Buffer/Sophos_Cropped.png'),
    tenable: getAsset(partnerTenable, 'Logos/Partners_Logo_Cropped_No_Buffer/Tenable_Cropped.png'),
    vicarius: getAsset(partnerVicarius, 'Logos/Partners_Logo_Cropped_No_Buffer/Vicarius_Cropped.png'),
    caniphish: getAsset(partnerCaniphish, 'Logos/Partners_Logo_Cropped_No_Buffer/caniphish_Cropped.png'),
  },
  blogs: {
    threats: getAsset(blogThreats, 'Blogs_Images/Top Cybersecurity Threats Businesses Should Watch Out for in 2025.png'),
    ai: getAsset(blogAI, 'Blogs_Images/AI in Cybersecurity_A Powerful Ally or a Looming Threat.png'),
    moneygram: getAsset(blogMoneygram, 'Blogs_Images/Moneygram Suffers Data Breach, Exposing Customer Information.png'),
  },
  services: {
    techConsulting: getAsset(svcTechConsulting, 'Capabilities_Images/Tech_Consulting.png'),
    managedIT: getAsset(svcManagedIT, 'Capabilities_Images/Managed_IT_Services.jpg'),
  },
  orbital: {
    icon1: getAsset(orbital1, 'Capabilities_Images/SVCs_Set_2/SVC_1.png'),
    icon2: getAsset(orbital2, 'Capabilities_Images/SVCs_Set_2/SVC_2.png'),
    icon3: getAsset(orbital3, 'Capabilities_Images/SVCs_Set_2/SVC_3.png'),
    icon4: getAsset(orbital4, 'Capabilities_Images/SVCs_Set_2/SVC_4.png'),
    icon5: getAsset(orbital5, 'Capabilities_Images/SVCs_Set_2/SVC_5.png'),
    icon6: getAsset(orbital6, 'Capabilities_Images/SVCs_Set_2/SVC_6.png'),
  }
};
