/**
 * Escapes '<' in serialized JSON-LD so a value containing "</script>" can't
 * break out of the script tag - the official Next.js pattern (verified via
 * Context7 against the current docs, 2026-09-02).
 */
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
