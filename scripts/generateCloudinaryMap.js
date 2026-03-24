// scripts/generateCloudinaryMap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../src/assets');
const OUTPUT_FILE = path.join(__dirname, '../cloudinary-map.json');

/**
 * Converts a local file path to a Cloudinary-friendly delivery path.
 * (Same logic as in src/constants/assets.ts)
 */
const toCloudinaryPath = (filePath) => {
  return filePath
    .replace(/\s+/g, '_')
    .replace(/&/g, 'and')
    .replace(/\\/g, '/'); // Ensure forward slashes for URLs
};

const scanDir = (dir, baseDir, fileList = []) => {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanDir(filePath, baseDir, fileList);
    } else {
      const relativePath = path.relative(baseDir, filePath);
      fileList.push({
        local: relativePath.replace(/\\/g, '/'),
        cloudinary: toCloudinaryPath(relativePath)
      });
    }
  });
  
  return fileList;
};

try {
  console.log(`Scanning assets in: ${ASSETS_DIR}...`);
  const mapping = scanDir(ASSETS_DIR, ASSETS_DIR);
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mapping, null, 2));
  console.log(`Successfully generated mapping for ${mapping.length} assets.`);
  console.log(`Output saved to: ${OUTPUT_FILE}`);
} catch (error) {
  console.error('Error generating asset map:', error);
}
