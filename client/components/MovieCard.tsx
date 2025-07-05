import React from "react";
import { Star, Plus, Check, Clock, MoreHorizontal } from "lucide-react";
import { Movie } from "../lib/movie-data";
import { useAppContext, useToast } from "../lib/app-context";

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  showActions?: boolean;
  size?: "small" | "medium" | "large";
  showProgress?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  showActions = true,
  size = "medium",
  showProgress = false,
}) => {
  const { state, dispatch } = useAppContext();
  const { showToast } = useToast();

  const isInWatchlist = state.watchlist.some((item) => item.id === movie.id);
  const isWatched = state.watchedMovies.some((item) => item.id === movie.id);

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist) {
      dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: movie.id });
      showToast("Removed from watchlist", "info");
    } else {
      dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });
      showToast("Added to watchlist", "success");
    }
  };

  const handleMarkAsWatched = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_WATCHED", payload: movie });
    showToast("Marked as watched", "success");
  };

  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  const sizeClasses = {
    small: "w-36",
    medium: "w-48",
    large: "w-56",
  };

  const imageHeightClasses = {
    small: "h-48",
    medium: "h-64",
    large: "h-80",
  };

  return (
    <div
      className={`movie-card ${sizeClasses[size]} group`}
      onClick={handleClick}
    >
      {/* Movie Poster */}
      <div className={`relative ${imageHeightClasses[size]} overflow-hidden`}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-card-image"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {/* Quick Action Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
              <button
                onClick={handleAddToWatchlist}
                className="glass-button p-3 rounded-full hover:bg-white/20"
                title={
                  isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
                }
              >
                {isInWatchlist ? (
                  <Check className="w-6 h-6 text-green-400" />
                ) : (
                  <Plus className="w-6 h-6 text-white" />
                )}
              </button>
              <button
                onClick={handleMarkAsWatched}
                className="glass-button p-3 rounded-full hover:bg-white/20"
                title="Mark as watched"
              >
                <Clock className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={handleAddToWatchlist}
                className="glass-button p-2 rounded-full hover:bg-white/20"
                title={
                  isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
                }
              >
                {isInWatchlist ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Plus className="w-4 h-4 text-white" />
                )}
              </button>
              <button
                onClick={handleMarkAsWatched}
                className="glass-button p-2 rounded-full hover:bg-white/20"
                title="Mark as watched"
              >
                <Clock className="w-4 h-4 text-white" />
              </button>
              <button className="glass-button p-2 rounded-full hover:bg-white/20">
                <MoreHorizontal className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

          {/* Progress Bar for Continue Watching */}
          {showProgress && movie.progress && (
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="w-full bg-black/50 rounded-full h-1">
                <div
                  className="bg-primary h-1 rounded-full transition-all"
                  style={{ width: `${movie.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3">
          <div className="glass px-2 py-1 rounded-lg flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
            <span className="text-xs font-medium text-white">
              {movie.rating}
            </span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="glass px-2 py-1 rounded-lg text-xs font-medium text-white/90 uppercase">
            {movie.category}
          </span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-1 truncate group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{movie.year}</span>
          {movie.duration && <span>{movie.duration}</span>}
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {movie.genre.split(",")[0]}
        </p>

        {/* Action Buttons (Mobile) */}
        {showActions && (
          <div className="flex gap-2 md:hidden">
            <button
              onClick={handleAddToWatchlist}
              className={`flex-1 glass-button py-2 text-xs font-medium ${
                isInWatchlist
                  ? "text-green-400 border-green-400/30"
                  : "text-white"
              }`}
            >
              {isInWatchlist ? "In List" : "Watchlist"}
            </button>
            <button
              onClick={handleMarkAsWatched}
              className="flex-1 glass-button py-2 text-xs font-medium text-white"
            >
              Watched
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
