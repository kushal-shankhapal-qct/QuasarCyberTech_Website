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
import qctOver from '@/assets/Logos/QuasarCyberTech/QuasarCyberTech_Logo_Over.png';
import qctTextLight from '@/assets/Logos/QuasarCyberTech/Qtextonly_Light.png';
import qctTextDark from '@/assets/Logos/QuasarCyberTech/Qtextonly_Dark.png';

// Platforms
import qStellarLogo from '@/assets/Logos/Platforms/QStelllar_Light_fulllogo_transparent_No_Buffer.png';
import qstellarFullLogo from "@/assets/Logos/Platforms/QStelllar_fulllogo_transparent_No_Buffer.png";
import qPulseLogo from '@/assets/Logos/Platforms/QPulse_Logo_New.png';
import qPulseLogoLight from '@/assets/Logos/Platforms/QPulse_Logo_Light_Text.png';
import qLeapLogo from '@/assets/Logos/Platforms/QLeap_Logo.png';
import qrgtLogo from '@/assets/Logos/Platforms/QRGT.png';
import qrgtLogoLight from '@/assets/Logos/Platforms/QRGT_Light.png';
import qrgtLogoDark from '@/assets/Logos/Platforms/QRGT_Dark.png';

// --- INDUSTRIES ---
import indBanking from '@/assets/Industries_Images/Banking_and_Financial_Services.jpg';
import indEcommerce from '@/assets/Industries_Images/E_commerce_and_Digital_Platforms.jpg';
import indEnterprise from '@/assets/Industries_Images/Enterprise_and_Manufacturing.jpg';
import indFintech from '@/assets/Industries_Images/FinTech_and_Digital_Payments.jpg';
import indHealthcare from '@/assets/Industries_Images/Healthcare_and_HealthTech.png';
import indSaas from '@/assets/Industries_Images/saas_optimized.jpg';
import indOverviewHero from '@/assets/Industries_Images/Industries_Overview_Hero.png';

// --- CAPABILITIES ---
import capAdvisory from '@/assets/Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Cyber_Advisory_and_Risk_Governance.jpg';
import capCompliance from '@/assets/Capabilities_Images/Regulatory_Compliance_and_Assurance/Compliance_and_Regulatory_Assurance.jpg';
import capOffensive from '@/assets/Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Offensive_Security_Engineering.jpg';
import capCloud from '@/assets/Capabilities_Images/Cloud_Infrastructure_and_Platform_Security/Cloud_and_Infrastructure_Security.jpg';
import capDefense from '@/assets/Capabilities_Images/Managed_Detection_Response_and_SOC_Operations/Managed_Defense_Operations_2.jpeg';
import capIntelligence from '@/assets/Capabilities_Images/Threat_Intelligence_Exposure_Monitoring_and_Research/Cyber_Intelligence_and_Security_Research.webp';
import capWorldwide from '@/assets/Capabilities_Images/worldwide_connection/80909.jpg';

// Advisory Sub-capabilities (Square Infographics)
import capSubExecutiveSquare from '@/assets/Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Executive_Cyber_Advisory/Executive Cyber Advisory Framework.png';
import capSubProgramSquare from '@/assets/Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Security_Program_Development/Security Programme Maturity Framework.png';
import capSubZeroTrustSquare from '@/assets/Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Security_and_Zero_Trust_Architecture_Review/Zero Trust Architecture Review.png';
import capSubVcisoSquare from '@/assets/Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Virtual_CISO_vCISO_Services/The vCISO Strategic Advantage.png';

// Offensive Sub-capabilities (Infographics)
import capImgOffensiveWeb from '@/assets/Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Web_Application_Security_Testing/Deep Web Application Security Validation.png';
import capImgOffensiveMobile from '@/assets/Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Mobile_Application_Security_Testing/Mobile Security Mastery Infographic.png';
import capImgOffensiveApi from '@/assets/Capabilities_Images/Offensive_Security_and_Resilience_Engineering/API_Security_Testing/Critical API Security Testing.png';
import capImgOffensiveRedTeam from '@/assets/Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Red_Team/Red Team Simulation and Resilience.png';
import capImgOffensiveSimulation from '@/assets/Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Adversary_Simulation/Adversary Simulation Defensive Readiness Overview.png';

