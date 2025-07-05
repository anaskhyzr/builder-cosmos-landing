import React, { useState, useEffect } from "react";
import {
  Calendar,
  Film,
  Clock,
  Star,
  Edit,
  BarChart3,
  TrendingUp,
  Activity,
  Target,
  Award,
  Users,
  Eye,
  Heart,
  Zap,
  Settings,
  Bell,
  Shield,
  Palette,
  Brain,
  User,
  Save,
  Globe,
  Camera,
  Lock,
  Smartphone,
} from "lucide-react";
import { useAppContext } from "../lib/app-context";
import MovieCard from "../components/MovieCard";

interface ProfileAnalytics {
  totalWatchTime: number;
  averageRating: number;
  watchingStreak: number;
  topGenres: { genre: string; count: number; percentage: number }[];
  monthlyActivity: { month: string; watched: number }[];
  moodPatterns: { mood: string; count: number; avgRating: number }[];
  yearStats: {
    totalMovies: number;
    topActor: string;
    topDirector: string;
    mostWatchedGenre: string;
  };
}

const ProfilePage: React.FC = () => {
  const { state } = useAppContext();
  const [analytics, setAnalytics] = useState<ProfileAnalytics | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [profileForm, setProfileForm] = useState({
    name: state.user?.name || "",
    username: state.user?.username || "",
    email: state.user?.email || "",
    bio: state.user?.bio || "",
  });
  const [preferences, setPreferences] = useState({
    theme: "dark",
    language: "en",
    notifications: {
      friendReviews: true,
      newSuggestions: true,
      socialActivity: false,
      weeklyDigest: true,
      movieReleases: true,
      emailNotifications: true,
    },
    privacy: {
      profileVisible: true,
      watchHistoryVisible: true,
      showOnlineStatus: true,
      allowFriendRequests: true,
    },
    ai: {
      suggestionsEnabled: true,
      moodBasedSuggestions: true,
      timeBasedSuggestions: true,
      trendingWeight: 30,
      genreWeight: 70,
    },
  });

  useEffect(() => {
    // Generate analytics data based on user's movie history
    const generateAnalytics = (): ProfileAnalytics => {
      const genres = [
        "Action",
        "Drama",
        "Comedy",
        "Sci-Fi",
        "Romance",
        "Thriller",
      ];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const moods = ["Energetic", "Relaxed", "Thoughtful"];

      return {
        totalWatchTime: Math.floor(Math.random() * 200) + 100,
        averageRating: Number((Math.random() * 2 + 3).toFixed(1)),
        watchingStreak: Math.floor(Math.random() * 30) + 5,
        topGenres: genres
          .map((genre, index) => ({
            genre,
            count: Math.floor(Math.random() * 20) + 5,
            percentage: Math.floor(Math.random() * 25) + 10,
          }))
          .slice(0, 5),
        monthlyActivity: months.map((month) => ({
          month,
          watched: Math.floor(Math.random() * 15) + 3,
        })),
        moodPatterns: moods.map((mood) => ({
          mood,
          count: Math.floor(Math.random() * 20) + 5,
          avgRating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
        })),
        yearStats: {
          totalMovies:
            state.watchedMovies.length + Math.floor(Math.random() * 50) + 30,
          topActor: "Leonardo DiCaprio",
          topDirector: "Christopher Nolan",
          mostWatchedGenre: "Drama",
        },
      };
    };

    setAnalytics(generateAnalytics());
  }, [state.watchedMovies.length]);

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderToggle = (enabled: boolean, onChange: () => void) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
        enabled ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      <div
        className={`absolute w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-0.5"
        } top-0.5`}
      />
    </button>
  );

  const handleSave = () => {
    // Simulate save functionality
    console.log("Settings saved", preferences, profileForm);
  };

  const renderOverview = () => (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center">
          <Film className="w-8 h-8 text-primary mx-auto mb-3" />
          <div className="text-3xl font-bold text-primary mb-2">
            {state.watchedMovies.length}
          </div>
          <div className="text-muted-foreground">Movies Watched</div>
        </div>
        <div className="glass-card p-6 text-center">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-primary mb-2">
            {state.watchlist.length}
          </div>
          <div className="text-muted-foreground">Watchlist</div>
        </div>
        <div className="glass-card p-6 text-center">
          <Clock className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-primary mb-2">
            {analytics?.totalWatchTime || 0}h
          </div>
          <div className="text-muted-foreground">Watch Time</div>
        </div>
        <div className="glass-card p-6 text-center">
          <Zap className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-primary mb-2">
            {analytics?.watchingStreak || 0}
          </div>
          <div className="text-muted-foreground">Day Streak</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          Recent Activity
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.watchedMovies.slice(0, 6).map((movie) => (
            <MovieCard key={movie.id} movie={movie} size="small" />
          ))}
        </div>
      </div>
    </>
  );

  const renderAnalytics = () => (
    <>
      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-foreground mb-1">
            {analytics?.averageRating || 0}
          </div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
        </div>
        <div className="glass-card p-6 text-center bg-gradient-to-br from-green-500/10 to-green-500/5">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-foreground mb-1">
            {analytics?.yearStats.totalMovies || 0}
          </div>
          <div className="text-sm text-muted-foreground">This Year</div>
        </div>
        <div className="glass-card p-6 text-center bg-gradient-to-br from-purple-500/10 to-purple-500/5">
          <Activity className="w-8 h-8 text-purple-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-foreground mb-1">
            {analytics?.topGenres[0]?.genre || "N/A"}
          </div>
          <div className="text-sm text-muted-foreground">Top Genre</div>
        </div>
        <div className="glass-card p-6 text-center bg-gradient-to-br from-orange-500/10 to-orange-500/5">
          <Target className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-foreground mb-1">
            {analytics?.yearStats.topActor.split(" ")[0] || "N/A"}
          </div>
          <div className="text-sm text-muted-foreground">Favorite Actor</div>
        </div>
      </div>

      {/* Genre Distribution */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-primary" />
          Genre Preferences
        </h3>
        <div className="space-y-4">
          {analytics?.topGenres.slice(0, 5).map((genre, index) => (
            <div key={genre.genre} className="flex items-center gap-4">
              <div className="w-8 text-center font-semibold text-muted-foreground">
                #{index + 1}
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-foreground">
                    {genre.genre}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {genre.count} movies • {genre.percentage}%
                  </span>
                </div>
                <div className="w-full bg-glass rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-primary-hover h-2 rounded-full transition-all"
                    style={{ width: `${genre.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Activity Chart */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Activity className="w-5 h-5 text-primary" />
          Monthly Activity
        </h3>
        <div className="flex items-end gap-2 h-32 overflow-x-auto">
          {analytics?.monthlyActivity.map((month) => (
            <div
              key={month.month}
              className="flex flex-col items-center gap-2 min-w-0"
            >
              <div
                className="bg-gradient-to-t from-primary to-primary-hover rounded-t-lg w-8 transition-all hover:opacity-80"
                style={{
                  height: `${(month.watched / 15) * 80}px`,
                  minHeight: "8px",
                }}
                title={`${month.watched} movies watched`}
              />
              <span className="text-xs text-muted-foreground">
                {month.month}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderSettings = () => (
    <>
      {/* Account Settings */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <User className="w-5 h-5 text-primary" />
          Account Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profileForm.name}
              onChange={(e) =>
                setProfileForm({ ...profileForm, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Username
            </label>
            <input
              type="text"
              value={profileForm.username}
              onChange={(e) =>
                setProfileForm({ ...profileForm, username: e.target.value })
              }
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm({ ...profileForm, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bio
            </label>
            <textarea
              value={profileForm.bio}
              onChange={(e) =>
                setProfileForm({ ...profileForm, bio: e.target.value })
              }
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:border-primary resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Bell className="w-5 h-5 text-primary" />
          Notifications
        </h3>
        <div className="space-y-4">
          {Object.entries(preferences.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </div>
                <div className="text-sm text-muted-foreground">
                  Get notified about {key.toLowerCase()}
                </div>
              </div>
              {renderToggle(value, () =>
                setPreferences((prev) => ({
                  ...prev,
                  notifications: {
                    ...prev.notifications,
                    [key]: !value,
                  },
                })),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Shield className="w-5 h-5 text-primary" />
          Privacy & Security
        </h3>
        <div className="space-y-4">
          {Object.entries(preferences.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </div>
                <div className="text-sm text-muted-foreground">
                  Control your {key.toLowerCase()} settings
                </div>
              </div>
              {renderToggle(value, () =>
                setPreferences((prev) => ({
                  ...prev,
                  privacy: {
                    ...prev.privacy,
                    [key]: !value,
                  },
                })),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Settings */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Brain className="w-5 h-5 text-primary" />
          AI Recommendations
        </h3>
        <div className="space-y-6">
          {Object.entries(preferences.ai)
            .filter(
              ([key]) =>
                typeof preferences.ai[key as keyof typeof preferences.ai] ===
                "boolean",
            )
            .map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Enable {key.toLowerCase()} for better recommendations
                  </div>
                </div>
                {renderToggle(value as boolean, () =>
                  setPreferences((prev) => ({
                    ...prev,
                    ai: {
                      ...prev.ai,
                      [key]: !value,
                    },
                  })),
                )}
              </div>
            ))}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Trending Weight: {preferences.ai.trendingWeight}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={preferences.ai.trendingWeight}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    ai: {
                      ...prev.ai,
                      trendingWeight: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Genre Weight: {preferences.ai.genreWeight}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={preferences.ai.genreWeight}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    ai: {
                      ...prev.ai,
                      genreWeight: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </>
  );

  return (
    <div className="flex-1 bg-background min-h-screen">
      <div className="p-6 space-y-8">
        {/* Profile Header */}
        <div className="glass-card">
          <div className="flex items-start gap-6 p-8">
            <div className="relative">
              <img
                src={state.user?.avatar}
                alt={state.user?.name}
                className="w-32 h-32 object-cover rounded-2xl"
              />
              {activeTab === "settings" && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-foreground">
                  {state.user?.name}
                </h1>
                <div className="flex items-center gap-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                          activeTab === tab.id
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-glass/30"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                @{state.user?.username}
              </p>
              <p className="text-foreground mb-6">{state.user?.bio}</p>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Joined{" "}
                    {new Date(state.user?.joinDate || "").toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  <span>{state.watchedMovies.length} movies watched</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{state.watchlist.length} in watchlist</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && renderOverview()}
        {activeTab === "analytics" && renderAnalytics()}
        {activeTab === "settings" && renderSettings()}
      </div>
    </div>
  );
};

export default ProfilePage;
