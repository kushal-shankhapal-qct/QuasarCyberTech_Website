import { ASSETS } from '@/constants/assets';

export type IndustryApplication = {
  name: string;
  description: string;
  slug?: string;
  image?: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type TabItem = {
  id: string;
  label: string;
  anchor: string;
  positioning: string;
  whatWeAssess: string[];
  approach: string[];
  standards: string[];
  industries?: IndustryApplication[];
};

export type SubCapability = {
  id: string;
  name: string;
  slug: string;
  anchor: string;
  shortDescription: string;
  image?: string;
  positioning?: string;
  whatWeAssess?: string[];
  approach?: string[];
  standards?: string[];
  industries?: IndustryApplication[];
  tabs?: TabItem[];
};

export type Capability = {
  id: string;
  name: string;
  slug: string;
  navLabel: string;
  navColumn: 'advisory-governance' | 'security-engineering' | 'cloud-infrastructure' | 'managed-defense';
  cardDescription: string;
  heroSubtitle: string;
  icon: string;
  image: string;
  subCapabilities: SubCapability[];
  platform?: 'qstellar' | 'qrgt' | 'qpulse' | 'qleap';
  relatedCapabilities?: string[];
  faqs?: FAQ[];
  [key: string]: any;
};

export type PlatformConfig = {
  id: string;
  name: string;
  description: string;
  link: string;
  logoKey: string;
  screenshotKey: string;
  highlights: string[];
};

export const platformConfigs: Record<string, PlatformConfig> = {
  qstellar: {
    id: 'qstellar',
    name: 'QStellar',
    description: 'AI-Powered Asset Intelligence & Vulnerability Management',
    link: 'https://qstellar.co',
    logoKey: 'qstellarDark',
    screenshotKey: 'qstellar',
    highlights: [
      'Asset discovery and continuous visibility',
      'Vulnerability intelligence with risk prioritization',
      'Configuration drift and exposure monitoring',
    ],
  },
  qrgt: {
    id: 'qrgt',
    name: 'QRGT',
    description: 'Penetration Testing as a Service Platform',
    link: '/contact',
    logoKey: 'qrgt',
    screenshotKey: 'qrgt',
    highlights: [
      'Continuous penetration testing workflow',
      'Centralized findings and remediation tracking',
      'Governed collaboration across red-blue teams',
    ],
  },
  qpulse: {
    id: 'qpulse',
    name: 'QPulse',
    description: 'Threat Intelligence & Security Insights Portal',
    link: 'https://qpulse.quasarcybertech.com',
    logoKey: 'qpulseLight',
    screenshotKey: 'qpulse',
    highlights: [
      'Curated threat intelligence for enterprise context',
      'Actionable advisories mapped to emerging risks',
      'Operational insights for proactive defense',
    ],
  },
  qleap: {
    id: 'qleap',
    name: 'QLeap',
    description: 'Cybersecurity Training & Talent Development',
    link: 'https://qleap-ed.com',
    logoKey: 'qleap',
    screenshotKey: 'qleap',
    highlights: [
      'Hands-on labs and practical simulations',
      'Role-based upskilling for security teams',
      'Continuous learning paths and certifications',
    ],
  },
};

export const capabilities: Capability[] = [
  {
    id: 'cyber-advisory',
    name: 'Cyber Security Advisory & Risk Governance',
    slug: 'cyber-advisory',
    navLabel: 'Cyber Security Advisory',
    navColumn: 'advisory-governance',
    icon: 'compass',
    image: ASSETS.qctWebsite.advisory,
    cardDescription: 'Enterprise security strategy, zero-trust architecture, vCISO leadership, and third-party risk management.',
    heroSubtitle: 'Strategic cybersecurity leadership and governance frameworks that align security posture with business objectives.',
    platform: 'qstellar',
    relatedCapabilities: ['compliance-assurance', 'managed-defense'],
    faqs: [
      {
        question: 'What is a vCISO and do we need one?',
        answer:
          'A Virtual CISO (vCISO) provides executive-level security leadership on a fractional or on-demand basis, offering board-level strategy and governance without the overhead of a full-time executive. It is an ideal solution for organizations facing sudden compliance mandates, preparing for a pre-IPO security posture audit, or needing to establish clear accountability for security programs. By leveraging a vCISO, you gain access to decades of vendor-neutral experience tailored to your specific risk appetite.',
      },
      {
        question: 'How long does a security program development engagement take?',
        answer:
          'The initial design phase of a security program typically takes 8 to 16 weeks, heavily depending on your organization\'s size, complexity, and current maturity level. During this time, we assess your baseline, define a structured framework across people, process, and technology, and map out 90-day quick wins. This foundational work is then typically followed by an ongoing governance cadence to continually track execution, measure KPIs, and ensure continuous improvement.',
      },
      {
        question: 'Does your Zero Trust review cover both on-premises and cloud environments?',
        answer:
          'Absolutely. Our Zero Trust Architecture Review is comprehensive and spans identity, network, device, application, and data layers across fully hybrid environments, not just cloud-native stacks. We understand that modern enterprises operate across a mix of on-premises data centers, legacy infrastructure, and the cloud, so we design trust boundaries and micro-segmentation strategies that protect your assets wherever they reside.',
      },
      {
        question: 'How do you handle third-party risk for organizations with large supplier ecosystems?',
        answer:
          'We deploy a scalable, tiered risk management model tailored to the complexity of your supply chain. For highly critical vendors with direct access to your sensitive data, we conduct rigorous, deep-dive technical and process assessments. Meanwhile, the broader vendor population is managed efficiently through standardized, automated questionnaire platforms coupled with continuous exposure monitoring to rapidly detect any emerging third-party vulnerabilities.',
      },
    ],
    subCapabilities: [
      {
        id: 'executive-cyber-advisory',
        name: 'Executive Cyber Security Advisory',
        slug: 'executive-cyber-advisory',
        anchor: 'executive-cyber-advisory',
        shortDescription: 'Leadership advisory that aligns cyber risk with strategic business decisions.',
        image: ASSETS.capabilities.subCapabilities.advisory.strategy,
        positioning:
          'Executive Cyber Security Advisory helps leadership teams convert cyber uncertainty into a clear decision agenda. We align business priorities, threat exposure, and governance accountability so strategic programs move faster with controlled risk.',
        whatWeAssess: [
          '[Users2]: Board and executive cyber risk visibility across business units',
          '[BarChartHorizontal]: Alignment of cyber investments to strategic growth and risk appetite',
          '[GanttChart]: Governance operating model clarity across leadership and control functions',
          '[IterationCcw]: Decision readiness for high-impact cyber scenarios and regulatory pressure',
          '[Workflow]: Third-party and ecosystem risk exposure affecting strategic commitments',
        ],
        approach: [
          'Discovery: Stakeholder interviews and rapid current-state baseline assessment.',
          'Risk Mapping: Identify and prioritize key risk areas affecting strategic commitments.',
          'Framework Alignment: Map to NIST, ISO 27001, or custom enterprise frameworks.',
          'Roadmap Delivery: Provide an actionable 12-month security improvement plan.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            slug: 'banking',
            image: ASSETS.qctWebsite.banking,
            description:
              'Securing core banking systems, digital payment gateways, and regulatory compliance for global financial institutions.',
          },
          {
            name: 'Enterprise & Manufacturing',
            description:
              'Aligning cybersecurity strategy with operational resilience and large-scale industrial asset protection.',
          },
          {
            name: 'Healthcare & HealthTech',
            description:
              'Designing strategic trust boundaries for systems handling sensitive patient data and health records.',
          },
        ],
      },
      {
        id: 'security-zero-trust-architecture-review',
        name: 'Security & Zero Trust Architecture Review',
        slug: 'security-zero-trust-architecture-review',
        anchor: 'security-zero-trust-architecture-review',
        shortDescription: 'Zero Trust architecture design and validation for modern enterprise environments.',
        image: ASSETS.capabilities.subCapabilities.advisory.architecture,
        positioning:
          'Modern enterprises cannot rely on perimeter-based security. We design and validate Zero Trust architectures that verify every user, device, and connection.',
        whatWeAssess: [
          '[Layers3]: Existing network segmentation and access control models',
          '[Fingerprint]: Identity and access management implementation',
          '[Split]: Micro-segmentation and lateral movement risk',
          '[CloudCog]: Cloud and hybrid architecture trust boundaries',
          '[KeyRound]: Privileged access and just-in-time access controls',
        ],
        approach: [
          'Architecture Mapping: Document current-state trust boundaries and network segmentation.',
          'Gap Analysis: Identify critical deviations from Zero Trust principles.',
          'Design: Produce target-state architecture recommendations optimizing existing resources.',
          'Implementation Roadmap: Deliver phased guidance for enforcing micro-segmentation and identity controls.',
        ],
        standards: [],
        industries: [
          {
            name: 'SaaS & Technology',
            slug: 'saas',
            image: ASSETS.qctWebsite.saas,
            description: 'DevSecOps, API security testing, and multi-tenant isolation for cloud-native software and technology platforms.',
          },
          {
            name: 'Banking & Financial Services',
            description: 'Ensuring strict access controls and data isolation across complex financial networks.',
          },
          {
            name: 'Enterprise & Manufacturing',
            description: 'Protecting converged IT and OT environments with modernized perimeter defenses.',
          },
        ],
      },
      {
        id: 'virtual-ciso-vciso-services',
        name: 'Virtual CISO (vCISO) Services',
        slug: 'virtual-ciso-vciso-services',
        anchor: 'virtual-ciso-vciso-services',
        shortDescription: 'On-demand cybersecurity leadership for strategy, governance, and board-level accountability.',
        image: ASSETS.capabilities.subCapabilities.advisory.vciso,
        positioning:
          'Enterprise-grade cybersecurity leadership available as a service - strategy, governance, board reporting, and program ownership.',
        whatWeAssess: [
          '[BarChart3]: Current security program maturity',
          '[Zap]: Organizational security culture and awareness',
          '[Coins]: Budget allocation and security investment efficiency',
          '[Scale]: Compliance obligations and regulatory exposure',
          '[Siren]: Incident response and crisis readiness',
        ],
        approach: [
          'Onboarding: Rapid current-state risk assessment within the first two weeks.',
          'Priority Setting: Define 90-day quick wins and establish a 12-month strategic roadmap.',
          'Ongoing Leadership: Manage monthly board reporting, policy ownership, and team mentoring.',
          'Maturity Review: Conduct quarterly security program maturity and compliance assessments.',
        ],
        standards: [],
        industries: [
          {
            name: 'SMBs & Mid-Market',
            description:
              'Providing executive-level cybersecurity leadership for growing organizations lacking a full-time CISO budget.',
          },
          {
            name: 'FinTech & Digital Payments',
            description: 'Guiding rapid-growth financial platforms through strict regulatory audits and compliance scaling.',
          },
          {
            name: 'Healthcare & HealthTech',
            description: 'Ensuring continuous HIPAA compliance and proactive patient data risk management.',
          },
        ],
      },
      {
        id: 'security-program-development',
        name: 'Security Program Development',
        slug: 'security-program-development',
        anchor: 'security-program-development',
        shortDescription: 'Build and scale a practical security program across people, process, and technology.',
        image: ASSETS.capabilities.subCapabilities.advisory.tabletop,
        positioning:
          'A security program is more than tools - it is people, process, and technology working together. We design programs that scale with your business.',
        whatWeAssess: [
          '[FileText]: Existing policies, procedures, and documentation',
          '[Users]: Security team structure and capability gaps',
          '[Tool]: Technology stack and tooling coverage',
          '[History]: Incident history and recurring risk patterns',
          '[BookCheck]: Compliance obligations driving program requirements',
        ],
        approach: [
          'Assessment: Baseline your current security program maturity against industry standards.',
          'Design: Build a structured program framework across people, processes, and technology.',
          'Implementation: Assist with policy creation, tool selection, and security team training.',
          'Measurement: Establish KPIs, executive dashboards, and continuous improvement loops.',
        ],
        standards: [],
        industries: [
          {
            name: 'Enterprise & Manufacturing',
            description: 'Standardizing fragmented security practices across global operational units.',
          },
          {
            name: 'SaaS & Technology',
            description:
              'Accelerating enterprise procurement cycles by implementing scalable, audit-ready security programs.',
          },
          {
            name: 'Banking & Financial Services',
            description: 'Maturing internal security controls to exceed baseline regulatory expectations.',
          },
        ],
      },
      {
        id: 'third-party-supply-chain-risk-management',
        name: 'Third-Party & Supply Chain Risk Management',
        image: ASSETS.capabilities.subCapabilities.advisory.supplyChain,
        slug: 'third-party-supply-chain-risk-management',
        anchor: 'third-party-supply-chain-risk-management',
        shortDescription: 'Assess, manage, and monitor security risks across your vendor and supplier ecosystem.',
        positioning:
          'Your security posture is only as strong as your weakest vendor. We assess supplier ecosystems, validate controls through questionnaires and evidence, and establish continuous monitoring for critical dependencies.',
        whatWeAssess: [
          'Vendor risk profiling and tiering',
          'Third-party security questionnaire validation',
          'Supply chain continuous exposure monitoring',
          'SLA and contract security reviews',
          'N-th party dependency mapping',
        ],
        approach: [
          'Scope & Discovery: Build third-party inventory, criticality mapping, and business dependency context.',
          'Evaluate & Gap Map: Assess vendor controls, identify concentration risk, and map framework gaps.',
          'Craft Strategy: Define risk treatment and governance actions aligned to business impact.',
          'Upskill & Implement: Operationalize workflows, reporting templates, and ownership model.',
          'Review & Evolve: Run periodic reassessment cycles and update controls for changing supplier risk.',
        ],
        standards: [],
        industries: [
          {
            name: 'Enterprise & Manufacturing',
            description:
              'Managing third-party cyber risk across complex, global supplier ecosystems and operational dependencies.',
          },
          {
            name: 'Banking & Financial Services',
            description:
              'Ensuring outsourced technology partners align with strict financial regulatory security requirements.',
          },
        ],
      },
    ],
  },
  {
    id: 'compliance-assurance',
    name: 'Compliance & Assurance',
    slug: 'compliance-assurance',
    navLabel: 'Compliance',
    navColumn: 'advisory-governance',
    icon: 'clipboard-check',
    image: ASSETS.qctWebsite.regulatoryCompliance,
    cardDescription: 'RBI compliance, DPDP Act readiness, ISO 27001, SOC2, and comprehensive regulatory gap assessments.',
    heroSubtitle: 'Structured compliance programs that turn regulatory obligations into a competitive advantage.',
    platform: 'qstellar',
    relatedCapabilities: ['cyber-advisory', 'cloud-infrastructure'],
    faqs: [
      {
        question: 'How long does SOC2 Type II readiness take?',
        answer:
          'For most SaaS and technology organizations, achieving a state of SOC2 Type II audit readiness generally takes between 3 to 6 months. This timeline includes conducting a thorough gap assessment across the Trust Service Criteria, followed by collaborative remediation work alongside your engineering teams to close identified gaps. We prioritize quick wins to accelerate this timeline and provide full auditor liaison support to ensure a smooth fieldwork process.',
      },
      {
        question: 'Does the DPDP Act apply to B2B companies?',
        answer:
          'Yes, the DPDP Act (2023) is highly relevant to B2B companies if your organization processes the personal data of any Indian residents, this explicitly includes the data of your own employees. Your specific obligations will vary depending on your classification as a data fiduciary, but we help you implement the necessary consent management frameworks and data principal rights workflows to ensure sustained compliance.',
      },
      {
        question: 'Can you support multi-framework compliance simultaneously?',
        answer:
          'Yes, we specialize in multi-framework compliance to streamline your governance efforts and reduce audit fatigue. Our team uses a unified control mapping approach, meaning that a single, robust security control implementation can satisfy overlapping requirements across multiple standards simultaneously. This approach saves significant time and engineering resources when aligning with frameworks like ISO 27001, SOC2, and RBI CSF.',
      },
      {
        question: 'What is the difference between RBI CSF and ISO 27001?',
        answer:
          'The RBI Cyber Security Framework is a sector-specific, highly prescriptive regulatory mandate specifically designed for financial entities and banks operating within India. In contrast, ISO 27001 is a globally recognized, framework-agnostic standard focused on establishing and maintaining an Information Security Management System (ISMS). We seamlessly integrate both into a unified execution model, helping regulated entities meet strict RBI baselines while maintaining international best practices.',
      },
    ],
    subCapabilities: [
      {
        id: 'regulatory-gap-assessment',
        name: 'Regulatory Gap Assessment',
        slug: 'regulatory-gap-assessment',
        anchor: 'regulatory-gap-assessment',
        shortDescription: 'Identify control gaps early and prioritize remediation before formal audits.',
        image: ASSETS.capabilities.subCapabilities.compliance.regulatoryGapAssessment,
        positioning:
          'Know where you stand before regulators do. Our gap assessments give you a clear, honest picture of compliance posture and a prioritized remediation roadmap.',
        whatWeAssess: [
          'Current controls vs regulatory requirements',
          'Documentation and policy completeness',
          'Technical control implementation evidence',
          'Third-party and vendor compliance exposure',
          'Historical audit findings and open items',
        ],
        approach: [
          'Scoping: Define applicable regulations, frameworks, and assessment boundaries.',
          'Assessment: Conduct control-by-control gap analysis and technical evidence review.',
          'Reporting: Deliver a comprehensive gap report featuring risk-rated findings.',
          'Roadmap: Provide a clear remediation plan with assigned ownership and timelines.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            description: 'Identifying compliance gaps across RBI mandates before formal audits occur.',
          },
          {
            name: 'FinTech & Digital Payments',
            description: 'Assessing readiness for complex multi-framework financial regulations.',
          },
          {
            name: 'Healthcare & HealthTech',
            description: 'Evaluating data protection controls against stringent health privacy laws.',
          },
        ],
      },
      {
        id: 'risk-compliance-monitoring',
        name: 'Risk & Compliance Monitoring',
        slug: 'risk-compliance-monitoring',
        anchor: 'risk-compliance-monitoring',
        shortDescription: 'Continuous monitoring of control effectiveness and compliance drift.',
        image: ASSETS.capabilities.subCapabilities.compliance.riskMonitoring,
        positioning:
          'Compliance is not a point-in-time event. Continuous monitoring ensures controls remain effective as your environment evolves.',
        whatWeAssess: [
          'Control effectiveness over time',
          'Configuration drift from baseline',
          'Policy exception management and tracking',
          'Regulatory change impact on current controls',
          'Risk register currency and accuracy',
        ],
        approach: [
          'Baselining: Establish a definitive compliance control baseline across your environment.',
          'Monitoring: Implement continuous automated and manual control effectiveness checks.',
          'Alerting: Configure real-time notifications for control failures or configuration drift.',
          'Reporting: Generate monthly compliance health dashboards for executive leadership.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            description: 'Ensuring continuous adherence to RBI and ISO 27001 standards between formal audits.',
          },
          {
            name: 'Enterprise & Manufacturing',
            description: 'Maintaining global operational compliance without manual audit fatigue.',
          },
          {
            name: 'SaaS & Technology',
            description: 'Automating compliance tracking to maintain customer trust and operational speed.',
          },
        ],
      },
      {
        id: 'rbi-cyber-security-framework-compliance',
        name: 'RBI Cyber Security Framework Compliance',
        slug: 'rbi-cyber-security-framework-compliance',
        anchor: 'rbi-cyber-security-framework-compliance',
        shortDescription: 'End-to-end compliance support for RBI cyber security obligations.',
        image: ASSETS.capabilities.subCapabilities.compliance.rbiCompliance,
        positioning:
          'RBI-regulated entities face strict cybersecurity mandates. We translate the RBI CSF into practical implementation - from gap to attestation.',
        whatWeAssess: [
          'RBI CSF baseline and advanced control implementation',
          'IT governance and risk management structures',
          'Cyber incident reporting readiness',
          'Business continuity and DR capability',
          'SOC and monitoring capability adequacy',
        ],
        approach: [
          'Gap Assessment: Evaluate existing controls against all RBI CSF categories.',
          'Implementation Support: Guide the remediation of identified gaps and control weaknesses.',
          'Evidence Collection: Compile comprehensive documentation packages for regulatory auditors.',
          'Mock Audit: Conduct a rigorous readiness review prior to official regulatory submission.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            description: 'End-to-end support for strict RBI Cyber Security Framework mandates and IT governance.',
          },
          {
            name: 'FinTech & Digital Payments',
            description:
              'Ensuring payment gateways and neo-banks meet stringent RBI baseline and advanced controls.',
          },
        ],
      },
      {
        id: 'dpdp-act-compliance',
        name: 'DPDP Act Compliance',
        slug: 'dpdp-act-compliance',
        anchor: 'dpdp-act-compliance',
        shortDescription: 'Achieve readiness and compliance with India\'s Digital Personal Data Protection Act.',
        image: ASSETS.capabilities.subCapabilities.compliance.dpdpCompliance,
        positioning:
          'India\'s DPDP Act establishes binding obligations for organizations processing personal data of Indian residents. We help design consent workflows, data principal rights handling, and governance needed for sustained compliance.',
        whatWeAssess: [
          'Data fiduciary classification and obligations',
          'Consent management frameworks',
          'Data principal rights workflows',
          'Cross-border data transfer controls',
          'DPDP rules readiness and attestation support',
        ],
        approach: [
          'Scope & Discovery: Define data flows, processing scope, and fiduciary obligations.',
          'Evaluate & Gap Map: Assess legal, process, and technical controls against DPDP requirements.',
          'Craft Remediation Plan: Build consent, rights management, and governance workflows.',
          'Upskill & Prepare: Train teams, finalize documentation, and run readiness simulations.',
          'Review & Monitor: Establish ongoing monitoring for compliance drift and regulatory changes.',
        ],
        standards: [],
        industries: [
          {
            name: 'Healthcare & HealthTech',
            description: 'DPDP readiness for platforms processing sensitive health data of Indian users.',
          },
          {
            name: 'Banking & Financial Services',
            description: 'End-to-end support for data fiduciary obligations across banking channels.',
          },
        ],
      },
      {
        id: 'soc2-readiness',
        name: 'SOC2 Readiness',
        slug: 'soc2-readiness',
        anchor: 'soc2-readiness',
        shortDescription: 'Prepare for SOC2 audits with scoped controls, evidence, and auditor support.',
        positioning:
          'SOC2 certification is increasingly a prerequisite for enterprise sales. We get you audit-ready efficiently - without disrupting your engineering team.',
        whatWeAssess: [
          'Trust Service Criteria coverage (Security, Availability, Confidentiality, Privacy, Processing Integrity)',
          'Current control implementation vs SOC2 requirements',
          'Evidence collection processes and tooling',
          'Vendor and subprocessor management',
          'Incident response and change management processes',
        ],
        approach: [
          'Scoping: Define applicable Trust Service Criteria and organizational system boundaries.',
          'Readiness Assessment: Perform a detailed gap analysis against the chosen SOC2 criteria.',
          'Remediation: Implement missing controls in collaboration with your engineering team.',
          'Auditor Support: Build the evidence package and manage auditor queries during fieldwork.',
        ],
        standards: [],
        industries: [
          {
            name: 'SaaS & Technology',
            description: 'Achieving rapid SOC2 Type II compliance to unlock tier-1 enterprise sales.',
          },
          {
            name: 'FinTech & Digital Payments',
            slug: 'fintech',
            image: ASSETS.qctWebsite.digitalPayments,
            description: 'Protecting transaction integrity, wallet security, and DPDP / RBI compliance for high-growth FinTech ecosystems.',
          },
          {
            name: 'E-commerce & Digital',
            description: 'Proving transaction integrity and privacy controls to consumer protection bodies.',
          },
        ],
      },
    ],
  },
  {
    id: 'offensive-security',
    name: 'Offensive Security & Resilience Engineering',
    slug: 'offensive-security',
    navLabel: 'Offensive Security',
    navColumn: 'security-engineering',
    icon: 'crosshair',
    image: ASSETS.capabilities.offensive,
    cardDescription: 'Adversary-focused validation across applications, APIs, teams, code, and AI systems to reduce exploitable risk.',
    heroSubtitle: 'Realistic offensive simulations and deep technical testing that expose exploitable paths before attackers do.',
    platform: 'qrgt',
    relatedCapabilities: ['cloud-infrastructure', 'managed-defense'],
    faqs: [
      {
        question: 'What is the difference between a penetration test and a red team exercise?',
        answer:
          'A penetration test is a tightly scoped, point-in-time assessment focused on identifying and exploiting vulnerabilities within specific systems or applications. A red team exercise, however, is a comprehensive, unannounced, and objective-based simulation of a sophisticated threat actor. It is designed to test your organization\'s entire defensive posture, evaluating how well your people, processes, and technical controls (like a SOC) detect and respond to an active, stealthy attack.',
      },
      {
        question: 'How long does a web application penetration test take?',
        answer: 'A standard web application penetration test usually takes between 5 to 10 business days to complete. The exact duration depends heavily on the complexity of the application, the underlying architecture, and the depth of the user roles and privilege escalation paths that need to be tested. We go beyond automated scanners with deep manual testing to uncover complex business logic flaws.',
      },
      {
        question: 'Do you test AI systems built on third-party LLM APIs?',
        answer:
          'Yes, testing AI systems requires specialized methodologies beyond traditional application security. Even if you use third-party APIs like OpenAI or Anthropic, we rigorously assess your application\'s integration layer, guardrail effectiveness, and unsafe output handling. Our testing focuses on identifying prompt injection vulnerabilities, preventing data leakage, and ensuring that multi-agent systems operate strictly within their intended trust boundaries.',
      },
      {
        question: 'Will testing disrupt production systems?',
        answer:
          'Our default engagement rules heavily prioritize non-destructive testing, ensuring that your production systems and business operations remain completely undisrupted. We coordinate closely with your teams to define safe testing windows and escalation paths. Any inherently destructive testing or high-risk exploitation is exclusively performed in staging environments unless you grant explicit approval to do otherwise.',
      },
    ],
    subCapabilities: [
      {
        id: 'web-application-security-testing',
        name: 'Web Application Security Testing',
        slug: 'web-application-security-testing',
        anchor: 'web-application-security-testing',
        shortDescription: 'Deep web application security validation beyond automated scans.',
        image: ASSETS.capabilities.subCapabilities.offensive.web,
        positioning:
          'Web applications are the most exposed attack surface in any enterprise. We go beyond automated scanning - manual exploitation reveals what scanners miss.',
        whatWeAssess: [
          'OWASP Top 10 vulnerability classes',
          'Authentication and session management flaws',
          'Business logic vulnerabilities',
          'Client-side and server-side injection',
          'Access control and privilege escalation',
          'Sensitive data exposure and cryptographic weaknesses',
        ],
        approach: [
          'Reconnaissance: Map the application architecture and enumerate the total attack surface.',
          'Vulnerability Identification: Combine automated baseline scanning with deep manual testing.',
          'Exploitation: Execute safe proof-of-concept attacks to demonstrate true business impact.',
          'Reporting: Deliver risk-rated findings alongside developer-specific remediation guidance.',
        ],
        standards: [],
        industries: [
          {
            name: 'FinTech & Digital Payments',
            description: 'Securing complex transaction workflows, mobile banking apps, and financial APIs.',
          },
          {
            name: 'E-commerce & Digital',
            description: 'Protecting consumer data and payment integrations from logic flaws and injection attacks.',
          },
          {
            name: 'SaaS & Technology',
            description: 'Validating multi-tenant architectures and complex web application boundaries.',
          },
        ],
      },
      {
        id: 'mobile-application-security-testing',
        name: 'Mobile Application Security Testing',
        slug: 'mobile-application-security-testing',
        anchor: 'mobile-application-security-testing',
        shortDescription: 'iOS and Android application testing against modern mobile threat patterns.',
        image: ASSETS.capabilities.subCapabilities.offensive.mobile,
        positioning:
          'Mobile applications handle sensitive data and privileged access. We test iOS and Android applications against the OWASP Mobile Top 10 and beyond.',
        whatWeAssess: [
          'OWASP Mobile Top 10 vulnerability classes',
          'Insecure data storage and transmission',
          'Broken authentication and session handling',
          'Binary protections and reverse engineering risk',
          'Third-party SDK and library vulnerabilities',
          'Certificate pinning and SSL/TLS implementation',
        ],
        approach: [
          'Reconnaissance: Map the application architecture and enumerate the total attack surface.',
          'Vulnerability Identification: Combine automated baseline scanning with deep manual testing.',
          'Exploitation: Execute safe proof-of-concept attacks to demonstrate true business impact.',
          'Reporting: Deliver risk-rated findings alongside developer-specific remediation guidance.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            description: 'Securing mobile banking apps and digital wallets from device-level attacks.',
          },
          {
            name: 'FinTech & Digital Payments',
            description: 'Securing complex transaction workflows and UPI integrations.',
          },
          {
            name: 'Healthcare & HealthTech',
            slug: 'healthcare',
            image: ASSETS.qctWebsite.healthcare,
            description: 'HIPAA alignment, patient data protection, and security for IoT-enabled medical devices and systems.',
          },
        ],
      },
      {
        id: 'api-security-testing',
        name: 'API Security Testing',
        slug: 'api-security-testing',
        anchor: 'api-security-testing',
        shortDescription: 'API threat validation for REST, GraphQL, and gRPC environments.',
        image: ASSETS.capabilities.subCapabilities.offensive.api,
        positioning:
          'APIs are the backbone of modern applications - and among the most exploited attack vectors. We test REST, GraphQL, and gRPC APIs against the OWASP API Top 10.',
        whatWeAssess: [
          'OWASP API Top 10 vulnerability classes',
          'Broken object-level authorization (BOLA/IDOR)',
          'Excessive data exposure in API responses',
          'Authentication and API key management',
          'Rate limiting and resource exhaustion',
          'GraphQL-specific attack vectors (introspection, batching)',
        ],
        approach: [
          'Reconnaissance: Map the API architecture and enumerate the total attack surface.',
          'Vulnerability Identification: Combine automated baseline scanning with deep manual testing.',
          'Exploitation: Execute safe proof-of-concept attacks to demonstrate true business impact.',
          'Reporting: Deliver risk-rated findings alongside developer-specific remediation guidance.',
        ],
        standards: [],
        industries: [
          {
            name: 'SaaS & Technology',
            description: 'Securing core platform APIs that expose multi-tenant customer data.',
          },
          {
            name: 'FinTech & Digital Payments',
            description: 'Ensuring secure B2B financial integrations and Open Banking API compliance.',
          },
          {
            name: 'E-commerce & Digital',
            description: 'Protecting inventory, pricing, and user data across headless commerce platforms.',
          },
        ],
      },
      {
        id: 'red-team',
        name: 'Red Teaming',
        slug: 'red-team',
        anchor: 'red-team',
        shortDescription: 'Goal-oriented adversary simulation across technical and human controls.',
        image: ASSETS.capabilities.subCapabilities.offensive.redTeam,
        positioning:
          'A red team engagement simulates a sophisticated, goal-oriented attacker targeting your organization - testing your defenses across technical and human dimensions.',
        whatWeAssess: [
          'External and internal network attack paths',
          'Physical security controls where in scope',
          'Social engineering susceptibility of staff',
          'Detection and response capability of security team',
          'Lateral movement and privilege escalation paths',
          'Crown jewel access feasibility',
        ],
        approach: [
          'Threat Profiling: Identify the most relevant threat actors and map their TTPs using MITRE ATT&CK.',
          'Reconnaissance: Conduct OSINT, map external infrastructure, and research personnel.',
          'Simulation: Execute simulated attacks, from initial phishing access to post-exploitation lateral movement.',
          'Purple Team Debrief: Jointly review detection gaps and defensive responses with your internal team.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            description:
              'Testing the holistic resilience of financial institutions against targeted, advanced persistent threats.',
          },
          {
            name: 'Enterprise & Manufacturing',
            description: 'Simulating aggressive ransomware actors to test SOC detection and operational resilience.',
          },
          {
            name: 'Healthcare & HealthTech',
            description: 'Evaluating physical and digital security controls protecting highly sensitive medical networks.',
          },
        ],
      },
      {
        id: 'adversary-simulation',
        name: 'Adversary Simulation',
        slug: 'adversary-simulation',
        anchor: 'adversary-simulation',
        shortDescription: 'Threat-actor-specific emulation for detection and response readiness.',
        image: ASSETS.capabilities.subCapabilities.offensive.simulation,
        positioning:
          'Adversary simulation focuses on emulating specific threat actors relevant to your industry - testing whether your defenses can detect and respond to targeted TTPs.',
        whatWeAssess: [
          'Detection coverage against specific threat actor TTPs',
          'SIEM rule and alert effectiveness',
          'EDR and endpoint detection capability',
          'SOC analyst response time and quality',
          'Threat hunting capability against simulated activity',
        ],
        approach: [
          'Threat Profiling: Identify the most relevant threat actors and map their TTPs using MITRE ATT&CK.',
          'Reconnaissance: Conduct OSINT, map external infrastructure, and research personnel.',
          'Simulation: Execute simulated attacks, from initial phishing access to post-exploitation lateral movement.',
          'Purple Team Debrief: Jointly review detection gaps and defensive responses with your internal team.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            description:
              'Testing the holistic resilience of financial institutions against targeted, advanced persistent threats.',
          },
          {
            name: 'Enterprise & Manufacturing',
            description: 'Simulating aggressive ransomware actors to test SOC detection and operational resilience.',
          },
        ],
      },
      {
        id: 'secure-code-review',
        name: 'Secure Code Review',
        image: ASSETS.capabilities.subCapabilities.offensive.secureCodeReview,
        slug: 'secure-code-review',
        anchor: 'secure-code-review',
        shortDescription: 'Manual and automated review of code paths that introduce exploitable risk.',
        positioning:
          'Shipping vulnerable code is expensive - finding it in production is more expensive. We review source code with security engineer eyes, not just SAST scanners.',
        whatWeAssess: [
          'Authentication and authorization logic',
          'Input validation and output encoding',
          'Cryptographic implementation correctness',
          'Secrets and credential handling in code',
          'Third-party library and dependency risk',
          'Business logic and access control implementation',
        ],
        approach: [
          'Scoping: Define languages, frameworks, and the most critical code repositories.',
          'Automated Pass: Utilize advanced SAST tooling to establish broad vulnerability coverage.',
          'Manual Review: Deploy security engineers to deep-dive into critical authentication and logic paths.',
          'Reporting: Provide code-level findings with exact line references and secure coding fixes.',
        ],
        standards: [],
        industries: [
          {
            name: 'SaaS & Technology',
            description:
              'Embedding security directly into the software development lifecycle of high-growth platforms.',
          },
          {
            name: 'FinTech & Digital Payments',
            description: 'Ensuring cryptographic implementations and financial logic are flawless before deployment.',
          },
          {
            name: 'E-commerce & Digital',
            description:
              'Preventing business logic vulnerabilities that could lead to inventory or payment manipulation.',
          },
        ],
      },
      {
        id: 'ai-agentic-system-security-testing',
        name: 'AI & Agentic System Security Testing',
        image: ASSETS.capabilities.subCapabilities.offensive.aiSecurity,
        slug: 'ai-agentic-system-security-testing',
        anchor: 'ai-agentic-system-security-testing',
        shortDescription: 'Security testing for AI applications, LLM-powered workflows, and multi-agent systems.',
        positioning:
          'Specialized security testing for AI-powered systems covering prompt injection, model abuse, data leakage, and unintended tool access in autonomous and multi-agent workflows.',
        whatWeAssess: [
          'Prompt injection and data leakage vulnerabilities',
          'Model inversion and evasion risks',
          'Inter-agent trust boundaries and communications',
          'Privilege escalation via unintended tool access',
          'RAG pipeline security and data poisoning',
        ],
        approach: [
          'Scope & Discovery: Enumerate AI surfaces, agent capabilities, and tool permissions in scope.',
          'Evaluate & Enumerate: Run model, workflow, and integration-level testing with manual validation.',
          'Compromise & Escalate: Demonstrate practical abuse paths and business impact scenarios.',
          'Upskill via Purple Team: Share defensive controls, monitoring patterns, and guardrail improvements.',
          'Report & Remediate: Deliver prioritized fixes and re-validation for closure.',
        ],
        standards: [],
        industries: [
          {
            name: 'SaaS & Technology',
            description: 'Securing AI-first products against prompt abuse and data leakage.',
          },
          {
            name: 'FinTech & Digital Payments',
            description: 'Testing autonomous AI flows operating in sensitive financial contexts.',
          },
          {
            name: 'Healthcare & HealthTech',
            description: 'Validating secure AI behavior in workflows handling regulated health data.',
          },
        ],
      },
    ],
  },
  {
    id: 'cloud-infrastructure',
    name: 'Cloud & Infrastructure Security',
    slug: 'cloud-infrastructure',
    navLabel: 'Cloud Security',
    navColumn: 'cloud-infrastructure',
    icon: 'shield',
    image: ASSETS.qctWebsite.cloud,
    cardDescription: 'Kubernetes security, cloud posture management (CSPM), and hybrid infrastructure hardening.',
    heroSubtitle: 'Architecture-to-operations security for cloud and hybrid platforms, built to reduce drift and sustain trustworthy scale.',
    platform: 'qstellar',
    relatedCapabilities: ['offensive-security', 'compliance-assurance'],
    faqs: [
      {
        question: 'Do you support all three major cloud providers?',
        answer: 'Yes, we provide comprehensive security assessments across all three major public cloud providers: AWS, Microsoft Azure, and Google Cloud Platform (GCP). For organizations leveraging multi-cloud or hybrid architectures, our specialists conduct unified reviews that evaluate complex cross-account trust relationships, IAM topologies, and configuration baselines in a single, cohesive engagement.',
      },
      {
        question: 'What is the difference between a cloud security assessment and CSPM?',
        answer:
          'A Cloud Security Assessment is an expert-led, point-in-time engineering deep-dive that manually uncovers complex architectural flaws, IAM misconfigurations, and trust boundary issues. Cloud Security Posture Management (CSPM), on the other hand, is an automated toolset deployed for continuous, real-time monitoring. CSPM constantly tracks your environment for configuration drift, exposed resources, and policy non-compliance, ensuring your baseline remains secure over time.',
      },
      {
        question: 'Do you assess managed Kubernetes services like EKS, AKS, and GKE?',
        answer:
          'Absolutely. While managed Kubernetes control planes are secured by the cloud provider, the customer is still fully responsible for the security of the workloads running on them. We assess the critical customer-managed configurations, including Role-Based Access Control (RBAC), network policies, pod security standards, secret management, and container identities across the full container lifecycle.',
      },
    ],
    subCapabilities: [
      {
        id: 'cloud-security-assessments',
        name: 'Cloud Security Assessments',
        image: ASSETS.capabilities.subCapabilities.cloud.cloudAssessment,
        slug: 'cloud-security-assessments',
        anchor: 'cloud-security-assessments',
        shortDescription: 'Comprehensive cloud security posture assessment across multi-cloud deployments.',
        positioning:
          'Cloud environments are complex, fast-moving, and frequently misconfigured. We assess your cloud security posture with the depth that automated tools cannot provide.',
        whatWeAssess: [
          'Identity and access management configuration',
          'Network architecture and security group rules',
          'Data storage security and encryption',
          'Logging, monitoring, and alerting coverage',
          'Secrets and credential management',
          'Inter-service communication security',
        ],
        approach: [
          'Discovery: Enumerate all cloud resources, services, and cross-account relationships in scope.',
          'Configuration Audit: Run automated assessments against CIS Benchmarks and platform-native standards.',
          'Architecture Analysis: Perform manual deep-dives into IAM policies, VPC design, and trust boundaries.',
          'Reporting: Deliver risk-rated findings paired with cloud-native remediation scripts and guidance.',
        ],
        standards: [],
        industries: [
          {
            name: 'SaaS & Technology',
            description: 'Hardening complex, multi-tenant cloud platforms built on AWS, Azure, or GCP.',
          },
          {
            name: 'Banking & Financial Services',
            description:
              'Ensuring cloud infrastructure meets strict data sovereignty and financial compliance mandates.',
          },
          {
            name: 'E-commerce & Digital',
            description: 'Securing high-traffic, auto-scaling cloud environments against exposure and misconfiguration.',
          },
        ],
      },
      {
        id: 'aws-azure-gcp-security-assessment',
        name: 'AWS / Azure / GCP Security Assessment',
        slug: 'aws-azure-gcp-security-assessment',
        anchor: 'aws-azure-gcp-security-assessment',
        shortDescription: 'Platform-specific security assessment for AWS, Microsoft Azure, and GCP estates.',
        positioning:
          'Generic cloud assessments miss platform-specific nuances. Our AWS and Azure specialists assess your environment against platform-native security best practices.',
        whatWeAssess: [
          'AWS: IAM policies, S3 bucket security, VPC configuration, CloudTrail, GuardDuty coverage',
          'Azure: Entra ID configuration, NSG rules, Key Vault usage, Defender for Cloud coverage',
          'Cross-account and cross-subscription trust relationships',
          'Serverless function security (Lambda, Azure Functions)',
          'PaaS service security configuration',
          'Cost and resource anomaly indicators of compromise',
        ],
        approach: [
          'Discovery: Enumerate all cloud resources, services, and cross-account relationships in scope.',
          'Configuration Audit: Run automated assessments against CIS Benchmarks and platform-native standards.',
          'Architecture Analysis: Perform manual deep-dives into IAM policies, VPC design, and trust boundaries.',
          'Reporting: Deliver risk-rated findings paired with cloud-native remediation scripts and guidance.',
        ],
        standards: [],
        industries: [
          {
            name: 'SaaS & Technology',
            description: 'Hardening complex, multi-tenant cloud platforms built on AWS, Azure, or GCP.',
          },
          {
            name: 'FinTech & Digital Payments',
            description:
              'Ensuring specialized native services like AWS KMS or Azure Key Vault are implemented securely.',
          },
          {
            name: 'Enterprise & Manufacturing',
            description:
              'Securing Azure AD / Entra ID hybrid configurations connecting global plants to the cloud.',
          },
        ],
      },
      {
        id: 'kubernetes-container-security',
        name: 'Kubernetes & Container Security',
        image: ASSETS.capabilities.subCapabilities.cloud.containerSecurity,
        slug: 'kubernetes-container-security',
        anchor: 'kubernetes-container-security',
        shortDescription: 'Container lifecycle and cluster security testing for Kubernetes environments.',
        positioning:
          'Kubernetes security is a distinct discipline. Misconfigurations in clusters, images, and runtime can expose entire environments. We assess the full container lifecycle.',
        whatWeAssess: [
          'Kubernetes RBAC and service account configuration',
          'Pod security standards and admission controllers',
          'Network policies and inter-pod communication',
          'Container image vulnerabilities and hardening',
          'Secrets management within Kubernetes',
          'Etcd security and API server configuration',
        ],
        approach: [
          'Cluster Audit: Perform automated and manual assessments of the Kubernetes control plane and API server.',
          'Configuration Review: Analyze RBAC, network policies, and admission controllers for least privilege.',
          'Image Scanning: Identify vulnerabilities and misconfigurations within container images.',
          'Reporting: Provide cluster-level and workload-level remediation strategies.',
        ],
        standards: [],
        industries: [
          {
            name: 'SaaS & Technology',
            description:
              'Securing massive, microservices-based architectures running on managed or self-hosted Kubernetes.',
          },
          {
            name: 'FinTech & Digital Payments',
            description: 'Isolating highly sensitive financial workloads within containerized environments.',
          },
          {
            name: 'E-commerce & Digital',
            slug: 'ecommerce',
            image: ASSETS.qctWebsite.ecommerce,
            description: 'Securing customer data, payment processing, and mobile commerce applications for digital retail leaders.',
          },
        ],
      },
      {
        id: 'cloud-security-posture-management-cspm',
        name: 'Cloud Security Posture Management (CSPM)',
        image: ASSETS.capabilities.subCapabilities.cloud.cspm,
        slug: 'cloud-security-posture-management-cspm',
        anchor: 'cloud-security-posture-management-cspm',
        shortDescription: 'Continuous monitoring for cloud misconfiguration, exposure, and compliance drift.',
        positioning:
          'Cloud environments change constantly. CSPM provides continuous visibility into misconfigurations, compliance drift, and emerging risks - in real time.',
        whatWeAssess: [
          'Configuration compliance across all cloud services and accounts',
          'Publicly exposed resources and attack surface',
          'Identity and permission risk (over-privileged accounts)',
          'Encryption and data protection control coverage',
          'Compliance posture against regulatory frameworks',
          'Drift from approved configuration baselines',
        ],
        approach: [
          'Deployment & Discovery: Implement monitoring tools and inventory all network assets.',
          'Baselining: Establish approved security configuration baselines across hybrid environments.',
          'Alerting & Analysis: Configure risk-based alerts for configuration drift and assess network segmentation.',
          'Reporting: Deliver continuous compliance dashboards and prioritized infrastructure remediation plans.',
        ],
        standards: [],
        industries: [
          {
            name: 'SaaS & Technology',
            description: 'Providing continuous governance over hyper-scaling development environments.',
          },
          {
            name: 'Banking & Financial Services',
            description: 'Maintaining real-time visibility and configuration control across global financial networks.',
          },
          {
            name: 'E-commerce & Digital',
            description: 'Preventing misconfigured cloud storage from exposing millions of consumer records.',
          },
        ],
      },
      {
        id: 'on-premises-hybrid-infrastructure-hardening',
        name: 'On-Premises & Hybrid Infrastructure Hardening',
        image: ASSETS.capabilities.subCapabilities.cloud.cloudHardening,
        slug: 'on-premises-hybrid-infrastructure-hardening',
        anchor: 'on-premises-hybrid-infrastructure-hardening',
        shortDescription: 'Adversary-minded review and hardening of on-premises and hybrid infrastructure controls.',
        positioning:
          'On-premises infrastructure remains a critical attack surface for most enterprises. We review infrastructure security with adversary-minded assessment methodology.',
        whatWeAssess: [
          'Network architecture and segmentation',
          'Firewall and perimeter device configuration',
          'Server hardening against CIS benchmarks',
          'Directory services and Active Directory security',
          'Patch management coverage and cadence',
          'Endpoint protection and detection coverage',
        ],
        approach: [
          'Deployment & Discovery: Implement monitoring tools and inventory all network assets.',
          'Baselining: Establish approved security configuration baselines across hybrid environments.',
          'Alerting & Analysis: Configure risk-based alerts for configuration drift and assess network segmentation.',
          'Reporting: Deliver continuous compliance dashboards and prioritized infrastructure remediation plans.',
        ],
        standards: [],
        industries: [
          {
            name: 'Enterprise & Manufacturing',
            description: 'Securing complex, hybrid environments spanning on-premises data centers and the cloud.',
          },
          {
            name: 'Banking & Financial Services',
            description: 'Maintaining rigorous access controls across branch networks and legacy data centers.',
          },
          {
            name: 'Healthcare & HealthTech',
            description:
              'Protecting on-premises hospital networks and securing paths to cloud-hosted medical records.',
          },
        ],
      },
      {
        id: 'cloud-compliance-review',
        name: 'Cloud Compliance Review',
        slug: 'cloud-compliance-review',
        anchor: 'cloud-compliance-review',
        shortDescription: 'Map cloud controls to regulatory requirements and close compliance gaps.',
        positioning:
          'Regulatory frameworks increasingly mandate specific cloud security controls. We map your cloud environment to applicable compliance requirements and identify gaps.',
        whatWeAssess: [
          'Data residency and sovereignty compliance',
          'Encryption at rest and in transit requirements',
          'Access logging and audit trail completeness',
          'Backup and recovery control compliance',
          'Shared responsibility model implementation',
          'Vendor and service provider compliance documentation',
        ],
        approach: [
          'Deployment & Discovery: Implement monitoring tools and inventory all network assets.',
          'Baselining: Establish approved security configuration baselines across hybrid environments.',
          'Alerting & Analysis: Configure risk-based alerts for configuration drift and assess network segmentation.',
          'Reporting: Deliver continuous compliance dashboards and prioritized infrastructure remediation plans.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            description: 'Ensuring cloud footprints comply with RBI localized data mandates.',
          },
          {
            name: 'FinTech & Digital Payments',
            description: 'Validating cloud PCI-DSS compliance before formal assessment audits.',
          },
          {
            name: 'Healthcare & HealthTech',
            description: 'Ensuring Electronic Health Records (EHR) hosted in the cloud meet HIPAA security rules.',
          },
        ],
      },
    ],
  },
  {
    id: 'managed-defense',
    name: 'Managed Detection, Response & SOC Operations',
    slug: 'managed-defense',
    navLabel: 'Managed Defense',
    navColumn: 'managed-defense',
    icon: 'radio',
    image: ASSETS.capabilities.defense,
    cardDescription: 'Managed SOC, monitoring, response, threat hunting, and human-layer simulation services for persistent defense.',
    heroSubtitle: 'Continuous security operations combining tuned telemetry, analyst expertise, and decisive incident handling.',
    platform: 'qpulse',
    relatedCapabilities: ['cyber-intelligence', 'offensive-security'],
    faqs: [
      {
        question: 'What are your MTTD and MTTR targets?',
        answer:
          'Our 24/7 Managed SOC operations are built for rapid, decisive action against cyber threats. For high-severity alerts, our target Mean Time to Detect (MTTD) is strictly under 15 minutes. For critical, confirmed incidents, our target Mean Time to Respond (MTTR) is under one hour to initiate containment playbooks, effectively isolating affected systems before an attacker can move laterally.',
      },
      {
        question: 'Do you replace our existing SIEM or work with it?',
        answer:
          'We are highly flexible and typically integrate directly with your existing SIEM infrastructure, applying our expertise to tune detection rules, minimize false positives, and significantly reduce alert fatigue for your team. However, if your organization does not currently have a SIEM in place, we can fully deploy, configure, and operate a robust SIEM solution as part of our comprehensive managed defense onboarding.',
      },
      {
        question: 'Can you respond to active incidents if we are not a managed SOC customer?',
        answer:
          'Yes, we offer on-demand Incident Response Retainers designed specifically for organizations that require guaranteed, rapid-response capabilities without committing to a full-time managed SOC contract. This ensures that in the event of a critical breach or ransomware attack, our digital forensics and incident response experts can instantly deploy to contain the threat and recover your operations with forensic rigor.',
      },
      {
        question: 'How realistic are your phishing simulations?',
        answer:
          'Our simulations go far beyond generic, easily identifiable phishing templates. We custom-craft highly targeted, role-specific spear-phishing and social engineering scenarios by leveraging contextual intelligence about your organization, industry trends, and internal communication patterns. This creates a realistic simulation of advanced threat actor tactics, ultimately building genuine resilience across your human layer.',
      },
    ],
    subCapabilities: [
      {
        id: 'managed-soc',
        name: 'Managed SOC & Security Monitoring',
        slug: 'managed-soc',
        anchor: 'managed-soc',
        shortDescription: '24x7 SOC operations with integrated monitoring, triage, and coordinated response.',
        positioning:
          'Building an in-house SOC is expensive and slow. Our Managed SOC delivers enterprise-grade security operations from day one - with the analysts, tooling, and processes already in place.',
        whatWeAssess: [
          'Log source coverage and SIEM ingestion completeness',
          'Detection rule library and custom use case coverage',
          'Alert volume and false positive rates',
          'Mean time to detect (MTTD) and respond (MTTR)',
          'Escalation workflows and client communication processes',
        ],
        approach: [
          'Onboarding: Integrate log sources, map to the MITRE ATT&CK framework, and tune baseline rules.',
          'Detection: Provide 24/7/365 real-time alert monitoring, triage, and threat investigation.',
          'Response: Execute agreed playbooks to swiftly isolate affected systems and block malicious activity.',
          'Reporting: Deliver weekly threat summaries, monthly health reports, and actionable security insights.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            description: 'Delivering enterprise-grade, round-the-clock defense for critical financial infrastructure.',
          },
          {
            name: 'SaaS & Technology',
            description: 'Monitoring rapid cloud deployments for misconfigurations and anomaly indicators.',
          },
          {
            name: 'Enterprise & Manufacturing',
            description: 'Monitoring globally distributed IT and OT networks for advanced persistent threats.',
          },
        ],
      },
      {
        id: 'incident-response',
        name: 'Incident Response',
        slug: 'incident-response',
        anchor: 'incident-response',
        shortDescription: 'Rapid incident containment, eradication, and recovery with forensic rigor.',
        positioning:
          'When an incident happens, every minute matters. Our incident response team deploys rapidly to contain threats, preserve evidence, and restore operations.',
        whatWeAssess: [
          'Incident scope and initial indicators of compromise',
          'Affected systems, accounts, and data',
          'Attacker persistence mechanisms and lateral movement paths',
          'Root cause and initial access vector',
          'Data exfiltration evidence and extent',
        ],
        approach: [
          'Hypothesis & Triage: Develop hunt hypotheses based on threat intel, or rapidly assess initial incident scope.',
          'Investigation: Deploy analysts to investigate network anomalies, telemetry, and forensic data.',
          'Containment & Eradication: Isolate affected systems, remove attacker persistence, and recover operations.',
          'Post-Incident: Deliver root cause analysis, threat hunt findings, and permanent detection improvements.',
        ],
        standards: [],
        industries: [
          {
            name: 'Healthcare & HealthTech',
            description:
              'Rapidly containing and recovering from disruptive cyber incidents targeting critical care systems.',
          },
          {
            name: 'Enterprise & Manufacturing',
            description: 'Proactively hunting for dormant adversaries within complex, legacy industrial networks.',
          },
          {
            name: 'Banking & Financial Services',
            description:
              'Conducting deep forensic investigations and hunting for sophisticated financial cybercrime.',
          },
        ],
      },
      {
        id: 'threat-hunting',
        name: 'Threat Hunting',
        slug: 'threat-hunting',
        anchor: 'threat-hunting',
        shortDescription: 'Proactive analyst-led hunts for stealthy attacker activity missed by automation.',
        positioning:
          'Sophisticated attackers live in environments for months before detection. Threat hunting proactively searches for attacker activity that automated tools have missed.',
        whatWeAssess: [
          'Endpoint telemetry for behavioral anomalies',
          'Network traffic for command-and-control indicators',
          'Identity and authentication anomalies',
          'Persistence mechanisms and scheduled task abuse',
          'Data staging and exfiltration indicators',
        ],
        approach: [
          'Hypothesis & Triage: Develop hunt hypotheses based on threat intel, or rapidly assess initial incident scope.',
          'Investigation: Deploy analysts to investigate network anomalies, telemetry, and forensic data.',
          'Containment & Eradication: Isolate affected systems, remove attacker persistence, and recover operations.',
          'Post-Incident: Deliver root cause analysis, threat hunt findings, and permanent detection improvements.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            description:
              'Conducting deep forensic investigations and hunting for sophisticated financial cybercrime.',
          },
          {
            name: 'Enterprise & Manufacturing',
            description: 'Proactively hunting for dormant adversaries within complex, legacy industrial networks.',
          },
          {
            name: 'SaaS & Technology',
            description: 'Hunting for stealthy persistence mechanisms in rapidly changing cloud infrastructure.',
          },
        ],
      },
      {
        id: 'user-awareness-social-engineering-simulations',
        name: 'User Awareness & Social Engineering Simulations',
        slug: 'user-awareness-social-engineering-simulations',
        anchor: 'user-awareness-social-engineering-simulations',
        shortDescription: 'Behavioral testing and targeted awareness programs for human-layer resilience.',
        positioning:
          'The most sophisticated technical defenses can be bypassed by a single successful phishing email. We test and train your people - your last line of defense.',
        whatWeAssess: [
          'Phishing click and credential submission rates by department',
          'Pretexting and vishing susceptibility',
          'Physical social engineering controls where in scope',
          'Security awareness effectiveness across organizational levels',
          'Incident reporting behavior when employees suspect phishing',
        ],
        approach: [
          'Campaign Design: Build realistic, role-targeted social engineering and phishing scenarios.',
          'Execution: Deploy campaigns securely, tracking clicks, opens, and credential submissions.',
          'Analysis: Generate department-level susceptibility reports and behavioral insights.',
          'Training: Deliver targeted, practical cybersecurity awareness training to high-risk employee groups.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            description: 'Hardening staff against targeted spear-phishing and financial fraud attempts.',
          },
          {
            name: 'Enterprise & Manufacturing',
            description:
              'Training global workforces to recognize and report suspicious social engineering tactics.',
          },
          {
            name: 'Healthcare & HealthTech',
            description: 'Educating hospital staff on the critical importance of protecting patient data from phishing.',
          },
        ],
      },
    ],
  },
  {
    id: 'cyber-intelligence',
    name: 'Cyber Intelligence & Security Research',
    slug: 'cyber-intelligence',
    navLabel: 'Threat Intelligence',
    navColumn: 'managed-defense',
    icon: 'trending-up',
    image: ASSETS.capabilities.intelligence,
    cardDescription: 'Cyber threat intelligence, dark web and brand monitoring, attack surface intelligence, and vulnerability research tailored to risk priorities.',
    heroSubtitle: 'Actionable intelligence services that convert external threat signals into prioritized security decisions and response actions.',
    platform: 'qpulse',
    relatedCapabilities: ['managed-defense', 'cyber-advisory'],
    faqs: [
      {
        question: 'How is your CTI different from subscribing to a commercial feed?',
        answer:
          'Commercial threat feeds often flood security teams with generic, raw data that leads to alert fatigue and wasted triage time. Our Cyber Threat Intelligence (CTI) service provides analyst-curated, highly contextualized intelligence that is specifically mapped to your organization\'s technology stack, geographic footprint, and industry risk profile. We filter out the noise to deliver prioritized advisories that your team can act on immediately.',
      },
      {
        question: 'How do dark web takedowns work?',
        answer:
          'When our continuous monitoring detects malicious activity, such as brand impersonation domains, fraudulent social media profiles, or leaked corporate assets, we handle the mitigation process end-to-end. Our analysts initiate formal takedown workflows, coordinating directly with domain registrars, hosting providers, and relevant abuse channels to swiftly remove the offending infrastructure and protect your brand reputation.',
      },
      {
        question: 'Can you monitor leaked credentials for our organization?',
        answer:
          'Yes, we provide 24/7 continuous monitoring across dark web marketplaces, illicit forums, paste sites, and known breach databases. We configure this surveillance specifically for your organization\'s email domains, key digital assets, and executive identities. If employee credentials or sensitive session tokens are compromised and leaked, we issue near real-time alerts so you can force password resets and invalidate tokens before they are exploited.',
      },
    ],
    subCapabilities: [
      {
        id: 'cyber-threat-intelligence-cti-service',
        name: 'Cyber Threat Intelligence (CTI) as a Service',
        slug: 'cyber-threat-intelligence-cti-service',
        anchor: 'cyber-threat-intelligence-cti-service',
        shortDescription: 'Customized intelligence on threat actors, exploit trends, and emerging risk signals.',
        positioning:
          'Generic threat feeds create noise. Our CTI service delivers intelligence tailored to your organization - actionable insights about threats that are actually targeting you.',
        whatWeAssess: [
          'Threat actors targeting your industry and geography',
          'Indicators of compromise relevant to your technology stack',
          'Emerging attack techniques and malware campaigns',
          'Vulnerabilities being actively exploited in the wild',
          'Supply chain and third-party threat exposure',
        ],
        approach: [
          'Profiling: Build a customized threat profile based on your industry, geography, and technology stack.',
          'Collection & Monitoring: Gather intelligence from deep web, OSINT, and commercial data lakes, tracking relevant CVEs.',
          'Analysis: Utilize expert analysts to correlate data, eliminate false positives, and prioritize risks.',
          'Delivery: Provide real-time critical alerts, weekly intelligence briefs, and actionable patch guidance.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            description: 'Anticipating sophisticated cyber-attacks and tracking financial threat actor campaigns.',
          },
          {
            name: 'Enterprise & Manufacturing',
            description:
              'Staying ahead of zero-day vulnerabilities targeting industrial control systems and supply chains.',
          },
          {
            name: 'SaaS & Technology',
            description:
              'Receiving curated vulnerability advisories specific to your platform\'s exact technology stack.',
          },
        ],
      },
      {
        id: 'dark-web-brand-intelligence',
        name: 'Dark Web & Brand Intelligence',
        slug: 'dark-web-brand-intelligence',
        anchor: 'dark-web-brand-intelligence',
        shortDescription: 'Continuous monitoring for leaked credentials, brand impersonation, and exposure events.',
        positioning:
          'Continuous monitoring across dark web and surface channels for leaked credentials, impersonation domains, fraudulent profiles, and early warning indicators tied to your brand.',
        whatWeAssess: [
          'Leaked employee credentials on dark web marketplaces',
          'Corporate data and document leaks on paste sites and forums',
          'Lookalike and typosquatting domains targeting your brand',
          'Compromised session tokens and authentication materials',
          'Fraudulent social media profiles and impersonation attempts',
        ],
        approach: [
          'Asset Mapping: Define the domains, social handles, executive names, and brand elements requiring protection.',
          'Continuous Monitoring: Execute 24/7 automated scanning across dark web forums, paste sites, and app stores.',
          'Verification: Perform manual analyst investigation on high-confidence matches and data leaks.',
          'Takedown: Initiate and manage rapid takedown requests for fraudulent domains and impersonating accounts.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            description: 'Detecting compromised customer credentials and taking down fraudulent banking portals.',
          },
          {
            name: 'Enterprise & Manufacturing',
            description: 'Monitoring the deep web for leaked corporate data and supply chain threats.',
          },
          {
            name: 'SaaS & Technology',
            description: 'Detecting leaked source code, credentials, or API keys exposed on hidden forums.',
          },
        ],
      },
      {
        id: 'attack-surface-intelligence',
        name: 'Attack Surface Intelligence',
        slug: 'attack-surface-intelligence',
        anchor: 'attack-surface-intelligence',
        shortDescription: 'Continuous mapping of internet-facing assets and shadow IT.',
        positioning:
          'Continuous external attack surface mapping identifies exposed assets, shadow IT, and unmanaged infrastructure before attackers do.',
        whatWeAssess: [
          'Exposed asset discovery and enumeration',
          'Shadow IT and unmanaged infrastructure detection',
          'Open ports and exposed service continuous monitoring',
          'Subsidiary and acquired entity footprint mapping',
          'Certificate and sub-domain takeover risks',
        ],
        approach: [
          'Scope & Profile: Map domains, cloud accounts, subsidiaries, and internet-facing assets.',
          'Evaluate & Collect: Continuously discover assets and monitor exposure drift signals.',
          'Correlate & Analyse: Validate findings, remove false positives, and rank exploitability.',
          'Upskill via Reporting: Share prioritized findings with ownership and remediation guidance.',
          'Respond & Harden: Track closure, re-validate exposed paths, and maintain external posture hygiene.',
        ],
        standards: [],
        industries: [
          {
            name: 'Banking & Financial Services',
            description: 'Monitoring complex digital perimeters and subsidiary footprints for exposed assets.',
          },
          {
            name: 'SaaS & Technology',
            description: 'Tracking dynamic cloud infrastructure and orphaned development environments.',
          },
        ],
      },
      {
        id: 'vulnerability-research-security-advisories',
        name: 'Vulnerability Research & Security Advisories',
        slug: 'vulnerability-research-security-advisories',
        anchor: 'vulnerability-research-security-advisories',
        shortDescription: 'Curated vulnerability intelligence and advisory delivery tailored to your stack.',
        positioning:
          'Knowing about vulnerabilities before they are exploited gives you a decisive advantage. Our research team tracks and advises on vulnerabilities that matter to your environment.',
        whatWeAssess: [
          'CVEs relevant to your specific technology stack and versions',
          'Actively exploited vulnerabilities requiring immediate attention',
          'Vendor patch release cadence and reliability',
          'Compensating control adequacy for unpatched vulnerabilities',
          'Vulnerability trends in your industry sector',
        ],
        approach: [
          'Profiling: Build a customized threat profile based on your industry, geography, and technology stack.',
          'Collection & Monitoring: Gather intelligence from deep web, OSINT, and commercial data lakes, tracking relevant CVEs.',
          'Analysis: Utilize expert analysts to correlate data, eliminate false positives, and prioritize risks.',
          'Delivery: Provide real-time critical alerts, weekly intelligence briefs, and actionable patch guidance.',
        ],
        standards: [],
        industries: [
          {
            name: 'SaaS & Technology',
            description:
              'Receiving curated vulnerability advisories specific to your platform\'s exact technology stack.',
          },
          {
            name: 'Banking & Financial Services',
            description: 'Anticipating sophisticated cyber-attacks and tracking financial threat actor campaigns.',
          },
          {
            name: 'Enterprise & Manufacturing',
            description:
              'Staying ahead of zero-day vulnerabilities targeting industrial control systems and supply chains.',
          },
        ],
      },
    ],
  },
];

