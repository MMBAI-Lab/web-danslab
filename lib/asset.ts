/**
 * Prepend the configured basePath to a public-asset URL.
 *
 * next/image / next/link automatically respect basePath at runtime — but
 * with `images.unoptimized: true` (required for static export), <Image>
 * uses the src as-is and does NOT prefix it. Same for raw <img> or <a>
 * tags pointing at /public/* paths.
 *
 * Use `asset("/figures/foo.jpg")` for any URL that points at a file under
 * public/.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  if (!path) return path;
  if (!path.startsWith("/")) return path; // already absolute (http) or relative
  if (BASE && path.startsWith(BASE + "/")) return path; // already prefixed
  return `${BASE}${path}`;
}
