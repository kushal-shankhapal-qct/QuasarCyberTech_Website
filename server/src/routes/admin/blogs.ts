import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireIpWhitelist, requireAdminJwt } from '../../middleware/adminAuth.js';
import {
  getAllBlogsAdmin,
  getBlogByIdAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../../db/blogQueries.js';

// ─── Validation ───────────────────────────────────────────────────────────────

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const CreateBlogSchema = z.object({
  slug:      z.string().min(2).max(200).regex(SLUG_RE, 'Slug must be lowercase-kebab-case'),
  title:     z.string().min(2).max(300),
  excerpt:   z.string().min(10).max(500),
  content:   z.string().max(200_000).optional().default(''),
  category:  z.string().min(1).max(80),
  author:    z.string().max(80).optional(),
  image_url: z.string().max(500).optional(),
  read_time: z.string().max(30).optional(),
  tags:      z.array(z.string().max(60)).max(20).optional(),
  featured:  z.boolean().optional(),
  published: z.boolean().optional(),
});

const UpdateBlogSchema = CreateBlogSchema.partial();

const adminGuard = [requireIpWhitelist, requireAdminJwt];

// ─── Routes ───────────────────────────────────────────────────────────────────

export async function adminBlogRoutes(fastify: FastifyInstance): Promise<void> {

  // GET /api/admin/blogs
  fastify.get('/api/admin/blogs', { preHandler: adminGuard }, async (_req, reply) => {
    try {
      const rows = await getAllBlogsAdmin();
      return reply.status(200).send({ success: true, data: rows });
    } catch (err) {
      fastify.log.error(err, 'GET /api/admin/blogs failed');
      return reply.status(500).send({ error: 'Server error.' });
    }
  });

  // GET /api/admin/blogs/:id
  fastify.get<{ Params: { id: string } }>(
    '/api/admin/blogs/:id',
    { preHandler: adminGuard },
    async (request, reply) => {
      try {
        const row = await getBlogByIdAdmin(request.params.id);
        if (!row) return reply.status(404).send({ error: 'Post not found.' });
        return reply.status(200).send({ success: true, data: row });
      } catch (err) {
        fastify.log.error(err, 'GET /api/admin/blogs/:id failed');
        return reply.status(500).send({ error: 'Server error.' });
      }
    },
  );

  // POST /api/admin/blogs
  fastify.post('/api/admin/blogs', { preHandler: adminGuard }, async (request, reply) => {
    const parsed = CreateBlogSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(422).send({ error: parsed.error.errors[0]?.message ?? 'Validation failed.' });
    }
    try {
      const row = await createBlog(parsed.data);
      return reply.status(201).send({ success: true, data: row });
    } catch (err: unknown) {
      if ((err as { code?: string }).code === '23505') {
        return reply.status(409).send({ error: 'That slug is already in use.' });
      }
      fastify.log.error(err, 'POST /api/admin/blogs failed');
      return reply.status(500).send({ error: 'Server error.' });
    }
  });

  // PUT /api/admin/blogs/:id
  fastify.put<{ Params: { id: string } }>(
    '/api/admin/blogs/:id',
    { preHandler: adminGuard },
    async (request, reply) => {
      const parsed = UpdateBlogSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(422).send({ error: parsed.error.errors[0]?.message ?? 'Validation failed.' });
      }
      try {
        const row = await updateBlog(request.params.id, parsed.data);
        if (!row) return reply.status(404).send({ error: 'Post not found.' });
        return reply.status(200).send({ success: true, data: row });
      } catch (err: unknown) {
        if ((err as { code?: string }).code === '23505') {
          return reply.status(409).send({ error: 'That slug is already in use.' });
        }
        fastify.log.error(err, 'PUT /api/admin/blogs/:id failed');
        return reply.status(500).send({ error: 'Server error.' });
      }
    },
  );

  // DELETE /api/admin/blogs/:id
  fastify.delete<{ Params: { id: string } }>(
    '/api/admin/blogs/:id',
    { preHandler: adminGuard },
    async (request, reply) => {
      try {
        const deleted = await deleteBlog(request.params.id);
        if (!deleted) return reply.status(404).send({ error: 'Post not found.' });
        return reply.status(200).send({ success: true });
      } catch (err) {
        fastify.log.error(err, 'DELETE /api/admin/blogs/:id failed');
        return reply.status(500).send({ error: 'Server error.' });
      }
    },
  );
}