export const capabilitiesData = capabilities;

export const capabilityHighlights: Record<string, { capability: string[]; subCapabilities: Record<string, string[]> }> = {
  'cyber-advisory': {
    capability: ['Cyber Security'],
    subCapabilities: {
      'executive-cyber-advisory': ['Cyber'],
      'security-zero-trust-architecture-review': ['Security'],
      'virtual-ciso-vciso-services': ['VCISO'],
      'security-program-development': ['Security'],
      'third-party-supply-chain-risk-management': ['Risk'],
    },
  },
  'compliance-assurance': {
    capability: ['Compliance'],
    subCapabilities: {
      'regulatory-gap-assessment': ['Regulatory'],
      'risk-compliance-monitoring': ['Compliance'],
      'rbi-cyber-security-framework-compliance': ['Cyber Security'],
      'dpdp-act-compliance': ['DPDP Act'],
      'soc2-readiness': ['SOC2'],
    },
  },
  'offensive-security': {
    capability: ['Security'],
    subCapabilities: {
      'web-application-security-testing': ['Security'],
      'mobile-application-security-testing': ['Security'],
      'api-security-testing': ['Security'],
      'red-team': ['Red Teaming'],
      'adversary-simulation': ['Adversary'],
      'secure-code-review': ['Secure'],
      'ai-agentic-system-security-testing': ['Security'],
    },
  },
  'cloud-infrastructure': {
    capability: ['Security'],
    subCapabilities: {
      'cloud-security-assessments': ['Security'],
      'aws-azure-gcp-security-assessment': ['Security'],
      'kubernetes-container-security': ['Security'],
      'cloud-security-posture-management-cspm': ['Security'],
      'on-premises-hybrid-infrastructure-hardening': ['Hardening', 'Security'],
      'cloud-compliance-review': ['Compliance'],
    },
  },
  'managed-defense': {
    capability: ['Response'],
    subCapabilities: {
      'managed-soc': ['SOC'],
      'incident-response': ['Response'],
      'threat-hunting': ['Threat'],
      'user-awareness-social-engineering-simulations': ['Awareness'],
    },
  },
  'cyber-intelligence': {
    capability: ['Threat Intelligence'],
    subCapabilities: {
      'cyber-threat-intelligence-cti-service': ['Threat Intelligence'],
      'dark-web-brand-intelligence': ['Dark Web', 'Brand Intelligence'],
      'attack-surface-intelligence': ['Attack Surface'],
      'vulnerability-research-security-advisories': ['Security'],
    },
  },
};

