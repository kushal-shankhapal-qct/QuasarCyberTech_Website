import React from 'react';
import { Target, Users, ShieldAlert, ArrowRight } from 'lucide-react';
import ServicePageTemplate from './../../components/templates/ServicePageTemplate';

export default function RedTeamAdversarySimulation() {
  const data = {
    seoTitle: "Red Teaming & Adversary Simulation",
    heroSubtitle: "Advanced Threat Emulation",
    heroDescription: "Evaluate your detection efficacy, incident response playbooks, and organizational readiness against elite, real-world attack groups.",
    threatLandscape: "Compliance-driven penetration testing checks boxes. It takes highly-coordinated, multi-stage adversary simulations to discover where your SOC or MSSP truly fails to detect stealth.",
    subServices: [
        {
            title: "Full-Scope Red Teaming",
            items: ["C2 Infrastructure Evasion", "Phishing & Vishing", "Lateral Movement", "Active Directory Exploitation"]
        },
        {
            title: "Purple Teaming",
            items: ["Collaborative Table-Tops", "IOC Validation", "Detection Engineering", "SIEM Rule Creation"]
        },
        {
             title: "Physical Security",
             items: ["Tailgating", "Lockpicking", "Rogue Device Placement", "RFID Cloning"]
        }
    ],
    methodology: [
        { step: "01", title: "OSINT & Recon", description: "Gathering external intelligence and compromised credentials without interacting." },
        { step: "02", title: "Weaponization", description: "Crafting bespoke malware payloads designed to bypass your specific EDR." },
        { step: "03", title: "Execution", description: "Gaining initial access, maintaining persistence, and escalating privileges." },
        { step: "04", title: "Debriefing", description: "Presenting exact attack narratives to refine SOC alerts comprehensively." }
    ],
    toolsAndStandards: ["MITRE ATT&CK", "Cobalt Strike", "BloodHound", "Proxychains", "Covenant"],
    engagementModel: {
        type: 'project' as const,
        sla: "Objective Driven",
        duration: "4-12 Weeks",
        description: "A continuous, stealthy campaign culminating in a massive debriefing workshop."
    },
    advantages: [
        { title: "Zero Trust Testing", description: "Validating your assumption that internal segmentation strictly works.", icon: Target },
        { title: "Custom Payloads", description: "We do not run noisy out-of-the-box scripts.", icon: ShieldAlert },
        { title: "Executive Communicators", description: "Translate technical kill chains to board-level risk metrics natively.", icon: Users }
    ],
    relatedServices: [
        { title: "Incident Response & Threat Hunting", linkHref: "/services/incident-response", description: "Leverage lessons learned to hunt actively." },
        { title: "Managed Security Operations", linkHref: "/services/managed-security-operations", description: "Rely on an upgraded detection team." }
    ]
  };

  return <ServicePageTemplate {...data} />;
}