// --- BACKDROPS ---
import bgQuasar from '@/assets/Backdrops/Cyber_Quasar_Backdrop.png';
import bgTechNet from '@/assets/Backdrops/Tech_Net_Backdrop.png';
import bgPlatformsHero from '@/assets/Backdrops/Platforms_Hero.png';
import bgRedLights from '@/assets/Backdrops/abstract-red-lights-background/608.jpg';

// --- PLATFORM SCREENSHOTS ---
import screenshotQStellar from '@/assets/Platforms_Screenshots/QStellar/QStellar_Hero_Screenshot.png';
import screenshotQPulse from '@/assets/Platforms_Screenshots/QPulse/QPulse_Hero_Screenshot.png';
import screenshotQLeap from '@/assets/Platforms_Screenshots/QLeap/QLeap_Website_Screenshot.png';
import screenshotQRGT from '@/assets/Platforms_Screenshots/QRGT/QRGT_Screenshot.png';

// --- PARTNERS ---
import partnerBurp from '@/assets/Logos/Partners_Logo_Cropped/Burp_Suite_Cropped.png';
import partnerDLink from '@/assets/Logos/Partners_Logo_Cropped/D_link_Cropped.png';
import partnerInflow from '@/assets/Logos/Partners_Logo_Cropped/Inflow-Logo_Dark-color_web.png';
import partnerManageEngine from '@/assets/Logos/Partners_Logo_Cropped/manageengine-logo-black.png';
import partnerNinja from '@/assets/Logos/Partners_Logo_Cropped/NinjaOne_Cropped.png';
import partnerRAH from '@/assets/Logos/Partners_Logo_Cropped/RAH_Infotech_Cropped.png';
import partnerRapid7 from '@/assets/Logos/Partners_Logo_Cropped/Rapid_7_Cropped.png';
import partnerSatcom from '@/assets/Logos/Partners_Logo_Cropped/Satcom_Infotech_Cropped.png';
import partnerSophos from '@/assets/Logos/Partners_Logo_Cropped/Sophos_Cropped.png';
import partnerTenable from '@/assets/Logos/Partners_Logo_Cropped/Tenable_Cropped.png';
import partnerVicarius from '@/assets/Logos/Partners_Logo_Cropped/Vicarius_Cropped.png';
import partnerCaniphish from '@/assets/Logos/Partners_Logo_Cropped/caniphish_Cropped.png';

// --- CERTIFICATIONS ---
import certinLogo from '@/assets/Logos/Certifications/CERT-In_Logo.png';

