import React from "react";
import {
  Home,
  Search,
  Film,
  Tv,
  Palette,
  Shield,
  MoreHorizontal,
  Play,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useAppContext } from "../lib/app-context";
import { getContinueWatching } from "../lib/movie-data";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const { state } = useAppContext();
  const continueWatching = getContinueWatching();

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "movies", label: "Movies", icon: Film },
    { id: "tv", label: "TV Series", icon: Tv },
    { id: "animation", label: "Animation", icon: Palette },
    { id: "military", label: "Military", icon: Shield },
    { id: "more", label: "More", icon: MoreHorizontal },
  ];

  const userItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-80 h-screen bg-sidebar glass border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
            <Film className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">
              CineTracker
            </h1>
            <p className="text-sm text-sidebar-foreground/60">
              AI Movie Tracker
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 custom-scrollbar overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`sidebar-item w-full ${isActive ? "active" : ""}`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Continue Watching Section */}
        {continueWatching.length > 0 && (
          <div className="pt-6">
            <h3 className="text-sm font-semibold text-sidebar-foreground/80 mb-3 px-4">
              Continue Watching
            </h3>
            <div className="space-y-3">
              {continueWatching.slice(0, 3).map((movie) => (
                <div
                  key={movie.id}
                  className="glass-card p-3 cursor-pointer hover:bg-sidebar-accent/30 transition-all"
                >
                  <div className="flex gap-3">
                    <div className="relative">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-sidebar-foreground truncate">
                        {movie.title}
                      </h4>
                      <p className="text-xs text-sidebar-foreground/60 mb-2">
                        {movie.category.toUpperCase()}
                      </p>
                      {movie.progress && (
                        <div className="w-full bg-sidebar-border/50 rounded-full h-1">
                          <div
                            className="bg-primary h-1 rounded-full transition-all"
                            style={{ width: `${movie.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border/50">
        <div className="space-y-2">
          {userItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`sidebar-item w-full ${isActive ? "active" : ""}`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}

          <div className="glass-card p-3 mt-4">
            <div className="flex items-center gap-3">
              <img
                src={state.user?.avatar}
                alt={state.user?.name}
                className="w-10 h-10 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-sidebar-foreground truncate">
                  {state.user?.name}
                </h4>
                <p className="text-xs text-sidebar-foreground/60">
                  @{state.user?.username}
                </p>
              </div>
              <button className="p-1 hover:bg-sidebar-accent/30 rounded-lg transition-colors">
                <LogOut className="w-4 h-4 text-sidebar-foreground/60" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
