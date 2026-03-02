import {
  Shield,
  Target,
  ClipboardCheck,
  Server,
  Cpu,
  Cloud,
  Code,
  Network,
  Smartphone,
  Database,
  FileText,
  Book,
  BookOpen,
  AlertTriangle,
  Brain,
  Search,
  Activity
} from 'lucide-react';

import qPulseLogo from '../assets/Logos/QPulse_Logo.png';
import qStellarLogo from '../assets/Logos/QStelllar_fulllogo_transparent.png';

export const navigationConfig = [
  { label: 'Home', href: '/' },
  { label: 'Who We Are', href: '/who-we-are' },
  {
    label: 'Platforms',
    href: '/platforms',
    dropdownWidth: 'w-[450px]',
    subItems: [
      { label: 'Qpulse', href: 'https://qpulse.quasarcybertech.com', desc: 'Advanced threat intelligence and monitoring platform.', icon: qPulseLogo, isExternal: true },
      { label: 'QStellar', href: 'https://qstellar.quasarcybertech.com', desc: 'Cloud-native security and compliance automation.', icon: qStellarLogo, isExternal: true }
    ]
  },
  {
    label: 'Services',
    href: '/services',
    dropdownWidth: 'w-[1000px]',
    dropdownCols: 'grid-cols-5',
    dropdownOffset: '-translate-x-[40%]', // Center the massive grid properly relative to the viewport instead of the left-nav item
    subItems: [
      { label: 'Application Security', href: '/services/application-security', desc: 'Secure SDLC & DevSecOps.', LucideIcon: Code },
      { label: 'Mobile Security', href: '/services/mobile-security', desc: 'iOS & Android pentesting.', LucideIcon: Smartphone },
      { label: 'Network Security', href: '/services/network-security', desc: 'Zero trust & architecture.', LucideIcon: Server },
      { label: 'Cloud Security', href: '/services/cloud-security', desc: 'AWS, Azure & GCP protection.', LucideIcon: Cloud },
      { label: 'Red Team & Adversary Simulation', href: '/services/red-team-adversary-simulation', desc: 'Pentesting & red teaming.', LucideIcon: Target },
      { label: 'Managed Security Operations', href: '/services/managed-security-operations', desc: '24/7 continuous SOC monitoring.', LucideIcon: Shield },
      { label: 'Incident Response & Threat Hunting', href: '/services/incident-response', desc: 'Rapid response & eradication.', LucideIcon: Search },
      { label: 'Risk & Compliance', href: '/services/risk-compliance', desc: 'Regulatory alignment & audit.', LucideIcon: ClipboardCheck },
      { label: 'Architecture & Engineering', href: '/services/architecture-engineering', desc: 'Custom cyber solutions.', LucideIcon: Cpu },
      { label: 'Digital Risk & Monitoring', href: '/services/digital-risk-monitoring', desc: 'Brand & asset protection.', LucideIcon: Activity }
    ]
  },
  { label: 'Industries', href: '/industries' },
  {
    label: 'Resources',
    href: '/resources',
    dropdownWidth: 'w-[600px]',
    dropdownCols: 'grid-cols-3', // 3 up, 2 down
    dropdownOffset: '-translate-x-[60%]', // Shift left to keep it centered on screen without spilling right
    subItems: [
      { label: 'Blogs', href: '/resources/blogs', desc: 'Latest insights, research, and security news.', LucideIcon: FileText },
      { label: 'Case Studies', href: '/resources/case-studies', desc: 'Real-world deployment success stories.', LucideIcon: Book },
      { label: 'Advisories', href: '/resources/advisories', desc: 'Vulnerability disclosures and threat alerts.', LucideIcon: AlertTriangle },
      { label: 'Infosec Dictionary', href: '/resources/infosec-dictionary', desc: 'Comprehensive glossary of cybersecurity terms.', LucideIcon: BookOpen },
      { label: 'Security Mindmap', href: '/resources/security-mindmap', desc: 'Cybersecurity Architecture Framework.', LucideIcon: Brain }
    ]
  },
  { label: 'Careers', href: '/careers' }
];