// --- BLOGS ---
import blogThreats from '@/assets/Blogs_Images/Top_Cybersecurity_Threats_Businesses_Should_Watch_Out_for_in_2025.png';
import blogAI from '@/assets/Blogs_Images/AI_in_Cybersecurity_A_Powerful_Ally_or_a_Looming_Threat.png';
import blogMoneygram from '@/assets/Blogs_Images/Moneygram_Suffers_Data_Breach_Exposing_Customer_Information.png';

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
      over: getAsset(qctOver, 'Logos/QuasarCyberTech/QuasarCyberTech_Logo_Over.png'),
      textLight: getAsset(qctTextLight, 'Logos/QuasarCyberTech/Qtextonly_Light.png'),
      textDark: getAsset(qctTextDark, 'Logos/QuasarCyberTech/Qtextonly_Dark.png'),
    },
    platforms: {
      qstellar: getAsset(qstellarFullLogo, 'Logos/Platforms/QStelllar_fulllogo_transparent_No_Buffer.png'), // Legacy
      qstellarDark: getAsset(qstellarFullLogo, 'Logos/Platforms/QStelllar_fulllogo_transparent_No_Buffer.png'), // New transparent full logo
      qstellarLight: getAsset(qStellarLogo, 'Logos/Platforms/QStelllar_Light_fulllogo_transparent_No_Buffer.png'), // Original
      qpulse: getAsset(qPulseLogo, 'Logos/Platforms/QPulse_Logo_New.png'),
      qpulseLight: getAsset(qPulseLogoLight, 'Logos/Platforms/QPulse_Logo_Light_Text.png'),
      qleap: getAsset(qLeapLogo, 'Logos/Platforms/QLeap_Logo.png'),
      qrgt: getAsset(qrgtLogo, 'Logos/Platforms/QRGT.png'),
      qrgtLight: getAsset(qrgtLogoLight, 'Logos/Platforms/QRGT_Light.png'),
      qrgtDark: getAsset(qrgtLogoDark, 'Logos/Platforms/QRGT_Dark.png'),
    },
  },
  industries: {
    banking: getAsset(indBanking, 'Industries_Images/Banking_and_Financial_Services.jpg'),
    ecommerce: getAsset(indEcommerce, 'Industries_Images/E_commerce_and_Digital_Platforms.jpg'),
    enterprise: getAsset(indEnterprise, 'Industries_Images/Enterprise_and_Manufacturing.jpg'),
    fintech: getAsset(indFintech, 'Industries_Images/FinTech_and_Digital_Payments.jpg'),
    healthcare: getAsset(indHealthcare, 'Industries_Images/Healthcare_and_HealthTech.png'),
    saas: getAsset(indSaas, 'Industries_Images/saas_optimized.jpg'),
    overviewHero: getAsset(indOverviewHero, 'Industries_Images/Industries_Overview_Hero.png'),
  },
  capabilities: {
    advisory: getAsset(capAdvisory, 'Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Cyber_Advisory_and_Risk_Governance.jpg'),
    compliance: getAsset(capCompliance, 'Capabilities_Images/Regulatory_Compliance_and_Assurance/Compliance_and_Regulatory_Assurance.jpg'),
    offensive: getAsset(capOffensive, 'Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Offensive_Security_Engineering.jpg'),
    cloud: getAsset(capCloud, 'Capabilities_Images/Cloud_Infrastructure_and_Platform_Security/Cloud_and_Infrastructure_Security.jpg'),
    defense: getAsset(capDefense, 'Capabilities_Images/Managed_Detection_Response_and_SOC_Operations/Managed_Defense_Operations_2.jpeg'),
    intelligence: getAsset(capIntelligence, 'Capabilities_Images/Threat_Intelligence_Exposure_Monitoring_and_Research/Cyber_Intelligence_and_Security_Research.webp'),
    worldwideConnection: getAsset(capWorldwide, 'Capabilities_Images/worldwide_connection/80909.jpg'),
    subCapabilities: {
      advisory: {
        strategy: getAsset(capSubExecutiveSquare, 'Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Executive_Cyber_Advisory/Executive Cyber Advisory Framework.png'),
        architecture: getAsset(capSubZeroTrustSquare, 'Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Security_and_Zero_Trust_Architecture_Review/Zero Trust Architecture Review.png'),
        vciso: getAsset(capSubVcisoSquare, 'Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Virtual_CISO_vCISO_Services/The vCISO Strategic Advantage.png'),
        zeroTrust: getAsset(capSubZeroTrustSquare, 'Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Security_and_Zero_Trust_Architecture_Review/Zero Trust Architecture Review.png'),
        tabletop: getAsset(capSubProgramSquare, 'Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Security_Program_Development/Security Programme Maturity Framework.png'),
      },
      offensive: {
        web: getAsset(capImgOffensiveWeb, 'Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Web_Application_Security_Testing/Deep Web Application Security Validation.png'),
        mobile: getAsset(capImgOffensiveMobile, 'Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Mobile_Application_Security_Testing/Mobile Security Mastery Infographic.png'),
        api: getAsset(capImgOffensiveApi, 'Capabilities_Images/Offensive_Security_and_Resilience_Engineering/API_Security_Testing/Critical API Security Testing.png'),
        redTeam: getAsset(capImgOffensiveRedTeam, 'Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Red_Team/Red Team Simulation and Resilience.png'),
        simulation: getAsset(capImgOffensiveSimulation, 'Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Adversary_Simulation/Adversary Simulation Defensive Readiness Overview.png'),
      }
    }
  },
  backdrops: {
    quasar: getAsset(bgQuasar, 'Backdrops/Cyber_Quasar_Backdrop.png'),
    technet: getAsset(bgTechNet, 'Backdrops/Tech_Net_Backdrop.png'),
    platformsHero: getAsset(bgPlatformsHero, 'Backdrops/Platforms_Hero.png'),
    redLights: getAsset(bgRedLights, 'Backdrops/abstract-red-lights-background/608.jpg'),
  },
  screenshots: {
    qstellar: getAsset(screenshotQStellar, 'Platforms_Screenshots/QStellar/QStellar_Hero_Screenshot.png'),
    qpulse: getAsset(screenshotQPulse, 'Platforms_Screenshots/QPulse/QPulse_Hero_Screenshot.png'),
    qleap: getAsset(screenshotQLeap, 'Platforms_Screenshots/QLeap/QLeap_Website_Screenshot.png'),
    qrgt: getAsset(screenshotQRGT, 'Platforms_Screenshots/QRGT/QRGT_Screenshot.png'),
  },
  platforms: {
    screenshots: {
      qstellar: getAsset(screenshotQStellar, 'Platforms_Screenshots/QStellar/QStellar_Hero_Screenshot.png'),
      qpulse: getAsset(screenshotQPulse, 'Platforms_Screenshots/QPulse/QPulse_Hero_Screenshot.png'),
      qleap: getAsset(screenshotQLeap, 'Platforms_Screenshots/QLeap/QLeap_Website_Screenshot.png'),
      qrgt: getAsset(screenshotQRGT, 'Platforms_Screenshots/QRGT/QRGT_Screenshot.png'),
    }
  },
  partners: {
    burp: getAsset(partnerBurp, 'Logos/Partners_Logo_Cropped/Burp_Suite_Cropped.png'),
    dlink: getAsset(partnerDLink, 'Logos/Partners_Logo_Cropped/D_link_Cropped.png'),
    inflow: getAsset(partnerInflow, 'Logos/Partners_Logo_Cropped/Inflow-Logo_Dark-color_web.png'),
    manageengine: getAsset(partnerManageEngine, 'Logos/Partners_Logo_Cropped/manageengine-logo-black.png'),
    ninja: getAsset(partnerNinja, 'Logos/Partners_Logo_Cropped/NinjaOne_Cropped.png'),
    rah: getAsset(partnerRAH, 'Logos/Partners_Logo_Cropped/RAH_Infotech_Cropped.png'),
    rapid7: getAsset(partnerRapid7, 'Logos/Partners_Logo_Cropped/Rapid_7_Cropped.png'),
    satcom: getAsset(partnerSatcom, 'Logos/Partners_Logo_Cropped/Satcom_Infotech_Cropped.png'),
    sophos: getAsset(partnerSophos, 'Logos/Partners_Logo_Cropped/Sophos_Cropped.png'),
    tenable: getAsset(partnerTenable, 'Logos/Partners_Logo_Cropped/Tenable_Cropped.png'),
    vicarius: getAsset(partnerVicarius, 'Logos/Partners_Logo_Cropped/Vicarius_Cropped.png'),
    caniphish: getAsset(partnerCaniphish, 'Logos/Partners_Logo_Cropped/caniphish_Cropped.png'),
  },
  blogs: {
    threats: getAsset(blogThreats, 'Blogs_Images/Top_Cybersecurity_Threats_Businesses_Should_Watch_Out_for_in_2025.png'),
    ai: getAsset(blogAI, 'Blogs_Images/AI_in_Cybersecurity_A_Powerful_Ally_or_a_Looming_Threat.png'),
    moneygram: getAsset(blogMoneygram, 'Blogs_Images/Moneygram_Suffers_Data_Breach_Exposing_Customer_Information.png'),
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
  },
  certifications: {
    certin: getAsset(certinLogo, 'Logos/Certifications/CERT-In_Logo.png'),
  }
};



