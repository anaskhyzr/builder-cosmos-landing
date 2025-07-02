import React from "react";
import {
  Home,
  Heart,
  Users,
  User,
  Settings,
  Sparkles,
  BarChart3,
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
    { id: "ai-suggestions", icon: Sparkles, tooltip: "AI Suggestions" },
    { id: "social", icon: Users, tooltip: "Social Hub" },
    { id: "analytics", icon: BarChart3, tooltip: "Analytics" },
    { id: "profile", icon: User, tooltip: "Profile" },
    { id: "settings", icon: Settings, tooltip: "Settings" },
  ];

  return (
    <div className="w-20 h-screen bg-background-secondary/90 backdrop-blur-xl flex flex-col items-end justify-center space-y-6 pr-2">
      {/* Navigation */}
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              isActive
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-foreground/50 hover:text-foreground hover:bg-glass/30"
            }`}
            title={item.tooltip}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;
