import React from 'react';
import { Search, ShieldAlert, Activity, ArrowRight } from 'lucide-react';
import ServicePageTemplate from './../../components/templates/ServicePageTemplate';

export default function IncidentResponse() {
  const data = {
    seoTitle: "Incident Response & Threat Hunting",
    heroSubtitle: "Rapid Breach Containment & Eradication",
    heroDescription: "Deploy elite incident responders within minutes. Establish control, eject adversaries, and rebuild resilience quickly following a critical cyber event.",
    threatLandscape: "When a breach is active, every minute costs revenue and reputation. Internal teams lack the forensic depth and emotional detachment to triage ransomware or espionage effectively.",
    subServices: [
        {
            title: "Emergency Incident Response (IR)",
            items: ["Ransomware Negotiation", "Malware Containment", "Forensic Imaging", "Root Cause Analysis"]
        },
        {
            title: "Proactive Threat Hunting",
            items: ["Persistent Threat Discovery", "Memory Forensics", "Log Anomaly Detection", "Zero-Day Hunting"]
        }
    ],
    methodology: [
        { step: "01", title: "Triage", description: "Securing volatile memory, assessing impact scope, and legally preserving evidence." },
        { step: "02", title: "Containment", description: "Severing C2 connections and isolating compromised zones immediately." },
        { step: "03", title: "Eradication", description: "Removing active malware payloads and reversing persistent attacker tools." },
        { step: "04", title: "Recovery", description: "Restoring clean backups, patching entry vectors, and releasing systems online." }
    ],
    toolsAndStandards: ["NIST 800-61", "GCIH Framework", "KAPE", "Velociraptor", "Volatility"],
    engagementModel: {
        type: 'hybrid' as const,
        sla: "Under 1 Hour Response",
        duration: "Emergency On-Call",
        description: "Zero-retainer SLA options combined with proactive weekly hunting sweeps."
    },
    advantages: [
        { title: "Crisis Management", description: "We liaise with legal teams, PR, and cyber insurance seamlessly.", icon: ShieldAlert },
        { title: "Forensic Excellence", description: "Court-admissible evidence chain-of-custody protocols.", icon: Search },
        { title: "Threat Eradication", description: "We permanently destroy persistent adversary access tools natively.", icon: Activity }
    ],
    relatedServices: [
        { title: "Managed Security Operations", linkHref: "/services/managed-security-operations", description: "Transition emergency response into permanent defense." },
        { title: "Risk & Compliance", linkHref: "/services/risk-compliance", description: "Satisfy regulatory disclosures safely." }
    ]
  };

  return <ServicePageTemplate {...data} />;
}
