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
    slug: 'risk-compliance',
    name: 'Cyber Advisory & Risk Governance',
    eyebrow: 'STRATEGIC LEADERSHIP',
    title: 'Cyber Advisory &',
    highlight: 'Risk Governance',
    subtitle: 'Strategic cybersecurity leadership and risk management tailored for enterprise resilience.',
    description: 'Security strategy, governance frameworks, architecture design, and vCISO advisory services.',
    icon: Shield,
    overview: {
      heading: 'Aligning Security with',
      highlight: 'Business Objectives',
      body: [
        'QuasarCyberTech helps organizations move beyond purely reactive security by establishing robust governance frameworks and strategic roadmaps. We align your cybersecurity posture with your risk tolerance and business growth goals.',
        'Our advisory services bridge the gap between technical security controls and executive-level risk management, ensuring that every security investment delivers measurable business value.'
      ],
      outcomes: ['Strategic Alignment', 'Risk Transparency', 'Governance Maturity', 'Executive Confidence'],
      metrics: [
        { value: '40+', label: 'Governance Frameworks Implemented' },
        { value: '25+', label: 'vCISO Engagements' }
      ]
    },
    services: [
      { name: 'Cybersecurity Strategy Consulting', description: 'Building multi-year security roadmaps aligned with digital transformation.', icon: Compass },
      { name: 'Security Architecture Review', description: 'Validating infrastructure design against best practices and Zero Trust principles.', icon: Layers },
      { name: 'Virtual CISO (vCISO)', description: 'Expert security leadership on-demand for strategy and oversight.', icon: Shield },
      { name: 'Zero Trust Architecture Design', description: 'Implementing identity-centric security models for modern perimeters.', icon: Shield },
      { name: 'Tabletop Exercises', description: 'Simulating executive response to complex cyber crisis scenarios.', icon: Radio }
    ],
    delivery: [
      { step: '01', title: 'Discovery', description: 'Understanding business context, regulatory requirements, and risk tolerance.' },
      { step: '02', title: 'Assessment', description: 'Evaluating current state maturity against target governance frameworks.' },
      { step: '03', title: 'Blueprint', description: 'Designing the target architecture and multi-phase implementation roadmap.' },
      { step: '04', title: 'Execution', description: 'Guiding the implementation of governance controls and strategic shifts.' }
    ],
    industries: [
      { name: 'Banking & Financial', slug: 'banking', useCase: 'Establishing RBI-compliant cybersecurity governance and risk frameworks.' },
      { name: 'Healthcare', slug: 'healthcare', useCase: 'Securing patient data through HIPAA-aligned strategy and architecture.' },
      { name: 'Manufacturing', slug: 'enterprise', useCase: 'Aligning IT and OT security strategy for manufacturing resilience.' }
    ],
    platformLink: {
      name: 'QPulse',
      subtitle: 'Cybersecurity insights and research portal power by QCT intelligence.',
      highlights: ['Deep-dive risk analysis', 'Regulatory trend tracking', 'Executive briefings'],
      ctaLabel: 'Visit QPulse Portal',
      ctaLink: 'https://qpulse.quasarcybertech.com',
      isExternal: true
    }
  },
  {
    slug: 'compliance',
    name: 'Compliance & Regulatory Assurance',
    eyebrow: 'REGULATORY TRUST',
    title: 'Compliance &',
    highlight: 'Regulatory Assurance',
    subtitle: 'Navigating the complex global regulatory landscape with automated assurance and expert guidance.',
    description: 'Regulatory readiness and compliance programs including RBI, ISO 27001, SOC2, and global standards.',
    icon: ClipboardCheck,
    overview: {
      heading: 'Turning Compliance into a',
      highlight: 'Competitive Advantage',
      body: [
        'Compliance is no longer just a checkbox; it is a fundamental requirement for market access and customer trust. QuasarCyberTech simplifies the audit journey through structured readiness programs and continuous assurance techniques.',
        'We specialize in sector-specific regulations, helping financial institutions, healthcare providers, and high-tech firms meet stringent requirements efficiently.'
      ],
      outcomes: ['Audit Readiness', 'Reduced Risk', 'Continuous Assurance', 'Market Access'],
      metrics: [
        { value: '100%', label: 'Audit Success Rate' },
        { value: '15+', label: 'Global Standards Supported' }
      ]
    },
    services: [
      { name: 'ISO 27001 Consulting', description: 'End-to-end guidance for achieving and maintaining ISO certification.', icon: ClipboardCheck },
      { name: 'SOC2 Readiness', description: 'Preparing service organizations for successful AICPA SOC audit reports.', icon: ClipboardCheck },
      { name: 'RBI Compliance', description: 'Specialized assurance for financial institutions per RBI cybersecurity guidelines.', icon: Shield },
      { name: 'Regulatory Gap Assessment', description: 'Identifying and remediating shortcomings in current compliance posture.', icon: Radio },
      { name: 'Cloud Compliance Review', description: 'Validating cloud configurations against regional and industry standards.', icon: Cloud }
    ],
    delivery: [
      { step: '01', title: 'Scoping', description: 'Defining the audit boundary and control environment requirements.' },
      { step: '02', title: 'Gap Analysis', description: 'Mapping current controls to regulatory requirements to find missing links.' },
      { step: '03', title: 'Remediation', description: 'Updating policies, processes, and technical controls to close gaps.' },
      { step: '04', title: 'Pre-Audit', description: 'Performing a final mock-audit to ensure readiness for external certification.' }
    ],
    industries: [
      { name: 'FinTech', slug: 'fintech', useCase: 'Achieving SOC2 Type II compliance for cloud-native payment platforms.' },
      { name: 'Banking', slug: 'banking', useCase: 'Meeting RBI cybersecurity framework requirements for digital banking.' },
      { name: 'SaaS', slug: 'saas', useCase: 'Maintaining global compliance to win enterprise-scale customers.' }
    ]
  },
  {
    slug: 'red-team-adversary-simulation',
    name: 'Offensive Security Engineering',
    eyebrow: 'VALIDATION',
    title: 'Offensive',
    highlight: 'Security Engineering',
    subtitle: 'Think like an adversary to protect like an expert. Validating your defenses through advanced simulation.',
    description: 'Advanced penetration testing, red teaming, application security testing, and AI security validation.',
    icon: Crosshair,
    overview: {
      heading: 'Continuous Validation of',
      highlight: 'Security Controls',
      body: [
        'QuasarCyberTech’s offensive security team provides deep-dive testing that goes beyond automated scanning. We simulate real-world attacks to find business logic flaws and complex vulnerabilities that impact your bottom line.',
        'From web applications to legacy infrastructure and emerging AI models, we deliver actionable intelligence to fix exposures before they are exploited.'
      ],
      outcomes: ['Exposure Visibility', 'Remediation Guidance', 'Attack Resilience', 'System Hardening'],
      metrics: [
        { value: '500+', label: 'Critical Vulnerabilities Discovered' },
        { value: '70+', label: 'Enterprise Apps Tested' }
      ]
    },
    services: [
      { name: 'Web Application VAPT', description: 'Deep-dive manual testing for complex business logic vulnerabilities.', icon: Crosshair },
      { name: 'Mobile & API Testing', description: 'Securing the backend and mobile surfaces of digital platforms.', icon: Radio },
      { name: 'Red Team Assessments', description: 'Simulating full-scale adversary attacks against people, process, and tech.', icon: Shield },
      { name: 'LLM Penetration Testing', description: 'Specialized validation for Generative AI and Large Language Model security.', icon: Cpu },
      { name: 'Agentic AI Security Review', description: 'Assessing the autonomy and safety of AI agents in enterprise workflows.', icon: Layers }
    ],
    delivery: [
      { step: '01', title: 'Reconnaissance', description: 'Mapping the attack surface and gathering intelligence on targeted assets.' },
      { step: '02', title: 'Exploitation', description: 'Attempting authorized breach of identified vulnerabilities to confirm risk.' },
      { step: '03', title: 'Analysis', description: 'Correlating findings to understand the root cause of security failures.' },
      { step: '04', title: 'Debrief', description: 'Delivering technical remediation steps and executive risk summaries.' }
    ],
    industries: [
      { name: 'SaaS & Technology', slug: 'saas', useCase: 'Hardening global B2B platforms against advanced application layer attacks.' },
      { name: 'Retail & E-commerce', slug: 'ecommerce', useCase: 'Validating payment gateways and customer data security under peak load.' },
      { name: 'Banking', slug: 'banking', useCase: 'Red teaming core banking infrastructure to prove regulatory resilience.' }
    ],
    platformLink: {
      name: 'QRGT Platform',
      subtitle: 'Penetration Testing as a Service (PTaaS) for continuous validation.',
      highlights: ['Real-time testing visibility', 'Vulnerability management', 'Governed remediation'],
      ctaLabel: 'Explore QRGT Platform',
      ctaLink: '/platforms/qrgt',
      isExternal: false
    }
  },
  {
    slug: 'cloud-security',
    name: 'Cloud & Infrastructure Security',
    eyebrow: 'MODERN PERIMETER',
    title: 'Cloud &',
    highlight: 'Infrastructure Security',
    subtitle: 'Securing the foundational layer of modern business. Architecture and hardening for cloud-native scale.',
    description: 'Cloud security architecture, configuration assessments, container security, and CSPM.',
    icon: Cloud,
    overview: {
      heading: 'Protecting the',
      highlight: 'Cloud-Native Enterprise',
      body: [
        'As operations shift to AWS, Azure, and GCP, the security surface changes. QuasarCyberTech provides the engineering expertise to secure cloud configurations, Kubernetes clusters, and multi-cloud environments.',
        'We focus on Cloud Security Posture Management (CSPM) and Infrastructure-as-Code (IaC) security to ensure that your cloud journey is secure by design.'
      ],
      outcomes: ['Config Governance', 'Container Security', 'Multi-Cloud Visibility', 'Reduced Exposure'],
      metrics: [
        { value: '30+', label: 'Clouds Environments Hardened' },
        { value: '1M+', label: 'Cloud Assets Monitored' }
      ]
    },
    services: [
      { name: 'Cloud Security Assessments', description: 'Configuration audit and risk analysis for AWS, Azure, and Google Cloud.', icon: Cloud },
      { name: 'Kubernetes Security', description: 'Hardening container orchestration, images, and cluster networking.', icon: Layers },
      { name: 'CSPM Implementation', description: 'Automating continuous governance and compliance across cloud accounts.', icon: Cpu },
      { name: 'Infrastructure Hardening', description: 'Applying CIS benchmarks and best practices to core OS and network layers.', icon: Shield }
    ],
    delivery: [
      { step: '01', title: 'Visibility', description: 'Gaining a full inventory of cloud assets and identity permissions.' },
      { step: '02', title: 'Policy Mapping', description: 'Defining organizational security guardrails for cloud consumption.' },
      { step: '03', title: 'Engineering', description: 'Implementing technical controls, encryption, and network segmentation.' },
      { step: '04', title: 'Automation', description: 'Integrating security checks into DevSecOps pipelines and Iac.' }
    ],
    industries: [
      { name: 'SaaS', slug: 'saas', useCase: 'Implementing zero-trust networking for multi-tenant SaaS environments.' },
      { name: 'Healthcare', slug: 'healthcare', useCase: 'Maintaining EPHI security within public cloud hosting frameworks.' },
      { name: 'FinTech', slug: 'fintech', useCase: 'Securing serverless payment architectures against misconfiguration.' }
    ]
  },
  {
    slug: 'managed-security-operations',
    name: 'Managed Defense Operations',
    eyebrow: 'RESILIENCE',
    title: 'Managed',
    highlight: 'Defense Operations',
    subtitle: '24/7 detection and response to protect your enterprise from evolving cyber threats.',
    description: 'Continuous monitoring, SOC operations, incident response, and threat detection services.',
    icon: Radio,
    overview: {
      heading: 'Vigilance that',
      highlight: 'Never Sleeps',
      body: [
        'QuasarCyberTech’s Managed Defense Operations combine expert security analysts with advanced detection platforms to provide around-the-clock protection. We don’t just alert; we respond.',
        'Our SOC-as-a-Service model provides enterprise-grade monitoring without the overhead of building an in-house team, ensuring that threats are contained within minutes, not days.'
      ],
      outcomes: ['MTTR Reduction', 'Continuous Visibility', 'Expert IR Readiness', 'Operational Peace'],
      metrics: [
        { value: '24/7', label: 'Detection & Response' },
        { value: '15 Min', label: 'Average Critical Response' }
      ]
    },
    services: [
      { name: 'Managed SOC', description: 'Omni-channel monitoring and analysis from our Global Security Operations Center.', icon: Radio },
      { name: 'Threat Detection', description: 'Real-time correlation of security events to surface hidden adversary behavior.', icon: Eye },
      { name: 'Incident Response', description: 'Rapid investigation, containment, and recovery guidance for active breaches.', icon: Shield },
      { name: 'Threat Hunting', description: 'Proactively searching for persistent actors within your environment.', icon: Crosshair },
      { name: 'Social Engineering', description: 'Testing the human perimeter through phishing and vishing simulations.', icon: Layers }
    ],
    delivery: [
      { step: '01', title: 'Onboarding', description: 'Integrating log sources and establishing communication protocols.' },
      { step: '02', title: 'Baselining', description: 'Learning normal environment behavior to reduce false positives.' },
      { step: '03', title: 'Monitoring', description: '24/7 alert analysis and event correlation by security experts.' },
      { step: '04', title: 'Response', description: 'Immediate action on critical alerts to contain and remediate threats.' }
    ],
    industries: [
      { name: 'Banking', slug: 'banking', useCase: '24/7 monitoring of core banking systems and digital channels.' },
      { name: 'Manufacturing', slug: 'enterprise', useCase: 'Industrial SOC monitoring for OT and critical production lines.' },
      { name: 'E-commerce', slug: 'ecommerce', useCase: 'Protecting transaction data during holiday peaks and global sales.' }
    ]
  },
  {
    slug: 'digital-risk-monitoring',
    name: 'Cyber Intelligence & Security Research',
    eyebrow: 'INFORMATION ADVANTAGE',
    title: 'Cyber Intelligence &',
    highlight: 'Security Research',
    subtitle: 'Strategic intelligence and vulnerability research to stay one step ahead of global threat actors.',
    description: 'Threat intelligence, dark web monitoring, vulnerability research, and security advisories.',
    icon: Eye,
    overview: {
      heading: 'Intelligence-Led',
      highlight: 'Security Strategy',
      body: [
        'Understanding the adversary is the first step to defeating them. QuasarCyberTech provides curated threat intelligence that provides context to the noise of the global threat landscape.',
        'Through dark web monitoring and deep security research, we provide early warnings of brand exposure and emerging exploit techniques relevant to your vertical.'
      ],
      outcomes: ['Early Warning', 'Brand Protection', 'Reduced Noise', 'Strategic Insight'],
      metrics: [
        { value: '1,000+', label: 'Dark Web Leak Monitors' },
        { value: 'Monthly', label: 'Strategic Advisories' }
      ]
    },
    services: [
      { name: 'Threat Intelligence (CTI)', description: 'Industry-specific intelligence on evolving threat actors and techniques.', icon: Eye },
      { name: 'Dark Web Monitoring', description: 'Tracking leaked credentials and sensitive brand data on underground forums.', icon: Shield },
      { name: 'Brand Reputation Monitoring', description: 'Protecting your digital identity from spoofing and malicious impersonation.', icon: Radio },
      { name: 'Vulnerability Research', description: 'Analyzing emerging exploits and zero-day risks in common supply chains.', icon: Crosshair },
      { name: 'Security Advisories', description: 'Timely, actionable alerts on critical security developments relevant to your firm.', icon: ClipboardCheck }
    ],
    delivery: [
      { step: '01', title: 'Profiling', description: 'Defining your digital footprint and the threat actors targeting your sector.' },
      { step: '02', title: 'Collection', description: 'Aggregating data from open source, dark web, and proprietary QCT feeds.' },
      { step: '03', title: 'Analysis', description: 'Filtering noise to find actionable intelligence relevant to your assets.' },
      { step: '04', title: 'Dissemination', description: 'Delivering regular briefings and emergency alerts to your security leadership.' }
    ],
    industries: [
      { name: 'Healthcare', slug: 'healthcare', useCase: 'Monitoring underground medical data leaks and patient data sales.' },
      { name: 'Banking', slug: 'banking', useCase: 'Tracking financial malware campaigns targeting regional banking customers.' },
      { name: 'Technology', slug: 'saas', useCase: 'Supply chain intelligence for software and cloud providers.' }
    ],
    platformLink: {
      name: 'QStellar',
      subtitle: 'AI-powered asset intelligence and vulnerability management platform.',
      highlights: ['External asset discovery', 'Risk-based prioritization', 'Threat landscape visibility'],
      ctaLabel: 'Visit QStellar Platform',
      ctaLink: 'https://qstellar.quasarcybertech.com',
      isExternal: true
    }
  }
];
