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
          viewBox="0 0 64 64"
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
            <linearGradient
              id="screenGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient
              id="accentGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Computer Monitor Base */}
          <rect
            x="8"
            y="12"
            width="32"
            height="24"
            rx="3"
            fill="url(#primaryGradient)"
            stroke="#6D28D9"
            strokeWidth="1.5"
          />

          {/* Monitor Screen */}
          <rect
            x="10"
            y="14"
            width="28"
            height="18"
            rx="1.5"
            fill="url(#screenGradient)"
          />

          {/* Film Strip (left side of screen) */}
          <rect x="11" y="15" width="3" height="16" fill="#8B5CF6" rx="0.5" />
          <rect x="11.5" y="16" width="2" height="2" fill="white" rx="0.3" />
          <rect x="11.5" y="19" width="2" height="2" fill="white" rx="0.3" />
          <rect x="11.5" y="22" width="2" height="2" fill="white" rx="0.3" />
          <rect x="11.5" y="25" width="2" height="2" fill="white" rx="0.3" />
          <rect x="11.5" y="28" width="2" height="2" fill="white" rx="0.3" />

          {/* Monitor Stand */}
          <rect
            x="22"
            y="36"
            width="4"
            height="6"
            fill="url(#primaryGradient)"
            rx="1"
          />
          <rect
            x="18"
            y="42"
            width="12"
            height="2"
            fill="url(#primaryGradient)"
            rx="1"
          />

          {/* Checklist Items (right side) */}
          <rect
            x="45"
            y="16"
            width="4"
            height="4"
            rx="1"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="1.5"
          />
          <path
            d="M46.5 18 L47.5 19 L49.5 17"
            stroke="url(#accentGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="51" y="17" width="8" height="1.5" rx="0.75" fill="#CBD5E1" />

          <rect
            x="45"
            y="24"
            width="4"
            height="4"
            rx="1"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="1.5"
          />
          <path
            d="M46.5 26 L47.5 27 L49.5 25"
            stroke="url(#accentGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="51" y="25" width="6" height="1.5" rx="0.75" fill="#CBD5E1" />

          <rect
            x="45"
            y="32"
            width="4"
            height="4"
            rx="1"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="1.5"
          />
          <path
            d="M46.5 34 L47.5 35 L49.5 33"
            stroke="url(#accentGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="51" y="33" width="7" height="1.5" rx="0.75" fill="#CBD5E1" />

          {/* Network Nodes (top right) */}
          <circle
            cx="48"
            cy="8"
            r="3"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="1.5"
          />
          <circle cx="48" cy="8" r="1" fill="#FBBF24" />

          <circle
            cx="56"
            cy="6"
            r="2.5"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="1.5"
          />
          <circle cx="56" cy="6" r="0.8" fill="#FBBF24" />

          <circle
            cx="54"
            cy="12"
            r="2.5"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="1.5"
          />
          <circle cx="54" cy="12" r="0.8" fill="#FBBF24" />

          {/* Connection Lines */}
          <line
            x1="50.5"
            y1="9"
            x2="53.5"
            y2="6.5"
            stroke="#8B5CF6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="50.5"
            y1="9.5"
            x2="52"
            y2="11"
            stroke="#8B5CF6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="48"
            y1="11"
            x2="48"
            y2="16"
            stroke="#8B5CF6"
            strokeWidth="1.5"
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
