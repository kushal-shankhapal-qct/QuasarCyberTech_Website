import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe2, ShieldAlert, ArrowRight, Building2, Wifi, Target } from 'lucide-react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WorldMap from '../components/ui/world-map';
import { themeConfig } from '../config/themeConfig';

/* ───────── CONTACT PAGE CONTROL VARIABLES ───────── */
const HERO_GRADIENT = 'var(--cta-bg)';
const FORM_CARD_BG = 'var(--cta-bg)'; // Now used for the LEFT info card
const FORM_GRID_OPACITY = '0.06';
const HERO_WHITE_SPLIT = '400px';
const CARD_RADIUS = '28px';
const CARD_MAX_WIDTH = '540px';
const CONTENT_PX = 'px-6 sm:px-10 lg:px-16';
const CARD_CLAY = {
  bgColor: '255, 255, 255',
  bgOpacity: 0.98,
  blur: '24px',
  shadow: '0 0 1px rgba(0,0,0,0.1), 0 20px 50px -10px rgba(0,0,0,0.15), 0 8px 20px -8px rgba(0,0,0,0.1)',
  innerShadow: 'inset 0 2px 6px rgba(255, 255, 255, 1), inset 0 -2px 6px rgba(0, 0, 0, 0.03)',
};

/* ───────── MATERIAL INPUT COMPONENT ───────── */
const MaterialInput = ({ label, type = 'text', required = false, placeholder, value, onChange, isTextarea = false }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  const InputTag = isTextarea ? 'textarea' : 'input';

  return (
    <div className="relative mb-6">
      <InputTag
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full bg-white border-2 rounded-xl px-4 pt-6 pb-2 text-[14px] font-semibold text-[var(--text-primary)] transition-all outline-none ${isFocused ? 'border-[var(--brand-accent)] ring-4 ring-[var(--brand-accent-soft)]' : 'border-black/5 hover:border-black/15'
          } ${isTextarea ? 'min-h-[120px] resize-none' : ''}`}
        placeholder={isFocused ? placeholder : ''}
      />
      <label
        className={`absolute left-4 transition-all pointer-events-none font-bold uppercase tracking-widest ${isFocused || hasValue
          ? 'top-2 text-[9px] text-[var(--brand-accent)]'
          : 'top-1/2 -translate-y-1/2 text-[11px] text-[var(--text-muted)]'
          }`}
        style={isTextarea && !(isFocused || hasValue) ? { top: '24px', transform: 'none' } : {}}
      >
        {label} {required && '*'}
      </label>
    </div>
  );
};

/* ───────── CLEAN RADAR COMPONENT ───────── */
function RadarDisplay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let angle = 0;

    const blips = [
      { angle: 45, distance: 0.35, alpha: 0.9 },
      { angle: 150, distance: 0.6, alpha: 0.7 },
      { angle: 230, distance: 0.45, alpha: 0.8 },
      { angle: 310, distance: 0.75, alpha: 0.5 },
      { angle: 80, distance: 0.55, alpha: 0.6 },
    ];

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(cx, cy) - 10;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = '#120610';
      ctx.fillRect(0, 0, w, h);

      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (maxR / 4) * i, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(122, 15, 42, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy);
      ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR);
      ctx.strokeStyle = 'rgba(122, 15, 42, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const sweepAngle = angle * Math.PI / 180;
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, sweepAngle - 0.8, sweepAngle);
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      grad.addColorStop(0, '#9A1F3A');
      grad.addColorStop(1, 'rgba(122, 15, 42, 0)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * maxR, cy + Math.sin(sweepAngle) * maxR);
      ctx.strokeStyle = '#9A1F3A';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#9A1F3A';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#9A1F3A';
      ctx.shadowColor = '#9A1F3A';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

      blips.forEach(blip => {
        const bAngle = blip.angle * Math.PI / 180;
        const bx = cx + Math.cos(bAngle) * blip.distance * maxR;
        const by = cy + Math.sin(bAngle) * blip.distance * maxR;
        const sweepDeg = angle % 360;
        let diff = (sweepDeg - blip.angle + 360) % 360;
        let fade = diff < 60 ? (1 - diff / 60) * blip.alpha : blip.alpha * 0.2;
        ctx.beginPath();
        ctx.arc(bx, by, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(154, 31, 58, ${fade})`;
        ctx.shadowColor = '#9A1F3A';
        ctx.shadowBlur = fade > 0.3 ? 12 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.restore();
      angle = (angle + 0.8) % 360;
      animFrame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </div>
  );
}

/* ───────── WORLD MAP CONNECTION DATA ───────── */
const officeConnections = [
  { start: { lat: 19.9975, lng: 73.7898 }, end: { lat: 19.0760, lng: 72.8777 } },
  { start: { lat: 19.9975, lng: 73.7898 }, end: { lat: 12.9716, lng: 77.5946 } },
  { start: { lat: 19.9975, lng: 73.7898 }, end: { lat: 32.7767, lng: -96.7970 } },
];

