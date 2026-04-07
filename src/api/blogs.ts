import type { BlogPost } from '../data/blogsData';
import { blogsData } from '../data/blogsData';

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

// ─── Shape normaliser ─────────────────────────────────────────────────────────

/**
 * The server returns the DB row shape. Convert it to BlogPost so the
 * rest of the frontend never needs to know about the DB column names.
 * Falls back field-by-field to the static blogsData entry if the server
 * omits a field (e.g. image_url not yet set for a post).
 */
const normalise = (raw: Record<string, unknown>, fallback?: BlogPost): BlogPost => {
  const slug = (raw.slug ?? raw.id) as string;
  const staticEntry = fallback ?? blogsData.find((b) => b.id === slug);

  return {
    id:        slug,
    title:     (raw.title     as string) || staticEntry?.title     || '',
    excerpt:   (raw.excerpt   as string) || staticEntry?.excerpt   || '',
    content:   (raw.content   as string) || staticEntry?.content   || '',
    category:  (raw.category  as string) || staticEntry?.category  || '',
    author:    (raw.author    as string) || staticEntry?.author    || 'QuasarCyberTech',
    image:     (raw.image     as string) || staticEntry?.image     || '',
    readTime:  (raw.readTime  as string) || staticEntry?.readTime  || '5 min read',
    tags:      Array.isArray(raw.tags) ? (raw.tags as string[]) : staticEntry?.tags ?? [],
    views:     typeof raw.views === 'number' ? raw.views : staticEntry?.views ?? 0,
    featured:  typeof raw.featured === 'boolean' ? raw.featured : staticEntry?.featured ?? false,
    date:      (raw.date      as string) || staticEntry?.date      || '',
    updatedAt: (raw.updatedAt as string | undefined) ?? staticEntry?.updatedAt,
  };
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetches all published blog posts from the backend.
 * Falls back to static blogsData if the API is unreachable.
 */
export async function fetchBlogs(): Promise<BlogPost[]> {
  try {
    if (!API_BASE) throw new Error('VITE_API_URL not set');

    const res = await fetch(`${API_BASE}/api/blogs`, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) throw new Error(`API returned ${res.status}`);

    const json = (await res.json()) as { success: boolean; data?: unknown[] };
    if (!json.success || !Array.isArray(json.data)) throw new Error('Unexpected response shape');

    return json.data.map((raw) => normalise(raw as Record<string, unknown>));
  } catch (err) {
    console.warn('[blogs] Using static fallback for list:', err);
    return blogsData;
  }
}

/**
 * Fetches a single published post by slug.
 * Falls back to the matching static blogsData entry if the API is unreachable.
 */
export async function fetchBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    if (!API_BASE) throw new Error('VITE_API_URL not set');

    const res = await fetch(`${API_BASE}/api/blogs/${encodeURIComponent(slug)}`, {
      headers: { Accept: 'application/json' },
    });

    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`API returned ${res.status}`);

    const json = (await res.json()) as { success: boolean; data?: unknown };
    if (!json.success || !json.data) throw new Error('Unexpected response shape');

    return normalise(json.data as Record<string, unknown>);
  } catch (err) {
    console.warn(`[blogs] Using static fallback for slug "${slug}":`, err);
    return blogsData.find((b) => b.id === slug);
  }
}
