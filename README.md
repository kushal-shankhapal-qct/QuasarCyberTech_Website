# QuasarCyberTech Website — Documentation

Welcome to the QuasarCyberTech codebase. This project is a high-performance, enterprise-grade cybersecurity landing page built with **React**, **TypeScript**, and **Vite**. It features a centralized design system, automated asset management via Cloudinary CDN, and a serverless contact form integration.

---

## 🏗️ Architecture Overview

The project is structured to be highly scalable and data-driven. Instead of hardcoding content into components, almost all visual and textual data is managed through centralized configurations and data files.

### 1. Centralized Design System (`src/config/themeConfig.ts`)
The entire UI is controlled by a single source of truth. By modifying `themeConfig.ts`, you can globally update:
- **Colors & Gradients**: Brand colors (Burgundy, Gold), hero gradients, and section backgrounds.
- **Layout Controls**: Global scaling, section spacing, grid gaps, and card sizing.
- **Typography**: Font family choices (Active options A/B/C), weights, and responsive sizes.
- **Navbar & Footer**: Detailed configuration for the "pill-style" navbar and the dynamic footer.

### 2. Asset Management & Cloudinary CDN (`src/constants/assets.ts`)
We use a centralized asset repository to avoid fragile relative paths and enable easy CDN switching.
- **`ASSETS` Constant**: A nested object containing all project images, logos, and screenshots.
- **Cloudinary Integration**:
    - **Toggle**: `USE_CLOUDINARY = false/true` in `assets.ts` switches the entire site between local files and CDN delivery.
    - **Optimization**: The `cld()` helper (`src/config/cloudinary.ts`) automatically appends `f_auto,q_auto` to URLs for high-performance delivery.
    - **Mapping Script**: `scripts/generateCloudinaryMap.js` scans the filesystem and generates a `cloudinary-map.json` to help keep the CDN in sync with local development.

### 3. Navigation System (`src/components/Navbar.tsx`)
The navbar is a custom-built, highly interactive component:
- **Pill Design**: Floating pill-style menu that transitions to a solid background on scroll.
- **Mega Menus**: The "Capabilities" menu uses a mega-menu layout for structured service discovery.
- **Dynamic Active States**: Automatically highlights the current page and active sub-sections.

---

## 📄 Page Structure & Data Population

The website uses a "Template & Data" pattern to render repetitive pages efficiently.

### Template Pages
- **`CapabilityPage.tsx`**: A generic template for all 6 core capabilities.
- **`IndustryPage.tsx`**: A generic template for specialized industry solutions.
- **Logic**: These pages use `react-router-dom`'s `useParams` to extract a `:slug` from the URL, which is then used to lookup data from the corresponding data files.

### Data Layer (`src/data/`)
- **`capabilitiesData.ts`**: Contains detailed JSON for every service, including scope, delivery approach, and platform links.
- **`industriesData.ts`**: Contains specific use-cases and industry-specific security challenges.
- **`blogsData.ts`**: Manages the insights and resource center content.

---

## 📩 Contact Form & Automation

The contact form in `src/pages/Contact.tsx` is fully functional and serverless:
- **Frontend**: Built with a custom React state-managed form with real-time validation.
- **Backend Integration**: 
    - Submits data via `fetch` to a **Google Apps Script** URL.
    - **Google Sheet**: The script appends every submission to a centralized Google Sheet for lead tracking.
    - **Automated Mailing**: The Apps Script is configured to trigger instant email notifications to the QuasarCyberTech team upon new submissions.

---

## 🚀 Deployment & Hosting

### Vercel Hosting
The project is optimized for **Vercel**:
- **Zero-Config Deployment**: Connect the repository to Vercel and it will automatically detect the Vite build settings.
- **Routing**: A `vercel.json` file handles SPA routing, ensuring that direct links to subpages (e.g., `/capabilities/offensive-security`) resolve correctly.

---

## 🛠️ Developer Guide

### Prerequisites
- Node.js (v18+)
- npm

### Setup
1. Clone the repo.
2. Run `npm install`.
3. Start dev server: `npm run dev`.

### Adding a New Asset
1. Place the file in the appropriate folder under `src/assets/`.
2. Import it at the top of `src/constants/assets.ts`.
3. Register it in the `ASSETS` object using the `getAsset(localImport, 'Path/To/File')` wrapper.

### Toggling CDN
Change `const USE_CLOUDINARY = true;` in `src/constants/assets.ts` to switch to high-speed CDN delivery.
