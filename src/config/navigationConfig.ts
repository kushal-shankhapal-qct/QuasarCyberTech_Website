import {
  Shield,
  Target,
  ClipboardCheck,
  Server,
  Cloud,
  Code,
  Network,
  Database,
  FileText,
  BookOpen,
  AlertTriangle,
  Brain,
  Search,
  Activity,
  Eye,
} from 'lucide-react';

import { ASSETS } from '@/constants/assets';

export const navigationConfig = [
  { label: 'About Us', href: '/aboutus' },
  {
    label: 'Capabilities',
    href: '/capabilities',
    megaMenuGroups: [
      {
        title: 'Advisory & Governance',
        items: [
          { label: 'Cyber Security Advisory & Risk Governance', href: '/capabilities/cyber-advisory-risk-governance', LucideIcon: Shield },
          { label: 'Security Architecture Review', href: '/capabilities/cyber-advisory-risk-governance#security-architecture-review', LucideIcon: BookOpen },
          { label: 'Zero Trust Architecture Design', href: '/capabilities/cyber-advisory-risk-governance#zero-trust-architecture-design-review', LucideIcon: Server },
          { label: 'Security Program Development', href: '/capabilities/cyber-advisory-risk-governance#vciso-services', LucideIcon: ClipboardCheck }
        ]
      },
      {
        title: 'Security Engineering',
        items: [
          { label: 'Offensive Security Engineering', href: '/capabilities/offensive-security-engineering', LucideIcon: Target },
          { label: 'Red Teaming', href: '/capabilities/offensive-security-engineering#red-team-assessments', LucideIcon: Activity },
          { label: 'AI & Agentic System Security Testing', href: '/capabilities/offensive-security-engineering#llm-penetration-testing', LucideIcon: Brain },
          { label: 'Web / Mobile / API Security Testing', href: '/capabilities/offensive-security-engineering#web-application-vapt', LucideIcon: Code },
          { label: 'Secure Code Review', href: '/capabilities/offensive-security-engineering#secure-code-review', LucideIcon: FileText }
        ]
      },
      {
        title: 'Cloud & Infrastructure',
        items: [
          { label: 'Cloud Security Assessments', href: '/capabilities/cloud-infrastructure-security#cloud-security-assessment', LucideIcon: Cloud },
          { label: 'Kubernetes & Container Security', href: '/capabilities/cloud-infrastructure-security#kubernetes-container-security', LucideIcon: Database },
          { label: 'Cloud Security Posture Management', href: '/capabilities/cloud-infrastructure-security#cloud-security-posture-management-cspm', LucideIcon: Server },
          { label: 'Infrastructure Security Reviews', href: '/capabilities/cloud-infrastructure-security#aws-azure-security-assessment', LucideIcon: Network }
        ]
      },
      {
        title: 'Managed Defense',
        items: [
          { label: 'Managed SOC', href: '/capabilities/managed-defense-operations#managed-soc', LucideIcon: Activity },
          { label: 'Threat Detection & Monitoring', href: '/capabilities/managed-defense-operations#threat-detection-monitoring', LucideIcon: Eye },
          { label: 'Incident Response', href: '/capabilities/managed-defense-operations#incident-response', LucideIcon: AlertTriangle },
          { label: 'Threat Hunting', href: '/capabilities/managed-defense-operations#threat-hunting', LucideIcon: Search }
        ]
      }
    ]
  },
  {
    label: 'Platforms & Ecosystem',
    href: '/platforms',
    subItems: [
      { label: 'QStellar', href: 'https://qstellar.co', icon: ASSETS.logos.platforms.qstellar, isExternal: true },
      { label: 'QPulse', href: 'https://qpulse.quasarcybertech.com', icon: ASSETS.logos.platforms.qpulse, isExternal: true },
      { label: 'QRGT', href: '/contact', icon: ASSETS.logos.platforms.qrgt },
      { label: 'QLeap', href: 'https://qleap-ed.com', icon: ASSETS.logos.platforms.qleap, isExternal: true }
    ]
  },
  {
    label: 'Industries',
    href: '/industries',
    subItems: [
      { label: 'Banking & Financial', href: '/industries/banking' },
      { label: 'FinTech & Payments', href: '/industries/fintech' },
      { label: 'SaaS & Technology', href: '/industries/saas' },
      { label: 'E-commerce & Digital', href: '/industries/ecommerce' },
      { label: 'Healthcare & HealthTech', href: '/industries/healthcare' },
      { label: 'Enterprise & Manufacturing', href: '/industries/enterprise' }
    ]
  },
  // Blogs: plain link, no dropdown
  { label: 'Blogs', href: '/blogs' },
  // Careers: plain link, no dropdown
  { label: 'Careers', href: '/careers' },
];
