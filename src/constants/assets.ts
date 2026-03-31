// src/constants/assets.ts

/**
 * ============================================================
 * 🛰️ CLOUDINARY-FIRST ASSET REGISTRY
 * ============================================================
 * This project uses a "CDN-First" architecture. 
 * DO NOT use local imports (e.g. import foo from '@/assets/...') for images/videos.
 * 
 * 📝 HOW TO ADD NEW ASSETS:
 * 1. UPLOAD: Add your file to the Cloudinary Dashboard (or use 'node uploadAssets.cjs').
 * 2. STRUCTURE: Maintain folder-based naming (e.g. 'Backdrops/Our_New_BG').
 * 3. REFERENCE: Add the path string to the ASSETS object below: 
 *    `newImage: getAsset('Folder/Image_Name.ext')`
 * 
 * 💡 BENEFITS:
 * - Extremely small Git repository (~10MB instead of 300MB+).
 * - Faster builds and deployments on Vercel.
 * - Automatic optimization (WebP/AVIF delivery via Cloudinary).
 * ============================================================
 */

import { cld } from '@/config/cloudinary';

/**
 * Global toggle to switch between local assets and Cloudinary CDN.
 * Since all local assets are now disconnected, this must remain TRUE for production builds.
 */
const USE_CLOUDINARY = true;

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
    .replace(/&/g, 'and')
    .replace(/\.[^/.]+$/, ""); // Remove extension for Cloudinary IDs
};

/**
 * Higher-order utility to resolve an asset path via Cloudinary.
 * Since local assets are now disconnected, this always returns the CDN URL.
 * 
 * @param path The raw relative path within src/assets/
 */
const getAsset = (path: string): string => {
  return cld(toCloudinaryPath(path));
};



// --- ASSET DEFINITIONS ---
// All local imports removed. References now use direct paths.