export const methodologyStepIconByPhase: Record<string, string> = {
  discovery: 'search',
  'risk mapping': 'shieldAlert',
  'framework alignment': 'landmark',
  'roadmap delivery': 'map',
  'architecture mapping': 'network',
  'gap analysis': 'scanSearch',
  design: 'draftingCompass',
  'implementation roadmap': 'route',
  onboarding: 'plugZap',
  'priority setting': 'listChecks',
  'ongoing leadership': 'users',
  'maturity review': 'barChart3',
  assessment: 'clipboardCheck',
  implementation: 'wrench',
  measurement: 'ruler',
  scoping: 'focus',
  reporting: 'fileText',
  baselining: 'gauge',
  monitoring: 'radar',
  alerting: 'bellRing',
  'readiness assessment': 'badgeCheck',
  remediation: 'hammer',
  'auditor support': 'shieldCheck',
  reconnaissance: 'binoculars',
  'vulnerability identification': 'bug',
  exploitation: 'crosshair',
  'threat profiling': 'fingerprint',
  simulation: 'swords',
  'purple team debrief': 'messagesSquare',
  'manual review': 'fileSearch',
  'attack testing': 'zap',
  'cluster audit': 'boxes',
  'configuration review': 'slidersHorizontal',
  'image scanning': 'imageSearch',
  'deployment & discovery': 'cloudCog',
  'alerting & analysis': 'activity',
  'campaign design': 'penTool',
  execution: 'playCircle',
  analysis: 'lineChart',
  training: 'graduationCap',
  'hypothesis & triage': 'stethoscope',
  investigation: 'searchCode',
  'containment & eradication': 'shieldX',
  'post-incident': 'history',
  'asset mapping': 'mapPinned',
  'continuous monitoring': 'eye',
  verification: 'checkCircle2',
  takedown: 'shieldOff',
  'collection & monitoring': 'database',
  delivery: 'send',
};

const capabilitySlugAliases: Record<string, string> = {
  compliance: 'compliance-assurance',
  'cloud-security': 'cloud-infrastructure',
};

export const getCapabilityBySlug = (slug: string) => {
  const resolvedSlug = capabilitySlugAliases[slug] || slug;
  return capabilities.find((capability) => capability.slug === resolvedSlug);
};

export const getSubCapabilityBySlug = (capSlug: string, subSlug: string) =>
  getCapabilityBySlug(capSlug)?.subCapabilities.find((subCapability) => subCapability.slug === subSlug);

export const getCapabilitiesByNavColumn = (column: Capability['navColumn']) =>
  capabilities.filter((capability) => capability.navColumn === column);

export type CapabilityId = (typeof capabilities)[number]['id'];
