import React from 'react';
import { Activity, Globe, Eye, ArrowRight } from 'lucide-react';
import ServicePageTemplate from './../../components/templates/ServicePageTemplate';

export default function DigitalRiskMonitoring() {
  const data = {
    seoTitle: "Digital Risk Protection & Monitoring",
    heroSubtitle: "Beyond the Perimeter Intelligence",
    heroDescription: "Continuously scan the surface, deep, and dark web for leaked credentials, impersonations, and targeted threat chatter against your executives and brand.",
    threatLandscape: "Ransomware groups monetize stolen data. Phishing syndicates register typosquatting domains. The most critical threats to your organization often incubate entirely outside your corporate firewalls.",
    subServices: [
        {
            title: "Dark Web Monitoring",
            items: ["Stolen Credential Dumps", "Initial Access Broker Intelligence", "Ransomware Leak Sites"]
        },
        {
            title: "Brand Protection",
            items: ["Typosquatting Detection", "Social Media Impersonation", "Rogue Application Takedowns"]
        },
        {
             title: "VIP Executive Protection",
             items: ["PII Exposure Scrubbing", "Physical Threat Correlation", "Location OpSec Analysis"]
        }
    ],
    methodology: [
        { step: "01", title: "Asset Profiling", description: "Mapping critical IPs, domains, product keywords, and executive PII." },
        { step: "02", title: "Automated Sweeping", description: "Deploying proprietary scrapers across hacker forums and paste sites natively." },
        { step: "03", title: "Human Curation", description: "Our threat intelligence analysts verify alerts, removing false positives." },
        { step: "04", title: "Active Takedown", description: "Issuing DMCA notices and collaborating with registrars to kill phishing sites." }
    ],
    toolsAndStandards: ["OSINT Framework", "Maltego", "Recorded Future", "Flashpoint"],
    engagementModel: {
        type: 'recurring' as const,
        sla: "Real-time Alerts",
        duration: "12-Month Subscription",
        description: "A constant stream of high-fidelity threat intelligence routed directly to your SOC."
    },
    advantages: [
        { title: "Zero False Positives", description: "Every alert is triaged by an analyst before reaching you.", icon: Eye },
        { title: "Rapid Takedowns", description: "Established legal frameworks with global registrars.", icon: Activity },
        { title: "Global Reach", description: "Translators parsing Russian and Chinese cybercrime forums natively.", icon: Globe }
    ],
    relatedServices: [
        { title: "Managed Security Operations", linkHref: "/services/managed-security-operations", description: "Ingest these alerts natively into your SIEM." },
        { title: "Incident Response", linkHref: "/services/incident-response", description: "Pre-empt an attack before the data is weaponized." }
    ]
  };

  return <ServicePageTemplate {...data} />;
}
