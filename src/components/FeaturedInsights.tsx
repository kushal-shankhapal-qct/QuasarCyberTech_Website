import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function FeaturedInsights() {
    const insights = [
        {
            title: 'Emerging Cloud Attack Patterns in 2026',
            category: 'Research',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
            href: '/resources/blogs'
        },
        {
            title: 'Zero Trust Architecture: Implementation Lessons',
            category: 'Architecture',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop',
            href: '/resources/blogs'
        },
        {
            title: 'Modern Red Teaming in Hybrid Environments',
            category: 'Offensive Security',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
            href: '/resources/blogs'
        }
    ];

    return (
        <section className="py-[120px]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-3 tracking-tight">
                        Insights & Threat Intelligence
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Research-driven perspectives on emerging threats and defensive strategies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {insights.map((item, idx) => (
                        <div key={idx} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100">
                            <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Soft overlay to ensure image matches warmth */}
                                <div className="absolute inset-0 bg-[#8B1E3F]/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <div className="text-xs font-bold text-[#8B1E3F] tracking-widest uppercase mb-4">
                                    {item.category}
                                </div>
                                <h3 className="text-xl font-bold text-[#0F172A] mb-4 leading-snug group-hover:text-[#8B1E3F] transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <div className="mt-auto">
                                    <Link
                                        to={item.href}
                                        className="inline-flex items-center text-[#0F172A] font-semibold group-hover:text-[#8B1E3F] transition-colors relative"
                                    >
                                        <span className="relative z-10">Read More</span>
                                        <ArrowRight className="w-4 h-4 ml-1.5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                        {/* Underline pseudo-element */}
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8B1E3F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
