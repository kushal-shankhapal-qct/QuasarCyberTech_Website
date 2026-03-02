import React from 'react';
import { Cpu, Server, Network, ArrowRight } from 'lucide-react';
import ServicePageTemplate from './../../components/templates/ServicePageTemplate';

export default function ArchitectureEngineering() {
  const data = {
    seoTitle: "Cybersecurity Architecture & Engineering",
    heroSubtitle: "Design Robust Defense Topologies",
    heroDescription: "Build scalable, highly-available, and intrusion-resistant digital foundations. We implement exactly what we recommend.",
    threatLandscape: "Retrofitting security onto fragile legacy systems is expensive and ineffective. Modern infrastructure demands security-by-design principles woven natively into the engineering phase.",
    subServices: [
        {
            title: "Zero Trust Engineering",
            items: ["Identity Provider Integration", "SAML/OIDC Rollouts", "Micro-segmentation Appliances"]
        },
        {
            title: "Data Center Security Design",
            items: ["Next-Gen Firewall Deployment", "IDS/IPS Tuning", "WAF Configuration", "Secure Access Service Edge (SASE)"]
        },
        {
             title: "Custom Integrations",
             items: ["SIEM Log Pipelines", "SOAR Playbook Authoring", "API Security Gateways"]
        }
    ],
    methodology: [
        { step: "01", title: "Requirements Gathering", description: "Defining exact availability, latency, and compliance mandates." },
        { step: "02", title: "Low-Level Design", description: "Architecting topologies, routing tables, and policy logic." },
        { step: "03", title: "Deployment", description: "Configuring hardware and software within staging zones." },
        { step: "04", title: "Validation", description: "Stress-testing failover states and security boundary alerts." }
    ],
    toolsAndStandards: ["SABSA Framework", "TOGAF", "Palo Alto", "Okta", "F5 Networks"],
    engagementModel: {
        type: 'hybrid' as const,
        sla: "Milestone Driven",
        duration: "Months to Years",
        description: "From white-boarding the network to racking the firewalls."
    },
    advantages: [
        { title: "Implementation Experts", description: "We don't just audit—we build, break, and rebuild natively.", icon: Server },
        { title: "Vendor Partnerships", description: "Tier 1 access to proprietary hardware routing support limits.", icon: Network },
        { title: "Scalable Methodologies", description: "Designing for future capacity without degrading latency.", icon: Cpu }
    ],
    relatedServices: [
        { title: "Network Security", linkHref: "/services/network-security", description: "Audit the implementation." },
        { title: "Cloud Security", linkHref: "/services/cloud-security", description: "Export the topology to the cloud natively." }
    ]
  };

  return <ServicePageTemplate {...data} />;
}