const clientConnections = [
  { start: { lat: 32.7767, lng: -96.7970 }, end: { lat: 51.5074, lng: -0.1278, label: 'client' as const } },
  { start: { lat: 19.9975, lng: 73.7898 }, end: { lat: 1.3521, lng: 103.8198, label: 'client' as const } },
  { start: { lat: 19.9975, lng: 73.7898 }, end: { lat: 25.2048, lng: 55.2708, label: 'client' as const } },
  { start: { lat: 32.7767, lng: -96.7970 }, end: { lat: -23.5505, lng: -46.6333, label: 'client' as const } },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Transmission received. A specialist will be in touch shortly.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[var(--card-surface-secondary)] text-[var(--text-primary)]">
      <Header />

      <main>
        {/* NAV STRIP */}
        <div className="w-full bg-[var(--card-surface-secondary)] border-b border-black/5" style={{ height: themeConfig.contact.navStripHeight || '120px' }} />

        {/* ───── HERO + CARDS ───── */}
        <section className="relative w-full">
          <div
            className="absolute top-0 left-0 right-0 overflow-hidden"
            style={{
              background: HERO_GRADIENT,
              height: `calc(100% - ${HERO_WHITE_SPLIT})`,
            }}
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          </div>

          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: HERO_WHITE_SPLIT, backgroundColor: 'var(--card-surface-secondary)' }}
          />

          <div className={`max-w-7xl mx-auto ${CONTENT_PX} relative z-10`}>
            {/* Hero content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-white/10 bg-black/30 mb-8">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]" />
                  <span className="text-white/80 text-[11px] font-mono tracking-widest uppercase">
                    SECURE COMMS ACTIVE | AES-256
                  </span>
                </div>

                <h1 className="text-[42px] md:text-[58px] font-black text-white leading-[1.05] tracking-tighter mb-6">
                  Global Security <br />
                  <span className="text-white/70">Command Center</span>
                </h1>

                <p className="text-[16px] text-white/60 font-medium leading-relaxed max-w-lg">
                  Connect with our security operations desk to discuss your architecture, request a tactical demonstration, or report an active incident.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden lg:block"
              >
                <RadarDisplay />
              </motion.div>
            </div>

            {/* ── PROTRUDING CARDS (SWAPPED STYLES) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8 mx-auto" style={{ maxWidth: `calc(${CARD_MAX_WIDTH} * 2 + 24px)` }}>

              {/* LEFT CARD: Company Info (NOW DARK GRADIENT) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="p-10 relative overflow-hidden"
                style={{
                  maxWidth: CARD_MAX_WIDTH,
                  background: 'linear-gradient(135deg, #0A192F 0%, #112240 50%, #0A192F 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: CARD_RADIUS,
                  boxShadow: '0 30px 60px -12px rgba(0,0,0,0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/10 text-white/90 mb-6 relative z-10">
                  <ShieldAlert size={14} />
                  <span className="text-[10px] font-bold tracking-widest uppercase">Secure Routing</span>
                </div>

                <h2 className="text-[28px] md:text-[34px] font-black tracking-tight text-white leading-[1.1] mb-4 relative z-10">
                  Initiate <br />Transmission
                </h2>

                <p className="text-[14px] text-white/50 font-medium mb-10 leading-relaxed relative z-10">
                  Direct pipelines to our specialized engineering units for architectural overhauls or executing active incident response.
                </p>

                <div className="space-y-4 relative z-10">
                  {[
                    { icon: Mail, label: 'Email', value: 'contactus@quasarcybertech.com' },
                    { icon: Phone, label: 'Phone', value: '+91 97306 91190' },
                    { icon: MapPin, label: 'Location', value: 'Nashik, Maharashtra – 422009' },
                    { icon: Globe2, label: 'Website', value: 'quasarcybertech.com' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">{item.label}</div>
                        <div className="text-[14px] font-semibold text-white">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT CARD: Contact Form (NOW WHITE CLAYMOPHISM) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-10"
                style={{
                  maxWidth: CARD_MAX_WIDTH,
                  backgroundColor: `rgba(${CARD_CLAY.bgColor}, ${CARD_CLAY.bgOpacity})`,
                  backdropFilter: `blur(${CARD_CLAY.blur})`,
                  WebkitBackdropFilter: `blur(${CARD_CLAY.blur})`,
                  boxShadow: `${CARD_CLAY.innerShadow}, ${CARD_CLAY.shadow}`,
                  borderRadius: CARD_RADIUS,
                }}
              >
                <div className="mb-8">
                  <h3 className="text-[28px] md:text-[32px] font-black tracking-tight text-[var(--text-primary)] mb-1">Get in touch.</h3>
                  <p className="text-[var(--text-muted)] text-[14px] font-medium">Submit your inquiry. We respond within 4 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10">
                  <MaterialInput
                    label="Your Name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <MaterialInput
                    label="Email Address"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                  />

                  <MaterialInput
                    label="Organization / Phone"
                    placeholder="Acme Corp / +1 234 567 890"
                    value={formData.company}
                    onChange={(e: any) => setFormData({ ...formData, company: e.target.value })}
                  />

                  <MaterialInput
                    label="Message"
                    required
                    isTextarea
                    placeholder="How can our security specialists assist you today?"
                    value={formData.message}
                    onChange={(e: any) => setFormData({ ...formData, message: e.target.value })}
                  />

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-[var(--brand-accent)] hover:bg-[#5a111b] text-white font-black tracking-widest text-[14px] rounded-xl transition-all shadow-xl shadow-[var(--brand-accent-soft)] hover:scale-[1.01] flex items-center justify-center gap-3 mt-4"
                  >
                    SEND TRANSMISSION <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ───── GLOBAL PRESENCE ───── */}
        <section className="relative w-full bg-[var(--card-surface-primary)]" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
          <div className={`max-w-7xl mx-auto ${CONTENT_PX}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

              {/* LEFT: Header + HQ + Locations */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex flex-col">
                <div className="inline-block px-4 py-1.5 bg-[var(--brand-accent-soft)] rounded-sm text-[10px] font-bold text-[var(--brand-accent)] tracking-widest uppercase mb-4 w-fit">
                  Infrastructure
                </div>
                <h2 className="text-[32px] md:text-[40px] font-black text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4">
                  Global <span className="text-[var(--brand-accent)]">Presence</span>
                </h2>
                <p className="text-[14px] text-[var(--text-muted)] font-medium max-w-md mb-8 leading-relaxed">
                  Strategic operations distributed across key technology corridors for localized response and global coverage.
                </p>

                {/* HQ Information (Minimal Style) */}
                <div
                  className="p-6 mb-4 flex items-center gap-5 transition-colors hover:bg-white/50"
                  style={{
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                  }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[var(--brand-navy)]/5 flex items-center justify-center shrink-0">
                    <Building2 className="w-7 h-7 text-[var(--brand-navy)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[17px] font-bold text-[var(--text-primary)] tracking-tight">Nashik — Headquarters</h3>
                      <span className="px-2 py-0.5 bg-[var(--brand-navy)]/10 text-[var(--brand-navy)] text-[9px] font-black rounded tracking-widest uppercase shrink-0">HQ</span>
                    </div>
                    <p className="text-[13px] text-[var(--text-muted)] font-medium">
                      #1, State Bank Colony, Indira Nagar, Maharashtra – 422009
                    </p>
                  </div>
                </div>

                {/* Satellite locations */}
                <div className="grid grid-cols-3 gap-4 mb-auto pt-4">
                  {[
                    { city: 'Mumbai', label: 'Operations', icon: Building2, color: 'var(--brand-accent)' },
                    { city: 'Bengaluru', label: 'Engineering', icon: Target, color: 'var(--brand-navy)' },
                    { city: 'Dallas', label: 'Americas', icon: Wifi, color: 'var(--brand-accent)' },
                  ].map((loc) => (
                    <div
                      key={loc.city}
                      className="p-4 flex flex-col items-center text-center gap-2 border-r last:border-0 border-black/5"
                    >
                      <loc.icon className="w-5 h-5" style={{ color: loc.color }} />
                      <div>
                        <div className="text-[14px] font-black text-[var(--text-primary)] tracking-tight">{loc.city}</div>
                        <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">{loc.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT: Dotted World Map */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex min-h-[420px]">
                <div
                  className="rounded-[24px] overflow-hidden border border-black/5 flex-1 relative"
                  style={{
                    backgroundColor: `rgba(${CARD_CLAY.bgColor}, ${CARD_CLAY.bgOpacity})`,
                    boxShadow: `${CARD_CLAY.innerShadow}, ${CARD_CLAY.shadow}`,
                  }}
                >
                  <WorldMap
                    lineColor="#1F6FEB"
                    secondaryLineColor="#3B82F6"
                    dotColor="#00000025"
                    backgroundColor="transparent"
                    dots={[...officeConnections, ...clientConnections]}
                  />

                  {/* LEGEND — MINIMAL OVERLAY */}
                  <div className="absolute bottom-6 right-6 flex items-center gap-6 z-20">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1F6FEB]" />
                      <span className="text-[10px] font-black text-[#555] uppercase tracking-wider">Offices</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                      <span className="text-[10px] font-black text-[#555] uppercase tracking-wider">Clients</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ───── EMERGENCY CTA ───── */}
        <section className="relative w-full overflow-hidden" style={{ background: HERO_GRADIENT, paddingTop: '100px', paddingBottom: '100px' }}>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <div className={`max-w-4xl mx-auto ${CONTENT_PX} relative z-10 text-center`}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <div className="inline-flex w-20 h-20 rounded-2xl bg-red-500/10 items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                <ShieldAlert className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-[36px] md:text-[52px] font-black text-white mb-6 tracking-tight leading-tight">Experiencing an <br />Active Incident?</h2>
              <p className="text-[16px] text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                Our rapid response unit is on standby 24/7. Immediate extraction, containment, and forensic pipelines are available instantly upon contact.
              </p>
              <a href="tel:+919730691190" className="inline-flex items-center gap-3 px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-black tracking-widest text-[15px] rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:-translate-y-1">
                <Phone className="w-5 h-5" /> +91 97306 91190
              </a>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}