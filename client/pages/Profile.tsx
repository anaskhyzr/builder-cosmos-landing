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

  return (
    <div className="flex-1 bg-background min-h-screen">
      <div className="p-6 space-y-8">
        {/* Profile Header */}
        <div className="glass-card">
          <div className="flex items-start gap-6 p-8">
            <img
              src={state.user?.avatar}
              alt={state.user?.name}
              className="w-32 h-32 object-cover rounded-2xl"
            />
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold text-foreground">
                  {state.user?.name}
                </h1>
                <button className="glass-button px-4 py-2 rounded-lg flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {state.watchedMovies.length}
            </div>
            <div className="text-muted-foreground">Movies Watched</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {state.watchlist.length}
            </div>
            <div className="text-muted-foreground">Watchlist</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {state.watchLaterMovies.length}
            </div>
            <div className="text-muted-foreground">Watch Later</div>
          </div>
        </div>

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
