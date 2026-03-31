import type { BlogPost } from '../data/blogsData';
import { blogsData } from '../data/blogsData';

const API_URL = 'http://localhost:1337/api';
const IMAGE_BASE = 'http://localhost:1337';

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
    const res = await fetch(`${API_URL}/blogs?populate=*`);
    if (!res.ok) throw new Error('CMS unreachable');
    const json = await res.json();
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
    const res = await fetch(`${API_URL}/blogs?filters[slug][$eq]=${slug}&populate=*`);
    if (!res.ok) throw new Error('CMS unreachable');
    const json = await res.json();
    if (json.data && json.data.length > 0) {
      return normalizeBlog(json.data[0]);
    }
    throw new Error('Blog not found in CMS');
  } catch (error) {
    console.warn(`Using static fallback for blog slug "${slug}":`, error);
    return blogsData.find(b => b.id === slug);
  }
}
