import { Shield, ClipboardCheck, Crosshair, Cloud, Radio, Eye, Compass, Layers, Cpu, Target, Zap, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Advisory Sub-capability Images
import imgCyberStrategy from '../assets/capabilities/Cyber Advisory & Risk Governance/strategy_consulting.png';
import imgArchReview from '../assets/capabilities/Cyber Advisory & Risk Governance/architecture_review.png';
import imgvCISO from '../assets/capabilities/Cyber Advisory & Risk Governance/vciso_services.png';
import imgZeroTrust from '../assets/capabilities/Cyber Advisory & Risk Governance/zero_trust.png';
import imgTabletop from '../assets/capabilities/Cyber Advisory & Risk Governance/tabletop_war_game.png';

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
    proofPoints: { label: string; value: string }[];
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
  platformLink: {
    name: string;
    heading: string;
    body: string;
    ctaLabel: string;
    ctaLink: string;
    isExternal: boolean;
  };
  finalCTA?: {
    heading: string;
    subtext: string;
  };
}

export const capabilitiesData: CapabilityData[] = [
  {
    slug: 'cyber-advisory-risk-governance',
    name: 'Cyber Advisory & Risk Governance',
    eyebrow: 'ADVISORY & GOVERNANCE',
    title: 'Cyber Advisory &',
    highlight: 'Risk Governance',
    subtitle: 'QuasarCyberTech enables enterprise leaders to define, govern, and mature cybersecurity programs through structured advisory, risk management, and architecture-driven strategies.',
    description: 'Security strategy, governance frameworks, architecture design, and vCISO advisory services.',
    icon: Shield,
    overview: {
      heading: 'Aligning Security with',
      highlight: 'Strategic Priorities',
      body: [
        'Cybersecurity leadership is foundational to building resilient and scalable digital enterprises. Organizations require structured governance models that align security investments with business priorities and regulatory expectations.',
        'QuasarCyberTech supports enterprises in transitioning from reactive security practices to proactive, risk-driven programs. We help define governance frameworks, strengthen executive decision-making, and ensure security becomes a strategic enabler of growth.'
      ],
      outcomes: ['Risk Reduction', 'Strategic Clarity', 'Executive Confidence'],
      proofPoints: [
        { label: "ENGAGEMENT DEPTH", value: "Multi-year advisory programs across BFSI, Healthcare, and Enterprise sectors" },
        { label: "FRAMEWORK COVERAGE", value: "NIST CSF · ISO 27001 · RBI · DPDP Act · SOC2" },
        { label: "DELIVERY MODEL", value: "On-demand vCISO + embedded consulting teams" }
      ]
    },
    services: [
      { name: 'Cybersecurity Strategy Consulting', description: 'Define long-term security roadmaps aligned with business objectives and risk appetite.', icon: Compass, image: imgCyberStrategy },
      { name: 'Security Architecture Review', description: 'Evaluate enterprise architectures to identify gaps and improve resilience.', icon: Layers, image: imgArchReview },
      { name: 'vCISO Services', description: 'Provide on-demand leadership to guide governance, compliance, and risk strategy.', icon: Shield, image: imgvCISO },
      { name: 'Zero Trust Architecture Design & Review', description: 'Design and validate Zero Trust models tailored to enterprise environments.', icon: Shield, image: imgZeroTrust },
      { name: 'Tabletop Exercises & Cyber War Games', description: 'Simulate real-world attack scenarios to strengthen organizational readiness.', icon: Radio, image: imgTabletop }
    ],
    delivery: [
      { step: '01', title: 'Discover', description: 'Understand business context, regulatory requirements, and risk landscape.' },
      { step: '02', title: 'Assess', description: 'Evaluate current maturity across governance, controls, and architecture.' },
      { step: '03', title: 'Design', description: 'Define target-state architecture and governance frameworks.' },
      { step: '04', title: 'Sustain', description: 'Enable continuous improvement through monitoring and leadership oversight.' }
    ],
    industries: [
      { name: 'Banking & Financial Services', slug: 'banking', useCase: 'Strengthening governance aligned with RBI and global frameworks.' },
      { name: 'Healthcare & Life Sciences', slug: 'healthcare', useCase: 'Managing sensitive data risks and compliance requirements.' },
      { name: 'Enterprise & Manufacturing', slug: 'enterprise', useCase: 'Aligning cybersecurity strategy with operational resilience.' }
    ],
    platformLink: {
      name: 'QStellar',
      heading: 'Powered by QStellar',
      body: 'Powered by QStellar for continuous asset visibility, governance insights, and risk posture monitoring.',
      ctaLabel: 'Explore QStellar →',
      ctaLink: 'https://qstellar.co',
      isExternal: true
    },
    finalCTA: {
      heading: "Strengthen Your Cyber Advisory Program",
      subtext: "Discuss Your Security Program"
    }
  },
  {
    slug: 'compliance-regulatory-assurance',
    name: 'Compliance & Regulatory Assurance',
    eyebrow: 'REGULATORY TRUST',
    title: 'Compliance &',
    highlight: 'Regulatory Assurance',
    subtitle: 'QuasarCyberTech helps enterprises achieve and sustain regulatory compliance through structured assessments, implementation support, and continuous monitoring.',
    description: 'Regulatory readiness and compliance programs including RBI, ISO 27001, SOC2, and global standards.',
    icon: ClipboardCheck,
    overview: {
      heading: 'Aligning Security with',
      highlight: 'Regulatory Mandates',
      body: [
        'Regulatory compliance is critical for maintaining trust, avoiding penalties, and enabling secure business operations. Organizations must align their security controls with evolving regulatory frameworks.',
        'QuasarCyberTech simplifies compliance by translating regulatory requirements into actionable controls and sustainable programs, ensuring readiness and long-term adherence.'
      ],
      outcomes: ['Regulatory Readiness', 'Audit Confidence', 'Risk Visibility'],
      proofPoints: [
        { label: "EXPERTISE", value: "Multi-framework expertise across global and regional standards" },
        { label: "DOCUMENTATION", value: "Audit-ready documentation support for seamless certification" },
        { label: "MONITORING", value: "Continuous compliance monitoring capability to avoid posture decay" }
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
      { step: '01', title: 'Discover', description: 'Regulatory scope and legal obligations identification.' },
      { step: '02', title: 'Assess', description: 'Current compliance posture and gap analysis.' },
      { step: '03', title: 'Design', description: 'Remediation roadmap and control framework definition.' },
      { step: '04', title: 'Implement', description: 'Control alignment and policy implementation.' },
      { step: '05', title: 'Sustain', description: 'Continuous monitoring and audit readiness.' }
    ],
    industries: [
      { name: 'BFSI', slug: 'banking', useCase: 'RBI compliance, framework adoption, and periodic audits.' },
      { name: 'SaaS', slug: 'saas', useCase: 'SOC2 readiness to enable enterprise customer acquisition.' },
      { name: 'Enterprises', slug: 'enterprise', useCase: 'ISO 27001 adoption for global security standardization.' }
    ],
    platformLink: {
      name: 'QStellar',
      heading: 'Powered by QStellar',
      body: 'Integrated with QStellar for compliance tracking and control monitoring.',
      ctaLabel: 'Explore QStellar →',
      ctaLink: 'https://qstellar.co',
      isExternal: true
    },
    finalCTA: {
      heading: "Simplify Your Compliance Journey",
      subtext: "Request a Consultation"
    }
  },
  {
    slug: 'offensive-security-engineering',
    name: 'Offensive Security Engineering',
    eyebrow: 'VALIDATION',
    title: 'Offensive',
    highlight: 'Security Engineering',
    subtitle: 'QuasarCyberTech delivers advanced offensive security testing to identify vulnerabilities, validate defenses, and strengthen enterprise resilience.',
    description: 'Advanced penetration testing, red teaming, application security testing, and AI security validation.',
    icon: Crosshair,
    overview: {
      heading: 'Aligning Security with',
      highlight: 'Adversary Tactics',
      body: [
        'Security must be continuously validated against evolving threats. Offensive testing provides real-world insights into vulnerabilities and attacker behavior.',
        'QuasarCyberTech enables enterprises to proactively identify and remediate weaknesses before they can be exploited.'
      ],
      outcomes: ['Vulnerability Exposure', 'Breach Prevention', 'Code Assurance'],
      proofPoints: [
        { label: "CAPABILITIES", value: "Advanced red team capabilities simulating nation-state actors" },
        { label: "AI EXPERTISE", value: "Specialized AI & LLM security validation and research" },
        { label: "FRAMEWORKS", value: "Continuous testing frameworks for agile development environments" }
      ]
    },
    services: [
      { name: 'Web Application VAPT', description: 'Identify vulnerabilities in web platforms through advanced manual testing.', icon: Crosshair },
      { name: 'Mobile & API Security Testing', description: 'Validate the security of mobile apps and backend API interfaces.', icon: Radio },
      { name: 'Red Team Assessments', description: 'Simulated multi-vector attacks to test full-spectrum organizational defense.', icon: Shield },
      { name: 'Secure Code Review', description: 'In-depth analysis of source code to find hidden security flaws.', icon: Layers },
      { name: 'LLM Penetration Testing', description: 'Penetration testing and safety review for Large Language Models.', icon: Cpu },
      { name: 'Agentic AI Security Review', description: 'Security validation for autonomous AI agents and workflows.', icon: Target }
    ],
    delivery: [
      { step: '01', title: 'Discover', description: 'Reconnaissance and attack surface mapping.' },
      { step: '02', title: 'Assess', description: 'Vulnerability identification and initial scanning.' },
      { step: '03', title: 'Exploit', description: 'Controlled attack simulation to confirm vulnerability impact.' },
      { step: '04', title: 'Report', description: 'Prioritized findings with technical remediation guidance.' },
      { step: '05', title: 'Retest', description: 'Validation of fixes to ensure effective remediation.' }
    ],
    industries: [
      { name: 'FinTech', slug: 'fintech', useCase: 'Securing transaction systems and digital payment platforms.' },
      { name: 'SaaS', slug: 'saas', useCase: 'Application security validation for global multi-tenant platforms.' },
      { name: 'Enterprises', slug: 'enterprise', useCase: 'Red teaming and breach simulation for resilient infrastructure.' }
    ],
    platformLink: {
      name: 'QRGT',
      heading: 'Powered by QRGT',
      body: 'Powered by QRGT for continuous offensive security validation and attack surface insights.',
      ctaLabel: 'Explore QRGT Platform →',
      ctaLink: '/platforms#qrgt',
      isExternal: false
    },
    finalCTA: {
      heading: "Validate Your Defenses Today",
      subtext: "Talk to a Security Expert"
    }
  },
  {
    slug: 'cloud-infrastructure-security',
    name: 'Cloud & Infrastructure Security',
    eyebrow: 'MODERN PERIMETER',
    title: 'Cloud &',
    highlight: 'Infrastructure Security',
    subtitle: 'QuasarCyberTech secures cloud and infrastructure environments through architecture reviews, assessments, and continuous posture management.',
    description: 'Cloud security architecture, configuration assessments, container security, and CSPM.',
    icon: Cloud,
    overview: {
      heading: 'Aligning Security with',
      highlight: 'Modern Infrastructure',
      body: [
        'Cloud adoption introduces new risks across infrastructure, identity, and configuration layers. Organizations require continuous visibility and control over cloud environments.',
        'QuasarCyberTech ensures secure cloud adoption by identifying risks, enforcing best practices, and enabling continuous monitoring.'
      ],
      outcomes: ['Misconfiguration Prevention', 'Cloud Compliance', 'Posture Visibility'],
      proofPoints: [
        { label: "EXPERTISE", value: "Multi-cloud architecture expertise (AWS, Azure, GCP)" },
        { label: "MODERN OPS", value: "Specialized Kubernetes & Container security operations" },
        { label: "VISIBILITY", value: "Continuous monitoring capabilities for multi-account environments" }
      ]
    },
    services: [
      { name: 'Cloud Security Assessment', description: 'Configuration and risk review for public and hybrid clouds.', icon: Cloud },
      { name: 'AWS / Azure Security Assessment', description: 'Deep-dive security review of specific cloud platform services.', icon: Shield },
      { name: 'Kubernetes / Container Security', description: 'Hardening container orchestration and runtime security.', icon: Layers },
      { name: 'Cloud Security Posture Management (CSPM)', description: 'Automating continuous governance across cloud infrastructure.', icon: Cpu },
      { name: 'Cloud Compliance Review', description: 'Validating cloud set-ups against regional regulatory bodies.', icon: Eye }
    ],
    delivery: [
      { step: '01', title: 'Discover', description: 'Cloud environment mapping and asset inventory.' },
      { step: '02', title: 'Assess', description: 'Configuration and risk analysis against best practices.' },
      { step: '03', title: 'Design', description: 'Security architecture design and hardening roadmap.' },
      { step: '04', title: 'Implement', description: 'Deployment of security controls and CSPM tools.' },
      { step: '05', title: 'Sustain', description: 'Continuous posture management and threat monitoring.' }
    ],
    industries: [
      { name: 'SaaS', slug: 'saas', useCase: 'Engineering secure, scalable cloud-native architectures.' },
      { name: 'Enterprises', slug: 'enterprise', useCase: 'Managing security across hybrid and multi-cloud footprints.' },
      { name: 'FinTech', slug: 'fintech', useCase: 'Regulatory-compliant cloud environments for financial data.' }
    ],
    platformLink: {
      name: 'QStellar',
      heading: 'Powered by QStellar',
      body: 'Powered by QStellar for asset visibility and cloud posture management.',
      ctaLabel: 'Explore QStellar →',
      ctaLink: 'https://qstellar.co',
      isExternal: true
    },
    finalCTA: {
      heading: "Harden Your Cloud Infrastructure",
      subtext: "Discuss Your Security Program"
    }
  },
  {
    slug: 'managed-defense-operations',
    name: 'Managed Defense Operations',
    eyebrow: 'RESILIENCE',
    title: 'Managed',
    highlight: 'Defense Operations',
    subtitle: 'QuasarCyberTech provides continuous monitoring, detection, and response capabilities to protect enterprise environments from evolving threats.',
    description: 'Continuous monitoring, SOC operations, incident response, and threat detection services.',
    icon: Radio,
    overview: {
      heading: 'Aligning Security with',
      highlight: 'Threat Response',
      body: [
        'Cyber threats require continuous monitoring and rapid response. Organizations must detect, analyze, and respond to incidents in real time.',
        'QuasarCyberTech delivers managed defense operations that enhance visibility, reduce response time, and improve overall resilience.'
      ],
      outcomes: ['24/7 Coverage', 'Rapid Response', 'Threat Containment'],
      proofPoints: [
        { label: "MONITORING", value: "24/7 detection capability across all digital assets" },
        { label: "INCIDENT OPS", value: "Rapid incident response and containment protocols" },
        { label: "INTELLIGENCE", value: "Threat intelligence driven operations and proactive hunting" }
      ]
    },
    services: [
      { name: 'Managed SOC', description: 'Continuous security monitoring and event analysis by experts.', icon: Radio },
      { name: 'Threat Detection & Monitoring', description: 'Real-time detection of suspicious activity and attack indicators.', icon: Eye },
      { name: 'Incident Response', description: 'Rapid containment and investigation of active security incidents.', icon: Shield },
      { name: 'Threat Hunting', description: 'Proactive searching for hidden threats within infrastructure.', icon: Crosshair },
      { name: 'Social Engineering & Phishing Simulations', description: 'Testing user awareness through simulated social attacks.', icon: Activity }
    ],
    delivery: [
      { step: '01', title: 'Monitor', description: 'Continuous visibility across host, cloud, and network.' },
      { step: '02', title: 'Detect', description: 'Identification of threats through correlation and SOC analysis.' },
      { step: '03', title: 'Respond', description: 'Immediate containment of threats and incident response.' },
      { step: '04', title: 'Recover', description: 'System restoration and forensic investigation.' },
      { step: '05', title: 'Improve', description: 'Continuous optimization of detection rules and playbooks.' }
    ],
    industries: [
      { name: 'BFSI', slug: 'banking', useCase: '24/7 continuous SOC operations for financial systems.' },
      { name: 'Enterprises', slug: 'enterprise', useCase: 'Enterprise-wide incident response and resilience readiness.' },
      { name: 'Healthcare', slug: 'healthcare', useCase: 'Protection of sensitive medical data and clinical operations.' }
    ],
    platformLink: {
      name: 'QStellar',
      heading: 'Powered by QStellar',
      body: 'Integrated with QStellar for real-time asset monitoring and security intelligence.',
      ctaLabel: 'Explore QStellar →',
      ctaLink: 'https://qstellar.co',
      isExternal: true
    },
    finalCTA: {
      heading: "Achieve Continuous Resilience",
      subtext: "Talk to a Security Expert"
    }
  },
  {
    slug: 'cyber-intelligence-security-research',
    name: 'Cyber Intelligence & Security Research',
    eyebrow: 'INFORMATION ADVANTAGE',
    title: 'Cyber Intelligence &',
    highlight: 'Security Research',
    subtitle: 'QuasarCyberTech delivers actionable intelligence and research to help enterprises anticipate threats and make informed security decisions.',
    description: 'Threat intelligence, dark web monitoring, vulnerability research, and security advisories.',
    icon: Eye,
    overview: {
      heading: 'Aligning Security with',
      highlight: 'Global Intelligence',
      body: [
        'Cyber intelligence enables proactive defense by identifying emerging threats and understanding attacker behavior.',
        'QuasarCyberTech provides continuous intelligence and research insights to strengthen enterprise security posture.'
      ],
      outcomes: ['Threat Visibility', 'Brand Protection', 'Proactive Defense'],
      proofPoints: [
        { label: "CTI EXPERTISE", value: "Continuous threat intelligence Curated for enterprise risk" },
        { label: "DARK WEB", value: "Deep dark web monitoring capabilities for brand protection" },
        { label: "RESEARCH", value: "Research-driven security insights and vulnerability disclosures" }
      ]
    },
    services: [
      { name: 'Cyber Threat Intelligence (CTI) as a Service', description: 'Filtered, actionable intelligence on emerging threat actors.', icon: Eye },
      { name: 'Dark Web Brand Intelligence', description: 'Monitoring for brand data and credentials on underground forums.', icon: Shield },
      { name: 'Brand Reputation Monitoring', description: 'Protecting digital identity from impersonation and spoofing.', icon: Radio },
      { name: 'Vulnerability Research', description: 'In-depth research into zero-day threats and supply chain risks.', icon: Crosshair },
      { name: 'Security Advisories', description: 'Custom advisories focused on relevant enterprise technologies.', icon: ClipboardCheck }
    ],
    delivery: [
      { step: '01', title: 'Collect', description: 'Data gathering from open, closed, and proprietary feeds.' },
      { step: '02', title: 'Analyze', description: 'Intelligence processing and threat actor attribution.' },
      { step: '03', title: 'Correlate', description: 'Contextualizing intelligence against your digital footprint.' },
      { step: '04', title: 'Deliver', description: 'Actionable intelligence reports and leadership briefings.' },
      { step: '05', title: 'Monitor', description: 'Continuous updates as the threat landscape evolves.' }
    ],
    industries: [
      { name: 'BFSI', slug: 'banking', useCase: 'Fraud monitoring and targeted threat actor intelligence.' },
      { name: 'Enterprises', slug: 'enterprise', useCase: 'Executive brand protection and infrastructure intelligence.' },
      { name: 'Tech Companies', slug: 'saas', useCase: 'Vulnerability intelligence for software supply chain security.' }
    ],
    platformLink: {
      name: 'QPulse',
      heading: 'Powered by QPulse',
      body: 'Integrated with QPulse for intelligence dissemination and insights.',
      ctaLabel: 'Visit QPulse →',
      ctaLink: 'https://qpulse.quasarcybertech.com',
      isExternal: true
    },
    finalCTA: {
      heading: "Anticipate the Threat Landscape",
      subtext: "Request a Consultation"
    }
  }
];
