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

import qPulseLogo from '../assets/Logos/QPulse_Logo.png';
import qStellarLogo from '../assets/logos copy/Platforms/QStelllar_fulllogo_transparent_No_Buffer.png';
import qLeapLogo from '../assets/logos copy/Platforms/QLeap_Logo.png';

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
          { label: 'Cyber Advisory & Risk Governance', href: '/capabilities/risk-compliance', desc: 'Strategic cybersecurity leadership and risk management.', LucideIcon: Shield },
          { label: 'Security Architecture Review', href: '/capabilities/architecture-engineering', desc: 'Validating infrastructure security and design principles.', LucideIcon: BookOpen },
          { label: 'Zero Trust Architecture Design', href: '/capabilities/architecture-engineering', desc: 'Implementing identity-centric security models.', LucideIcon: Server },
          { label: 'Security Program Development', href: '/capabilities/risk-compliance', desc: 'Building comprehensive security roadmaps.', LucideIcon: ClipboardCheck }
        ]
      },
      {
        title: 'Security Engineering',
        items: [
          { label: 'Offensive Security Engineering', href: '/capabilities/red-team-adversary-simulation', desc: 'Advanced penetration testing and adversary simulation.', LucideIcon: Target },
          { label: 'Web / Mobile / API Security Testing', href: '/capabilities/application-security', desc: 'Full-stack application security validation.', LucideIcon: Code },
          { label: 'Red Team & Adversary Simulation', href: '/capabilities/red-team-adversary-simulation', desc: 'Enterprise-wide offensive security testing.', LucideIcon: Activity },
          { label: 'Secure Code Review', href: '/capabilities/application-security', desc: 'Deep-dive source code security analysis.', LucideIcon: FileText },
          { label: 'LLM & AI Security Testing', href: '/capabilities/application-security', desc: 'Specialized testing for AI/ML security risks.', LucideIcon: Brain }
        ]
      },
      {
        title: 'Cloud & Infrastructure',
        items: [
          { label: 'Cloud Security Assessments', href: '/capabilities/cloud-security', desc: 'Multi-cloud security configuration and risk analysis.', LucideIcon: Cloud },
          { label: 'Kubernetes & Container Security', href: '/capabilities/cloud-security', desc: 'Securing cloud-native orchestration and clusters.', LucideIcon: Database },
          { label: 'Cloud Security Posture Management (CSPM)', href: '/capabilities/cloud-security', desc: 'Automated governance for cloud environments.', LucideIcon: Server },
          { label: 'Infrastructure Security Reviews', href: '/capabilities/network-security', desc: 'Network and core infrastructure security validation.', LucideIcon: Network }
        ]
      },
      {
        title: 'Managed Defense',
        items: [
          { label: 'Managed SOC', href: '/capabilities/managed-security-operations', desc: '24/7 security monitoring and incident detection.', LucideIcon: Activity },
          { label: 'Threat Detection & Monitoring', href: '/capabilities/digital-risk-monitoring', desc: 'Real-time monitoring and event correlation.', LucideIcon: Eye },
          { label: 'Incident Response', href: '/capabilities/incident-response', desc: 'Rapid containment and remediation of security threats.', LucideIcon: AlertTriangle },
          { label: 'Threat Hunting', href: '/capabilities/red-team-adversary-simulation', desc: 'Proactive searching for hidden security threats.', LucideIcon: Search }
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
      { label: 'QRGT', href: '/platforms/qrgt', desc: 'Penetration Testing as a Service (PTaaS) platform.', LucideIcon: Target },
      { label: 'QStellar', href: 'https://qstellar.quasarcybertech.com', desc: 'Asset intelligence platform.', icon: qStellarLogo, isExternal: true },
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
