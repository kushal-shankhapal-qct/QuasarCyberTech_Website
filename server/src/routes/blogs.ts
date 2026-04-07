import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
  getPublishedBlogs,
  getPublishedBlogBySlug,
  incrementBlogViews,
} from '../db/blogQueries.js';

/**
 * Public blog routes — standard HTTP status codes, no encryption.
 * These serve publicly available data to the frontend.
 */
export async function blogRoutes(fastify: FastifyInstance): Promise<void> {

  // GET /api/blogs — list all published posts
  fastify.get('/api/blogs', async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const rows = await getPublishedBlogs();
      const posts = rows.map(rowToPost);
      return reply.status(200).send({ success: true, data: posts });
    } catch (err) {
      fastify.log.error(err, 'GET /api/blogs failed');
      return reply.status(500).send({ success: false, error: 'Service unavailable.' });
    }
  });

  // GET /api/blogs/:slug — single published post
  fastify.get(
    '/api/blogs/:slug',
    async (request: FastifyRequest<{ Params: { slug: string } }>, reply: FastifyReply) => {
      const { slug } = request.params;

      if (!slug || typeof slug !== 'string' || slug.length > 200) {
        return reply.status(400).send({ success: false, error: 'Invalid slug.' });
      }

      try {
        const row = await getPublishedBlogBySlug(slug);
        if (!row) {
          return reply.status(404).send({ success: false, error: 'Post not found.' });
        }

        // Fire-and-forget view increment — don't block the response
        incrementBlogViews(slug).catch((err) =>
          fastify.log.warn(err, 'view increment failed'),
        );

        return reply.status(200).send({ success: true, data: rowToPost(row) });
      } catch (err) {
        fastify.log.error(err, `GET /api/blogs/${slug} failed`);
        return reply.status(500).send({ success: false, error: 'Service unavailable.' });
      }
    },
  );
}

// ─── Shape normaliser ─────────────────────────────────────────────────────────

/** Converts a DB row to the BlogPost shape the frontend expects. */
function rowToPost(row: Awaited<ReturnType<typeof getPublishedBlogs>>[number]) {
  return {
    id:        row.slug,           // frontend uses post.id as slug
    slug:      row.slug,
    title:     row.title,
    excerpt:   row.excerpt,
    content:   row.content,
    category:  row.category,
    author:    row.author,
    image:     row.image_url,
    readTime:  row.read_time,
    tags:      row.tags,
    views:     row.views,
    featured:  row.featured,
    date:      row.published_at
      ? new Date(row.published_at).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        })
      : new Date(row.created_at).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        }),
    updatedAt: row.updated_at ? row.updated_at.toISOString() : undefined,
  };
}
