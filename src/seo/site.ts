import { ASSETS } from '@/constants/assets';

export const SITE_NAME = 'QuasarCyberTech';
export const SITE_URL = 'https://quasarcybertech.com';
export const SITE_TWITTER_HANDLE = '@QuasarCyberTech';
export const DEFAULT_DESCRIPTION =
  'QuasarCyberTech delivers enterprise cybersecurity consulting, offensive security, managed defense, cloud security, and risk governance services.';
export const DEFAULT_OG_IMAGE = ASSETS.logos.qct.over;
// Hero-style image specifically for social sharing previews (OG/Twitter)
export const DEFAULT_OG_IMAGE_SOCIAL = ASSETS.capabilities.worldwideConnection;

export const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, SITE_URL).toString();
};

export const buildTitle = (title?: string) =>
  title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Enterprise Cybersecurity & Engineering`;

export const toAbsoluteAssetUrl = (assetUrl?: string) => {
  if (!assetUrl) {
    return absoluteUrl(DEFAULT_OG_IMAGE);
  }

  return absoluteUrl(assetUrl);
};
