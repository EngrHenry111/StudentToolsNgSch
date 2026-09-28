// Site logo mark — a graduation cap in the brand's cyan → purple gradient,
// inside a glassmorphism badge matching the rest of the design system.
// Pure inline SVG (crisp at any size, no image asset/request needed).
const Logo = ({ className = "", size = 34 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="stng-logo-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#00f5ff" />
        <stop offset="1" stopColor="#7b2ff7" />
      </linearGradient>
    </defs>

    {/* glass badge */}
    <rect
      x="1"
      y="1"
      width="34"
      height="34"
      rx="10"
      fill="rgba(255,255,255,0.05)"
      stroke="url(#stng-logo-grad)"
      strokeWidth="1.4"
    />

    {/* graduation cap */}
    <path d="M18 9 L30 14.5 L18 20 L6 14.5 Z" fill="url(#stng-logo-grad)" />
    <path
      d="M11 16.7 V21.4 C11 23.4 14.1 25 18 25 C21.9 25 25 23.4 25 21.4 V16.7 L18 19.8 Z"
      fill="url(#stng-logo-grad)"
      opacity="0.85"
    />
    <line
      x1="30"
      y1="14.5"
      x2="30"
      y2="21"
      stroke="url(#stng-logo-grad)"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <circle cx="30" cy="22.4" r="1.6" fill="url(#stng-logo-grad)" />
  </svg>
);

export default Logo;
