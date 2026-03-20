import { Landmark, CreditCard, Laptop, ShoppingCart, Activity, Factory, ShieldAlert, Bug, Eye, Cloud, Zap, AlertTriangle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Industry Photos
import imgBanking from '../assets/industries/Banking_and_Financial Services.jpg';
import imgEcommerce from '../assets/industries/E-commerce & Digital Platforms.jpg';
import imgEnterprise from '../assets/industries/Enterprise_and_Manufacturing.jpg';
import imgFintech from '../assets/industries/FinTech & Digital Payments.jpg';
import imgHealthcare from '../assets/industries/Healthcare & HealthTech.png';
import imgSaaS from '../assets/industries/SaaS_and_Technology Platforms.jpg';

export interface IndustryData {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  image: string;
  tags: string[];
  overview: {
    heading: string;
    highlight: string;
    body: string[];
    capabilities: { name: string; slug: string }[];
  };
  challenges: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  whyQCT: {
    title: string;
    description: string;
  }[];
}

export const industriesData: IndustryData[] = [
  {
    slug: 'banking',
    name: 'Banking & Financial Services',
    eyebrow: 'BFSI SECURITY',
    title: 'Banking &',
    highlight: 'Financial Services',
    subtitle: 'Cybersecurity, compliance, and risk governance for banks, NBFCs, and financial institutions.',
    description: 'Securing core banking infrastructure, digital channels, and regulatory adherence for modern financial frameworks.',
    icon: Landmark,
    image: imgBanking,
    tags: ['RBI Compliance', 'Core Banking', 'Data Privacy', 'Zero Trust'],
    overview: {
      heading: 'Securing the Foundation of',
      highlight: 'Financial Trust',
      body: [
        'The financial sector faces the most intensive regulatory scrutiny and sophisticated cyber threats. QuasarCyberTech provides the strategic governance and technical validation necessary to meet RBI guidelines and international standards.',
        'Our banking-specific security services cover everything from the data center to the mobile application, ensuring that financial data remains confidential and operations resilient.'
      ],
      capabilities: [
        { name: 'Risk Governance', slug: 'cyber-advisory' },
        { name: 'Regulatory Compliance', slug: 'compliance' },
        { name: 'Offensive Security', slug: 'offensive-security' }
      ]
    },
    challenges: [
      { icon: ShieldAlert, title: 'Regulatory Compliance', description: 'Meeting evolving RBI and global financial cybersecurity frameworks.' },
      { icon: Eye, title: 'Insider Threat', description: 'Detecting and preventing unauthorized access to core financial data.' },
      { icon: AlertTriangle, title: 'Third-Party Risk', description: 'Managing the security posture of FinTech partners and vendors.' }
    ],
    whyQCT: [
      { title: 'Governance Experts', description: 'Deep knowledge of RBI cybersecurity guidelines and international finance standards.' },
      { title: 'Red Team Specialization', description: 'Advanced simulations specifically designed for complex financial systems.' }
    ]
  },
  {
    slug: 'fintech',
    name: 'FinTech & Digital Payments',
    eyebrow: 'PAYMENTS SECURITY',
    title: 'FinTech &',
    highlight: 'Digital Payments',
    subtitle: 'Application security, cloud protection, and compliance for digital financial platforms.',
    description: 'Specialized security for high-velocity payment gateways, wallet ecosystems, and embedded finance.',
    icon: CreditCard,
    image: imgFintech,
    tags: ['Payment Security', 'API Security', 'SOC2 / PCI-DSS', 'Fraud Prevention'],
    overview: {
      heading: 'Innovation at the Speed of',
      highlight: 'Modern Finance',
      body: [
        'FinTech companies move fast, but security cannot be an afterthought. We help payment providers and wallets build security into their cloud-native microservices and APIs.',
        'Our offensive security engineering ensures that your transaction logic is as robust as your encryption, protecting both your platform and your customers.'
      ],
      capabilities: [
        { name: 'AppSec Testing', slug: 'offensive-security' },
        { name: 'Cloud Security', slug: 'cloud-security' },
        { name: 'SOC Operations', slug: 'managed-defense' }
      ]
    },
    challenges: [
      { icon: Bug, title: 'API Vulnerability', description: 'Preventing broken object-level authorization (BOLA) and logic flaws in payment flows.' },
      { icon: Cloud, title: 'Cloud Misconfig', description: 'Securing serverless and containerized payment processing environments.' },
      { icon: ShieldAlert, title: 'Data Sovereignty', description: 'Ensuring sensitive financial data remains within jurisdictional boundaries.' }
    ],
    whyQCT: [
      { title: 'DevSecOps Native', description: 'We integrate security testing directly into your CI/CD pipelines without slowing down code.' },
      { title: 'Platform Innovation', description: 'Leveraging QRGT for continuous application validation and remediation tracking.' }
    ]
  },
  {
    slug: 'saas',
    name: 'SaaS & Technology Platforms',
    eyebrow: 'CLOUDNATIVE SECURITY',
    title: 'SaaS &',
    highlight: 'Technology Platforms',
    subtitle: 'Secure development, application testing, and cloud security for modern SaaS companies.',
    description: 'End-to-end security for B2B and B2C software providers, from the code to the cloud container.',
    icon: Laptop,
    image: imgSaaS,
    tags: ['DevSecOps', 'Multi-tenant Security', 'Cloud-Native', 'Application Security'],
    overview: {
      heading: 'Building Trust in the',
      highlight: 'SaaS Economy',
      body: [
        'For software-as-a-service providers, security is a core product feature. We help technology firms demonstrate security excellence to their enterprise clients through rigorous testing and compliance readiness.',
        'From cloud infrastructure assessments to deep-dive source code reviews, we ensure your platform remains a trusted gateway for your users.'
      ],
      capabilities: [
        { name: 'Secure Engineering', slug: 'offensive-security' },
        { name: 'Cloud Protection', slug: 'cloud-security' },
        { name: 'Risk Advisory', slug: 'cyber-advisory' }
      ]
    },
    challenges: [
      { icon: Zap, title: 'Rapid Deployment', description: 'Maintaining security posture across frequent code pushes and feature launches.' },
      { icon: Eye, title: 'Multi-tenant Isolation', description: 'Ensuring logical separation of customer data across shared infrastructure.' },
      { icon: Cloud, title: 'Infrastructure Drift', description: 'Detecting and remediating unsanctioned changes to cloud security groups.' }
    ],
    whyQCT: [
      { title: 'Full Stack Vision', description: 'We assess the entire software stack, from application code to public cloud infrastructure.' },
      { title: 'Compliance Speed', description: 'Streamlining SOC2 and ISO readiness to help you win larger enterprise customers.' }
    ]
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce & Digital Platforms',
    eyebrow: 'DIGITAL COMMERCE',
    title: 'E-commerce &',
    highlight: 'Digital Platforms',
    subtitle: 'Protection of customer-facing applications, APIs, and payment infrastructure.',
    description: 'Resilient security for large-scale retail marketplaces and digital experience platforms.',
    icon: ShoppingCart,
    image: imgEcommerce,
    tags: ['Customer Data Protection', 'Payment Security', 'Anti-Bot', 'API Hardening'],
    overview: {
      heading: 'Protecting the',
      highlight: 'Customer Journey',
      body: [
        'E-commerce platforms are prime targets for bot attacks, payment fraud, and data theft. QuasarCyberTech provides the defensive and offensive services necessary to keep your shop open and your data secure.',
        'We validate your third-party integrations, payment flows, and customer databases to ensure a seamless and secure shopping experience.'
      ],
      capabilities: [
        { name: 'Application VAPT', slug: 'offensive-security' },
        { name: 'Managed Defense', slug: 'managed-defense' },
        { name: 'Intelligence Research', slug: 'cyber-intelligence' }
      ]
    },
    challenges: [
      { icon: Bug, title: 'Cart Exploitation', description: 'Preventing business logic flaws in promotional codes, loyalty points, and pricing.' },
      { icon: AlertTriangle, title: 'Third-party Scripts', description: 'Managing the risk of Magecart and other supply chain attacks on the frontend.' },
      { icon: Zap, title: 'Flash Sale Stress', description: 'Maintaining security monitoring during high-traffic events and DDoS attempts.' }
    ],
    whyQCT: [
      { title: 'Retail Readiness', description: 'Experience in protecting high-volume marketplaces with millions of daily users.' },
      { title: 'Brand Defense', description: 'Monitoring the dark web for leaked customer credentials and brand impersonation.' }
    ]
  },
  {
    slug: 'healthcare',
    name: 'Healthcare & HealthTech',
    eyebrow: 'HEALTH DATA SECURITY',
    title: 'Healthcare &',
    highlight: 'HealthTech',
    subtitle: 'Security and compliance support for healthcare systems and patient data platforms.',
    description: 'Deep security for hospitals, medical networks, and healthcare technology providers.',
    icon: Activity,
    image: imgHealthcare,
    tags: ['HIPAA / Data Privacy', 'Medical Device Security', 'Network Segmentation', 'Operational Resilience'],
    overview: {
      heading: 'Safeguarding Life-Critical',
      highlight: 'Medical Data',
      body: [
        'Healthcare organizations hold the most sensitive personal data. Our services focus on the integrity and availability of patient information while ensuring full compliance with data protection laws.',
        'We assess the entire medical ecosystem, from hospital infrastructure to the specialized cloud environments hosting HealthTech applications.'
      ],
      capabilities: [
        { name: 'Maturity Assessment', slug: 'cyber-advisory' },
        { name: 'Network Security', slug: 'cloud-security' },
        { name: 'Incident Response', slug: 'managed-defense' }
      ]
    },
    challenges: [
      { icon: ShieldAlert, title: 'Data Breach Risk', description: 'Protecting PII/PHI from high-value targeted ransomware attacks.' },
      { icon: Zap, title: 'IoT & OT Security', description: 'Securing connected medical devices and hospital operational systems.' },
      { icon: Eye, title: 'HIPAA Adherence', description: 'Maintaining strict data access controls and audit logs for sensitive records.' }
    ],
    whyQCT: [
      { title: 'Outcome Focused', description: 'We prioritize the availability of healthcare services alongside data confidentiality.' },
      { title: 'Risk Intelligence', description: 'QPulse-powered intelligence on the latest medical-sector cyber threats.' }
    ]
  },
  {
    slug: 'enterprise',
    name: 'Enterprise & Manufacturing',
    eyebrow: 'INDUSTRIAL SECURITY',
    title: 'Enterprise &',
    highlight: 'Manufacturing',
    subtitle: 'Cyber risk governance, infrastructure security, and operational resilience.',
    description: 'Strategy, engineering, and defense for global manufacturing and large-scale industrial enterprises.',
    icon: Factory,
    image: imgEnterprise,
    tags: ['IT/OT Convergence', 'Supply Chain Security', 'Global Risk Governance', 'Resilient Operations'],
    overview: {
      heading: 'Securing the',
      highlight: 'Industrial Future',
      body: [
        'Modern manufacturing relies on the convergence of digital systems and operational technology (OT). QuasarCyberTech provides the cross-domain expertise to protect both your corporate data and your factory floor.',
        'We help global enterprises establish centralized security governance while maintaining localized resilience for distributed manufacturing plants.'
      ],
      capabilities: [
        { name: 'Risk Governance', slug: 'cyber-advisory' },
        { name: 'OT/IT Hardening', slug: 'cloud-security' },
        { name: 'Managed SOC', slug: 'managed-defense' }
      ]
    },
    challenges: [
      { icon: AlertTriangle, title: 'Supply Chain Risk', description: 'Managing the cybersecurity posture of a deep and global Tier-1 and Tier-2 supply chain.' },
      { icon: Factory, title: 'OT Vulnerability', description: 'Securing legacy industrial controllers (PLC/SCADA) and smart factory Iot.' },
      { icon: ShieldAlert, title: 'Business Continuity', description: 'Ensuring that cyber incidents do not lead to physical production stops.' }
    ],
    whyQCT: [
      { title: 'Framework-Driven', description: 'Using the QCT SECURE Framework to unify security maturity across global operations.' },
      { title: 'Strategic Advisory', description: 'Assisting CTOs and CISOs in communicating industrial risk to the board of directors.' }
    ]
  }
];
