import React from 'react';
import { ClipboardCheck, FileText, Briefcase, ArrowRight } from 'lucide-react';
import ServicePageTemplate from './../../components/templates/ServicePageTemplate';

export default function RiskCompliance() {
  const data = {
    seoTitle: "Risk Management & Compliance",
    heroSubtitle: "Align Security with Business Strategy",
    heroDescription: "Translate raw technical risk into actionable executive strategy. Achieve stringent global compliance and secure third-party ecosystems with absolute confidence.",
    threatLandscape: "Regulatory environments are scaling exponentially in complexity. A failure to map infrastructure to legal obligations guarantees severe fines and loss of enterprise trust.",
    subServices: [
        {
            title: "Regulatory Compliance Readiness",
            items: ["ISO 27001", "SOC 2 Type II", "PCI-DSS v4.0", "HIPAA/HITECH"]
        },
        {
            title: "Governance & Privacy",
            items: ["GDPR/CCPA Audits", "vCISO Services", "Policy Authoring", "Board Advisory"]
        },
        {
             title: "Third-Party Risk Management",
             items: ["Vendor Assessments", "M&A Due Diligence", "Supply Chain Audits"]
        }
    ],
    methodology: [
        { step: "01", title: "Gap Analysis", description: "Mapping current controls directly against statutory framework mandates." },
        { step: "02", title: "Risk Quantification", description: "Assigning financial impact and likelihood metrics to discovered vulnerabilities." },
        { step: "03", title: "Remediation Roadmaps", description: "Prioritizing fixes based on severity and operational budget constraints." },
        { step: "04", title: "Audit Support", description: "Providing evidence artifacts natively during formal auditor reviews." }
    ],
    toolsAndStandards: ["CIS Controls", "NIST CSF", "FAIR Model", "OneTrust", "Drata"],
    engagementModel: {
        type: 'project' as const,
        sla: "Bespoke Deliverables",
        duration: "3-6 Months",
        description: "Intensive architecture reviews culminating in board-ready strategic action plans."
    },
    advantages: [
        { title: "Business Pragmatism", description: "We do not implement security for security's sake—we align to ROI.", icon: Briefcase },
        { title: "Executive Ready", description: "Reports designed for CFOs, not just engineers.", icon: FileText },
        { title: "Continuous Auditing", description: "Designing automated control validations for SOC 2 seamlessly.", icon: ClipboardCheck }
    ],
    relatedServices: [
        { title: "Architecture & Engineering", linkHref: "/services/architecture-engineering", description: "Implement the required remediation controls." },
        { title: "Application Security", linkHref: "/services/application-security", description: "Prove secure SDLC natively." }
    ]
  };

  return <ServicePageTemplate {...data} />;
}
