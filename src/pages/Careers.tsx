import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, TrendingUp, Code2, Globe, BarChart3, Shield, 
  ChevronDown, ArrowRight, Zap, Lightbulb, Heart, MessageSquare, Users 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { COLORS, GRADIENTS, TYPOGRAPHY, LAYOUT_CONTROLS, SECTION_BACKGROUNDS } from '../config/themeConfig';

// ─── DATA ───────────────────────────────────────────────────────────────────

const openRoles = [
  {
    title: "Cybersecurity Consultant",
    location: "Nashik / Remote",
    experience: "2–5 years",
    type: "Full-Time",
    description: "Lead client-facing security engagements across VAPT, compliance, and advisory programs.",
  },
  {
    title: "SOC Analyst",
    location: "Nashik",
    experience: "1–3 years",
    type: "Full-Time",
    description: "Monitor, detect, and respond to threats across managed client environments using SIEM and EDR tooling.",
  },
  {
    title: "Security Engineer",
    location: "Remote",
    experience: "2–4 years",
    type: "Full-Time",
    description: "Build and maintain internal security platforms including QRGT and QStellar integrations.",
  },
  {
    title: "Cloud Security Consultant",
    location: "Remote / Hybrid",
    experience: "3–6 years",
    type: "Full-Time",
    description: "Deliver cloud security assessments, CSPM implementations, and AWS/Azure architecture reviews.",
  },
  {
    title: "Pre-Sales & Business Development",
    location: "Nashik / Mumbai",
    experience: "2–4 years",
    type: "Full-Time",
    description: "Drive enterprise pipeline by translating technical security capabilities into compelling client proposals.",
  },
  {
    title: "Full Stack Developer",
    location: "Nashik / Remote",
    experience: "2–5 years",
    type: "Full-Time",
    description: "Build features across the QuasarCyberTech platform ecosystem — QRGT, QStellar, and QPulse.",
  },
  {
    title: "Security Research Intern",
    location: "Remote",
    experience: "0–1 year",
    type: "Internship",
    description: "Contribute to vulnerability research, threat intelligence analysis, and security advisory content.",
  },
];

