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
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
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
      qpulseLight: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/QPulse_Logo_Light_Text_ao9z8b.png'),
      qleap: getAsset('Logos/Platforms/QLeap_Logo.png'),
      qrgt: getAsset('Logos/Platforms/QRGT.png'),
      qrgtLight: getAsset('Logos/Platforms/QRGT_Light.png'),
      qrgtDark: getAsset('Logos/Platforms/QRGT_Dark.png'),
    },
  },
  industries: {
    banking: getAsset('Industries_Images/Banking_and_Financial_Services.jpg'),
    ecommerce: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/E-commerce_Digital_Platforms_New_syhzol.png'),
    enterprise: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/Industries_Images/Enterprise_and_Manufacturing.jpg'),
    fintech: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/FinTech_and_Digital_Payments_New_x2zod2.png'),
    healthcare: getAsset('Industries_Images/Healthcare_and_HealthTech.png'),
    saas: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/SaaS_Technology_Platforms_New_mzykud.png'),
    overviewHero: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/Industries_Images/Industries_Overview_Hero.png'),
  },
  capabilities: {
    advisory: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/Cyber_Advisory_and_Risk_Governance_New_hqwyit.png'),
    compliance: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/Compliance_and_Assurance_New_hmv7ne.png'),
    offensive: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Offensive_Security_Engineering.jpg'),
    cloud: getAsset('Capabilities_Images/Cloud_Infrastructure_and_Platform_Security/Cloud_and_Infrastructure_Security.jpg'),
    defense: getAsset('Capabilities_Images/Managed_Detection_Response_and_SOC_Operations/Managed_Defense_Operations_2.jpeg'),
    intelligence: getAsset('Capabilities_Images/Threat_Intelligence_Exposure_Monitoring_and_Research/Cyber_Intelligence_and_Security_Research.webp'),
    worldwideConnection: getAsset('Capabilities_Images/worldwide_connection/80909.jpg'),
    subCapabilities: {
      compliance: {
        regulatoryGapAssessment: getAsset('Capabilities_Images/Regulatory_Compliance_and_Assurance/Regulatory_Gap_Assessment/Regulatory Gap Assessment Framework.png'),
        riskMonitoring: getAsset('Capabilities_Images/Regulatory_Compliance_and_Assurance/Risk_and_Compliance_Monitoring/Risk and Compliance Monitoring Overview.png'),
        rbiCompliance: getAsset('Capabilities_Images/Regulatory_Compliance_and_Assurance/RBI_Cyber_Security_Framework_Compliance/RBI Cyber Security Framework Compliance.png'),
        dpdpCompliance: getAsset('Capabilities_Images/Regulatory_Compliance_and_Assurance/DPDP_Act_Compliance/DPDP Act Compliance Guide.png'),
      },
      advisory: {
        strategy: getAsset('Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Executive_Cyber_Advisory/Executive Cyber Advisory Framework.png'),
        architecture: getAsset('Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Security_and_Zero_Trust_Architecture_Review/Zero Trust Architecture Review.png'),
        vciso: getAsset('Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Virtual_CISO_vCISO_Services/The vCISO Strategic Advantage.png'),
        zeroTrust: getAsset('Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Security_and_Zero_Trust_Architecture_Review/Zero Trust Architecture Review.png'),
        tabletop: getAsset('Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Security_Program_Development/Security Programme Maturity Framework.png'),
        supplyChain: getAsset('Capabilities_Images/Cyber_Advisory_and_Risk_Governance/Third_Party_and_Supply_Chain_Risk_Management/Mastering Supply Chain Resilience.png'),
      },
      offensive: {
        web: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Web_Application_Security_Testing/Deep Web Application Security Validation.png'),
        mobile: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Mobile_Application_Security_Testing/Mobile Security Mastery Infographic.png'),
        api: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/API_Security_Testing/Critical API Security Testing.png'),
        redTeam: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Red_Team/Red Team Simulation and Resilience.png'),
        simulation: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Adversary_Simulation/Adversary Simulation Defensive Readiness Overview.png'),
        secureCodeReview: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/Secure_Code_Review/Secure Code Review Process Guide.png'),
        aiSecurity: getAsset('Capabilities_Images/Offensive_Security_and_Resilience_Engineering/AI_and_Agentic_System_Security_Testing/Securing AI and Agentic Systems.png'),
      },
      cloud: {
        cloudAssessment: getAsset('Capabilities_Images/Cloud_Infrastructure_and_Platform_Security/Cloud_Security_Assessments/Multi-Cloud Security Assurance Guide.png'),
        cspm: getAsset('Capabilities_Images/Cloud_Infrastructure_and_Platform_Security/Cloud_Security_Posture_Management_CSPM/Mastering Cloud Security Posture Management.png'),
        containerSecurity: getAsset('Capabilities_Images/Cloud_Infrastructure_and_Platform_Security/Kubernetes_and_Container_Security/Container Platform Security Overview.png'),
        cloudHardening: getAsset('Capabilities_Images/Cloud_Infrastructure_and_Platform_Security/On_Premises_and_Hybrid_Infrastructure_Hardening/Cloud Security Hardening Framework Guide.png'),
      },
      managedDefense: {
        managedSOC: getAsset('Capabilities_Images/Managed_Detection_Response_and_SOC_Operations/Managed_SOC_and_Security_Monitoring/Managed SOC Security Monitoring Overview.png'),
        incidentResponse: getAsset('Capabilities_Images/Managed_Detection_Response_and_SOC_Operations/Incident_Response_and_Digital_Forensics/Incident Response Digital Forensics.png'),
        socialEngineering: getAsset('Capabilities_Images/Managed_Detection_Response_and_SOC_Operations/User_Awareness_and_Social_Engineering_Simulations/Social Engineering Simulation Training Framework.png'),
      },
      threatIntelligence: {
        cti: getAsset('Capabilities_Images/Threat_Intelligence_Exposure_Monitoring_and_Research/Cyber_Threat_Intelligence_CTI_as_a_Service/Cyber Security Framework Compliance Overview.png'),
        vulnerabilityResearch: getAsset('Capabilities_Images/Threat_Intelligence_Exposure_Monitoring_and_Research/Vulnerability_Research_and_Security_Advisories/Vulnerability Research & Security Advisories.png'),
        attackSurface: getAsset('Capabilities_Images/Threat_Intelligence_Exposure_Monitoring_and_Research/Attack_Surface_Intelligence/Attack Surface Intelligence.png'),
        threatHunting: getAsset('Capabilities_Images/Managed_Detection_Response_and_SOC_Operations/Threat_Hunting/Cyber_Threat_Hunting_Overview.png'),
        soc2: getAsset('Capabilities_Images/Regulatory_Compliance_and_Assurance/SOC2_Readiness/SOC2_Compliance_Readiness_Journey.png'),
        ctiNew: getAsset('Capabilities_Images/Threat_Intelligence_Exposure_Monitoring_and_Research/Cyber_Threat_Intelligence_CTI_as_a_Service/Cyber_Threat_Intelligence_Service_Infographic.png'),
        darkWebNew: getAsset('Capabilities_Images/Threat_Intelligence_Exposure_Monitoring_and_Research/Dark_Web_and_Brand_Intelligence/Dark_Web_Brand_Intelligence_Overview.png'),
      },
      serviceSet2: {
        svc1: getAsset('Capabilities_Images/SVCs_Set_2/SVC_1.png'),
        svc2: getAsset('Capabilities_Images/SVCs_Set_2/SVC_2.png'),
        svc3: getAsset('Capabilities_Images/SVCs_Set_2/SVC_3.png'),
        svc4: getAsset('Capabilities_Images/SVCs_Set_2/SVC_4.png'),
        svc5: getAsset('Capabilities_Images/SVCs_Set_2/SVC_5.png'),
        svc6: getAsset('Capabilities_Images/SVCs_Set_2/SVC_6.png'),
      }
    }
  },
  backdrops: {
    quasar: getAsset('Backdrops/Cyber_Quasar_Backdrop.png'),
    technet: getAsset('Backdrops/Tech_Net_Backdrop.png'),
    platformsHero: getAsset('Backdrops/Platforms_Hero.png'),
    redLights: getAsset('Backdrops/abstract-red-lights-background/608.jpg'),
    careersHero: getAsset('Backdrops/Careers_Hero.jpg'),
    aboutUsHero: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/About_Us_Hero_Backdrop_ce5vrw.png'),
    visionMissionBg: getAsset('Backdrops/Vision_Mission_Padding.png'),
    visionMissionCoreValues: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/Vision_Mission_Core_Values_Backdrop_iiqlku.png'),
    qctSecureFramework: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/QCT_Secure_Framework_Backdrop_vemig8.png'),
  },
  about: {
    visionIcon: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/v1775560856/Vision_ojsr8o.png'),
    missionIcon: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/v1775560850/Mission_xrpfcn.png'),
    coreValueIcons: {
      integrity: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/v1775560723/Integrity_cf3v06.png'),
      innovation: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/v1775560716/Innovation_sud1ui.png'),
      customerCentricity: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/v1775560720/Customer_Centricity_za1jsw.png'),
      excellence: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/v1775560711/Excellence_flyg0y.png'),
      collaboration: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/v1775560710/Collaboration_dljiqq.png'),
    },
  },
  cursorIcons: {
    palm: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/palm_f7cewm.png'),
    hold: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/hold_inj9za.png'),
  },
  screenshots: {
    qstellar: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/Platforms_Screenshots/QStellar/QStellar_Hero_Screenshot.png'),
    qpulse: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/Platforms_Screenshots/QPulse/QPulse_Website_Screenshot.png'),
    qleap: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/Platforms_Screenshots/QLeap/QLeap_Website_Screenshot.png'),
    qrgt: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/Platforms_Screenshots/QRGT/QRGT_Screenshot.png'),
  },
  qctWebsite: {
    advisory: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/Cyber_Advisory_and_Risk_Governance_New_hqwyit.png'),
    banking: getAsset('QCT-WEBSITE/banking.png'),
    cloud: getAsset('QCT-WEBSITE/Cloud_and_Infrastructure_Security-burgundy.jpg'),
    contact: getAsset('QCT-WEBSITE/contactus.png'),
    digitalPayments: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/FinTech_and_Digital_Payments_New_x2zod2.png'),
    ecommerce: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/E-commerce_Digital_Platforms_New_syhzol.png'),
    enterprise: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/Industries_Images/Enterprise_and_Manufacturing.jpg'),
    healthcare: getAsset('QCT-WEBSITE/Health-Care.png'),
    regulatoryCompliance: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/Compliance_and_Assurance_New_hmv7ne.png'),
    saas: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/SaaS_Technology_Platforms_New_mzykud.png'),
    soc: getAsset('QCT-WEBSITE/SOC and Managed Defence.jpeg'),
  },
  platforms: {
    screenshots: {
      qstellar: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/Platforms_Screenshots/QStellar/QStellar_Hero_Screenshot.png'),
      qpulse: getAsset('https://res.cloudinary.com/dmdpzphcz/image/upload/v1775135965/Platforms_Screenshots/QPulse/QPulse_Hero_Screenshot.png'),
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