export const ASSETS = {
  logos: {
    qct: {
      icon: getAsset('Logos/QuasarCyberTech/icononly_transparent_nobuffer.png'),
      full: getAsset('Logos/QuasarCyberTech/fulllogo_transparent_nobuffer.png'),
      over: getAsset('Logos/QuasarCyberTech/QuasarCyberTech_Logo_Over.png'),
      textLight: getAsset('Logos/QuasarCyberTech/Qtextonly_Light.png'),
      textDark: getAsset('Logos/QuasarCyberTech/Qtextonly_Dark.png'),
    },
    platforms: {
      qstellar: getAsset('Logos/Platforms/QStelllar_fulllogo_transparent_No_Buffer.png'), // Legacy
      qstellarDark: getAsset('Logos/Platforms/QStelllar_fulllogo_transparent_No_Buffer.png'), // New transparent full logo
      qstellarLight: getAsset('Logos/Platforms/QStelllar_Light_fulllogo_transparent_No_Buffer.png'), // Original
      qpulse: getAsset('Logos/Platforms/QPulse_Logo_New.png'),
      qpulseLight: getAsset('Logos/Platforms/QPulse_Logo_Light_Text.png'),
      qleap: getAsset('Logos/Platforms/QLeap_Logo.png'),
      qrgt: getAsset('Logos/Platforms/QRGT.png'),
      qrgtLight: getAsset('Logos/Platforms/QRGT_Light.png'),
      qrgtDark: getAsset('Logos/Platforms/QRGT_Dark.png'),
    },
  },
  industries: {
    banking: getAsset('Industries_Images/Banking_and_Financial_Services.jpg'),
    ecommerce: getAsset('Industries_Images/E_commerce_and_Digital_Platforms.jpg'),
    enterprise: getAsset('Industries_Images/Enterprise_and_Manufacturing.jpg'),
    fintech: getAsset('Industries_Images/FinTech_and_Digital_Payments.jpg'),
    healthcare: getAsset('Industries_Images/Healthcare_and_HealthTech.png'),
    saas: getAsset('Industries_Images/saas_optimized.jpg'),
    overviewHero: getAsset('Industries_Images/Industries_Overview_Hero.png'),
  },
  capabilities: {
    advisory: getAsset('Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Cyber_Advisory_and_Risk_Governance.jpg'),
    compliance: getAsset('Capabilities_Images/Regulatory_Compliance_and_Assurance/Compliance_and_Regulatory_Assurance.jpg'),
    offensive: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Offensive_Security_Engineering.jpg'),
    cloud: getAsset('Capabilities_Images/Cloud_Infrastructure_and_Platform_Security/Cloud_and_Infrastructure_Security.jpg'),
    defense: getAsset('Capabilities_Images/Managed_Detection_Response_and_SOC_Operations/Managed_Defense_Operations_2.jpeg'),
    intelligence: getAsset('Capabilities_Images/Threat_Intelligence_Exposure_Monitoring_and_Research/Cyber_Intelligence_and_Security_Research.webp'),
    worldwideConnection: getAsset('Capabilities_Images/worldwide_connection/80909.jpg'),
    subCapabilities: {
      advisory: {
        strategy: getAsset('Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Executive_Cyber_Advisory/Executive Cyber Advisory Framework.png'),
        architecture: getAsset('Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Security_and_Zero_Trust_Architecture_Review/Zero Trust Architecture Review.png'),
        vciso: getAsset('Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Virtual_CISO_vCISO_Services/The vCISO Strategic Advantage.png'),
        zeroTrust: getAsset('Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Security_and_Zero_Trust_Architecture_Review/Zero Trust Architecture Review.png'),
        tabletop: getAsset('Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Security_Program_Development/Security Programme Maturity Framework.png'),
      },
      offensive: {
        web: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Web_Application_Security_Testing/Deep Web Application Security Validation.png'),
        mobile: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Mobile_Application_Security_Testing/Mobile Security Mastery Infographic.png'),
        api: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/API_Security_Testing/Critical API Security Testing.png'),
        redTeam: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Red_Team/Red Team Simulation and Resilience.png'),
        simulation: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Adversary_Simulation/Adversary Simulation Defensive Readiness Overview.png'),
      }
    }
  },
  backdrops: {
    quasar: getAsset('Backdrops/Cyber_Quasar_Backdrop.png'),
    technet: getAsset('Backdrops/Tech_Net_Backdrop.png'),
    platformsHero: getAsset('Backdrops/Platforms_Hero.png'),
    redLights: getAsset('Backdrops/abstract-red-lights-background/608.jpg'),
    careersHero: getAsset('Backdrops/Careers_Hero.jpg'),
  },
  screenshots: {
    qstellar: getAsset('Platforms_Screenshots/QStellar/QStellar_Hero_Screenshot.png'),
    qpulse: getAsset('Platforms_Screenshots/QPulse/QPulse_Hero_Screenshot.png'),
    qleap: getAsset('Platforms_Screenshots/QLeap/QLeap_Website_Screenshot.png'),
    qrgt: getAsset('Platforms_Screenshots/QRGT/QRGT_Screenshot.png'),
  },
  platforms: {
    screenshots: {
      qstellar: getAsset('Platforms_Screenshots/QStellar/QStellar_Hero_Screenshot.png'),
      qpulse: getAsset('Platforms_Screenshots/QPulse/QPulse_Hero_Screenshot.png'),
      qleap: getAsset('Platforms_Screenshots/QLeap/QLeap_Website_Screenshot.png'),
      qrgt: getAsset('Platforms_Screenshots/QRGT/QRGT_Screenshot.png'),
    }
  },
  partners: {
    burp: getAsset('Logos/Partners_Logo_Cropped/Burp_Suite_Cropped.png'),
    dlink: getAsset('Logos/Partners_Logo_Cropped/D_link_Cropped.png'),
    inflow: getAsset('Logos/Partners_Logo_Cropped/Inflow-Logo_Dark-color_web.png'),
    manageengine: getAsset('Logos/Partners_Logo_Cropped/manageengine-logo-black.png'),
    ninja: getAsset('Logos/Partners_Logo_Cropped/NinjaOne_Cropped.png'),
    rah: getAsset('Logos/Partners_Logo_Cropped/RAH_Infotech_Cropped.png'),
    rapid7: getAsset('Logos/Partners_Logo_Cropped/Rapid_7_Cropped.png'),
    satcom: getAsset('Logos/Partners_Logo_Cropped/Satcom_Infotech_Cropped.png'),
    sophos: getAsset('Logos/Partners_Logo_Cropped/Sophos_Cropped.png'),
    tenable: getAsset('Logos/Partners_Logo_Cropped/Tenable_Cropped.png'),
    vicarius: getAsset('Logos/Partners_Logo_Cropped/Vicarius_Cropped.png'),
    caniphish: getAsset('Logos/Partners_Logo_Cropped/caniphish_Cropped.png'),
  },
  blogs: {
    threats: getAsset('Blogs_Images/Top_Cybersecurity_Threats_Businesses_Should_Watch_Out_for_in_2025.png'),
    ai: getAsset('Blogs_Images/AI_in_Cybersecurity_A_Powerful_Ally_or_a_Looming_Threat.png'),
    moneygram: getAsset('Blogs_Images/Moneygram_Suffers_Data_Breach_Exposing_Customer_Information.png'),
  },
  services: {
    techConsulting: getAsset('Capabilities_Images/Tech_Consulting.png'),
    managedIT: getAsset('Capabilities_Images/Managed_IT_Services.jpg'),
  },
  certifications: {
    certin: getAsset('Logos/Certifications/CERT-In_Logo.png'),
  }
};