const faqs = [
  {
    question: "Do you accept applications from outside India?",
    answer: "Yes. We have team members and clients across 15+ countries. Remote-friendly roles are clearly marked."
  },
  {
    question: "What is the QLeap Internship Pathway?",
    answer: "QLeap is our cybersecurity training initiative. Interns who complete the structured program are evaluated for full-time roles at QuasarCyberTech."
  },
  {
    question: "How long does the hiring process take?",
    answer: "Typically 2–3 weeks from application to offer for most roles. Internship decisions are made within 10 days."
  },
  {
    question: "Do I need certifications to apply?",
    answer: "Certifications are valued but not mandatory. We prioritize demonstrable skills, curiosity, and problem-solving ability."
  },
  {
    question: "Can I apply for multiple roles?",
    answer: "Yes. Please indicate your primary preference in the application form."
  }
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

const Careers: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div style={{ background: SECTION_BACKGROUNDS.LIGHT, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .pathway-container {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          position: relative;
        }
        .pathway-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 2;
          flex: 1;
        }
        .pathway-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid ${COLORS.gold};
          display: flex;
          align-items: center;
          justifyContent: center;
          background: #000;
          color: ${COLORS.gold};
          font-weight: 800;
          font-size: 14px;
          margin-bottom: 16px;
        }
        .pathway-connector {
          position: absolute;
          top: 22px;
          left: calc(50% + 22px);
          width: calc(100% - 44px);
          height: 1px;
          border-top: 1.5px dashed rgba(214, 176, 92, 0.4);
          z-index: 1;
        }
        @media (max-width: 768px) {
          .pathway-container {
            flex-direction: column;
            gap: 40px;
            align-items: flex-start;
          }
          .pathway-step {
            flex-direction: row;
            text-align: left;
            gap: 20px;
          }
          .pathway-circle {
            margin-bottom: 0;
          }
          .pathway-connector {
            top: 44px;
            left: 21px;
            width: 1px;
            height: calc(100% + 40px - 44px);
            border-top: none;
            border-left: 1.5px dashed rgba(214, 176, 92, 0.4);
          }
          .pathway-text {
            margin-top: -2px;
          }
        }
      `}} />
      <Navbar />

      <PageHero 
        title={<>Build the Future of <span style={{ color: COLORS.gold }}>Cybersecurity</span></>}
        highlight="with QuasarCyberTech"
        subtitle="Join one of the fastest-growing cybersecurity consulting and engineering firms where ownership, learning, and innovation come together to create real enterprise impact."
        backgroundOverride={GRADIENTS.CAREERS_HERO_BG}
        breadcrumbPaths={["Home"]}
        currentName="Careers"
        scrollTargetId="open-roles"
        scrollButtonText="Explore Open Roles"
        rightContent={<div style={{ width: '100%', height: '100%', opacity: 0.1, background: 'url(/tech-net.png) center/cover' }} />}
      />

      {/* ─── WHY JOIN SECTION ─── */}
      <section style={{ 
        padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX} ${LAYOUT_CONTROLS.section.paddingBottom}`,
        background: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
             <span style={{ ...TYPOGRAPHY.eyebrow, color: COLORS.burgundy }}>Why Join Us</span>
             <h2 style={{ ...TYPOGRAPHY.sectionTitle, color: COLORS.textOnLight, marginTop: '12px' }}>A Career of Impact</h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '32px' 
          }}>
            {[
              { icon: Target, title: "Ownership from Day One", copy: "Work on real enterprise engagements from your first week. No bench time, no busywork." },
              { icon: TrendingUp, title: "High-Velocity Learning", copy: "Exposure to cutting-edge offensive security, AI threat testing, cloud security, and SOC operations." },
              { icon: Code2, title: "Engineering Culture", copy: "We build internal platforms — QRGT, QStellar, QPulse — alongside client delivery." },
              { icon: Globe, title: "Cross-Industry Exposure", copy: "Work with clients across banking, FinTech, healthcare, and manufacturing in 15+ countries." },
              { icon: BarChart3, title: "Career Trajectory", copy: "A clear path from analyst to consultant to lead, backed by structured mentorship." },
              { icon: Shield, title: "Mission-Driven Work", copy: "Protecting the organizations that run the digital economy is not abstract here — it is Tuesday morning." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ 
                  padding: '32px', 
                  borderRadius: '16px', 
                  background: '#F8FAFC',
                  border: '1px solid rgba(0,0,0,0.05)',
                  textAlign: 'left'
                }}
              >
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: 'rgba(107, 21, 48, 0.08)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: COLORS.burgundy
                }}>
                  <item.icon size={24} />
                </div>
                <h3 style={{ ...TYPOGRAPHY.cardTitle, color: COLORS.textOnLight, marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ ...TYPOGRAPHY.bodySmall, color: COLORS.textSub, lineHeight: 1.6 }}>{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GROWTH STORY SECTION (Dark) ─── */}
      <section style={{ 
        padding: `100px ${LAYOUT_CONTROLS.section.paddingX}`,
        background: GRADIENTS.DARK_SECTION_BG,
        color: '#FFFFFF',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ ...TYPOGRAPHY.sectionTitle, color: '#FFFFFF', marginBottom: '24px' }}>Building More Than a Company</h2>
          <p style={{ ...TYPOGRAPHY.bodyBase, color: 'rgba(255,255,255,0.8)', marginBottom: '64px' }}>
            At QuasarCyberTech, we are building more than a cybersecurity company. We are building a high-performance consulting, engineering, and security platform ecosystem serving enterprises across industries. As we scale, we are looking for ambitious professionals and emerging talent who want to grow with us.
          </p>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '40px' 
          }}>
            {[
              { val: "120+", lab: "Engagements" },
              { val: "15+", lab: "Countries" },
              { val: "4", lab: "Platforms Built" },
              { val: "24×7", lab: "Security Ops" }
            ].map((m, i) => (
              <div key={i} style={{ minWidth: '140px' }}>
                <div style={{ ...TYPOGRAPHY.metricNumber, color: COLORS.gold }}>{m.val}</div>
                <div style={{ ...TYPOGRAPHY.eyebrow, color: 'rgba(255,255,255,0.6)', marginTop: '8px', fontSize: '10px' }}>{m.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OPEN POSITIONS SECTION ─── */}
      <section id="open-roles" style={{ 
        padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX} ${LAYOUT_CONTROLS.section.paddingBottom}`,
        background: SECTION_BACKGROUNDS.LIGHT
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ ...TYPOGRAPHY.sectionTitle, color: COLORS.textOnLight }}>Open Positions</h2>
            <p style={{ ...TYPOGRAPHY.bodyBase, color: COLORS.textSub, marginTop: '8px' }}>We are hiring across consulting, engineering, and operations.</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '24px' 
          }}>
            {openRoles.map((role, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: '12px', 
                  padding: '32px', 
                  border: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
              >
                <h4 style={{ fontSize: '18px', fontWeight: 700, color: COLORS.textOnLight, marginBottom: '16px' }}>{role.title}</h4>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  <span style={{ fontSize: '11px', padding: '4px 10px', background: '#F1F5F9', color: '#64748B', borderRadius: '4px', fontWeight: 600 }}>{role.location}</span>
                  <span style={{ fontSize: '11px', padding: '4px 10px', background: '#F1F5F9', color: '#64748B', borderRadius: '4px', fontWeight: 600 }}>{role.experience}</span>
                  <span style={{ 
                    fontSize: '11px', 
                    padding: '4px 10px', 
                    background: role.type === 'Internship' ? COLORS.gold : 'rgba(107, 21, 48, 0.1)', 
                    color: role.type === 'Internship' ? '#000' : COLORS.burgundy, 
                    borderRadius: '4px', 
                    fontWeight: 600 
                  }}>
                    {role.type}
                  </span>
                </div>

                <p style={{ ...TYPOGRAPHY.bodySmall, color: COLORS.textSub, marginBottom: '32px', flexGrow: 1 }}>{role.description}</p>

                <Link 
                  to={`/careers/apply?role=${encodeURIComponent(role.title)}`}
                  style={{ 
                    background: COLORS.burgundy, 
                    color: '#FFFFFF', 
                    padding: '14px', 
                    borderRadius: '6px', 
                    textAlign: 'center', 
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '13px',
                    letterSpacing: '0.05em'
                  }}
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QLEAP PATHWAY SECTION ─── */}
      <section style={{ 
        padding: `100px ${LAYOUT_CONTROLS.section.paddingX}`,
        background: GRADIENTS.DARK_SECTION_BG,
        color: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <div>
            <span style={{ ...TYPOGRAPHY.eyebrow, color: COLORS.gold }}>Powered by QLeap</span>
            <h2 style={{ ...TYPOGRAPHY.sectionTitle, marginTop: '16px', marginBottom: '24px' }}>Start Your Career Journey Through QLeap</h2>
            <p style={{ ...TYPOGRAPHY.bodyLarge, color: 'rgba(255,255,255,0.8)', marginBottom: '40px' }}>
              Through QLeap, we identify, train, and nurture cybersecurity talent through structured learning, hands-on projects, and internship opportunities.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="https://qleap-ed.com" target="_blank" rel="noopener noreferrer" style={{ background: COLORS.burgundy, color: '#FFFFFF', padding: '14px 28px', borderRadius: '4px', textDecoration: 'none', fontWeight: 700 }}>Explore QLeap</a>
              <Link to="/careers/apply?role=Security%20Research%20Intern" style={{ border: '1px solid #FFFFFF', color: '#FFFFFF', padding: '14px 28px', borderRadius: '4px', textDecoration: 'none', fontWeight: 700 }}>Apply for Internship</Link>
            </div>
          </div>

          <div className="pathway-container">
            {[
              { num: "01", label: "Learn", desc: "Core foundations" },
              { num: "02", label: "Practice", desc: "Lab simulations" },
              { num: "03", label: "Internship", desc: "Real projects" },
              { num: "04", label: "Full-Time", desc: "Direct hire" }
            ].map((step, i) => (
              <div key={i} className="pathway-step">
                <div className="pathway-circle">
                  {step.num}
                </div>
                <div className="pathway-text">
                  <div style={{ fontWeight: 700, fontSize: '16px', whiteSpace: 'nowrap' }}>{step.label}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>{step.desc}</div>
                </div>
                {i < 3 && <div className="pathway-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CULTURE & VALUES ─── */}
      <section style={{ 
        padding: `${LAYOUT_CONTROLS.section.paddingTop} ${LAYOUT_CONTROLS.section.paddingX} ${LAYOUT_CONTROLS.section.paddingBottom}`,
        background: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{ ...TYPOGRAPHY.sectionTitle, color: COLORS.textOnLight, textAlign: 'center', marginBottom: '64px' }}>How We Work</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '40px' 
          }}>
            {[
              { icon: Shield, title: "Adversarial Mindset", copy: "We think like attackers so our clients don't have to." },
              { icon: Target, title: "Radical Ownership", copy: "Every person on the team owns outcomes, not just tasks." },
              { icon: Lightbulb, title: "Continuous Learning", copy: "The threat landscape changes weekly. So do we." },
              { icon: Heart, title: "Client Obsession", copy: "Enterprise security outcomes, not checkbox compliance." },
              { icon: MessageSquare, title: "Build in Public", copy: "We publish research, advisories, and platform updates openly." },
              { icon: Users, title: "No Hierarchy on Ideas", copy: "The best security insight wins regardless of seniority." }
            ].map((v, i) => (
              <div key={i} style={{ textAlign: 'left' }}>
                <v.icon size={32} color={COLORS.burgundy} style={{ marginBottom: '20px' }} />
                <h4 style={{ ...TYPOGRAPHY.cardTitle, marginBottom: '12px', color: COLORS.textOnLight }}>{v.title}</h4>
                <p style={{ ...TYPOGRAPHY.bodySmall, color: COLORS.textSub }}>{v.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section style={{ 
        padding: `80px ${LAYOUT_CONTROLS.section.paddingX}`,
        background: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ ...TYPOGRAPHY.sectionTitle, color: COLORS.textOnLight, textAlign: 'center', marginBottom: '48px' }}>Common Questions</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '24px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '17px', fontWeight: 600, color: COLORS.textOnLight }}>{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    style={{ 
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s'
                    }} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ paddingBottom: '24px', color: COLORS.textSub, lineHeight: 1.7, fontSize: '15px' }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;