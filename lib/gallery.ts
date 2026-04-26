import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

/**
 * Returns the public-facing URLs of all images inside `public/<dir>`,
 * sorted alphabetically. If the directory does not exist, returns [].
 */
export function listGalleryImages(dir: string): string[] {
  const fullPath = path.join(process.cwd(), "public", dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs
    .readdirSync(fullPath)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => `/${dir}/${f}`.replace(/\\/g, "/"));
}
