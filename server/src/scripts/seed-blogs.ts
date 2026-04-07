/**
 * seed-blogs.ts
 *
 * One-time script: migrates the 5 static blog posts from blogsData.ts
 * into the blog_posts PostgreSQL table.
 *
 * Run once on the VPS after running 002_blog_posts.sql:
 *   cd /opt/QCTWeb/server
 *   npm run seed:blogs
 *
 * Safe to re-run — uses ON CONFLICT DO NOTHING on the slug.
 */

import 'dotenv/config';
import { pool } from '../db/pool.js';

// ─── Static blog data (copy of the 5 posts from blogsData.ts) ────────────────
// Images use the Cloudinary keys — the actual URLs are resolved by the frontend.
// For the DB we store the full Cloudinary URL as image_url.
// These match the values that were in ASSETS.blogs.* — update if Cloudinary URLs change.

const POSTS = [
  {
    slug:        'cybersecurity-threats-2025',
    title:       'Top Cybersecurity Threats Businesses Should Watch Out for in 2025',
    excerpt:     'In 2025, cybersecurity has evolved beyond traditional defenses—driven by AI-powered attacks and complex third-party ecosystems.',
    category:    'Cyber Security',
    author:      'QuasarCyberTech',
    image_url:   '', // set manually after seeding if needed
    read_time:   '12 min read',
    tags:        ['Threats', '2025', 'AI', 'Zero Trust', 'Quantum'],
    views:       8420,
    featured:    true,
    published:   true,
    published_at: new Date('2025-08-14'),
    content: `
### Cybersecurity Threats Businesses Should Watch Out for in 2025

In 2025, cybersecurity has evolved beyond traditional defenses—driven by AI-powered attacks and complex third-party ecosystems. Top cybersecurity threats continue to evolve at an alarming rate. Organizations are facing an unprecedented acceleration in both the volume and sophistication of cyber threats.

#### 1. AI-Driven Malware: The Age of Adaptive Threats
Modern malware has evolved from static code to dynamic, intelligent entities. Threat actors now deploy machine learning algorithms to create real-time mutations to bypass defenses.

#### 2. Zero Trust Architecture (ZTA): Beyond the Perimeter
With distributed workforces and cloud infrastructure becoming standard, perimeter-based security has become obsolete. Zero Trust has emerged as the foundation for modern cybersecurity.

#### 3. Quantum Computing Threats: The Encryption Time Bomb
While mainstream quantum computing remains on the horizon, its implications demand immediate attention. Sophisticated threat actors are already harvesting encrypted data with "store now, decrypt later" strategies.

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
`.trim(),
  },
  {
    slug:        'ai-driven-threat-detection',
    title:       'AI-Driven Threat Detection in SOC Operations',
    excerpt:     'Leveraging machine learning to cut through the noise of millions of security signals and identify real threats before they escalate.',
    category:    'Technology',
    author:      'QuasarCyberTech',
    image_url:   '',
    read_time:   '5 min read',
    tags:        ['AI', 'SOC', 'Machine Learning', 'Threat Detection'],
    views:       1920,
    featured:    false,
    published:   true,
    published_at: new Date('2025-03-21'),
    content:     '',
  },
  {
    slug:        'moneygram-suffers-data-breach',
    title:       "Moneygram Suffers Data Breach, Exposing Customer Information",
    excerpt:     "A critical advisory regarding the recent security incident affecting one of the world's largest money transfer companies.",
    category:    'Advisory',
    author:      'QuasarCyberTech',
    image_url:   '',
    read_time:   '7 min read',
    tags:        ['Breach', 'Financial', 'Moneygram', 'Advisory'],
    views:       12400,
    featured:    false,
    published:   true,
    published_at: new Date('2024-12-15'),
    content:     '',
  },
  {
    slug:        'zero-trust-architecture-enterprise',
    title:       'The Future of Cloud Security: Zero Trust Architectures',
    excerpt:     'How enterprise leaders are moving away from traditional VPNs towards a continuous verification model that eliminates implicit trust.',
    category:    'Cyber Security',
    author:      'Kishor Sonawane',
    image_url:   '',
    read_time:   '6 min read',
    tags:        ['Zero Trust', 'Architecture', 'VPN', 'Enterprise'],
    views:       2840,
    featured:    false,
    published:   true,
    published_at: new Date('2025-03-24'),
    content:     '',
  },
  {
    slug:        'ransomware-response-playbook',
    title:       'The Enterprise Ransomware Response Playbook',
    excerpt:     'When ransomware hits, the first 4 hours are critical. A step-by-step incident response guide.',
    category:    'Advisory',
    author:      'Sarah Chen',
    image_url:   '',
    read_time:   '10 min read',
    tags:        ['Ransomware', 'Incident Response', 'IR Playbook'],
    views:       4200,
    featured:    false,
    published:   true,
    published_at: new Date('2025-03-14'),
    content:     '',
  },
] as const;

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('[seed] Connecting to database…');
  const client = await pool.connect();

  try {
    let inserted = 0;
    let skipped  = 0;

    for (const post of POSTS) {
      const res = await client.query(
        `INSERT INTO blog_posts
           (slug, title, excerpt, content, category, author, image_url,
            read_time, tags, views, featured, published, published_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
         ON CONFLICT (slug) DO NOTHING
         RETURNING id`,
        [
          post.slug,
          post.title,
          post.excerpt,
          post.content,
          post.category,
          post.author,
          post.image_url,
          post.read_time,
          post.tags,
          post.views,
          post.featured,
          post.published,
          post.published_at,
        ],
      );

      if ((res.rowCount ?? 0) > 0) {
        console.log(`[seed] ✓ Inserted: ${post.slug}`);
        inserted++;
      } else {
        console.log(`[seed] ↩ Skipped (already exists): ${post.slug}`);
        skipped++;
      }
    }

    console.log(`\n[seed] Done. Inserted: ${inserted}, Skipped: ${skipped}\n`);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error('[seed] Fatal error:', err);
  process.exit(1);
});
