import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Users,
  Star,
  RefreshCw,
  Brain,
  Heart,
  Plus,
  Check,
  User,
} from "lucide-react";
import { useAppContext } from "../lib/app-context";
import { Movie, sampleMovies } from "../lib/movie-data";
import MovieCard from "../components/MovieCard";

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  favoriteGenres: string[];
  averageRating: number;
  watchedCount: number;
}

interface Suggestion {
  movie: Movie;
  reason: string;
  confidence: number;
  combinedScore: number;
  friendInfluences: string[];
}

const AISuggestionsPage: React.FC = () => {
  const { state } = useAppContext();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [showFriendSelector, setShowFriendSelector] = useState(false);

  // Mock friends data with movie preferences
  const friends: Friend[] = [
    {
      id: "1",
      name: "Sarah Chen",
      username: "sarahc_movies",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      favoriteGenres: ["Drama", "Romance", "Indie"],
      averageRating: 4.2,
      watchedCount: 156,
    },
    {
      id: "2",
      name: "Mike Johnson",
      username: "mikej_cinema",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      favoriteGenres: ["Action", "Sci-Fi", "Thriller"],
      averageRating: 3.8,
      watchedCount: 203,
    },
    {
      id: "3",
      name: "Emma Davis",
      username: "emmad_films",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      favoriteGenres: ["Comedy", "Animation", "Family"],
      averageRating: 4.0,
      watchedCount: 128,
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      username: "alexr_moviebuff",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-c3f69c80808e?w=100&h=100&fit=crop&crop=face",
      favoriteGenres: ["Horror", "Mystery", "Crime"],
      averageRating: 3.9,
      watchedCount: 189,
    },
  ];

  const generateSuggestions = () => {
    const watchedIds = state.watchedMovies.map((m) => m.id);
    const watchlistIds = state.watchlist.map((m) => m.id);
    const excludeIds = [...watchedIds, ...watchlistIds];

    const availableMovies = sampleMovies.filter(
      (movie) => !excludeIds.includes(movie.id),
    );

    const selectedFriendsData = friends.filter((f) =>
      selectedFriends.includes(f.id),
    );

    const suggestions: Suggestion[] = availableMovies
      .slice(0, 6)
      .map((movie) => {
        let reason = `Based on your watching history, this ${movie.genre.toLowerCase()} movie matches your preferences.`;
        let combinedScore = movie.rating * 10;
        let friendInfluences: string[] = [];

        if (selectedFriendsData.length > 0) {
          const matchingFriends = selectedFriendsData.filter((friend) =>
            friend.favoriteGenres.some((genre) =>
              movie.genre.toLowerCase().includes(genre.toLowerCase()),
            ),
          );

          if (matchingFriends.length > 0) {
            friendInfluences = matchingFriends.map((f) => f.name);
            combinedScore += matchingFriends.length * 5;
            reason = `${matchingFriends.map((f) => f.name).join(" and ")} ${
              matchingFriends.length > 1 ? "love" : "loves"
            } ${movie.genre.toLowerCase()} movies like this. Combined with your taste, this is a perfect match!`;
          }
        }

        return {
          movie,
          reason,
          confidence: Math.min(
            95,
            Math.max(65, combinedScore + Math.random() * 20),
          ),
          combinedScore,
          friendInfluences,
        };
      });

    return suggestions.sort((a, b) => b.combinedScore - a.combinedScore);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuggestions(generateSuggestions());
      setIsGenerating(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [state.watchedMovies, selectedFriends]);

  const handleFriendToggle = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId],
    );
  };

  const refreshSuggestions = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setSuggestions(generateSuggestions());
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="flex-1 bg-background min-h-screen">
      <div className="p-6 space-y-6">
        {/* Simplified Header */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  AI Movie Suggestions
                </h1>
                <p className="text-muted-foreground">
                  Personalized recommendations powered by AI
                </p>
              </div>
            </div>
            <button
              onClick={refreshSuggestions}
              disabled={isGenerating}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-5 h-5 ${isGenerating ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>

          {/* Friends Taste Combination */}
          <div className="border-t border-border/30 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Combine Friends' Taste
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add friends' preferences to get better recommendations
                </p>
              </div>
              <button
                onClick={() => setShowFriendSelector(!showFriendSelector)}
                className="glass-button px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {selectedFriends.length > 0
                  ? `${selectedFriends.length} Friends Selected`
                  : "Add Friends"}
              </button>
            </div>

            {/* Selected Friends Display */}
            {selectedFriends.length > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-foreground">
                  Combined taste with:
                </span>
                <div className="flex gap-2">
                  {selectedFriends.map((friendId) => {
                    const friend = friends.find((f) => f.id === friendId);
                    return friend ? (
                      <div
                        key={friendId}
                        className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-5 h-5 rounded-full"
                        />
                        {friend.name}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Friend Selector */}
            {showFriendSelector && (
              <div className="glass bg-background-secondary/50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {friends.map((friend) => {
                    const isSelected = selectedFriends.includes(friend.id);
                    return (
                      <button
                        key={friend.id}
                        onClick={() => handleFriendToggle(friend.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                          isSelected
                            ? "bg-primary/20 border border-primary/30"
                            : "hover:bg-glass/30"
                        }`}
                      >
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-foreground">
                              {friend.name}
                            </h4>
                            {isSelected && (
                              <Check className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Loves: {friend.favoriteGenres.join(", ")}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {friend.watchedCount} movies watched
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Suggestions */}
        {isGenerating ? (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Generating suggestions...
            </h3>
            <p className="text-muted-foreground">
              {selectedFriends.length > 0
                ? "Combining your taste with your friends' preferences"
                : "Analyzing your movie preferences"}
            </p>
          </div>
        ) : suggestions.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No suggestions available
            </h3>
            <p className="text-muted-foreground">
              Watch more movies to get better recommendations
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((suggestion, index) => (
              <div key={suggestion.movie.id} className="glass-card p-6">
                <div className="mb-4">
                  <MovieCard movie={suggestion.movie} size="medium" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {suggestion.movie.title}
                  </h3>

                  {/* AI Reason */}
                  <div className="bg-primary/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        AI Recommendation
                      </span>
                      <div className="ml-auto flex items-center gap-1">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-primary h-1.5 rounded-full"
                            style={{
                              width: `${suggestion.confidence}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {Math.round(suggestion.confidence)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-foreground">
                      {suggestion.reason}
                    </p>
                  </div>

                  {/* Friend Influences */}
                  {suggestion.friendInfluences.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-muted-foreground">
                        Influenced by {suggestion.friendInfluences.join(", ")}
                      </span>
                    </div>
                  )}

                  {/* Movie Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{suggestion.movie.rating}</span>
                    </div>
                    <span>{suggestion.movie.year}</span>
                    <span className="text-xs bg-accent px-2 py-1 rounded">
                      {suggestion.movie.genre.split(",")[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestionsPage;
