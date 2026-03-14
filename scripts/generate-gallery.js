#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configure paths relative to repo root
const repoRoot = path.resolve(__dirname, '..');
const galleryDir = path.join(repoRoot, 'resources', 'gallery');
const outFile = path.join(repoRoot, 'gallery', 'gallery.json');

// Supported image extensions (case-insensitive)
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];

function isImage(file) {
  return IMAGE_EXTS.includes(path.extname(file).toLowerCase());
}

function createAltText(fileName) {
  const base = path.basename(fileName, path.extname(fileName));
  return base.replace(/[_-]+/g, ' ').trim();
}

(async () => {
  try {
    const files = await fs.promises.readdir(galleryDir);

    // Sort by file creation time (newest first) so the most recently added images appear at the top.
    const images = await Promise.all(
      files
        .filter(isImage)
        .map(async (file) => {
          const fullPath = path.join(galleryDir, file);
          const stats = await fs.promises.stat(fullPath);
          const created = stats.birthtimeMs || stats.ctimeMs;
          return {
            file,
            created,
            src: `../resources/gallery/${encodeURIComponent(file)}`,
            alt: createAltText(file),
          };
        })
    );

    images.sort((a, b) => b.created - a.created);

    const output = images.map(({ src, alt }) => ({ src, alt }));

    await fs.promises.mkdir(path.dirname(outFile), { recursive: true });
    await fs.promises.writeFile(outFile, JSON.stringify(images, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${images.length} images to ${path.relative(repoRoot, outFile)}`);
  } catch (err) {
    console.error('Failed to generate gallery JSON:', err);
    process.exit(1);
  }
})();
