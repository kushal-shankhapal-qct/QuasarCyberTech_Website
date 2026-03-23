import {
  Shield,
  Target,
  ClipboardCheck,
  Server,
  Cloud,
  Code,
  Network,
  Smartphone,
  Database,
  FileText,
  BookOpen,
  AlertTriangle,
  Brain,
  Search,
  Activity,
  Users,
  Eye,
  Briefcase,
  Star,
  Globe
} from 'lucide-react';

import qPulseLogo from '../assets/Logos/QPulse_Logo_No_Buffer.png';
import qStellarLogo from '../assets/logos copy/Platforms/QStelllar_fulllogo_transparent_No_Buffer.png';
import qLeapLogo from '../assets/logos copy/Platforms/QLeap_Logo.png';
import qrgtLogo from '../assets/logos copy/Platforms/QRGT.png';

export const navigationConfig = [
  { label: 'Home', href: '/' },
  {
    label: 'Capabilities',
    href: '/capabilities',
    dropdownWidth: 'w-max',
    dropdownCols: 'grid-cols-4',
    dropdownOffset: '-translate-x-1/2',
    megaMenuGroups: [
      {
        title: 'Advisory & Governance',
        items: [
          { label: 'Cyber Advisory & Risk Governance', href: '/capabilities/cyber-advisory-risk-governance', desc: 'Strategic cybersecurity leadership and risk management.', LucideIcon: Shield },
          { label: 'Security Architecture Review', href: '/capabilities/cyber-advisory-risk-governance#architecture-review', desc: 'Validating infrastructure security and design principles.', LucideIcon: BookOpen },
          { label: 'Zero Trust Architecture Design', href: '/capabilities/cyber-advisory-risk-governance#zero-trust', desc: 'Implementing identity-centric security models.', LucideIcon: Server },
          { label: 'Security Program Development', href: '/capabilities/cyber-advisory-risk-governance#program-development', desc: 'Building comprehensive security roadmaps.', LucideIcon: ClipboardCheck }
        ]
      },
      {
        title: 'Security Engineering',
        items: [
          { label: 'Offensive Security Engineering', href: '/capabilities/offensive-security-engineering', desc: 'Advanced penetration testing and adversary simulation.', LucideIcon: Target },
          { label: 'Web / Mobile / API Security Testing', href: '/capabilities/offensive-security-engineering#web-mobile-api', desc: 'Full-stack application security validation.', LucideIcon: Code },
          { label: 'Red Team & Adversary Simulation', href: '/capabilities/offensive-security-engineering#red-team', desc: 'Enterprise-wide offensive security testing.', LucideIcon: Activity },
          { label: 'Secure Code Review', href: '/capabilities/offensive-security-engineering#code-review', desc: 'Deep-dive source code security analysis.', LucideIcon: FileText },
          { label: 'LLM & AI Security Testing', href: '/capabilities/offensive-security-engineering#llm-ai', desc: 'Specialized testing for AI/ML security risks.', LucideIcon: Brain }
        ]
      },
      {
        title: 'Cloud & Infrastructure',
        items: [
          { label: 'Cloud Security Assessments', href: '/capabilities/cloud-infrastructure-security', desc: 'Multi-cloud security configuration and risk analysis.', LucideIcon: Cloud },
          { label: 'Kubernetes & Container Security', href: '/capabilities/cloud-infrastructure-security#kubernetes', desc: 'Securing cloud-native orchestration and clusters.', LucideIcon: Database },
          { label: 'Cloud Security Posture Management (CSPM)', href: '/capabilities/cloud-infrastructure-security#cspm', desc: 'Automated governance for cloud environments.', LucideIcon: Server },
          { label: 'Infrastructure Security Reviews', href: '/capabilities/cloud-infrastructure-security#infrastructure', desc: 'Network and core infrastructure security validation.', LucideIcon: Network }
        ]
      },
      {
        title: 'Managed Defense',
        items: [
          { label: 'Managed SOC', href: '/capabilities/managed-defense-operations', desc: '24/7 security monitoring and incident detection.', LucideIcon: Activity },
          { label: 'Threat Detection & Monitoring', href: '/capabilities/managed-defense-operations#threat-detection', desc: 'Real-time monitoring and event correlation.', LucideIcon: Eye },
          { label: 'Incident Response', href: '/capabilities/managed-defense-operations#incident-response', desc: 'Rapid containment and remediation of security threats.', LucideIcon: AlertTriangle },
          { label: 'Threat Hunting', href: '/capabilities/managed-defense-operations#threat-hunting', desc: 'Proactive searching for hidden security threats.', LucideIcon: Search }
        ]
      }
    ]
  },
  {
    label: 'Platforms & Ecosystem',
    href: '/platforms',
    dropdownWidth: 'w-[450px]',
    dropdownOffset: '-translate-x-[30%]',
    subItems: [
      { label: 'QStellar', href: 'https://qstellar.co', desc: 'AI-powered asset intelligence platform.', icon: qStellarLogo, isExternal: true },
      { label: 'QPulse', href: 'https://qpulse.quasarcybertech.com', desc: 'Cybersecurity insights and research portal.', icon: qPulseLogo, isExternal: true },
      { label: 'QRGT', href: '/platforms#qrgt', desc: 'Penetration Testing as a Service (PTaaS) platform.', icon: qrgtLogo },
      { label: 'QLeap', href: 'https://qleap-ed.com', desc: 'Cybersecurity training ecosystem.', icon: qLeapLogo, isExternal: true }
    ]
  },
  {
    label: 'Industries',
    href: '/industries',
    dropdownWidth: 'w-[560px]',
    dropdownCols: 'grid-cols-2',
    dropdownOffset: '-translate-x-[40%]',
    subItems: [
      { label: 'Banking & Financial', href: '/industries/banking', desc: 'Cybersecurity for financial institutions.' },
      { label: 'FinTech & Payments', href: '/industries/fintech', desc: 'Application security for digital finance.' },
      { label: 'SaaS & Technology', href: '/industries/saas', desc: 'Secure development and cloud security.' },
      { label: 'E-commerce & Digital', href: '/industries/ecommerce', desc: 'Protection for payment infrastructure.' },
      { label: 'Healthcare & HealthTech', href: '/industries/healthcare', desc: 'Security for healthcare systems.' },
      { label: 'Enterprise & Manufacturing', href: '/industries/enterprise', desc: 'Cyber risk governance & resilience.' }
    ]
  },
  {
    label: 'Insights',
    href: '/insights',
    dropdownWidth: 'w-[400px]',
    dropdownOffset: '-translate-x-[50%]',
    subItems: [
      { label: 'Featured Articles', href: '/insights/articles', desc: 'Latest cybersecurity perspectives.', LucideIcon: FileText },
      { label: 'QPulse', href: 'https://qpulse.quasarcybertech.com', desc: 'Cybersecurity insights portal.', icon: qPulseLogo, isExternal: true }
    ]
  },
  {
    label: 'Company',
    href: '/company',
    dropdownWidth: 'w-[320px]',
    dropdownOffset: '-translate-x-[50%]',
    subItems: [
      { label: 'About QuasarCyberTech', href: '/company/about' },
      { label: 'Leadership & Vision', href: '/company/leadership' },
      { label: 'Advisory Board', href: '/company/advisory-board' },
      { label: 'Careers', href: '/company/careers' }
    ]
  }
];
