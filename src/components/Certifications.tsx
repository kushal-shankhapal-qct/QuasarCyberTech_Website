import React from 'react';
import { motion } from 'framer-motion';
import crestLogo from '../assets/Logos/Trust_Logos/Crest_Logo.png';
import isoLogo from '../assets/Logos/Trust_Logos/ISO_27001_Final-Logo.jpg';
import certinLogo from '../assets/Logos/Trust_Logos/certin-logo.png';
import { COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY } from '../config/themeConfig';

const CertificationSection: React.FC = () => {
    const certs = [
        { name: 'CREST Accredited', logo: crestLogo },
        { name: 'ISO 27001 Certified', logo: isoLogo },
        { name: 'CERT-IN Empanelled', logo: certinLogo },
    ];

    return (
        <section style={{ 
            position: 'relative',
            padding: '60px 0', 
            background: SECTION_BACKGROUNDS.LIGHT,
            overflow: 'hidden'
        }}>
            {/* Refinement 2: Gradient Fade Line Separator */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '8%',
                right: '8%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(11,31,59,0.2) 20%, rgba(11,31,59,0.2) 80%, transparent 100%)',
                zIndex: 1
            }} />

            {/* Refinement 3: Faint Teal Dot-Grid Texture - Matching TrustMetrics focus */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(43,196,182,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div style={{ paddingLeft: '2em', paddingRight: '2em', position: 'relative', zIndex: 2 }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h3 style={{ 
                        ...TYPOGRAPHY.eyebrow,
                        color: COLORS.textMuted,
                        opacity: 0.86,
                        display: 'inline-block'
                    }}>
                        Our Global Compliance & Certifications
                    </h3>
                </div>
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '64px', // Slightly increased gap for more breathing room
                    opacity: 0.7 
                }}>
                    {certs.map((cert) => (
                        <motion.div 
                            key={cert.name}
                            whileHover={{ opacity: 1, scale: 1.05 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}
                        >
                            <img 
                                src={cert.logo} 
                                alt={cert.name} 
                                style={{ 
                                    height: '48px', 
                                    width: 'auto', 
                                    filter: 'grayscale(100%) brightness(0.9)',
                                    mixBlendMode: 'multiply'
                                }} 
                            />
                            <span style={{ 
                                ...TYPOGRAPHY.caption,
                                fontWeight: 700,
                                color: COLORS.deepCyberBlue, 
                                opacity: 0.9 
                            }}>{cert.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CertificationSection;
