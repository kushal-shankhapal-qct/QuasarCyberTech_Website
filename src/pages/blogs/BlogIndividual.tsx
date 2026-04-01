import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Seo from '../../components/seo/Seo';
import { blogsData } from '../../data/blogsData';
import { COLORS, TYPOGRAPHY, GRADIENTS } from '../../config/themeConfig';
import NotFound from '../NotFound';
import { createArticleSchema, createBreadcrumbSchema } from '../../seo/schema';

const BlogIndividual: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogsData.find(p => p.id === slug);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [slug]);

    if (!post) {
        return <NotFound />;
    }

    const publishedAt = new Date(post.date).toISOString();

    // Simple Markdown-ish Renderer for the demo content
    const renderContent = (content: string) => {
        const lines = content.split('\n');
        return lines.map((line, i) => {
            if (line.startsWith('### ')) {
                return <h2 key={i} style={{ fontSize: '28px', fontWeight: 800, color: '#1A0A0F', marginTop: '48px', marginBottom: '24px', fontFamily: TYPOGRAPHY.fontHeading }}>{line.replace('### ', '')}</h2>;
            }
            if (line.startsWith('#### ')) {
                return <h3 key={i} style={{ fontSize: '20px', fontWeight: 700, color: '#56081A', marginTop: '32px', marginBottom: '16px', fontFamily: TYPOGRAPHY.fontHeading }}>{line.replace('#### ', '')}</h3>;
            }
            if (line.startsWith('* ')) {
                return <li key={i} style={{ marginLeft: '24px', marginBottom: '8px', color: '#4A3040' }}>{line.replace('* ', '')}</li>;
            }
            if (line.startsWith('![') && line.includes('](')) {
                const alt = line.match(/\!\[(.*?)\]/)?.[1] || "";
                const src = line.match(/\((.*?)\)/)?.[1] || "";
                return (
                    <div key={i} style={{ margin: '40px 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <img src={src} alt={alt} style={{ width: '100%', height: 'auto' }} />
                        {alt && <p style={{ fontSize: '13px', color: '#888', textAlign: 'center', padding: '12px' }}>{alt}</p>}
                    </div>
                );
            }
            if (line.trim() === '---') {
                return <hr key={i} style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '40px 0' }} />;
            }
            if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} style={{ fontWeight: 700, margin: '16px 0', color: '#1A0A0F' }}>{line.replace(/\*\*/g, '')}</p>;
            }
            if (line.trim() === '') return null;
            
            // Handle bold in text
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
                <p key={i} style={{ fontSize: '16px', lineHeight: 1.8, color: '#4A3040', marginBottom: '20px' }}>
                    {parts.map((part, pi) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={pi} style={{ color: '#1A0A0F' }}>{part.replace(/\*\*/g, '')}</strong>;
                        }
                        return part;
                    })}
                </p>
            );
        });
    };

    return (
        <div style={{ background: '#FAF8F5', minHeight: '100vh' }}>
            <Seo
                title={post.title}
                description={post.excerpt}
                path={`/blogs/${post.id}`}
                image={post.image}
                type="article"
                jsonLd={[
                    createBreadcrumbSchema([
                        { name: 'Home', path: '/' },
                        { name: 'Blogs', path: '/blogs' },
                        { name: post.title, path: `/blogs/${post.id}` },
                    ]),
                    createArticleSchema({
                        title: post.title,
                        description: post.excerpt,
                        path: `/blogs/${post.id}`,
                        image: post.image,
                        publishedAt,
                        author: post.author,
                    }),
                ]}
            />
            <Navbar />
            
            <main>
                {/* Blog Hero */}
                <PageHero 
                    title={post.title}
                    highlight=""
                    subtitle={post.excerpt}
                    image={post.image}
                    imageOpacity={0.6}
                    visualFullWidth={false}
                    visualWidth="55%"
                    maskStart="0%"
                    maskEnd="85%"
                    backgroundOverride={GRADIENTS.BLOG_INDIVIDUAL_HERO_BG}
                    breadcrumbPaths={["Home", "Blogs"]}
                    currentName="Article"
                />

                <section style={{ padding: '80px 3rem' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        
                        {/* Meta bar */}
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '32px', 
                            paddingBottom: '32px', 
                            borderBottom: '1px solid rgba(0,0,0,0.08)',
                            marginBottom: '48px',
                            color: '#666',
                            fontSize: '14px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <User size={16} color={COLORS.burgundy} />
                                <span style={{ fontWeight: 600, color: '#333' }}>{post.author}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Clock size={16} color={COLORS.burgundy} />
                                <span>{post.date} · {post.readTime}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Tag size={16} color={COLORS.burgundy} />
                                <span style={{ color: COLORS.burgundy, fontWeight: 700, textTransform: 'uppercase', fontSize: '12px' }}>{post.category}</span>
                            </div>
                        </div>

                        {/* Content body */}
                        <article style={{ fontFamily: TYPOGRAPHY.fontBody }} itemScope itemType="https://schema.org/Article">
                            {post.content ? renderContent(post.content) : (
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: COLORS.burgundy, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '16px' }}>{post.category}</span>
                                    <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1A0A0F', marginBottom: '24px', fontFamily: TYPOGRAPHY.fontHeading }}>
                                        {post.title}
                                    </h2>
                                    <p style={{ fontSize: '17px', lineHeight: 1.8, color: '#4A3040', marginBottom: '24px' }}>
                                        {post.excerpt}
                                    </p>
                                    <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#4A3040', marginBottom: '24px' }}>
                                        This in-depth article explores the latest developments in {post.category.toLowerCase()} and what they mean for enterprise security teams. Our cybersecurity experts at QuasarCyberTech analyse the implications, provide actionable guidance, and outline how organizations can prepare their defenses accordingly.
                                    </p>
                                    {post.tags.slice(0, 3).map((topic) => (
                                        <div key={topic} style={{ marginBottom: '32px' }}>
                                            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#56081A', marginBottom: '12px', fontFamily: TYPOGRAPHY.fontHeading }}>
                                                {topic.replace(/-/g, ' ')}
                                            </h3>
                                            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#4A3040' }}>
                                                Understanding the role of {topic.replace(/-/g, ' ')} in the current threat landscape is critical for enterprise security leaders. Organizations that proactively address this area significantly reduce their overall attack surface and improve incident response readiness.
                                            </p>
                                        </div>
                                    ))}
                                    <p style={{ fontSize: '14px', color: '#888', fontStyle: 'italic', marginTop: '40px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '24px' }}>
                                        Full article content is being finalized by our editorial team. Subscribe to our security insights to be notified when the complete article is published.
                                    </p>
                                </div>
                            )}
                        </article>

                        {/* Footer actions */}
                        <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link to="/blogs" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: COLORS.burgundy, fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>
                                <ArrowLeft size={16} /> BACK TO ALL BLOGS
                            </Link>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <button style={{ background: 'none', border: '1px solid #ddd', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.burgundy} onMouseLeave={e => e.currentTarget.style.borderColor = '#ddd'}>
                                    <Share2 size={18} color="#666" />
                                </button>
                            </div>
                        </div>

                        {/* Tags — crawlable links for internal SEO signal */}
                        <div style={{ marginTop: '32px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {post.tags.map(tag => (
                                <Link
                                    key={tag}
                                    to={`/blogs?tag=${encodeURIComponent(tag)}`}
                                    style={{ background: 'rgba(0,0,0,0.04)', padding: '6px 14px', borderRadius: '4px', fontSize: '12px', color: '#666', fontWeight: 500, textDecoration: 'none', transition: 'background 0.2s' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(107,21,48,0.08)'; e.currentTarget.style.color = COLORS.burgundy; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; e.currentTarget.style.color = '#666'; }}
                                >#{tag}</Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default BlogIndividual;
