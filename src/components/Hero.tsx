import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import techNetBackdrop from '../assets/Tech_Net_Backdrop.png';
import logoSymbol from '../assets/Logos/icononly_transparent_nobuffer.png';
import ubuntuRegular from '../assets/Ubuntu/Ubuntu-Regular.ttf';
import ubuntuBold from '../assets/Ubuntu/Ubuntu-Bold.ttf';

// ---------------------------------------------------------
// HERO BACKGROUND & STYLING VARIABLES
// ---------------------------------------------------------
const heroVars = {
  // 1. Static Background (Ivory/Creme)
  // Clean, elegant static background to contrast the glassmorphism navbar
  bgColor: 'transparent',

  // 2. Swirling Logo Vortex on the Right
  vortexSize: '900px',                // Size of the background logo
  vortexOpacity: 0.8,                // Gentle opacity for blending
  vortexRotationSpeed: 120,           // Slower, calmer rotation
  vortexPositionX: '51%',             // Positioned smoothly at the mid-right edge
  vortexPositionY: '0%',              // Centered vertically
  vortexFilter: 'none',               // Remove SVG filters for transparency PNG
  orbitText: 'CONSULT • MANAGE • SECURE • ENGINEER • AUGMENT • TRAIN • ', // New text

  // 3. Hero Layout & Positioning Variables
  heroTextWidth: '60%',               // Width of the text area
  heroPositionX: '2.2rem',               // Move the entire Hero text content left/right

  // 4. Hero Typography Controls
  headingFontSize: '50px',            // Size of the main heading
  headingLineHeight: '1.2',           // Line height for the main heading
  headingColor: '#242b3aff',            // Color of the heading
  headingMarginBottom: '20px',        // Space below the heading
  headingMarginTop: '80px',

  subheadingFontSize: '17px',         // Size of the subheading
  subheadingLineHeight: '1.50',       // Line height for the subheading
  subheadingColor: '#4c5666ff',         // Color of the subheading
  subheadingMarginBottom: '40px',     // Space below the subheading
  subheadingMarginTop: '0px',         // Space above the subheading

  // 5. Hero Container Controls
  containerPaddingTop: '25vh',
  containerPaddingBottom: '5rem',
  containerPaddingLeft: '1rem',
  containerPaddingRight: '1rem',
  containerMarginTop: '0px',
  containerMarginBottom: '0px',

  // 6. Buttons Area Controls
  buttonsMarginTop: '0px',
  buttonsMarginBottom: '0px',
  buttonsPaddingTop: '0px',
  buttonsPaddingBottom: '0px',

  // 7. Layout Classes
  container: 'relative z-10 w-full flex flex-col justify-start max-w-[1920px] mx-auto min-h-screen',
  textAlign: 'flex flex-col items-start',
  headingBase: 'font-extrabold w-full tracking-tight text-left',
  subheadingBase: 'font-medium w-full text-left tracking-tight',
  btnPrimary: 'px-8 py-3.5 bg-gradient-to-r from-[#8B1E3F] to-[#B33959] text-white text-[15px] font-semibold rounded-lg hover:from-[#6B1530] hover:to-[#8B1E3F] transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group w-fit',
  btnSecondary: 'px-8 py-3.5 border border-slate-300 text-[#0F172A] text-[15px] font-semibold rounded-lg hover:border-[#8B1E3F] hover:text-[#8B1E3F] transition-all duration-300 bg-white/50 backdrop-blur-sm w-fit text-center'
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center snap-start snap-always" style={{ fontFamily: 'UbuntuCustom, sans-serif' }}>
      <style>{`
        @font-face {
          font-family: 'UbuntuCustom';
          src: url('${ubuntuRegular}') format('truetype');
          font-weight: 400;
        }
        @font-face {
          font-family: 'UbuntuCustom';
          src: url('${ubuntuBold}') format('truetype');
          font-weight: 700;
        }
      `}</style>
      {/* 1. Static Elegant Background */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: heroVars.bgColor }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply opacity-[0.1]">
        <img
          src={techNetBackdrop}
          alt="Hero Backdrop"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="absolute top-1/2 right-0 z-[1] pointer-events-none flex items-center justify-center"
        style={{
          width: heroVars.vortexSize,
          height: heroVars.vortexSize,
          transform: `translate(${heroVars.vortexPositionX}, calc(-50% + ${heroVars.vortexPositionY}))`
        }}
      >
        {/* The Swirling Graphic wrapped in a pure flex centering element to avoid Tailwind/Framer conflict */}
        <motion.div
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: heroVars.vortexRotationSpeed, repeat: Infinity, ease: 'linear' }}
        >
          <img
            src={logoSymbol}
            alt="Swirling Vortex Core"
            className="w-[82%] h-[82%] object-contain"
            style={{
              opacity: heroVars.vortexOpacity,
              filter: heroVars.vortexFilter,
            }}
          />
        </motion.div>
      </div>

      <div
        className={heroVars.container}
        style={{
          paddingTop: heroVars.containerPaddingTop,
          paddingBottom: heroVars.containerPaddingBottom,
          paddingLeft: heroVars.containerPaddingLeft,
          paddingRight: heroVars.containerPaddingRight,
          marginTop: heroVars.containerMarginTop,
          marginBottom: heroVars.containerMarginBottom,
        }}
      >
        {/* Inner wrapper to restrict width while keeping left-alignment intact */}
        <div
          className={heroVars.textAlign}
          style={{
            maxWidth: heroVars.heroTextWidth,
            transform: `translateX(${heroVars.heroPositionX})`
          }}
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={heroVars.headingBase}
            style={{
              color: heroVars.headingColor,
              fontSize: heroVars.headingFontSize,
              lineHeight: heroVars.headingLineHeight,
              marginBottom: heroVars.headingMarginBottom,
              marginTop: heroVars.headingMarginTop,
            }}
          >
            Engineering <span style={{ color: '#8B1E3F' }}>Cyber Resilience</span> for a <span style={{ color: '#242b3aff' }}>Digital First</span> World
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={heroVars.subheadingBase}
            style={{
              color: heroVars.subheadingColor,
              fontSize: heroVars.subheadingFontSize,
              lineHeight: heroVars.subheadingLineHeight,
              marginBottom: heroVars.subheadingMarginBottom,
              marginTop: heroVars.subheadingMarginTop
            }}
          >
            Empowering your digital transformation to enhance overall cyber well-being. Enterprise-grade security solutions designed for modern businesses.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full"
            style={{
              marginTop: heroVars.buttonsMarginTop,
              marginBottom: heroVars.buttonsMarginBottom,
              paddingTop: heroVars.buttonsPaddingTop,
              paddingBottom: heroVars.buttonsPaddingBottom
            }}
          >
            <Link
              to="/contact"
              className={heroVars.btnPrimary}
            >
              Get Started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className={heroVars.btnSecondary}
            >
              Explore Services
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;