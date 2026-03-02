import React from 'react';
import { Server, Shield, Network, ArrowRight } from 'lucide-react';
import ServicePageTemplate from './../../components/templates/ServicePageTemplate';

export default function NetworkSecurity() {
  const data = {
    seoTitle: "Network Security & Architecture",
    heroSubtitle: "Zero Trust Defense-in-Depth",
    heroDescription: "Designing, auditing, and hardening your enterprise networks to withstand sophisticated lateral movement and external intrusions.",
    threatLandscape: "The traditional perimeter has dissolved. Without rigid internal segmentation and persistent authentication, a single compromised node threatens entire data centers.",
    subServices: [
        {
            title: "Network Architecture Review",
            items: ["Firewall Rule Base Audits", "VLAN Segmentation Checks", "VPN Security Posture", "Routing Protocols"]
        },
        {
            title: "Zero Trust Implementation",
            items: ["Identity-Aware Proxies", "Micro-segmentation", "Continuous Auth", "Device Posture Checks"]
        }
    ],
    methodology: [
        { step: "01", title: "Topology Mapping", description: "Discovering all active subnets, routing behaviors, and external gateways." },
        { step: "02", title: "Policy Auditing", description: "Reviewing firewall ACLs and IDS/IPS tuning configurations." },
        { step: "03", title: "Vulnerability Scanning", description: "Identifying unpatched hardware, misconfigurations, and weak protocols." },
        { step: "04", title: "Architecture Redesign", description: "Deploying Zero Trust concepts to harden internal lateral pathways." }
    ],
    toolsAndStandards: ["NIST SP 800-207", "CIS Benchmarks", "Tenable", "Palo Alto", "Cisco ISE"],
    engagementModel: {
        type: 'hybrid' as const,
        sla: "2-4 hour mitigation",
        duration: "Ongoing or Project Based",
        description: "Deep-dive structural reviews combined with ongoing policy management."
    },
    advantages: [
        { title: "Vendor Agnostic", description: "We work across Cisco, Fortinet, Checkpoint, and Palo Alto simultaneously.", icon: Network },
        { title: "Business Aligned", description: "We harden infrastructure without causing operational downtime.", icon: Server },
        { title: "Zero Trust Native", description: "We focus on identity boundaries, not just IP addresses.", icon: Shield }
    ],
    relatedServices: [
        { title: "Cloud Security", linkHref: "/services/cloud-security", description: "Extend network security into virtualized cloud environments." },
        { title: "Managed Security Operations", linkHref: "/services/managed-security-operations", description: "Continuously monitor the network traffic 24/7." }
    ]
  };

  return <ServicePageTemplate {...data} />;
}
