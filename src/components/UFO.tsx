export default function UFO({ beaming = false }: { beaming?: boolean }) {
  return (
    <svg width="120" height="60" viewBox="0 0 120 60" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="ufo-dome" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="60%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#155e75" />
        </radialGradient>
        <linearGradient id="ufo-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <radialGradient id="ufo-light" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fbbf24" />
        </radialGradient>
        <linearGradient id="ufo-beam" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#fde047" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fef9c3" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Glow under saucer */}
      <ellipse cx="60" cy="48" rx="42" ry="6" fill="#fbbf24" opacity="0.15" />
      {/* Saucer body - disc */}
      <ellipse cx="60" cy="38" rx="50" ry="12" fill="url(#ufo-body)" />
      {/* Mid ridge */}
      <ellipse cx="60" cy="34" rx="48" ry="8" fill="#cbd5e1" />
      {/* Dome */}
      <path d="M 30 34 Q 60 8 90 34 Z" fill="url(#ufo-dome)" />
      {/* Dome highlight */}
      <path d="M 40 30 Q 52 16 66 20" fill="none" stroke="#cffafe" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
      {/* Bottom lights */}
      <circle cx="30" cy="44" r="3" fill="url(#ufo-light)">
        <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="45" cy="46" r="3" fill="url(#ufo-light)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="47" r="3" fill="url(#ufo-light)">
        <animate attributeName="opacity" values="1;0.3;1" dur="0.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="75" cy="46" r="3" fill="url(#ufo-light)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="0.7s" repeatCount="indefinite" />
      </circle>
      <circle cx="90" cy="44" r="3" fill="url(#ufo-light)">
        <animate attributeName="opacity" values="1;0.3;1" dur="0.9s" repeatCount="indefinite" />
      </circle>
      {/* Faint idle beam */}
      <path d="M 45 47 L 35 58 L 85 58 L 75 47 Z" fill="#fbbf24" opacity="0.12">
        <animate attributeName="opacity" values="0.08;0.2;0.08" dur="2s" repeatCount="indefinite" />
      </path>
      {/* Active beam when clicked */}
      {beaming && (
        <g style={{ animation: 'ufo-beam-pulse 0.15s ease-out' }}>
          <path d="M 40 47 L 20 120 L 100 120 L 80 47 Z" fill="url(#ufo-beam)" />
          <path d="M 48 47 L 35 120 L 85 120 L 72 47 Z" fill="#fde047" opacity="0.3" />
          {/* Swirling particles */}
          <circle cx="60" cy="70" r="2" fill="#fef9c3" opacity="0.8">
            <animate attributeName="cy" values="50;115" dur="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0" dur="0.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="80" r="1.5" fill="#fbbf24" opacity="0.7">
            <animate attributeName="cy" values="50;115" dur="1s" repeatCount="indefinite" begin="0.2s" />
            <animate attributeName="opacity" values="0.7;0" dur="1s" repeatCount="indefinite" begin="0.2s" />
          </circle>
          <circle cx="70" cy="90" r="2" fill="#fef9c3" opacity="0.8">
            <animate attributeName="cy" values="50;115" dur="0.9s" repeatCount="indefinite" begin="0.4s" />
            <animate attributeName="opacity" values="0.8;0" dur="0.9s" repeatCount="indefinite" begin="0.4s" />
          </circle>
        </g>
      )}
    </svg>
  );
}
