import type { SVGProps } from "react";

/*
 * Brand glyphs drawn in the same thin-stroke style as lucide-react
 * (which no longer ships brand icons).
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 18, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <Svg {...props}>
      {/* Speech bubble with a tail at the bottom-left */}
      <path d="M3.6 20.4l1.2-4.1A8.6 8.6 0 1 1 8 19.3z" />
      {/* Handset */}
      <path d="M9.2 8.2c-.3.6-.2 1.6.6 2.9.9 1.4 2.1 2.4 3.5 3 .9.4 1.6.4 2-.1l.5-.7c.2-.3.1-.6-.2-.8l-1.2-.7c-.3-.2-.6-.1-.8.1l-.4.5c-.8-.3-1.9-1.3-2.3-2.2l.5-.4c.2-.2.3-.5.1-.8l-.6-1.2c-.2-.3-.5-.4-.8-.2z" />
    </Svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14.5 3v11.6a3.6 3.6 0 1 1-3.6-3.6" />
      <path d="M14.5 3c.3 2.7 2.2 4.7 5 4.9" />
    </Svg>
  );
}
