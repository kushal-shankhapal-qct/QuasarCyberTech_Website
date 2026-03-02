import React from 'react';
import { Cloud, Target, Lock, ArrowRight } from 'lucide-react';
import ServicePageTemplate from './../../components/templates/ServicePageTemplate';

export default function CloudSecurity() {
  const data = {
    seoTitle: "Cloud Security & CSPM",
    heroSubtitle: "Secure Cloud Native Ecosystems",
    heroDescription: "Proactive governance, misconfiguration detection, and identity management across AWS, Azure, GCP, and Kubernetes.",
    threatLandscape: "Rapid cloud adoption leads to complex permission models and accidental public exposures. Minor misconfigurations scale instantly into massive data breaches.",
    subServices: [
        {
            title: "Cloud Security Posture Management (CSPM)",
            items: ["AWS/Azure/GCP Auditing", "IAM Role Reviews", "S3/Blob Storage Analysis", "VPC Flow Logging"]
        },
        {
            title: "Container & Kubernetes Security",
            items: ["K8s RBAC Audits", "EKS/GKE Hardening", "Image Vulnerability Scanning", "Network Policy Design"]
        }
    ],
    methodology: [
        { step: "01", title: "Asset Discovery", description: "Querying cloud APIs to map all running instances and data stores." },
        { step: "02", title: "IAM Analysis", description: "Identifying over-privileged accounts, inactive identities, and root access risks." },
        { step: "03", title: "Misconfiguration Scans", description: "Automated tooling searching for publicly exposed ports or databases." },
        { step: "04", title: "Hardening", description: "Implementing strict security groups, encryption at rest, and enforcing MFA globally." }
    ],
    toolsAndStandards: ["CIS Foundations", "CSA CCM", "Prisma Cloud", "Wiz", "AWS Security Hub"],
    engagementModel: {
        type: 'recurring' as const,
        sla: "Monthly Reports",
        duration: "12-Month Contract",
        description: "Continuous monitoring of cloud control planes preventing drift over time."
    },
    advantages: [
        { title: "Multi-Cloud Fluent", description: "Unifying policies across diverse hosting environments natively.", icon: Cloud },
        { title: "Shift-Left IaC", description: "Scanning Terraform and CloudFormation before deployment.", icon: Target },
        { title: "Native Integrations", description: "Harnessing built-in AWS/Azure tools to lower overhead.", icon: Lock }
    ],
    relatedServices: [
        { title: "Application Security", linkHref: "/services/application-security", description: "Secure the code living on the cloud." },
        { title: "Architecture & Engineering", linkHref: "/services/architecture-engineering", description: "Build hybrid models securely." }
    ]
  };

  return <ServicePageTemplate {...data} />;
}
