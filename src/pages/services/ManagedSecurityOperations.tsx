import React from 'react';
import { Shield, Clock, Brain, ArrowRight } from 'lucide-react';
import ServicePageTemplate from './../../components/templates/ServicePageTemplate';

export default function ManagedSecurityOperations() {
  const data = {
    seoTitle: "Managed Security Operations (SOC)",
    heroSubtitle: "24/7 Threat Hunting & Response",
    heroDescription: "Global experts providing continuous monitoring, alert triage, and advanced endpoint detection engineering.",
    threatLandscape: "Adversaries operate around the clock. Overwhelmed internal teams drown in false positives, leading to critical security alerts being ignored until it is too late.",
    subServices: [
        {
            title: "24/7 SOC Monitoring",
            items: ["SIEM Log Analysis", "Alert Triage", "Playbook Execution", "Escalation Routing"]
        },
        {
            title: "Managed Detection & Response (MDR)",
            items: ["EDR Telemetry Hunting", "Host Isolation", "Process Termination", "Malware Deep-dives"]
        }
    ],
    methodology: [
        { step: "01", title: "Onboarding", description: "Ingesting logs from firewalls, identities, and endpoints into our SIEM." },
        { step: "02", title: "Tuning", description: "Suppressing noisy alerts and establishing behavioral baselines natively." },
        { step: "03", title: "Monitoring", description: "Our global security operations center hunts for subtle IoCs continuously." },
        { step: "04", title: "Response", description: "Executing automated containment strategies within minutes." }
    ],
    toolsAndStandards: ["ISO 27001", "Splunk", "CrowdStrike", "SentinelOne", "Elastic Security"],
    engagementModel: {
        type: 'recurring' as const,
        sla: "15 Minute Response",
        duration: "1-3 Year Retainer",
        description: "A seamless extension of your IT infrastructure focusing entirely on threat destruction."
    },
    advantages: [
        { title: "Follow-The-Sun", description: "Analysts in multiple time zones ensuring zero fatigue delays.", icon: Clock },
        { title: "Curated Threat Intel", description: "Leveraging proprietary research to predict adversary maneuvers.", icon: Brain },
        { title: "Tool Agnostic", description: "We ingest telemetry from your existing technology stacks.", icon: Shield }
    ],
    relatedServices: [
        { title: "Incident Response", linkHref: "/services/incident-response", description: "When a major breach requires emergency deployment." },
        { title: "Digital Risk & Monitoring", linkHref: "/services/digital-risk-monitoring", description: "Extend hunting beyond the firewall." }
    ]
  };

  return <ServicePageTemplate {...data} />;
}
