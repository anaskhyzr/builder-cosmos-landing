import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Calendar,
  Users,
  Star,
  Target,
  Award,
  Activity,
  Zap,
  Heart,
  Eye,
  Film,
  Tv,
} from "lucide-react";
import { useAppContext } from "../lib/app-context";

interface MovieStats {
  totalWatched: number;
  totalHours: number;
  averageRating: number;
  topGenres: { genre: string; count: number; percentage: number }[];
  watchingStreak: number;
  monthlyActivity: { month: string; watched: number; hours: number }[];
  moodPatterns: {
    mood: string;
    preferredGenres: string[];
    avgRating: number;
    count: number;
  }[];
  friendCompatibility: {
    friendName: string;
    compatibility: number;
    sharedMovies: number;
  }[];
  predictionAccuracy: number;
  yearInReview: {
    totalMovies: number;
    totalShows: number;
    totalHours: number;
    topGenre: string;
    favoriteMonth: string;
    longestStreak: number;
  };
}

const AnalyticsPage: React.FC = () => {
  const { state } = useAppContext();
  const [timeRange, setTimeRange] = useState("year");
  const [stats, setStats] = useState<MovieStats | null>(null);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Generate mock analytics data
  useEffect(() => {
    const generateStats = (): MovieStats => {
      const genres = ["Action", "Drama", "Comedy", "Sci-Fi", "Romance"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      return {
        totalWatched: state.watchedMovies.length + 47,
        totalHours: 156,
        averageRating: 4.2,
        topGenres: genres.map((genre, index) => ({
          genre,
          count: Math.floor(Math.random() * 20) + 5,
          percentage: Math.floor(Math.random() * 30) + 10,
        })),
        watchingStreak: 12,
        monthlyActivity: months.map((month) => ({
          month,
          watched: Math.floor(Math.random() * 15) + 3,
          hours: Math.floor(Math.random() * 30) + 10,
        })),
        moodPatterns: [
          {
            mood: "Energetic",
            preferredGenres: ["Action", "Adventure"],
            avgRating: 4.5,
            count: 15,
          },
          {
            mood: "Relaxed",
            preferredGenres: ["Comedy", "Romance"],
            avgRating: 4.1,
            count: 22,
          },
          {
            mood: "Thoughtful",
            preferredGenres: ["Drama", "Documentary"],
            avgRating: 4.7,
            count: 18,
          },
        ],
        friendCompatibility: [
          { friendName: "Sarah Chen", compatibility: 87, sharedMovies: 23 },
          { friendName: "Mike Johnson", compatibility: 72, sharedMovies: 18 },
          { friendName: "Emma Davis", compatibility: 94, sharedMovies: 31 },
        ],
        predictionAccuracy: 78,
        yearInReview: {
          totalMovies: 89,
          totalShows: 23,
          totalHours: 287,
          topGenre: "Drama",
          favoriteMonth: "November",
          longestStreak: 18,
        },
      };
    };

    setStats(generateStats());
  }, [state.watchedMovies.length, timeRange]);

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "patterns", label: "Patterns", icon: Activity },
    { id: "social", label: "Social", icon: Users },
    { id: "predictions", label: "AI Insights", icon: Target },
    { id: "year-review", label: "Year in Review", icon: Award },
  ];

  if (!stats) {
    return (
      <div className="flex-1 bg-background min-h-screen p-6">
        <div className="glass-card p-12 text-center">
          <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Analyzing your movie data...</p>
        </div>
      </div>
    );
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center">
          <Film className="w-8 h-8 text-primary mx-auto mb-3" />
          <div className="text-3xl font-bold text-foreground mb-1">
            {stats.totalWatched}
          </div>
          <div className="text-sm text-muted-foreground">Movies Watched</div>
        </div>
        <div className="glass-card p-6 text-center">
          <Clock className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-foreground mb-1">
            {stats.totalHours}h
          </div>
          <div className="text-sm text-muted-foreground">Total Watch Time</div>
        </div>
        <div className="glass-card p-6 text-center">
          <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-foreground mb-1">
            {stats.averageRating}
          </div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
        </div>
        <div className="glass-card p-6 text-center">
          <Zap className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-foreground mb-1">
            {stats.watchingStreak}
          </div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </div>
      </div>

      {/* Top Genres */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          Top Genres
        </h3>
        <div className="space-y-4">
          {stats.topGenres.map((genre, index) => (
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
                    className="bg-primary h-2 rounded-full transition-all"
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
        <h3 className="text-xl font-semibold text-foreground mb-6">
          Monthly Activity
        </h3>
        <div className="flex items-end gap-2 h-48 overflow-x-auto">
          {stats.monthlyActivity.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="bg-primary rounded-t-lg w-8 min-h-4 transition-all hover:bg-primary-hover"
                style={{
                  height: `${(month.watched / 15) * 120}px`,
                  minHeight: "16px",
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
    </div>
  );

  const renderPatternsTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          Mood-Based Viewing Patterns
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.moodPatterns.map((pattern) => (
            <div
              key={pattern.mood}
              className="glass bg-accent/30 p-6 rounded-xl"
            >
              <h4 className="font-semibold text-foreground mb-3">
                {pattern.mood} Mood
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Movies Watched
                  </span>
                  <span className="font-medium text-foreground">
                    {pattern.count}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Avg Rating
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium text-foreground">
                      {pattern.avgRating}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-2">
                    Preferred Genres
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {pattern.preferredGenres.map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-lg"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSocialTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          Friend Compatibility Scores
        </h3>
        <div className="space-y-4">
          {stats.friendCompatibility.map((friend) => (
            <div
              key={friend.friendName}
              className="flex items-center justify-between glass p-4 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {friend.friendName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {friend.sharedMovies} shared movies
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {friend.compatibility}%
                </div>
                <div className="text-xs text-muted-foreground">Compatible</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPredictionsTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          AI Prediction Accuracy
        </h3>
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-primary mb-2">
            {stats.predictionAccuracy}%
          </div>
          <p className="text-muted-foreground">
            Our AI successfully predicted your movie preferences
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass bg-green-500/10 p-6 rounded-xl">
            <h4 className="font-semibold text-foreground mb-3">
              Successful Predictions
            </h4>
            <div className="text-3xl font-bold text-green-500 mb-2">34</div>
            <p className="text-sm text-muted-foreground">
              Movies you loved that we recommended
            </p>
          </div>
          <div className="glass bg-orange-500/10 p-6 rounded-xl">
            <h4 className="font-semibold text-foreground mb-3">
              Learning Opportunities
            </h4>
            <div className="text-3xl font-bold text-orange-500 mb-2">9</div>
            <p className="text-sm text-muted-foreground">
              Helping us improve future suggestions
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderYearReviewTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-8 text-center bg-gradient-to-br from-primary/10 to-primary/5">
        <Award className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Your 2024 in Movies
        </h2>
        <p className="text-muted-foreground mb-8">
          Here's how your movie journey unfolded this year
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {stats.yearInReview.totalMovies}
            </div>
            <div className="text-sm text-muted-foreground">Movies</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {stats.yearInReview.totalShows}
            </div>
            <div className="text-sm text-muted-foreground">TV Shows</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {stats.yearInReview.totalHours}h
            </div>
            <div className="text-sm text-muted-foreground">Total Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {stats.yearInReview.topGenre}
            </div>
            <div className="text-sm text-muted-foreground">Top Genre</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {stats.yearInReview.favoriteMonth}
            </div>
            <div className="text-sm text-muted-foreground">Most Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              {stats.yearInReview.longestStreak}
            </div>
            <div className="text-sm text-muted-foreground">Longest Streak</div>
          </div>
        </div>

        <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-medium transition-all">
          Share Your Year in Review
        </button>
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
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Analytics Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Insights into your movie watching patterns and preferences
                </p>
              </div>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="glass-button px-4 py-2 rounded-lg bg-input border border-border"
            >
              <option value="week" className="bg-background">
                This Week
              </option>
              <option value="month" className="bg-background">
                This Month
              </option>
              <option value="year" className="bg-background">
                This Year
              </option>
              <option value="all" className="bg-background">
                All Time
              </option>
            </select>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
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
          {selectedTab === "overview" && renderOverviewTab()}
          {selectedTab === "patterns" && renderPatternsTab()}
          {selectedTab === "social" && renderSocialTab()}
          {selectedTab === "predictions" && renderPredictionsTab()}
          {selectedTab === "year-review" && renderYearReviewTab()}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
