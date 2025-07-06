import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = "medium",
  showText = true,
  className = "",
}) => {
  const sizeConfig = {
    small: { icon: 32, text: "text-lg" },
    medium: { icon: 48, text: "text-2xl" },
    large: { icon: 64, text: "text-3xl" },
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        <svg
          width={config.icon}
          height={config.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient
              id="primaryGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>

          {/* Main Container/Dashboard */}
          <rect
            x="5"
            y="25"
            width="90"
            height="60"
            rx="8"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
          />

          {/* Computer Monitor */}
          <rect
            x="12"
            y="32"
            width="38"
            height="28"
            rx="4"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
          />

          {/* Monitor Screen */}
          <rect
            x="15"
            y="35"
            width="32"
            height="20"
            rx="2"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
          />

          {/* Film Strip (left side of screen) */}
          <rect x="16" y="36" width="4" height="18" fill="#8B5CF6" rx="1" />
          <rect x="17" y="38" width="2" height="2" fill="white" rx="0.5" />
          <rect x="17" y="41" width="2" height="2" fill="white" rx="0.5" />
          <rect x="17" y="44" width="2" height="2" fill="white" rx="0.5" />
          <rect x="17" y="47" width="2" height="2" fill="white" rx="0.5" />
          <rect x="17" y="50" width="2" height="2" fill="white" rx="0.5" />

          {/* Monitor Stand */}
          <rect
            x="28"
            y="60"
            width="6"
            height="10"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
            rx="2"
          />
          <rect
            x="22"
            y="70"
            width="18"
            height="4"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
            rx="2"
          />

          {/* Checklist Items (right side) */}
          <rect
            x="58"
            y="35"
            width="8"
            height="8"
            rx="2"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
          />
          <path
            d="M60 39 L62 41 L66 37"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <rect x="70" y="38" width="18" height="2" rx="1" fill="#8B5CF6" />

          <rect
            x="58"
            y="47"
            width="8"
            height="8"
            rx="2"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
          />
          <path
            d="M60 51 L62 53 L66 49"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <rect x="70" y="50" width="15" height="2" rx="1" fill="#8B5CF6" />

          <rect
            x="58"
            y="59"
            width="8"
            height="8"
            rx="2"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
          />
          <path
            d="M60 63 L62 65 L66 61"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <rect x="70" y="62" width="16" height="2" rx="1" fill="#8B5CF6" />

          {/* Network Nodes (top right) */}
          <circle
            cx="70"
            cy="15"
            r="6"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
          />
          <circle cx="70" cy="15" r="2.5" fill="#FBBF24" />

          <circle
            cx="85"
            cy="10"
            r="5"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
          />
          <circle cx="85" cy="10" r="2" fill="#FBBF24" />

          <circle
            cx="82"
            cy="22"
            r="5"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
          />
          <circle cx="82" cy="22" r="2" fill="#FBBF24" />

          {/* Connection Lines */}
          <line
            x1="75"
            y1="17"
            x2="80"
            y2="12"
            stroke="#8B5CF6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="75"
            y1="18"
            x2="78"
            y2="20"
            stroke="#8B5CF6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="70"
            y1="21"
            x2="70"
            y2="32"
            stroke="#8B5CF6"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <h1
            className={`${config.text} font-bold text-foreground leading-none`}
          >
            CineTracker
          </h1>
          {size !== "small" && (
            <p className="text-xs text-foreground/60 leading-none mt-1">
              AI Movie Tracker
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
