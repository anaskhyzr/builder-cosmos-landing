import React, { useState } from "react";
import {
  Heart,
  Eye,
  Star,
  Share2,
  Send,
  Users,
  Clock,
  Calendar,
  Filter,
  SortAsc,
  MoreHorizontal,
  Play,
  X,
  Check,
} from "lucide-react";
import { useAppContext, useToast } from "../lib/app-context";
import { Movie } from "../lib/movie-data";
import MovieCard from "../components/MovieCard";

interface RatedMovie extends Movie {
  userRating: number;
  ratedDate: string;
  review?: string;
}

const WatchlistPage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("watchlist");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedMovies, setSelectedMovies] = useState<Set<number>>(new Set());
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock rated movies data (in real app, this would come from context/API)
  const ratedMovies: RatedMovie[] = [
    {
      id: 1,
      title: "The Dark Knight",
      year: 2008,
      rating: 9.0,
      genre: "Action, Crime, Drama",
      poster:
        "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
      description: "Batman faces the Joker in this epic crime thriller.",
      category: "movie",
      userRating: 5,
      ratedDate: "2024-01-15",
      review: "Absolutely incredible! Heath Ledger's performance is legendary.",
    },
    {
      id: 2,
      title: "Inception",
      year: 2010,
      rating: 8.8,
      genre: "Action, Sci-Fi, Thriller",
      poster:
        "https://images.unsplash.com/photo-1489599558132-3b4b0b7c11c2?w=300&h=450&fit=crop",
      description: "A thief enters dreams to plant ideas.",
      category: "movie",
      userRating: 4,
      ratedDate: "2024-01-20",
      review: "Mind-bending and visually stunning!",
    },
  ];

  // Mock friends for sharing
  const friends = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Mike Johnson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const tabs = [
    {
      id: "watchlist",
      label: "Watchlist",
      icon: Heart,
      count: state.watchlist.length,
    },
    {
      id: "watched",
      label: "Watched",
      icon: Eye,
      count: state.watchedMovies.length,
    },
    {
      id: "rated",
      label: "Rated",
      icon: Star,
      count: ratedMovies.length,
    },
  ];

  const sortOptions = [
    { id: "recent", label: "Recently Added" },
    { id: "title", label: "Title A-Z" },
    { id: "year", label: "Year" },
    { id: "rating", label: "Rating" },
  ];

  const handleMovieSelect = (movieId: number) => {
    const newSelected = new Set(selectedMovies);
    if (newSelected.has(movieId)) {
      newSelected.delete(movieId);
    } else {
      newSelected.add(movieId);
    }
    setSelectedMovies(newSelected);
  };

  const handleBulkShare = () => {
    if (selectedMovies.size === 0) {
      showToast("Please select movies to share", "info");
      return;
    }
    setShowShareModal(true);
  };

  const handleShareToFriend = (friendId: number) => {
    const friendName = friends.find((f) => f.id === friendId)?.name;
    showToast(
      `Shared ${selectedMovies.size} movies with ${friendName}!`,
      "success",
    );
    setSelectedMovies(new Set());
    setShowShareModal(false);
  };

  const renderWatchlistTab = () => (
    <div className="space-y-6">
      {state.watchlist.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Your watchlist is empty
          </h3>
          <p className="text-muted-foreground">
            Add movies you want to watch to your watchlist
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {state.watchlist.map((movie) => (
            <div key={movie.id} className="relative">
              <MovieCard movie={movie} size="medium" />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_WATCHLIST",
                      payload: movie.id,
                    })
                  }
                  className="w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderWatchedTab = () => (
    <div className="space-y-6">
      {/* Bulk Actions */}
      {selectedMovies.size > 0 && (
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-foreground">
              {selectedMovies.size} movies selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleBulkShare}
                className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share with Friends
              </button>
              <button
                onClick={() => setSelectedMovies(new Set())}
                className="glass-button px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {state.watchedMovies.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No watched movies yet
          </h3>
          <p className="text-muted-foreground">
            Mark movies as watched to build your viewing history
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {state.watchedMovies.map((movie) => (
            <div key={movie.id} className="relative">
              <div
                className={`cursor-pointer transition-all ${
                  selectedMovies.has(movie.id)
                    ? "ring-2 ring-primary rounded-xl"
                    : ""
                }`}
                onClick={() => handleMovieSelect(movie.id)}
              >
                <MovieCard movie={movie} size="medium" showActions={false} />
              </div>

              {/* Selection indicator */}
              <div className="absolute top-2 left-2">
                <div
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedMovies.has(movie.id)
                      ? "bg-primary border-primary"
                      : "border-white/50 bg-black/50"
                  }`}
                >
                  {selectedMovies.has(movie.id) && (
                    <Check className="w-4 h-4 text-white m-0.5" />
                  )}
                </div>
              </div>

              {/* Quick share button */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMovies(new Set([movie.id]));
                    setShowShareModal(true);
                  }}
                  className="w-8 h-8 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center transition-all"
                >
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderRatedTab = () => (
    <div className="space-y-6">
      {ratedMovies.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No rated movies yet
          </h3>
          <p className="text-muted-foreground">
            Rate movies to track your favorites and recommendations
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {ratedMovies.map((movie) => (
            <div key={movie.id} className="glass-card p-6">
              <div className="flex gap-6">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-24 h-36 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.genre.split(",")[0]}</span>
                      </div>
                    </div>
                    <button className="glass-button p-2 rounded-lg">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      Your Rating:
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= movie.userRating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Rated on {new Date(movie.ratedDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Review */}
                  {movie.review && (
                    <div className="bg-accent/30 rounded-lg p-3">
                      <p className="text-foreground text-sm leading-relaxed">
                        "{movie.review}"
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button className="glass-button px-4 py-2 rounded-lg flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Watch Again
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMovies(new Set([movie.id]));
                        setShowShareModal(true);
                      }}
                      className="glass-button px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Recommend
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 bg-background min-h-screen">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                My Collection
              </h1>
              <p className="text-muted-foreground">
                Manage your watchlist, track watched movies, and share
                recommendations
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="glass-button px-4 py-2 rounded-lg bg-input border border-border"
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                    className="bg-background"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <button className="glass-button p-3 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "glass-button text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "watchlist" && renderWatchlistTab()}
          {activeTab === "watched" && renderWatchedTab()}
          {activeTab === "rated" && renderRatedTab()}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="glass-card max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  Share with Friends
                </h2>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-muted-foreground mb-6">
                Share {selectedMovies.size} movie
                {selectedMovies.size > 1 ? "s" : ""} with your friends
              </p>

              <div className="space-y-3">
                {friends.map((friend) => (
                  <button
                    key={friend.id}
                    onClick={() => handleShareToFriend(friend.id)}
                    className="w-full glass-card p-4 hover:bg-card-hover transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {friend.name}
                        </h3>
                      </div>
                      <Send className="w-4 h-4 text-primary" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-full glass-button py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
