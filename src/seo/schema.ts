import { absoluteUrl, SITE_NAME, SITE_URL, toAbsoluteAssetUrl } from './site';

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export const createOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: toAbsoluteAssetUrl(),
  sameAs: [
    'https://www.linkedin.com/company/quasar-cybertech',
    'https://www.instagram.com/quasarcybertech/',
    'https://www.facebook.com/people/Quasar-CyberTech/61565781868474/',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'contactus@quasarcybertech.com',
      telephone: '+91-97306-91190',
      areaServed: 'IN',
      availableLanguage: ['English'],
    },
  ],
});

export const createWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
});

export const createBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const createArticleSchema = ({
  title,
  description,
  path,
  image,
  publishedAt,
  updatedAt,
  author,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  author: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  image: [toAbsoluteAssetUrl(image)],
  mainEntityOfPage: absoluteUrl(path),
  datePublished: publishedAt,
  dateModified: updatedAt || publishedAt,
  author: {
    '@type': 'Organization',
    name: author,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    logo: {
      '@type': 'ImageObject',
      url: toAbsoluteAssetUrl(),
    },
  },
});

export const createServiceSchema = ({
  name,
  description,
  path,
  image,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  image?: string;
  serviceType?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  serviceType: serviceType || name,
  provider: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
  areaServed: 'Global',
  url: absoluteUrl(path),
  image: toAbsoluteAssetUrl(image),
});

export const createFaqSchema = (
  faqs: Array<{ question: string; answer: string }>,
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const createAboutPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `About ${SITE_NAME}`,
  description:
    'QuasarCyberTech is an enterprise cybersecurity consulting and engineering company providing advisory, offensive security, managed defense, cloud security, and risk governance services.',
  url: absoluteUrl('/aboutus'),
  mainEntity: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    foundingDate: '2024',
    description:
      'Enterprise cybersecurity consulting and engineering firm headquartered in Nashik, India with offices in Mumbai, Bengaluru, and Dallas.',
    areaServed: 'Global',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 50,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nashik',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
  },
});

export const createContactPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contact ${SITE_NAME}`,
  description:
    'Contact QuasarCyberTech for enterprise cybersecurity consulting, offensive security testing, managed SOC, cloud security, and compliance services.',
  url: absoluteUrl('/contact'),
  mainEntity: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    email: 'contactus@quasarcybertech.com',
    telephone: '+91-97306-91190',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'contactus@quasarcybertech.com',
        telephone: '+91-97306-91190',
        areaServed: 'Global',
        availableLanguage: ['English'],
      },
    ],
  },
});

export const createSoftwareApplicationSchema = ({
  name,
  description,
  url,
  applicationCategory,
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description,
  url,
  applicationCategory,
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: `Contact ${SITE_NAME} for pricing`,
  },
  provider: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
});

export const createCareersPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `Cybersecurity Careers | ${SITE_NAME}`,
  description:
    'Explore cybersecurity consulting, engineering, SOC, cloud security, and research career opportunities at QuasarCyberTech.',
  url: absoluteUrl('/careers'),
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Careers', item: absoluteUrl('/careers') },
    ],
  },
});
