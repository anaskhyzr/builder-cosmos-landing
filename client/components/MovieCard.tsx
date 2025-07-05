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
    small: "w-28",
    medium: "w-36",
    large: "w-44",
  };

  const imageHeightClasses = {
    small: "h-36",
    medium: "h-48",
    large: "h-60",
  };

  return (
    <div
      className={`movie-card ${sizeClasses[size]} group cursor-pointer`}
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

        {/* Progress Bar for Continue Watching */}
        {showProgress && movie.progress && (
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <div className="w-full bg-black/50 rounded-full h-1">
              <div
                className="bg-primary h-1 rounded-full transition-all"
                style={{ width: `${movie.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-2">
        <h3 className="text-xs font-normal text-foreground/80 truncate group-hover:text-foreground transition-colors leading-tight">
          {movie.title}
        </h3>
      </div>
    </div>
  );
};

export default MovieCard;
