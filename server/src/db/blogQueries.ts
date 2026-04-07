import { pool } from './pool.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image_url: string;
  read_time: string;
  tags: string[];
  views: number;
  featured: boolean;
  published: boolean;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateBlogInput {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  author?: string;
  image_url?: string;
  read_time?: string;
  tags?: string[];
  views?: number;
  featured?: boolean;
  published?: boolean;
}

export interface UpdateBlogInput {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  image_url?: string;
  read_time?: string;
  tags?: string[];
  views?: number;
  featured?: boolean;
  published?: boolean;
}

// ─── Public queries ───────────────────────────────────────────────────────────

/** Returns all published posts ordered by published_at descending. */
export async function getPublishedBlogs(): Promise<BlogRow[]> {
  const res = await pool.query<BlogRow>(
    `SELECT id, slug, title, excerpt, content, category, author,
            image_url, read_time, tags, views, featured,
            published, published_at, created_at, updated_at
     FROM blog_posts
     WHERE published = TRUE
     ORDER BY published_at DESC`,
  );
  return res.rows;
}

/** Returns a single published post by slug, or null if not found. */
export async function getPublishedBlogBySlug(slug: string): Promise<BlogRow | null> {
  const res = await pool.query<BlogRow>(
    `SELECT id, slug, title, excerpt, content, category, author,
            image_url, read_time, tags, views, featured,
            published, published_at, created_at, updated_at
     FROM blog_posts
     WHERE slug = $1 AND published = TRUE
     LIMIT 1`,
    [slug],
  );
  return res.rows[0] ?? null;
}

// ─── Admin queries ────────────────────────────────────────────────────────────

/** Returns all posts (published + draft) for the admin dashboard. */
export async function getAllBlogsAdmin(): Promise<BlogRow[]> {
  const res = await pool.query<BlogRow>(
    `SELECT id, slug, title, excerpt, content, category, author,
            image_url, read_time, tags, views, featured,
            published, published_at, created_at, updated_at
     FROM blog_posts
     ORDER BY created_at DESC`,
  );
  return res.rows;
}

/** Returns a single post by id regardless of published state. */
export async function getBlogByIdAdmin(id: string): Promise<BlogRow | null> {
  const res = await pool.query<BlogRow>(
    `SELECT id, slug, title, excerpt, content, category, author,
            image_url, read_time, tags, views, featured,
            published, published_at, created_at, updated_at
     FROM blog_posts
     WHERE id = $1
     LIMIT 1`,
    [id],
  );
  return res.rows[0] ?? null;
}

/** Creates a new post and returns the created row. */
export async function createBlog(input: CreateBlogInput): Promise<BlogRow> {
  const now = new Date();
  const published = input.published ?? false;
  const publishedAt = published ? now : null;

  const res = await pool.query<BlogRow>(
    `INSERT INTO blog_posts
       (slug, title, excerpt, content, category, author,
        image_url, read_time, tags, views, featured, published, published_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
     RETURNING *`,
    [
      input.slug,
      input.title,
      input.excerpt,
      input.content ?? '',
      input.category,
      input.author ?? 'QuasarCyberTech',
      input.image_url ?? '',
      input.read_time ?? '5 min read',
      input.tags ?? [],
      input.views ?? 0,
      input.featured ?? false,
      published,
      publishedAt,
    ],
  );
  return res.rows[0];
}

/** Updates an existing post by id. Returns updated row or null if not found. */
export async function updateBlog(
  id: string,
  input: UpdateBlogInput,
): Promise<BlogRow | null> {
  // Build dynamic SET clause from only the provided fields
  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  const push = (col: string, val: unknown) => {
    fields.push(`${col} = $${idx++}`);
    values.push(val);
  };

  if (input.slug       !== undefined) push('slug',       input.slug);
  if (input.title      !== undefined) push('title',      input.title);
  if (input.excerpt    !== undefined) push('excerpt',    input.excerpt);
  if (input.content    !== undefined) push('content',    input.content);
  if (input.category   !== undefined) push('category',   input.category);
  if (input.author     !== undefined) push('author',     input.author);
  if (input.image_url  !== undefined) push('image_url',  input.image_url);
  if (input.read_time  !== undefined) push('read_time',  input.read_time);
  if (input.tags       !== undefined) push('tags',       input.tags);
  if (input.views      !== undefined) push('views',      input.views);
  if (input.featured   !== undefined) push('featured',   input.featured);

  // Publishing: when flipping published to true, also set published_at if not already set
  if (input.published !== undefined) {
    push('published', input.published);
    if (input.published) {
      // Only set published_at if it was previously null (first publish)
      fields.push(`published_at = COALESCE(published_at, NOW())`);
    }
  }

  if (fields.length === 0) {
    // Nothing to update — return existing row
    return getBlogByIdAdmin(id);
  }

  values.push(id);
  const res = await pool.query<BlogRow>(
    `UPDATE blog_posts SET ${fields.join(', ')}
     WHERE id = $${idx}
     RETURNING *`,
    values,
  );
  return res.rows[0] ?? null;
}

/** Permanently deletes a post. Returns true if a row was deleted. */
export async function deleteBlog(id: string): Promise<boolean> {
  const res = await pool.query(
    `DELETE FROM blog_posts WHERE id = $1`,
    [id],
  );
  return (res.rowCount ?? 0) > 0;
}

/** Atomically increments the view counter for a published post. */
export async function incrementBlogViews(slug: string): Promise<void> {
  await pool.query(
    `UPDATE blog_posts SET views = views + 1
     WHERE slug = $1 AND published = TRUE`,
    [slug],
  );
}
