import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { COLORS, SHADOWS } from '../../config/themeConfig';
import type { BlogPost } from '../../data/blogsData';
import { ASSETS } from '@/constants/assets';

interface ArticleCardProps {
  post: BlogPost;
  index: number;
}

export default function ArticleCard({ post, index }: ArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/blogs/${post.id}`)}
      style={{
        background: COLORS.cardOnDark,
        border: isHovered
          ? '1px solid rgba(214,176,92,0.25)'
          : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isHovered ? '0 12px 40px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.2)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
      }}
    >
      {/* Cover Image */}
      <div style={{ height: '200px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        {!imgError && post.image ? (
          <img
            src={post.image}
            alt={post.title}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(56,8,26,0.9), rgba(0,1,18,1))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img src={ASSETS.logos.qct.icon} alt="" style={{ width: '64px', opacity: 0.15, filter: 'brightness(0) invert(1)' }} />
          </div>
        )}

        {/* Category tag overlay */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          background: 'rgba(214,176,92,0.12)',
          border: '1px solid rgba(214,176,92,0.3)',
          borderRadius: '20px',
          padding: '3px 10px',
          fontSize: '10px',
          fontWeight: 700,
          color: COLORS.gold,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          backdropFilter: 'blur(8px)',
        }}>
          {post.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontSize: '17px',
          fontWeight: 700,
          color: isHovered ? COLORS.gold : '#FFFFFF',
          lineHeight: 1.4,
          marginBottom: '10px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          transition: 'color 0.2s ease',
        }}>
          {post.title}
        </h3>

        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.6,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginBottom: '16px',
          flex: 1,
        }}>
          {post.excerpt}
        </p>

        {/* Meta */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '12px',
        }}>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '12px' }} />

        {/* CTA */}
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: COLORS.gold,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'gap 0.2s ease',
          }}
        >
          Read Full Article <span>→</span>
        </div>
      </div>
    </motion.article>
  );
}
