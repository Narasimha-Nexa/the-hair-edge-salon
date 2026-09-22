/**
 * Single consistent icon system (24×24 stroke icons, currentColor).
 * Replaces the emoji set previously used in hero trust badges and
 * service-category chips so the interface reads as one bespoke design.
 * All icons are decorative — aria-hidden by default; labels live in text.
 */

type IconProps = { className?: string };

function base(className = "w-6 h-6") {
  return {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };
}

export function IconStar({ className }: IconProps) {
  return (
    <svg {...base(className)} strokeWidth={1.75}>
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95z" />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

export function IconCalendar({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  );
}

export function IconPin({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function IconScissors({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
    </svg>
  );
}

export function IconRazor({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M17 3l4 4-9.5 9.5-4-4z" />
      <path d="M3 21l5.5-5.5" />
      <path d="M14.5 5.5l4 4" />
    </svg>
  );
}

export function IconSparkle({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
    </svg>
  );
}

export function IconDroplet({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z" />
      <path d="M9.5 14.5a2.5 2.5 0 002.5 2.5" />
    </svg>
  );
}

export function IconLeaf({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z" />
      <path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12" />
    </svg>
  );
}

export function IconWaves({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1" />
    </svg>
  );
}

export function IconPolish({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M9 3h6v4l2 3v11H7V10l2-3z" />
      <path d="M9 7h6M7 13h10" />
    </svg>
  );
}

export function IconNeedle({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M20.5 3.5L9.5 14.5" />
      <circle cx="20.5" cy="3.5" r="1.75" />
      <path d="M3 21c2-2 4-2 6 0s4 2 6 0" />
    </svg>
  );
}

export function IconFlask({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 001.7 3h10.6A2 2 0 0019 18l-5-9V3" />
      <path d="M7.5 15h9" />
    </svg>
  );
}

export function IconLipstick({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="8" y="9.5" width="8" height="11.5" rx="1.25" />
      <path d="M10 9.5V5a2 2 0 014 0v4.5" />
      <path d="M8 13.5h8" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<string, (p: IconProps) => JSX.Element> = {
  "hair-styling": IconScissors,
  "beard-grooming": IconRazor,
  waxing: IconSparkle,
  "hair-care": IconDroplet,
  "face-care": IconLeaf,
  massage: IconWaves,
  "manicure-pedicure": IconPolish,
  threading: IconNeedle,
  "hair-treatment": IconFlask,
  makeup: IconLipstick,
};

/** Category icon by id (fallback: sparkle), decorative by default. */
export function CategoryIcon({
  id,
  className = "w-6 h-6",
}: {
  id: string;
  className?: string;
}) {
  const Render = CATEGORY_ICONS[id] || IconSparkle;
  return <Render className={className} />;
}
