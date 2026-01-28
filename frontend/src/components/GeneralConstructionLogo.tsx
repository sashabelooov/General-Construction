interface GeneralConstructionLogoProps {
  className?: string;
  showText?: boolean;
}

export default function GeneralConstructionLogo({
  className = "h-12 w-12",
  showText = true,
}: GeneralConstructionLogoProps) {
  return (
    <div className={className} aria-label="General Construction logo" role="img">
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Building mark */}
        <g
          transform="translate(52 32)"
          fill="#154062"
          stroke="#154062"
          strokeWidth="2"
          strokeLinejoin="round"
        >
          {/* Left tower */}
          <path d="M8 80V34h16v46H8z" />
          {/* Middle tower */}
          <path d="M44 80V18h16v62H44z" />
          {/* Right tower */}
          <path d="M80 80V26h16v54H80z" />
          {/* Roof line */}
          <path d="M6 34L28 14l18 12 20-16 12 10" fill="none" strokeWidth="4" />
        </g>

        {/* Text */}
        {showText && (
          <g
            fill="#154062"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            textAnchor="middle"
          >
            <text
              x="100"
              y="118"
              fontSize="16"
              letterSpacing="6"
              style={{ textTransform: "uppercase" }}
            >
              GENERAL
            </text>
            <text
              x="100"
              y="142"
              fontSize="11"
              letterSpacing="6"
              style={{ textTransform: "uppercase" }}
            >
              CONSTRUCTION
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
