-- ══════════════════════════════════════════════════════════════════════════════
-- QCTWeb — Blog Posts Table
-- Migration: 002_blog_posts.sql
--
-- Run on VPS:
--   psql -U qctadmin -d qctweb -f /opt/QCTWeb/server/sql/002_blog_posts.sql
--
-- Notes:
--   All blog content is stored in plaintext — no PII in this table.
--   Markdown content is stored as-is in the `content` TEXT column.
--   Soft deletes are not used — delete removes the row permanently.
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS blog_posts (
    id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),

    -- URL-safe slug — must be unique across all posts
    slug         VARCHAR(200) NOT NULL,

    title        TEXT         NOT NULL,
    excerpt      TEXT         NOT NULL,

    -- Full markdown article body
    content      TEXT         NOT NULL DEFAULT '',

    -- Matches BLOG_CATEGORIES in blogsData.ts
    category     VARCHAR(80)  NOT NULL,

    author       VARCHAR(80)  NOT NULL DEFAULT 'QuasarCyberTech',

    -- Cloudinary URL or any absolute image URL
    image_url    TEXT         NOT NULL DEFAULT '',

    read_time    VARCHAR(30)  NOT NULL DEFAULT '5 min read',

    -- Stored as PostgreSQL text array, e.g. ARRAY['AI', 'SOC']
    tags         TEXT[]       NOT NULL DEFAULT '{}',

    views        INTEGER      NOT NULL DEFAULT 0,

    featured     BOOLEAN      NOT NULL DEFAULT FALSE,

    -- Drafts have published = false; publishing sets both published and published_at
    published    BOOLEAN      NOT NULL DEFAULT FALSE,
    published_at TIMESTAMPTZ,

    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Unique constraint on slug
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_slug
    ON blog_posts (slug);

-- Index for the public list endpoint (published posts newest-first)
CREATE INDEX IF NOT EXISTS idx_blog_published_at
    ON blog_posts (published, published_at DESC)
    WHERE published = TRUE;

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_blog_category
    ON blog_posts (category)
    WHERE published = TRUE;

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION set_blog_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_blog_updated_at ON blog_posts;
CREATE TRIGGER trg_blog_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION set_blog_updated_at();

COMMENT ON TABLE  blog_posts              IS 'Blog post content. No PII stored. Markdown in content column.';
COMMENT ON COLUMN blog_posts.slug         IS 'URL slug — must be unique, used as the route param.';
COMMENT ON COLUMN blog_posts.content      IS 'Full markdown body. Empty string for drafts without content.';
COMMENT ON COLUMN blog_posts.published    IS 'FALSE = draft (not visible to public). TRUE = live.';
COMMENT ON COLUMN blog_posts.published_at IS 'Set when published flips to TRUE. Used for sort order.';
