import { COLORS } from '../config/themeConfig';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  image: string;
  readTime: string;
}

export const blogsData: BlogPost[] = [
  {
    id: 'zero-trust-architecture-enterprise',
    title: 'Zero Trust Architecture: Beyond the Perimeter',
    excerpt: 'How enterprise leaders are moving away from traditional VPNs towards a continuous verification model.',
    date: 'Mar 24, 2024',
    category: 'Architecture',
    author: 'Devin Thorne',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
    readTime: '6 min read'
  },
  {
    id: 'ai-driven-threat-detection',
    title: 'AI-Driven Threat Detection in SOC Operations',
    excerpt: 'Leveraging machine learning to cut through the noise of millions of security signals to identify real threats.',
    date: 'Mar 21, 2024',
    category: 'Operations',
    author: 'Sarah Chen',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    readTime: '5 min read'
  },
  {
    id: 'kubernetes-security-hardening',
    title: 'Kubernetes Hardening: A Practical Guide',
    excerpt: 'Essential configurations for securing your container orchestrator against common attack vectors.',
    date: 'Mar 18, 2024',
    category: 'Cloud Security',
    author: 'Marcus Vane',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    readTime: '8 min read'
  }
];
