import React from "react";
import { Movie } from "../lib/movie-data";

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  size?: "small" | "medium" | "large";
  showProgress?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  size = "medium",
  showProgress = false,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  const sizeClasses = {
    small: "w-32",
    medium: "w-40",
    large: "w-48",
  };

  const imageHeightClasses = {
    small: "h-40",
    medium: "h-52",
    large: "h-64",
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
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
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
      </div>

      {/* Movie Info */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
      </div>
    </div>
  );
};

export default MovieCard;
