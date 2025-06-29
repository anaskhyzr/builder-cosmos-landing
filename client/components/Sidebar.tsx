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
    <div className="w-16 h-screen bg-background-secondary/80 backdrop-blur-xl border-r border-glass-border/30 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center group cursor-pointer">
          <Film className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col items-center space-y-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-foreground/60 hover:text-foreground hover:bg-glass/50"
              }`}
              title={item.tooltip}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              />

              {/* Tooltip */}
              <div className="absolute left-16 px-3 py-2 bg-background-tertiary/90 backdrop-blur-sm text-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {item.tooltip}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-background-tertiary/90 rotate-45" />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="flex flex-col items-center space-y-4">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-foreground/60 hover:text-foreground hover:bg-glass/50"
              }`}
              title={item.tooltip}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              />

              {/* Tooltip */}
              <div className="absolute left-16 px-3 py-2 bg-background-tertiary/90 backdrop-blur-sm text-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {item.tooltip}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-background-tertiary/90 rotate-45" />
              </div>
            </button>
          );
        })}

        {/* User Avatar */}
        <div className="mt-4 pt-4 border-t border-glass-border/30">
          <button
            onClick={() => onPageChange("profile")}
            className="group relative w-12 h-12 rounded-xl overflow-hidden transition-all duration-200 hover:scale-105"
            title={state.user?.name}
          >
            <img
              src={state.user?.avatar}
              alt={state.user?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            {/* Tooltip */}
            <div className="absolute left-16 px-3 py-2 bg-background-tertiary/90 backdrop-blur-sm text-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {state.user?.name}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-background-tertiary/90 rotate-45" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
