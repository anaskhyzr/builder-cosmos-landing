import React from "react";
import {
  Home,
  Search,
  Film,
  Tv,
  Palette,
  Shield,
  Heart,
  User,
  Settings,
  Download,
} from "lucide-react";
import { useAppContext } from "../lib/app-context";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const { state } = useAppContext();

  const navigationItems = [
    { id: "home", icon: Home, tooltip: "Home" },
    { id: "search", icon: Search, tooltip: "Search" },
    { id: "movies", icon: Film, tooltip: "Movies" },
    { id: "tv", icon: Tv, tooltip: "TV Series" },
    { id: "animation", icon: Palette, tooltip: "Animation" },
    { id: "military", icon: Shield, tooltip: "Military" },
    { id: "watchlist", icon: Heart, tooltip: "Watchlist" },
    { id: "downloads", icon: Download, tooltip: "Downloads" },
  ];

  const bottomItems = [
    { id: "profile", icon: User, tooltip: "Profile" },
    { id: "settings", icon: Settings, tooltip: "Settings" },
  ];

  return (
    <div className="w-16 h-screen bg-glass/20 backdrop-blur-xl flex flex-col items-center py-8">
      {/* Main Navigation */}
      <nav className="flex flex-col items-center space-y-6">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`group relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "bg-white/20 text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/10"
              }`}
              title={item.tooltip}
            >
              <Icon className="w-5 h-5" />

              {/* Minimal active indicator */}
              {isActive && (
                <div className="absolute -right-3 w-1 h-6 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Navigation */}
      <div className="flex flex-col items-center space-y-6">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`group relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "bg-white/20 text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/10"
              }`}
              title={item.tooltip}
            >
              <Icon className="w-5 h-5" />

              {/* Minimal active indicator */}
              {isActive && (
                <div className="absolute -right-3 w-1 h-6 bg-white rounded-full" />
              )}
            </button>
          );
        })}

        {/* User Avatar */}
        <button
          onClick={() => onPageChange("profile")}
          className={`group relative w-10 h-10 rounded-lg overflow-hidden transition-all duration-300 ${
            currentPage === "profile"
              ? "ring-2 ring-white/50"
              : "hover:ring-2 hover:ring-white/30"
          }`}
          title={state.user?.name}
        >
          <img
            src={state.user?.avatar}
            alt={state.user?.name}
            className="w-full h-full object-cover"
          />
          {currentPage === "profile" && (
            <div className="absolute -right-3 w-1 h-6 bg-white rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
