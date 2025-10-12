export function FoodIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      role="img"
      aria-label="Food icon"
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>
      {/* Plate */}
      <ellipse
        cx="90"
        cy="130"
        rx="70"
        ry="16"
        fill="var(--color-primary)"
        opacity=".18"
        filter="url(#shadow)"
      />
      {/* Burger base */}
      <rect
        x="40"
        y="80"
        width="100"
        height="24"
        rx="12"
        fill="var(--color-primary)"
        opacity=".35"
      />
      {/* Patty */}
      <rect
        x="48"
        y="92"
        width="84"
        height="10"
        rx="5"
        fill="var(--color-primary)"
        opacity=".55"
      />
      {/* Top bun */}
      <path
        d="M50 78c0-20 80-20 80 0v6H50z"
        fill="var(--color-primary)"
        opacity=".6"
      />
      {/* Steam */}
      <path
        d="M72 58c10 10 0 14 8 22M98 54c8 8 0 12 6 18"
        stroke="var(--color-primary)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className="animate-bounce [animation-duration:2s]"
      />
    </svg>
  );
}

export function MerchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      role="img"
      aria-label="Merch icon"
    >
      <path
        d="M60 44c10-10 70-10 80 0l16 14-18 18-12-10v56c0 6-6 12-12 12H86c-6 0-12-6-12-12V66l-12 10-18-18z"
        fill="var(--color-primary)"
        opacity=".55"
      />
      <circle cx="100" cy="84" r="16" fill="white" opacity=".65" />
      <text
        x="100"
        y="90"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="12"
        fill="var(--color-primary)"
      >
        FEST
      </text>
    </svg>
  );
}

export function GameIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      role="img"
      aria-label="Games icon"
    >
      <rect
        x="30"
        y="74"
        width="140"
        height="48"
        rx="24"
        fill="var(--color-primary)"
        opacity=".5"
      />
      <circle cx="70" cy="98" r="10" fill="white" opacity=".85" />
      <rect
        x="66"
        y="90"
        width="8"
        height="16"
        rx="2"
        fill="var(--color-primary)"
      />
      <rect
        x="62"
        y="94"
        width="16"
        height="8"
        rx="2"
        fill="var(--color-primary)"
      />
      <circle cx="130" cy="98" r="8" fill="white" opacity=".85" />
      <circle cx="146" cy="98" r="8" fill="white" opacity=".85" />
    </svg>
  );
}

export function MusicIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      role="img"
      aria-label="Music icon"
    >
      <circle
        cx="60"
        cy="120"
        r="14"
        fill="var(--color-primary)"
        opacity=".65"
      />
      <circle
        cx="120"
        cy="114"
        r="12"
        fill="var(--color-primary)"
        opacity=".45"
      />
      <path
        d="M80 36v64m0-64 56 12v56"
        stroke="var(--color-primary)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="80" cy="100" r="10" fill="var(--color-primary)" />
      <circle cx="136" cy="92" r="9" fill="var(--color-primary)" />
      {/* Sound rings */}
      <g
        stroke="var(--color-primary)"
        strokeWidth="3"
        fill="none"
        opacity=".5"
        className="animate-pulse"
      >
        <path d="M152 74c10 6 10 22 0 28" />
        <path d="M158 70c14 8 14 30 0 38" />
      </g>
    </svg>
  );
}
