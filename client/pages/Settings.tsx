import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Brain,
  Users,
  Eye,
  RefreshCw,
  Heart,
  Star,
  Film,
  Tv,
  Save,
  MoreHorizontal,
} from "lucide-react";
import { useAppContext } from "../lib/app-context";

interface UserPreferences {
  rewatchFrequency: "often" | "rarely" | "never";
  preferredGenres: string[];
  favoriteActors: string[];
  favoriteDirectors: string[];
  notificationSettings: {
    friendReviews: boolean;
    newSuggestions: boolean;
    socialActivity: boolean;
    weeklyDigest: boolean;
  };
  privacySettings: {
    profileVisible: boolean;
    watchHistoryVisible: boolean;
    ratingsVisible: boolean;
  };
  aiSettings: {
    suggestionsEnabled: boolean;
    collaborativeFiltering: boolean;
    trendingWeight: number;
    genreWeight: number;
  };
}

const SettingsPage: React.FC = () => {
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState("preferences");
  const [preferences, setPreferences] = useState<UserPreferences>({
    rewatchFrequency: "rarely",
    preferredGenres: ["Action", "Sci-Fi", "Drama"],
    favoriteActors: ["Leonardo DiCaprio", "Christian Bale"],
    favoriteDirectors: ["Christopher Nolan", "Martin Scorsese"],
    notificationSettings: {
      friendReviews: true,
      newSuggestions: true,
      socialActivity: false,
      weeklyDigest: true,
    },
    privacySettings: {
      profileVisible: true,
      watchHistoryVisible: true,
      ratingsVisible: true,
    },
    aiSettings: {
      suggestionsEnabled: true,
      collaborativeFiltering: true,
      trendingWeight: 30,
      genreWeight: 70,
    },
  });

  const tabs = [
    { id: "preferences", label: "Preferences", icon: Heart },
    { id: "ai", label: "AI Settings", icon: Brain },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "account", label: "Account", icon: User },
  ];

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War",
    "Western",
  ];

  const handleSave = () => {
    // In real app, would save to backend
    console.log("Saving preferences:", preferences);
  };

  const renderPreferencesTab = () => (
    <div className="space-y-8">
      {/* Rewatch Frequency */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <RefreshCw className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Rewatch Preferences
          </h3>
        </div>
        <p className="text-muted-foreground mb-6">
          How often do you like to rewatch movies? This helps our AI decide
          whether to suggest movies you've already seen.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              value: "often",
              label: "Often",
              description: "I love rewatching my favorite movies regularly",
            },
            {
              value: "rarely",
              label: "Rarely",
              description: "I occasionally rewatch special movies",
            },
            {
              value: "never",
              label: "Never",
              description: "I prefer to always watch new content",
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setPreferences({
                  ...preferences,
                  rewatchFrequency: option.value as any,
                })
              }
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                preferences.rewatchFrequency === option.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <h4 className="font-semibold text-foreground mb-2">
                {option.label}
              </h4>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Genres */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Film className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Preferred Genres
          </h3>
        </div>
        <p className="text-muted-foreground mb-6">
          Select your favorite genres to improve recommendations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => {
                const newGenres = preferences.preferredGenres.includes(genre)
                  ? preferences.preferredGenres.filter((g) => g !== genre)
                  : [...preferences.preferredGenres, genre];
                setPreferences({ ...preferences, preferredGenres: newGenres });
              }}
              className={`p-3 rounded-lg text-sm font-medium transition-all ${
                preferences.preferredGenres.includes(genre)
                  ? "bg-primary text-white"
                  : "glass-button"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Favorite People */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              Favorite Actors
            </h3>
          </div>
          <div className="space-y-3">
            {preferences.favoriteActors.map((actor, index) => (
              <div
                key={index}
                className="flex items-center justify-between glass p-3 rounded-lg"
              >
                <span className="text-foreground">{actor}</span>
                <button
                  onClick={() => {
                    const newActors = preferences.favoriteActors.filter(
                      (_, i) => i !== index,
                    );
                    setPreferences({
                      ...preferences,
                      favoriteActors: newActors,
                    });
                  }}
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
            <button className="w-full glass-button p-3 rounded-lg text-muted-foreground hover:text-foreground">
              + Add Actor
            </button>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              Favorite Directors
            </h3>
          </div>
          <div className="space-y-3">
            {preferences.favoriteDirectors.map((director, index) => (
              <div
                key={index}
                className="flex items-center justify-between glass p-3 rounded-lg"
              >
                <span className="text-foreground">{director}</span>
                <button
                  onClick={() => {
                    const newDirectors = preferences.favoriteDirectors.filter(
                      (_, i) => i !== index,
                    );
                    setPreferences({
                      ...preferences,
                      favoriteDirectors: newDirectors,
                    });
                  }}
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
            <button className="w-full glass-button p-3 rounded-lg text-muted-foreground hover:text-foreground">
              + Add Director
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAITab = () => (
    <div className="space-y-8">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            AI Recommendation Settings
          </h3>
        </div>
        <p className="text-muted-foreground mb-6">
          Customize how our AI generates suggestions for you
        </p>

        <div className="space-y-6">
          {/* AI Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Enable AI Suggestions
              </h4>
              <p className="text-sm text-muted-foreground">
                Get personalized movie and TV show recommendations
              </p>
            </div>
            <button
              onClick={() =>
                setPreferences({
                  ...preferences,
                  aiSettings: {
                    ...preferences.aiSettings,
                    suggestionsEnabled:
                      !preferences.aiSettings.suggestionsEnabled,
                  },
                })
              }
              className={`w-12 h-6 rounded-full transition-all ${
                preferences.aiSettings.suggestionsEnabled
                  ? "bg-primary"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.aiSettings.suggestionsEnabled
                    ? "translate-x-6"
                    : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Collaborative Filtering */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Community Recommendations
              </h4>
              <p className="text-sm text-muted-foreground">
                Get suggestions based on users with similar taste
              </p>
            </div>
            <button
              onClick={() =>
                setPreferences({
                  ...preferences,
                  aiSettings: {
                    ...preferences.aiSettings,
                    collaborativeFiltering:
                      !preferences.aiSettings.collaborativeFiltering,
                  },
                })
              }
              className={`w-12 h-6 rounded-full transition-all ${
                preferences.aiSettings.collaborativeFiltering
                  ? "bg-primary"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.aiSettings.collaborativeFiltering
                    ? "translate-x-6"
                    : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Weight Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold text-foreground">
                  Genre Preference Weight
                </h4>
                <span className="text-sm text-muted-foreground">
                  {preferences.aiSettings.genreWeight}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={preferences.aiSettings.genreWeight}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    aiSettings: {
                      ...preferences.aiSettings,
                      genreWeight: parseInt(e.target.value),
                      trendingWeight: 100 - parseInt(e.target.value),
                    },
                  })
                }
                className="w-full h-2 bg-glass rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Personal Taste</span>
                <span>Popular Content</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-background min-h-screen">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Settings
                </h1>
                <p className="text-muted-foreground">
                  Customize your CineTracker experience
                </p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-white"
                      : "glass-button text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "preferences" && renderPreferencesTab()}
          {activeTab === "ai" && renderAITab()}
          {activeTab === "notifications" && (
            <div className="glass-card p-12 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Notification Settings
              </h3>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          )}
          {activeTab === "privacy" && (
            <div className="glass-card p-12 text-center">
              <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Privacy Settings
              </h3>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          )}
          {activeTab === "account" && (
            <div className="glass-card p-12 text-center">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Account Settings
              </h3>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
