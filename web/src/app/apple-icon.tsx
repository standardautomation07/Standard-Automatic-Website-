import { ImageResponse } from "next/og";

/**
 * Apple touch icon, drawn from the same geometry as the brand mark.
 *
 * Safari will not take an SVG here, so it is rendered to PNG at build time
 * rather than committed as a binary that can drift from the SVG. The badge is
 * inset less than in the SVG because iOS applies its own rounding and padding.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14161C",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 160 160">
          <polygon points="42,80 118,46 118,68 42,102" fill="#2563EB" />
          <polygon points="42,80 118,114 118,92 42,58" fill="#7C9CF6" />
        </svg>
      </div>
    ),
    size,
  );
}
