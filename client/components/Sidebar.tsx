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
    { id: "watchlist", icon: Heart, tooltip: "Watchlist" },
    { id: "downloads", icon: Download, tooltip: "Downloads" },
    { id: "profile", icon: User, tooltip: "Profile" },
    { id: "settings", icon: Settings, tooltip: "Settings" },
  ];

  return (
    <div className="w-16 h-screen bg-glass/30 backdrop-blur-xl flex flex-col items-center justify-center space-y-8">
      {/* Navigation */}
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isActive
                ? "bg-white/20 text-white shadow-lg"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
            title={item.tooltip}
          >
            <Icon className="w-6 h-6" />
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;
