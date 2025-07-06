import React from "react";
import { Search, Heart, Users, User, Sparkles } from "lucide-react";
import { useAppContext } from "../lib/app-context";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const { state } = useAppContext();

  const navigationItems = [
    { id: "home", icon: Search, tooltip: "Search" },
    { id: "watchlist", icon: Heart, tooltip: "Watchlist" },
    { id: "ai-suggestions", icon: Sparkles, tooltip: "AI Suggestions" },
    { id: "social", icon: Users, tooltip: "Social Hub" },
    { id: "profile", icon: User, tooltip: "Profile" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl">
        <div className="flex items-center justify-between gap-2 px-4 py-2 min-w-[280px]">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 flex-1 ${
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-foreground/40 hover:text-foreground/70 hover:bg-white/5"
                }`}
                title={item.tooltip}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
