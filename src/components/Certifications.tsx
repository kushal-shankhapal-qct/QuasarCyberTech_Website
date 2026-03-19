import React from 'react';
import { motion } from 'framer-motion';
import crestLogo from '../assets/Logos/Trust_Logos/Crest_Logo.png';
import isoLogo from '../assets/Logos/Trust_Logos/ISO_27001_Final-Logo.jpg';
import certinLogo from '../assets/Logos/Trust_Logos/certin-logo.png';

const CertificationSection: React.FC = () => {
    const certs = [
        { name: 'CREST Accredited', logo: crestLogo },
        { name: 'ISO 27001 Certified', logo: isoLogo },
        { name: 'CERT-IN Empanelled', logo: certinLogo },
    ];

    return (
        <section style={{ padding: '60px 0', background: '#F5F7FA', borderTop: '1px solid #E5E7EB' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5A6478', opacity: 0.8 }}>
                        Our Global Compliance & Certifications
                    </h3>
                </div>
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '48px',
                    opacity: 0.7 
                }}>
                    {certs.map((cert) => (
                        <motion.div 
                            key={cert.name}
                            whileHover={{ opacity: 1, scale: 1.05 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
                        >
                            <img 
                                src={cert.logo} 
                                alt={cert.name} 
                                style={{ 
                                    height: '50px', 
                                    width: 'auto', 
                                    filter: 'grayscale(100%) brightness(0.8)',
                                    mixBlendMode: 'multiply'
                                }} 
                            />
                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#0B1F3B' }}>{cert.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CertificationSection;
