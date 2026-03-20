import { Shield, ClipboardCheck, Crosshair, Cloud, Radio, Eye, Compass, Layers, Cpu } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CapabilityData {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  overview: {
    heading: string;
    highlight: string;
    body: string[];
    outcomes: string[];
    metrics: { value: string; label: string }[];
  };
  services: {
    name: string;
    description: string;
    icon: LucideIcon;
    image?: string;
  }[];
  delivery: {
    step: string;
    title: string;
    description: string;
  }[];
  industries: {
    name: string;
    slug: string;
    useCase: string;
  }[];
  platformLink?: {
    name: string;
    subtitle: string;
    highlights: string[];
    ctaLabel: string;
    ctaLink: string;
    isExternal: boolean;
  };
}

export const capabilitiesData: CapabilityData[] = [
  {
    slug: 'cyber-advisory-risk-governance',
    name: 'Cyber Advisory & Risk Governance',
    eyebrow: 'ADVISORY & GOVERNANCE',
    title: 'Cyber Advisory &',
    highlight: 'Risk Governance',
    subtitle: 'Strategic cybersecurity leadership and risk management tailored for enterprise resilience.',
    description: 'Security strategy, governance frameworks, architecture design, and vCISO advisory services.',
    icon: Shield,
    overview: {
      heading: 'Aligning Security with',
      highlight: 'Risk Governance',
      body: [
        'Strategic cybersecurity leadership is the foundation of digital trust. QuasarCyberTech provides the executive-level guidance needed to align complex security requirements with your core business objectives.',
        'We help organizations move beyond compliance to true resilience, ensuring that security strategy is a proactive enabler of enterprise innovation and growth.'
      ],
      outcomes: ['Risk Reduction', 'Strategic Clarity', 'Executive Confidence'],
      metrics: [
        { value: '120+', label: 'Security Engagements' },
        { value: '15+', label: 'Countries Served' },
        { value: '70+', label: 'Enterprise Applications Assessed' },
        { value: '24/7', label: 'Security Operations Monitoring' }
      ]
    },
    services: [
      { name: 'Cybersecurity Strategy Consulting', description: 'Building multi-year security roadmaps aligned with business growth.', icon: Compass, image: '/src/assets/capabilities/services/cyber-advisory/strategy-consulting.jpg' },
      { name: 'Security Architecture Review', description: 'Validating infrastructure design against best practices and Zero Trust.', icon: Layers, image: '/src/assets/capabilities/services/cyber-advisory/architecture-review.jpg' },
      { name: 'vCISO Services', description: 'Expert security leadership on-demand for strategy and oversight.', icon: Shield, image: '/src/assets/capabilities/services/cyber-advisory/vciso.jpg' },
      { name: 'Zero Trust Architecture Design & Review', description: 'Implementing identity-centric security models for modern perimeters.', icon: Shield, image: '/src/assets/capabilities/services/cyber-advisory/zero-trust.jpg' },
      { name: 'Tabletop Exercises & Cyber War Games', description: 'Simulating executive response to complex cyber crisis scenarios.', icon: Radio, image: '/src/assets/capabilities/services/cyber-advisory/tabletop.jpg' }
    ],
    delivery: [
      { step: '01', title: 'Discover', description: 'Understanding business context, regulatory requirements, and risk tolerance.' },
      { step: '02', title: 'Assess', description: 'Evaluating current state maturity against target governance frameworks.' },
      { step: '03', title: 'Design', description: 'Designing the target architecture and multi-phase implementation roadmap.' },
      { step: '04', title: 'Sustain', description: 'Providing continuous oversight and evolution of the security posture.' }
    ],
    industries: [
      { name: 'Banking & Financial', slug: 'banking', useCase: 'Establishing RBI-compliant cybersecurity governance and risk frameworks.' },
      { name: 'Healthcare', slug: 'healthcare', useCase: 'Securing patient data through HIPAA-aligned strategy and architecture.' },
      { name: 'Manufacturing', slug: 'enterprise', useCase: 'Aligning IT and OT security strategy for manufacturing resilience.' }
    ]
  },
  {
    slug: 'compliance-regulatory-assurance',
    name: 'Compliance & Regulatory Assurance',
    eyebrow: 'REGULATORY TRUST',
    title: 'Compliance &',
    highlight: 'Regulatory Assurance',
    subtitle: 'Navigating the complex global regulatory landscape with automated assurance and expert guidance.',
    description: 'Regulatory readiness and compliance programs including RBI, ISO 27001, SOC2, and global standards.',
    icon: ClipboardCheck,
    overview: {
      heading: 'Aligning Security with',
      highlight: 'Regulatory Readiness',
      body: [
        'Compliance is a fundamental requirement for market access and customer trust. QuasarCyberTech simplifies the audit journey through structured readiness programs and continuous assurance techniques.',
        'We specialize in sector-specific regulations, helping financial institutions and high-tech firms meet stringent requirements efficiently while maintaining operational speed.'
      ],
      outcomes: ['Regulatory Readiness', 'Audit Confidence', 'Risk Visibility'],
      metrics: [
        { value: '120+', label: 'Security Engagements' },
        { value: '15+', label: 'Countries Served' },
        { value: '70+', label: 'Enterprise Applications Assessed' },
        { value: '24/7', label: 'Security Operations Monitoring' }
      ]
    },
    services: [
      { name: 'RBI Cyber Security Framework Compliance', description: 'Specialized assurance for financial institutions per RBI guidelines.', icon: Shield },
      { name: 'ISO 27001 Consulting', description: 'End-to-end guidance for achieving and maintaining ISO certification.', icon: ClipboardCheck },
      { name: 'SOC2 Readiness', description: 'Preparing service organizations for successful AICPA SOC audit reports.', icon: ClipboardCheck },
      { name: 'Regulatory Gap Assessment', description: 'Identifying and remediating shortcomings in current compliance posture.', icon: Radio },
      { name: 'Risk & Compliance Monitoring', description: 'Continuous visibility into regulatory alignment and control effectiveness.', icon: Eye }
    ],
    delivery: [
      { step: '01', title: 'Gap Analysis', description: 'Mapping current controls to regulatory requirements to find missing links.' },
      { step: '02', title: 'Roadmap', description: 'Defining the remediation path to reach full compliance readiness.' },
      { step: '03', title: 'Implement', description: 'Updating policies, processes, and technical controls to close gaps.' },
      { step: '04', title: 'Certify', description: 'Preparing for and supporting the final audit or certification phase.' }
    ],
    industries: [
      { name: 'FinTech', slug: 'fintech', useCase: 'Achieving SOC2 Type II compliance for cloud-native payment platforms.' },
      { name: 'Banking', slug: 'banking', useCase: 'Meeting RBI cybersecurity framework requirements for digital banking.' },
      { name: 'SaaS', slug: 'saas', useCase: 'Maintaining global compliance to win enterprise-scale customers.' }
    ]
  },
  {
    slug: 'offensive-security-engineering',
    name: 'Offensive Security Engineering',
    eyebrow: 'VALIDATION',
    title: 'Offensive',
    highlight: 'Security Engineering',
    subtitle: 'Think like an adversary to protect like an expert. Validating your defenses through advanced simulation.',
    description: 'Advanced penetration testing, red teaming, application security testing, and AI security validation.',
    icon: Crosshair,
    overview: {
      heading: 'Aligning Security with',
      highlight: 'Adversary Defense',
      body: [
        'Defending an enterprise requires understanding the attack vectors used by modern adversaries. QuasarCyberTech provides deep-dive validation that goes beyond automated scanning to find real business risk.',
        'We simulate real-world attacks to identify logic flaws and complex vulnerabilities, delivering the intelligence needed to fix exposures before they are exploited.'
      ],
      outcomes: ['Vulnerability Exposure', 'Breach Prevention', 'Code Assurance'],
      metrics: [
        { value: '120+', label: 'Security Engagements' },
        { value: '15+', label: 'Countries Served' },
        { value: '70+', label: 'Enterprise Applications Assessed' },
        { value: '24/7', label: 'Security Operations Monitoring' }
      ]
    },
    services: [
      { name: 'Web Application VAPT', description: 'Deep-dive manual testing for complex business logic vulnerabilities.', icon: Crosshair },
      { name: 'Mobile & API Security Testing', description: 'Securing the backend and mobile surfaces of digital platforms.', icon: Radio },
      { name: 'Red Team Assessments', description: 'Simulating full-scale adversary attacks against people, process, and tech.', icon: Shield },
      { name: 'Secure Code Review', description: 'Identifying security flaws at the source code level early in the SDLC.', icon: Layers },
      { name: 'LLM Penetration Testing', description: 'Specialized validation for Generative AI and Large Language Model security.', icon: Cpu },
      { name: 'Agentic AI Security Review', description: 'Assessing the autonomy and safety of AI agents in enterprise workflows.', icon: Shield }
    ],
    delivery: [
      { step: '01', title: 'Scope', description: 'Defining the attack surface and gathering intelligence on targeted assets.' },
      { step: '02', title: 'Test', description: 'Attempting authorized breach of identified vulnerabilities to confirm risk.' },
      { step: '03', title: 'Report', description: 'Correlating findings to understand the root cause of security failures.' },
      { step: '04', title: 'Remediate', description: 'Delivering technical remediation steps and validating implemented fixes.' }
    ],
    industries: [
      { name: 'SaaS & Technology', slug: 'saas', useCase: 'Hardening global B2B platforms against advanced application layer attacks.' },
      { name: 'Retail & E-commerce', slug: 'ecommerce', useCase: 'Validating payment gateways and customer data security under peak load.' },
      { name: 'Banking', slug: 'banking', useCase: 'Red teaming core banking infrastructure to prove regulatory resilience.' }
    ],
    platformLink: {
      name: 'QRGT',
      subtitle: 'Penetration Testing as a Service (PTaaS) for continuous validation.',
      highlights: ['Real-time testing visibility', 'Vulnerability management', 'Governed remediation tracking'],
      ctaLabel: 'Explore QRGT Platform',
      ctaLink: '/platforms/qrgt',
      isExternal: false
    }
  },
  {
    slug: 'cloud-infrastructure-security',
    name: 'Cloud & Infrastructure Security',
    eyebrow: 'MODERN PERIMETER',
    title: 'Cloud &',
    highlight: 'Infrastructure Security',
    subtitle: 'Securing the foundational layer of modern business. Architecture and hardening for cloud-native scale.',
    description: 'Cloud security architecture, configuration assessments, container security, and CSPM.',
    icon: Cloud,
    overview: {
      heading: 'Aligning Security with',
      highlight: 'Cloud Hardening',
      body: [
        'As operations shift to cloud-native platforms, the traditional network perimeter vanishes. QuasarCyberTech provides the engineering expertise to secure AWS, Azure, and Google Cloud environments.',
        'We focus on Cloud Security Posture Management (CSPM) and Kubernetes security to ensure your cloud infrastructure is resilient, compliant, and visible by design.'
      ],
      outcomes: ['Misconfiguration Prevention', 'Cloud Compliance', 'Posture Visibility'],
      metrics: [
        { value: '120+', label: 'Security Engagements' },
        { value: '15+', label: 'Countries Served' },
        { value: '70+', label: 'Enterprise Applications Assessed' },
        { value: '24/7', label: 'Security Operations Monitoring' }
      ]
    },
    services: [
      { name: 'Cloud Security Assessment', description: 'Configuration audit and risk analysis for AWS, Azure, and Google Cloud.', icon: Cloud },
      { name: 'AWS / Azure Security Assessment', description: 'Deep-dive validation of cloud identity, storage, and networking.', icon: Shield },
      { name: 'Kubernetes / Container Security', description: 'Hardening container orchestration, images, and cluster networking.', icon: Layers },
      { name: 'Cloud Security Posture Management (CSPM)', description: 'Automating continuous governance and compliance across cloud accounts.', icon: Cpu },
      { name: 'Cloud Compliance Review', description: 'Validating cloud configurations against regional and industry standards.', icon: Eye }
    ],
    delivery: [
      { step: '01', title: 'Inventory', description: 'Gaining a full inventory of cloud assets and identity permissions.' },
      { step: '02', title: 'Assess', description: 'Evaluating current state maturity against target cloud frameworks.' },
      { step: '03', title: 'Harden', description: 'Implementing technical controls, encryption, and network segmentation.' },
      { step: '04', title: 'Monitor', description: 'Integrating security checks into DevSecOps pipelines and Iac.' }
    ],
    industries: [
      { name: 'SaaS', slug: 'saas', useCase: 'Implementing zero-trust networking for multi-tenant SaaS environments.' },
      { name: 'Healthcare', slug: 'healthcare', useCase: 'Maintaining EPHI security within public cloud hosting frameworks.' },
      { name: 'FinTech', slug: 'fintech', useCase: 'Securing serverless payment architectures against misconfiguration.' }
    ],
    platformLink: {
      name: 'QStellar',
      subtitle: 'AI-powered asset intelligence and vulnerability management platform.',
      highlights: ['Cloud asset discovery', 'Risk-based prioritization', 'Posture visibility'],
      ctaLabel: 'Visit QStellar Platform',
      ctaLink: 'https://qstellar.co',
      isExternal: true
    }
  },
  {
    slug: 'managed-defense-operations',
    name: 'Managed Defense Operations',
    eyebrow: 'RESILIENCE',
    title: 'Managed',
    highlight: 'Defense Operations',
    subtitle: '24/7 detection and response to protect your enterprise from evolving cyber threats.',
    description: 'Continuous monitoring, SOC operations, incident response, and threat detection services.',
    icon: Radio,
    overview: {
      heading: 'Aligning Security with',
      highlight: 'Operational Vigilance',
      body: [
        'Security operations must be continuous to be effective. QuasarCyberTech combines advanced detection platforms with expert analysts to provide around-the-clock protection and response.',
        'We don’t just alert; we act. Our managed defense model ensures that threats are contained and remediated within minutes, shielding your business from downtime.'
      ],
      outcomes: ['24/7 Coverage', 'Rapid Response', 'Threat Containment'],
      metrics: [
        { value: '120+', label: 'Security Engagements' },
        { value: '15+', label: 'Countries Served' },
        { value: '70+', label: 'Enterprise Applications Assessed' },
        { value: '24/7', label: 'Security Operations Monitoring' }
      ]
    },
    services: [
      { name: 'Managed SOC', description: 'Omni-channel monitoring and analysis from our Global Security Operations Center.', icon: Radio },
      { name: 'Threat Detection & Monitoring', description: 'Real-time correlation of security events to surface adversary behavior.', icon: Eye },
      { name: 'Incident Response', description: 'Rapid investigation, containment, and recovery guidance for active breaches.', icon: Shield },
      { name: 'Threat Hunting', description: 'Proactively searching for persistent actors within your environment.', icon: Crosshair },
      { name: 'Social Engineering & Phishing Simulations', description: 'Testing the human perimeter through phishing and vishing simulations.', icon: Layers }
    ],
    delivery: [
      { step: '01', title: 'Onboard', description: 'Integrating log sources and establishing communication protocols.' },
      { step: '02', title: 'Monitor', description: '24/7 alert analysis and event correlation by security experts.' },
      { step: '03', title: 'Detect', description: 'Learning normal environment behavior to surface relevant anomalies.' },
      { step: '04', title: 'Respond', description: 'Immediate action on critical alerts to contain and remediate threats.' }
    ],
    industries: [
      { name: 'Banking', slug: 'banking', useCase: '24/7 monitoring of core banking systems and digital channels.' },
      { name: 'Manufacturing', slug: 'enterprise', useCase: 'Industrial SOC monitoring for OT and critical production lines.' },
      { name: 'E-commerce', slug: 'ecommerce', useCase: 'Protecting transaction data during holiday peaks and global sales.' }
    ],
    platformLink: {
      name: 'QStellar',
      subtitle: 'AI-powered asset intelligence and vulnerability management platform.',
      highlights: ['Internal asset visibility', 'Real-time threat monitoring', 'Response orchestration'],
      ctaLabel: 'Visit QStellar Platform',
      ctaLink: 'https://qstellar.co',
      isExternal: true
    }
  },
  {
    slug: 'cyber-intelligence-security-research',
    name: 'Cyber Intelligence & Security Research',
    eyebrow: 'INFORMATION ADVANTAGE',
    title: 'Cyber Intelligence &',
    highlight: 'Security Research',
    subtitle: 'Strategic intelligence and vulnerability research to stay one step ahead of global threat actors.',
    description: 'Threat intelligence, dark web monitoring, vulnerability research, and security advisories.',
    icon: Eye,
    overview: {
      heading: 'Aligning Security with',
      highlight: 'Strategic Intelligence',
      body: [
        'Strategic advantage comes from understanding the global threat actor landscape. QuasarCyberTech provides filtered, actionable intelligence tailored to your industry and digital footprint.',
        'We help organizations anticipate emerging exploit techniques and brand exposure, moving security from a reactive struggle to a proactive position of strength.'
      ],
      outcomes: ['Threat Visibility', 'Brand Protection', 'Proactive Defense'],
      metrics: [
        { value: '120+', label: 'Security Engagements' },
        { value: '15+', label: 'Countries Served' },
        { value: '70+', label: 'Enterprise Applications Assessed' },
        { value: '24/7', label: 'Security Operations Monitoring' }
      ]
    },
    services: [
      { name: 'Cyber Threat Intelligence (CTI) as a Service', description: 'Industry-specific intelligence on evolving threat actors.', icon: Eye },
      { name: 'Dark Web Brand Intelligence', description: 'Tracking leaked credentials and brand data on underground forums.', icon: Shield },
      { name: 'Brand Reputation Monitoring', description: 'Protecting your digital identity from spoofing and impersonation.', icon: Radio },
      { name: 'Vulnerability Research', description: 'Analyzing emerging exploits and zero-day risks in supply chains.', icon: Crosshair },
      { name: 'Security Advisories', description: 'Timely, actionable alerts on critical security developments.', icon: ClipboardCheck }
    ],
    delivery: [
      { step: '01', title: 'Profile', description: 'Defining your digital footprint and the threat actors targeting your sector.' },
      { step: '02', title: 'Monitor', description: 'Aggregating data from open source, dark web, and proprietary feeds.' },
      { step: '03', title: 'Analyze', description: 'Filtering noise to find actionable intelligence relevant to your assets.' },
      { step: '04', title: 'Report', description: 'Delivering regular briefings and emergency alerts to leadership.' }
    ],
    industries: [
      { name: 'Healthcare', slug: 'healthcare', useCase: 'Monitoring underground medical data leaks and patient data sales.' },
      { name: 'Banking', slug: 'banking', useCase: 'Tracking financial malware campaigns targeting regional banking customers.' },
      { name: 'Technology', slug: 'saas', useCase: 'Supply chain intelligence for software and cloud providers.' }
    ],
    platformLink: {
      name: 'QPulse',
      subtitle: 'Cybersecurity insights and research portal power by QCT intelligence.',
      highlights: ['Threat intelligence feeds', 'Vulnerability briefings', 'Brand reputation data'],
      ctaLabel: 'Visit QPulse Portal',
      ctaLink: '/insights',
      isExternal: false
    }
  }
];
