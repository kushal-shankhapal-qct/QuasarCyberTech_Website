import React from 'react';
import { motion } from 'framer-motion';
import { COLORS, SECTION_BACKGROUNDS, TYPOGRAPHY } from '../config/themeConfig';

const CertificationSection: React.FC = () => {
    // Placeholder certificates (Letter sized format)
    const certs = [
        { id: 1, title: 'Compliance Excellence' },
        { id: 2, title: 'Operational Security' },
        { id: 3, title: 'Strategic Resilience' },
    ];

    return (
        <section style={{ 
            position: 'relative',
            padding: '100px 0', 
            background: '#F0F1F6', // Lighter neutral background
            overflow: 'hidden'
        }}>
            {/* Pinboard / Dotted Grid Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `radial-gradient(circle, ${COLORS.burgundy}22 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div style={{ paddingLeft: '2.5em', paddingRight: '2.5em', position: 'relative', zIndex: 2 }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h3 style={{ 
                        ...TYPOGRAPHY.eyebrow,
                        color: COLORS.burgundy,
                        fontWeight: 800,
                        letterSpacing: '0.15em',
                        marginBottom: '12px'
                    }}>
                        GLOBAL TRUST & COMPLIANCE
                    </h3>
                    <h2 style={{
                        ...TYPOGRAPHY.sectionTitle,
                        color: COLORS.deepCyberBlue,
                        fontSize: '32px',
                        fontWeight: 800
                    }}>
                        Accreditations & Certifications
                    </h2>
                </div>

                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '48px',
                }}>
                    {certs.map((cert) => (
                        <motion.div 
                            key={cert.id}
                            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                            style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                gap: '16px',
                                position: 'relative' 
                            }}
                        >
                            {/* Letter Sized Placeholder Certificate (8.5 x 11 ratio approx) */}
                            <div style={{
                                width: '200px',
                                height: '260px',
                                background: '#FFFFFF',
                                borderRadius: '4px',
                                border: '1px solid rgba(107, 21, 48, 0.15)',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '24px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                                {/* Inner Decorative Frame */}
                                <div style={{
                                    position: 'absolute',
                                    inset: '12px',
                                    border: '1px solid rgba(107, 21, 48, 0.08)',
                                    pointerEvents: 'none'
                                }} />

                                {/* Mock Seal/Icon */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #D6B05C 0%, #B89241 100%)',
                                    marginBottom: '20px',
                                    opacity: 0.1,
                                    border: '2px solid #D6B05C'
                                }} />

                                {/* Mock Lines */}
                                <div style={{ width: '70%', height: '4px', background: 'rgba(107, 21, 48, 0.05)', borderRadius: '2px', marginBottom: '8px' }} />
                                <div style={{ width: '90%', height: '4px', background: 'rgba(107, 21, 48, 0.05)', borderRadius: '2px', marginBottom: '8px' }} />
                                <div style={{ width: '80%', height: '4px', background: 'rgba(107, 21, 48, 0.05)', borderRadius: '2px', marginBottom: '8px' }} />
                                
                                <div style={{ 
                                    marginTop: 'auto',
                                    color: COLORS.burgundy,
                                    fontSize: '10px',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    textAlign: 'center'
                                }}>
                                    QuasarCyberTech<br />Certified
                                </div>

                                {/* Pin Icon at top to suggest pinboard */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-4px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: COLORS.burgundy,
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    zIndex: 10
                                }} />
                            </div>

                            <span style={{ 
                                ...TYPOGRAPHY.caption,
                                fontWeight: 700,
                                color: COLORS.deepCyberBlue, 
                                opacity: 0.8,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                {cert.title}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CertificationSection;
