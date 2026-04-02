import type { BlogPost } from '../data/blogsData';
import { blogsData } from '../data/blogsData';

const RAW_API_URL = import.meta.env.VITE_STRAPI_API_URL?.trim() ?? '';
const RAW_IMAGE_BASE = import.meta.env.VITE_STRAPI_BASE_URL?.trim() ?? '';
const API_URL = RAW_API_URL.replace(/\/$/, '');
const IMAGE_BASE = RAW_IMAGE_BASE.replace(/\/$/, '');

const assertJsonResponse = (res: Response) => {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    throw new Error(`Expected JSON but received ${contentType || 'unknown content type'}`);
  }
};

const safeReadJson = async (res: Response) => {
  const body = await res.text();
  try {
    return JSON.parse(body);
  } catch {
    const snippet = body.slice(0, 120).replace(/\s+/g, ' ').trim();
    throw new Error(`Invalid JSON response body${snippet ? `: ${snippet}` : ''}`);
  }
};

/**
 * Normalizes Strapi API response format to match the internal BlogPost interface.
 */
const normalizeBlog = (strapiData: any): BlogPost => {
  const attrs = strapiData.attributes;
  return {
    id: attrs.slug,
    title: attrs.title,
    excerpt: attrs.excerpt,
    category: attrs.category,
    date: attrs.date,
    readTime: attrs.readTime,
    author: attrs.author,
    tags: attrs.tags || [],
    image: attrs.image?.data?.attributes?.url 
      ? `${IMAGE_BASE}${attrs.image.data.attributes.url}` 
      : (blogsData.find(b => b.id === attrs.slug)?.image || ''),
    views: attrs.views || 0,
    featured: attrs.featured || false,
    content: attrs.content || '',
  };
};

/**
 * Fetches all blogs from Strapi with a fallback to static blogsData.
 */
export async function fetchBlogs(): Promise<BlogPost[]> {
  try {
    if (!API_URL) throw new Error('Missing Strapi API URL');
    const res = await fetch(`${API_URL}/blogs?populate=*`);
    if (!res.ok) throw new Error('CMS unreachable');
    assertJsonResponse(res);
    const json = await safeReadJson(res);
    return json.data.map(normalizeBlog);
  } catch (error) {
    console.warn('Using static fallback for blogs list:', error);
    return blogsData;
  }
}

/**
 * Fetches a single blog by its slug with a fallback to static blogsData.
 */
export async function fetchBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    if (!API_URL) throw new Error('Missing Strapi API URL');
    const res = await fetch(`${API_URL}/blogs?filters[slug][$eq]=${slug}&populate=*`);
    if (!res.ok) throw new Error('CMS unreachable');
    assertJsonResponse(res);
    const json = await safeReadJson(res);
    if (json.data && json.data.length > 0) {
      return normalizeBlog(json.data[0]);
    }
    throw new Error('Blog not found in CMS');
  } catch (error) {
    console.warn(`Using static fallback for blog slug "${slug}":`, error);
    return blogsData.find(b => b.id === slug);
  }
}
