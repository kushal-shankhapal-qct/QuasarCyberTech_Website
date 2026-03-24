import { Shield, ClipboardCheck, Crosshair, Cloud, Radio, Eye, Compass, Layers, Cpu, Target, Zap, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ASSETS } from '@/constants/assets';

// Advisory Sub-capability Photos removed - now using ASSETS constant

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
      { 
        name: 'Cybersecurity Strategy Consulting', 
        description: 'Define long-term security roadmaps aligned with business objectives and risk appetite.\nDevelop strategic frameworks to prioritize investments and mature security programs.\nEnsure robust organizational resilience against evolving digital threats.', 
        icon: Compass, 
        image: ASSETS.capabilities.advisory_sub?.strategy 
      },
      { 
        name: 'Security Architecture Review', 
        description: 'Evaluate enterprise architectures to identify structural gaps and improve defensive resilience.\nValidate design patterns against industry best practices and organizational requirements.\nStrengthen the security foundation across hybrid and complex environments.', 
        icon: Layers, 
        image: ASSETS.capabilities.advisory_sub?.architecture 
      },
      { 
        name: 'vCISO Services', 
        description: 'Provide on-demand executive leadership to guide governance, compliance, and risk strategy.\nBridge the gap between technical security operations and business-level decision making.\nEnable scalable security management without the overhead of a full-time executive role.', 
        icon: Shield, 
        image: ASSETS.capabilities.advisory_sub?.vciso 
      },
      { 
        name: 'Zero Trust Architecture Design & Review', 
        description: 'Design and validate Zero Trust security architectures aligned with enterprise environments.\nEnable identity-driven access control, segmentation, and continuous verification.\nStrengthen resilience against lateral movement and insider threats.', 
        icon: Shield, 
        image: ASSETS.capabilities.advisory_sub?.zeroTrust 
      },
      { 
        name: 'Tabletop Exercises & Cyber War Games', 
        description: 'Simulate real-world attack scenarios to strengthen organizational readiness and response.\nEvaluate the effectiveness of incident playbooks and executive communication flows.\nImprove cross-functional coordination during high-pressure security incidents.', 
        icon: Radio, 
        image: ASSETS.capabilities.advisory_sub?.tabletop 
      }
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
      { 
        name: 'RBI Cyber Security Framework Compliance', 
        description: 'Specialized assurance for financial institutions per RBI regulatory guidelines.\nImplement mandatory controls across core banking and digital payment systems.\nEnsure audit readiness and alignment with central bank expectations.', 
        icon: Shield 
      },
      { 
        name: 'ISO 27001 Consulting', 
        description: 'End-to-end guidance for achieving and maintaining international ISO 27001 certification.\nEstablish robust Information Security Management Systems (ISMS) across the organization.\nDemonstrate global security standards to partners and enterprise clients.', 
        icon: ClipboardCheck 
      },
      { 
        name: 'SOC2 Readiness', 
        description: 'Prepare service organizations for successful AICPA SOC2 Type I and Type II audits.\nValidate security, availability, and confidentiality controls for client-facing systems.\nAccelerate enterprise sales cycles through verified security trust reports.', 
        icon: ClipboardCheck 
      },
      { 
        name: 'Regulatory Gap Assessment', 
        description: 'Identify and remediate shortcomings in current compliance posture against global mandates.\nDevelop structured roadmaps to bridge control deficiencies and regulatory misalignments.\nMinimize legal exposure and ensure continuous adherence to industry requirements.', 
        icon: Radio 
      },
      { 
        name: 'Risk & Compliance Monitoring', 
        description: 'Continuous visibility into regulatory alignment and control effectiveness across the stack.\nAutomate compliance tracking to prevent posture decay and simplify audit cycles.\nMaintain a high-integrity, audit-ready state throughout the fiscal year.', 
        icon: Eye 
      }
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
      { 
        name: 'Web Application VAPT', 
        description: 'Identify and validate complex vulnerabilities in web platforms through advanced manual testing.\nGo beyond automated scanning to uncover logical flaws and sensitive data exposures.\nSecure internet-facing assets against sophisticated application-layer attacks.', 
        icon: Crosshair 
      },
      { 
        name: 'Mobile & API Security Testing', 
        description: 'Validate the security of mobile applications and modern backend API interfaces.\nUndeover flaws in mobile client logic, data transit, and backend authentication flows.\nProtect the mobile ecosystem and ensure secure interaction between distributed services.', 
        icon: Radio 
      },
      { 
        name: 'Red Team Assessments', 
        description: 'Execute multi-vector attack simulations to test full-spectrum organizational defense.\nMeasure the effectiveness of detection, response, and containment across the enterprise.\nGain realistic insights into your resilience against nation-state and advanced actors.', 
        icon: Shield 
      },
      { 
        name: 'Secure Code Review', 
        description: 'In-depth analysis of source code to find hidden security flaws early in development.\nIntegrate security into the SDLC through exhaustive manual and automated code audits.\nPrevent vulnerabilities from reaching production and reduce long-term remediation costs.', 
        icon: Layers 
      },
      { 
        name: 'LLM Penetration Testing', 
        description: 'Advanced penetration testing and safety review for Large Language Models.\nIdentify risks like prompt injection, data leakage, and improper output handling.\nEnsure the security and reliability of AI-driven features in enterprise apps.', 
        icon: Cpu 
      },
      { 
        name: 'Agentic AI Security Review', 
        description: 'Security validation for autonomous AI agents and complex agentic workflows.\nReview autonomy boundaries, API integrations, and decision-making security controls.\nSecure the path to AI maturity through rigorous independent validation.', 
        icon: Target 
      }
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
      { 
        name: 'Cloud Security Assessment', 
        description: 'Comprehensive configuration and risk review for public, private, and hybrid clouds.\nAlign cloud environments with industry standards like CIS Benchmarks and CSA Best Practices.\nIdentify and remediate misconfigurations before they lead to data exposures.', 
        icon: Cloud 
      },
      { 
        name: 'AWS / Azure Security Assessment', 
        description: 'Deep-dive security review of specific platform services and IAM configurations.\nEvaluate identity permissions, network boundaries, and storage encryption settings.\nOptimize security across the primary cloud providers used by the enterprise.', 
        icon: Shield 
      },
      { 
        name: 'Kubernetes / Container Security', 
        description: 'Harden container orchestration layers and runtime environments against exploit.\nSecure the supply chain from image building to production deployment and monitoring.\nEnable secure, scalable application hosting in high-velocity agile environments.', 
        icon: Layers 
      },
      { 
        name: 'Cloud Security Posture Management (CSPM)', 
        description: 'Automate continuous governance and risk monitoring across global cloud footprints.\nMaintain real-time visibility into infrastructure changes and compliance drifts.\nScale security oversight alongside rapidly growing cloud-native workloads.', 
        icon: Cpu 
      },
      { 
        name: 'Cloud Compliance Review', 
        description: 'Validate cloud infrastructure against regional regulatory bodies and mandates.\nEnsure cloud-resident data meets strict sovereignty and protection requirements.\nSupport audit cycles with verified evidence of cloud-layer control effectiveness.', 
        icon: Eye 
      }
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
      { 
        name: 'Managed SOC', 
        description: '24/7 security monitoring and proactive event analysis delivered by experts.\nIdentify and triage threats across the enterprise stack in real time.\nAugment internal teams with specialized security operations and scale.', 
        icon: Radio 
      },
      { 
        name: 'Threat Detection & Monitoring', 
        description: 'Real-time detection of suspicious activity using advanced telemetry and correlation.\nShorten the path from intrusion to discovery through high-fidelity alerting.\nProtect the business against sophisticated malware, ransomware, and breach attempts.', 
        icon: Eye 
      },
      { 
        name: 'Incident Response', 
        description: 'Rapid containment, investigation, and recovery from active security breaches.\nMinizime operational downtime and data loss during critical security events.\nBring order to chaos with expert-led response protocols and remediation.', 
        icon: Shield 
      },
      { 
        name: 'Threat Hunting', 
        description: 'Proactive searching for hidden threats that bypass traditional perimeter defenses.\nIdentify persistent actors and indicators of compromise within the environment.\nStay ahead of advanced threats through continuous architectural probing.', 
        icon: Crosshair 
      },
      { 
        name: 'Social Engineering & Phishing Simulations', 
        description: 'Test and strengthen employee awareness through realistic simulated social attacks.\nMeasure organizational susceptibility to phishing, vishing, and physical tailgating.\nBuild a human firewall to complement technical security controls.', 
        icon: Activity 
      }
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
      { 
        name: 'Cyber Threat Intelligence (CTI) as a Service', 
        description: 'Actionable intelligence on emerging threat actors and industry-specific risks.\nAnticipate attacks by understanding the shifts in attacker motivation and tooling.\nEmpower security leadership with foresight needed for strategic investment.', 
        icon: Eye 
      },
      { 
        name: 'Dark Web Brand Intelligence', 
        description: 'Monitoring underground forums and markets for leaked data and credentials.\nDiscover exposed organizational assets before they can be leveraged for fraud.\nProtect corporate identity and sensitive intellectual property on the dark web.', 
        icon: Shield 
      },
      { 
        name: 'Brand Reputation Monitoring', 
        description: 'Protecting the digital footprint from impersonation, typosquatting, and spoofing.\nDetect and take down malicious domains and social media fraud attempts.\nPreserve customer trust and brand integrity across the global internet.', 
        icon: Radio 
      },
      { 
        name: 'Vulnerability Research', 
        description: 'In-depth research into zero-day threats, supply chain risks, and firmware flaws.\nGain an information advantage by identifying critical gaps in third-party tech.\nStrengthen the security posture through high-fidelity research-driven insights.', 
        icon: Crosshair 
      },
      { 
        name: 'Security Advisories', 
        description: 'Custom, high-relevance security advisories focused on enterprise technologies.\nStay informed on critical patches and emerging risks tailored to your stack.\nEnsure rapid awareness and response to significant global security shifts.', 
        icon: ClipboardCheck 
      }
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
