import React from 'react';
import type { RouteRecord } from 'vite-react-ssg';

import RootLayout from './src/layouts/RootLayout';
import { blogsData } from './src/data/blogsData';
import { capabilities } from './src/data/capabilitiesData';
import { industriesData } from './src/data/industriesData';

const lazyPage = <T extends { default: React.ComponentType<any> }>(
  importer: () => Promise<T>,
) => async () => {
  const module = await importer();
  return { Component: module.default };
};

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        lazy: lazyPage(() => import('./src/pages/Home')),
      },
      {
        path: 'about',
        lazy: lazyPage(() => import('./src/pages/About')),
      },
      {
        path: 'platforms',
        lazy: lazyPage(() => import('./src/pages/Platforms')),
      },
      {
        path: 'capabilities',
        lazy: lazyPage(() => import('./src/pages/CapabilitiesOverview')),
      },
      {
        path: 'capabilities/:slug',
        lazy: lazyPage(() => import('./src/pages/capabilities/[slug]')),
        getStaticPaths: () => capabilities.map((capability) => `capabilities/${capability.slug}`),
      },
      {
        path: 'blogs',
        lazy: lazyPage(() => import('./src/pages/blogs/BlogsOverview')),
      },
      {
        path: 'blogs/:slug',
        lazy: lazyPage(() => import('./src/pages/blogs/BlogIndividual')),
        getStaticPaths: () => blogsData.map((post) => `blogs/${post.id}`),
      },
      {
        path: 'case-studies',
        lazy: lazyPage(() => import('./src/pages/resources/CaseStudies')),
      },
      {
        path: 'advisories',
        lazy: lazyPage(() => import('./src/pages/resources/Advisories')),
      },
      {
        path: 'infosec-dictionary',
        lazy: lazyPage(() => import('./src/pages/resources/InfosecDictionary')),
      },
      {
        path: 'security-mindmap',
        lazy: lazyPage(() => import('./src/pages/resources/SecurityMindmap')),
      },
      {
        path: 'industries',
        lazy: lazyPage(() => import('./src/pages/IndustriesOverview')),
      },
      {
        path: 'industries/:slug',
        lazy: lazyPage(() => import('./src/pages/IndustryIndividual')),
        getStaticPaths: () => industriesData.map((industry) => `industries/${industry.slug}`),
      },
      {
        path: 'careers',
        lazy: lazyPage(() => import('./src/pages/Careers')),
      },
      {
        path: 'contact',
        lazy: lazyPage(() => import('./src/pages/Contact')),
      },
      {
        path: 'privacy-policy',
        lazy: lazyPage(() => import('./src/pages/PrivacyPolicy')),
      },
      {
        path: 'terms-conditions',
        lazy: lazyPage(() => import('./src/pages/TermsConditions')),
      },
      {
        path: '404',
        lazy: lazyPage(() => import('./src/pages/NotFound')),
      },
      {
        path: '*',
        lazy: lazyPage(() => import('./src/pages/NotFound')),
      },
    ],
  },
];
