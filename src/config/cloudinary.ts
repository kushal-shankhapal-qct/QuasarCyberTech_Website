// src/config/cloudinary.ts

/**
 * Cloudinary delivery base URL for the 'dmdpzphcz' cloud.
 */
export const CLOUDINARY_BASE = 'https://res.cloudinary.com/dmdpzphcz/image/upload/';

interface CloudinaryOptions {
  width?: number;
}

/**
 * Generates a full Cloudinary delivery URL with automatic optimization.
 * 
 * @param path The relative path to the asset in Cloudinary.
 * @param options Optional transformations like width.
 * @returns The optimized Cloudinary URL.
 */
export const cld = (path: string, options?: CloudinaryOptions): string => {
  const transformations: string[] = [];
  
  if (options?.width) {
    transformations.push(`w_${options.width}`);
  }
  
  // Always apply automatic format and quality optimization
  transformations.push('f_auto', 'q_auto');
  
  const transformationString = transformations.join(',');
  
  return `${CLOUDINARY_BASE}${transformationString}/${path}`;
};
