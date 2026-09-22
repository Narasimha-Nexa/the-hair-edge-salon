/**
 * JSON.stringify for inline <script type="application/ld+json"> tags.
 *
 * Escapes "<" so no value (service name, review text, any future CMS
 * content) can terminate the script element early with "</script>" —
 * the classic JSON-LD script-injection vector. The result stays valid
 * JSON: the escape is the standard \u003c sequence.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
