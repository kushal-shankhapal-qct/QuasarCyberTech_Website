import { ASSETS } from '@/constants/assets';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  image: string;
  readTime: string;
  tags: string[];
  views: number;
  featured?: boolean;
  content?: string; 
}

export const BLOG_CATEGORIES = [
  'All Posts',
  'Advisory',
  'Blogs & Articles',
  'Cyber Security',
  'Staff Augmentation',
  'Technology',
];

export const blogsData: BlogPost[] = [
  {
    id: 'cybersecurity-threats-2025',
    title: 'Top Cybersecurity Threats Businesses Should Watch Out for in 2025',
    excerpt: 'In 2025, cybersecurity has evolved beyond traditional defenses—driven by AI-powered attacks and complex third-party ecosystems.',
    date: 'August 14, 2025',
    category: 'Cyber Security',
    author: 'Quasar CyberTech',
    image: ASSETS.blogs.threats,
    readTime: '12 min read',
    tags: ['Threats', '2025', 'AI', 'Zero Trust', 'Quantum'],
    views: 8420,
    featured: true,
    content: `
### Cybersecurity Threats Businesses Should Watch Out for in 2025

In 2025, cybersecurity has evolved beyond traditional defenses—driven by AI-powered attacks and complex third-party ecosystems. Top cybersecurity threats continue to evolve at an alarming rate. Organizations are facing an unprecedented acceleration in both the volume and sophistication of cyber threats.

#### 1. AI-Driven Malware: The Age of Adaptive Threats
Modern malware has evolved from static code to dynamic, intelligent entities. Threat actors now deploy machine learning algorithms to create real-time mutations to bypass defenses.

#### 2. Zero Trust Architecture (ZTA): Beyond the Perimeter
With distributed workforces and cloud infrastructure becoming standard, perimeter-based security has become obsolete. Zero Trust has emerged as the foundation for modern cybersecurity.

#### 3. Quantum Computing Threats: The Encryption Time Bomb
While mainstream quantum computing remains on the horizon, its implications demand immediate attention. Sophisticated threat actors are already harvesting encrypted data with “store now, decrypt later” strategies.

#### 4. Ransomware-as-a-Service (RaaS): Cybercrime for Hire
Ransomware has evolved into a sophisticated business model, providing turnkey solutions with profit-sharing frameworks.

#### 5. 5G and Edge Security: Expanding the Attack Surface
The proliferation of 5G and edge computing introduces new vulnerabilities where traditional perimeters do not exist.

#### 6. Insider Threats in Hybrid Work Environments
The hybrid workplace has amplified insider risk vectors through cloud tool misconfiguration and social engineering vulnerability.

#### 7. Supply Chain Attack: Trust Becomes a Liability
Third-party vulnerabilities represent among the most dangerous attack vectors, compromising trusted vendors to gain privileged access.

#### 8. Cloud Container Vulnerabilities: Speed vs Security
Containerized applications offer unparalleled agility but introduce significant risks if misconfigured.

#### 9. Deepfakes and Synthetic Media in Social Engineering
Social engineering has evolved beyond text-based manipulation. AI-generated deepfakes mimic exec voices and appearances with alarming accuracy.

#### 10. IT/OT Convergence and Industrial Cyber Risk
As IT and OT systems increasingly merge, attackers gain new attack vectors to disrupt manufacturing and safety controls.

---

### Moving Forward: Cybersecurity as a Strategic Imperative
Effective cybersecurity requires outthinking adversaries, not just deploying more tools. Resiliency linked to brand trust and operational continuity is no longer optional.
`
  },
  {
    id: 'ai-driven-threat-detection',
    title: 'AI-Driven Threat Detection in SOC Operations',
    excerpt: 'Leveraging machine learning to cut through the noise of millions of security signals and identify real threats before they escalate.',
    date: 'Mar 21, 2025',
    category: 'Technology',
    author: 'Devin Thorne',
    image: ASSETS.blogs.ai,
    readTime: '5 min read',
    tags: ['AI', 'SOC', 'Machine Learning', 'Threat Detection'],
    views: 1920,
  },
  {
    id: 'moneygram-suffers-data-breach',
    title: 'Moneygram Suffers Data Breach, Exposing Customer Information',
    excerpt: 'A critical advisory regarding the recent security incident affecting one of the world\'s largest money transfer companies.',
    date: 'Dec 15, 2024',
    category: 'Advisory',
    author: 'Quasar CyberTech',
    image: ASSETS.blogs.moneygram,
    readTime: '7 min read',
    tags: ['Breach', 'Financial', 'Moneygram', 'Advisory'],
    views: 12400,
  },
  {
    id: 'zero-trust-architecture-enterprise',
    title: 'The Future of Cloud Security: Zero Trust Architectures',
    excerpt: 'How enterprise leaders are moving away from traditional VPNs towards a continuous verification model that eliminates implicit trust.',
    date: 'Mar 24, 2025',
    category: 'Cyber Security',
    author: 'Kishor Sonawane',
    image: ASSETS.capabilities.cloud,
    readTime: '6 min read',
    tags: ['Zero Trust', 'Architecture', 'VPN', 'Enterprise'],
    views: 2840,
  },
  {
    id: 'ransomware-response-playbook',
    title: 'The Enterprise Ransomware Response Playbook',
    excerpt: 'When ransomware hits, the first 4 hours are critical. A step-by-step incident response guide.',
    date: 'Mar 14, 2025',
    category: 'Advisory',
    author: 'Sarah Chen',
    image: ASSETS.capabilities.defense,
    readTime: '10 min read',
    tags: ['Ransomware', 'Incident Response', 'IR Playbook'],
    views: 4200,
  }
];
