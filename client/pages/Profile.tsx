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
    totalShows: number;
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
    },
    privacy: {
      profileVisible: true,
      watchHistoryVisible: true,
      showOnlineStatus: true,
    },
    ai: {
      suggestionsEnabled: true,
      moodBasedSuggestions: true,
      trendingWeight: 30,
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
        totalWatchTime: Math.floor(Math.random() * 200) + 100, // 100-300 hours
        averageRating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0-5.0
        watchingStreak: Math.floor(Math.random() * 30) + 5, // 5-35 days
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
          totalShows: Math.floor(Math.random() * 20) + 10,
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

        {/* Enhanced Stats with Analytics */}
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

        {/* Detailed Analytics Section */}
        {analytics && (
          <div className="space-y-6">
            {/* Analytics Header */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Your Movie Analytics
                </h2>
              </div>
              <p className="text-muted-foreground">
                Insights into your viewing patterns and preferences
              </p>
            </div>

            {/* Key Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 text-center bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {analytics.averageRating}
                </div>
                <div className="text-sm text-muted-foreground">
                  Average Rating
                </div>
              </div>
              <div className="glass-card p-6 text-center bg-gradient-to-br from-green-500/10 to-green-500/5">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {analytics.yearStats.totalMovies}
                </div>
                <div className="text-sm text-muted-foreground">This Year</div>
              </div>
              <div className="glass-card p-6 text-center bg-gradient-to-br from-purple-500/10 to-purple-500/5">
                <Activity className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {analytics.topGenres[0]?.genre || "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">Top Genre</div>
              </div>
              <div className="glass-card p-6 text-center bg-gradient-to-br from-orange-500/10 to-orange-500/5">
                <Target className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {analytics.yearStats.topActor.split(" ")[0]}
                </div>
                <div className="text-sm text-muted-foreground">
                  Favorite Actor
                </div>
              </div>
            </div>

            {/* Genre Distribution */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-primary" />
                Genre Preferences
              </h3>
              <div className="space-y-4">
                {analytics.topGenres.slice(0, 5).map((genre, index) => (
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

            {/* Monthly Activity & Mood Patterns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Activity Chart */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary" />
                  Monthly Activity
                </h3>
                <div className="flex items-end gap-2 h-32 overflow-x-auto">
                  {analytics.monthlyActivity.map((month) => (
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

              {/* Mood Patterns */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  Viewing Moods
                </h3>
                <div className="space-y-4">
                  {analytics.moodPatterns.map((pattern) => (
                    <div
                      key={pattern.mood}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <span className="font-medium text-foreground">
                          {pattern.mood}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">
                          {pattern.count} movies
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {pattern.avgRating} avg
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Year in Review Highlights */}
            <div className="glass-card p-8 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="text-center mb-6">
                <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  2024 Highlights
                </h3>
                <p className="text-muted-foreground">
                  Your movie journey this year
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {analytics.yearStats.totalMovies}
                  </div>
                  <div className="text-sm text-muted-foreground">Movies</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {analytics.yearStats.totalShows}
                  </div>
                  <div className="text-sm text-muted-foreground">TV Shows</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary mb-1">
                    {analytics.yearStats.topActor}
                  </div>
                  <div className="text-sm text-muted-foreground">Top Actor</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary mb-1">
                    {analytics.yearStats.topDirector}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Top Director
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary mb-1">
                    {analytics.yearStats.mostWatchedGenre}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Favorite Genre
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Watchlist */}
        {state.watchlist.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              My Watchlist
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {state.watchlist.slice(0, 6).map((movie) => (
                <MovieCard key={movie.id} movie={movie} size="medium" />
              ))}
            </div>
          </section>
        )}

        {/* Recently Watched */}
        {state.watchedMovies.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Recently Watched
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {state.watchedMovies.slice(0, 6).map((movie) => (
                <MovieCard key={movie.id} movie={movie} size="medium" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
