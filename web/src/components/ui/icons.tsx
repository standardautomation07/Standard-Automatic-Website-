/**
 * Line icons, drawn at 24x24 on a 1.6px stroke so they sit at the same
 * optical weight as the type. Deliberately no icon library — there are
 * eight of them and they are all trivial paths.
 */
type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ className = "h-5 w-5", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      {children}
    </svg>
  );
}

export const ArrowRight = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M4 12h15" />
    <path d="M13 6l6 6-6 6" />
  </Svg>
);

export const ArrowUpRight = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </Svg>
);

export const Phone = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 014.5 5.7 2 2 0 016.5 3.5z" />
  </Svg>
);

export const Mail = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="M3.5 6l8.5 6 8.5-6" />
  </Svg>
);

export const WhatsApp = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.8 9.8 0 004.69 1.19h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.77 9.77 0 0012.04 2zm0 1.8c2.15 0 4.17.84 5.69 2.36a7.98 7.98 0 012.36 5.68c0 4.45-3.61 8.05-8.05 8.05a8.1 8.1 0 01-4.1-1.12l-.3-.17-3.05.8.81-2.97-.19-.31a7.98 7.98 0 01-1.22-4.28c0-4.44 3.61-8.04 8.05-8.04zm-3.4 4.13c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.7 2.6 4.14 3.64.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.3-.73-1.78-.19-.46-.39-.4-.53-.4l-.46-.01z" />
  </svg>
);

export const MapPin = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);

export const Search = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4 4" />
  </Svg>
);

export const Close = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);

export const Menu = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const ChevronDown = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M6 9.5l6 6 6-6" />
  </Svg>
);

export const Check = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M4.5 12.5l5 5 10-11" />
  </Svg>
);
