import React from "react";
import {
  Play,
  Download,
  MoreHorizontal,
  Star,
  Plus,
  Check,
} from "lucide-react";
import { Movie } from "../lib/movie-data";
import { useAppContext, useToast } from "../lib/app-context";

interface FeaturedMovieProps {
  movie: Movie;
  onWatch?: (movie: Movie) => void;
}

const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ movie, onWatch }) => {
  const { state, dispatch } = useAppContext();
  const { showToast } = useToast();

  const isInWatchlist = state.watchlist.some((item) => item.id === movie.id);

  const handleAddToWatchlist = () => {
    if (isInWatchlist) {
      dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: movie.id });
      showToast("Removed from watchlist", "info");
    } else {
      dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });
      showToast("Added to watchlist", "success");
    }
  };

  const handleWatch = () => {
    if (onWatch) {
      onWatch(movie);
    }
  };

  return (
    <div className="relative h-[600px] rounded-2xl overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end p-8 md:p-12">
        <div className="max-w-2xl">
          {/* Category */}
          <div className="flex items-center gap-3 mb-4">
            <span className="glass px-3 py-1 rounded-full text-sm font-medium text-white/90 uppercase tracking-wide">
              {movie.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-sm font-medium text-white">
                {movie.rating}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {movie.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-6 text-white/80">
            <span className="text-lg">{movie.year}</span>
            {movie.duration && (
              <>
                <span>•</span>
                <span className="text-lg">{movie.duration}</span>
              </>
            )}
            <span>•</span>
            <span className="text-lg">{movie.genre.split(",")[0]}</span>
          </div>

          {/* Description */}
          <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-xl">
            {movie.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleWatch}
              className="flex items-center gap-3 bg-primary hover:bg-primary-hover px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 shadow-xl"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              Watch
            </button>

            <button className="flex items-center gap-3 glass-button px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-200">
              <Download className="w-5 h-5" />
              Download
            </button>

            <button
              onClick={handleAddToWatchlist}
              className="glass-button p-4 rounded-xl hover:bg-white/20 transition-all duration-200"
            >
              {isInWatchlist ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Plus className="w-5 h-5 text-white" />
              )}
            </button>

            <button className="glass-button p-4 rounded-xl hover:bg-white/20 transition-all duration-200">
              <MoreHorizontal className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Trending Badge */}
      <div className="absolute top-6 left-6">
        <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-white">Now Trending</span>
        </div>
      </div>

      {/* Movie Poster (Small) */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="w-32 h-48 rounded-xl overflow-hidden shadow-2xl">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;
