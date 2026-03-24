import React from 'react';
import { Target, Shield, Server, ArrowRight, Code } from 'lucide-react';
import ServicePageTemplate from './../../components/templates/ServicePageTemplate';

export default function ApplicationSecurity() {
  const data = {
    seoTitle: "Application Security & DevSecOps",
    heroSubtitle: "Secure the Software Development Life Cycle",
    heroDescription: "Integrate security natively into your development pipeline from day zero, preventing vulnerabilities before they reach production environments.",
    threatLandscape: "As applications become the primary attack vector for data breaches, organizations must shift security left to counter rapid DevOps cycles without slowing deployment speeds.",
    subServices: [
        {
            title: "Static Application Security Testing (SAST)",
            items: ["Source Code Analysis", "Vulnerability Discovery", "IDE Integration", "CI/CD Pipeline Hooks"]
        },
        {
            title: "Dynamic Application Security Testing (DAST)",
            items: ["Runtime Assessment", "OWASP Top 10 Coverage", "Custom Payload Injection", "API Fuzzing"]
        }
    ],
    methodology: [
        { step: "01", title: "Code Profiling", description: "Mapping the entire application codebase and open-source dependencies." },
        { step: "02", title: "Automated Scanning", description: "Running SAST/DAST tooling within isolated CI/CD staging environments." },
        { step: "03", title: "Manual Triage", description: "Eliminating false positives and verifying complex business logic flaws." },
        { step: "04", title: "Remediation", description: "Delivering specific code fixes directly to your development team." }
    ],
    toolsAndStandards: ["OWASP ASVS", "SANS CWE", "Checkmarx", "Veracode", "SonarQube"],
    engagementModel: {
        type: 'project' as const,
        sla: "14 Days",
        duration: "3-4 Weeks",
        description: "Comprehensive code reviews paired with dynamic testing for new or legacy applications."
    },
    advantages: [
        { title: "Developer Centric", description: "We provide functional code snippets, not just PDF reports.", icon: Code },
        { title: "Zero Pipeline Friction", description: "Our scanners integrate natively with Jenkins, GitHub, and GitLab without blocking builds unnecessarily.", icon: Shield },
        { title: "Full Stack Coverage", description: "From legacy monoliths to modern microservices.", icon: Server }
    ],
    relatedServices: [
        { title: "Cloud Security", linkHref: "/services/cloud-security", description: "Secure your cloud hosting environments." },
        { title: "Red Team & Adversary Simulation", linkHref: "/services/red-team-adversary-simulation", description: "Test your application in a live attack scenario." }
    ]
  };

  return <ServicePageTemplate {...data} />;
}
