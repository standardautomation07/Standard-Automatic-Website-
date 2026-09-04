/**
 * Renders a JSON-LD block. Payloads are built from local, trusted data in
 * `@/lib/json-ld` — never from user input.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
