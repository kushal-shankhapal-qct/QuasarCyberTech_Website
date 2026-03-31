import React from 'react';
import { Helmet } from 'react-helmet-async';

import { buildTitle, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, absoluteUrl, SITE_NAME, SITE_TWITTER_HANDLE, toAbsoluteAssetUrl } from '@/seo/site';
import { createOrganizationSchema, createWebsiteSchema } from '@/seo/schema';

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  robots?: string;
  jsonLd?: Array<Record<string, unknown>>;
};

const Seo: React.FC<SeoProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  robots = 'index,follow',
  jsonLd = [],
}) => {
  const canonicalUrl = absoluteUrl(path);
  const socialImage = toAbsoluteAssetUrl(image);
  const pageTitle = buildTitle(title);
  const schemaBlocks = [createOrganizationSchema(), createWebsiteSchema(), ...jsonLd];

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph — required for LinkedIn, WhatsApp, Facebook */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_TWITTER_HANDLE} />
      <meta name="twitter:creator" content={SITE_TWITTER_HANDLE} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={pageTitle} />

      {schemaBlocks.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
