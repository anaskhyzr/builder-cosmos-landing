import React, { useState } from "react";
import {
  X,
  Plus,
  Check,
  Star,
  Clock,
  Calendar,
  Users,
  Heart,
  Share2,
  MessageCircle,
  ThumbsUp,
  Play,
  ExternalLink,
} from "lucide-react";
import { Movie } from "../lib/movie-data";
import { useAppContext, useToast } from "../lib/app-context";

interface Cast {
  id: number;
  name: string;
  character: string;
  photo: string;
}

interface Director {
  id: number;
  name: string;
  photo: string;
}

interface FriendReview {
  id: number;
  friendName: string;
  friendAvatar: string;
  rating: number;
  review: string;
  date: string;
  helpful: number;
  liked: boolean;
}

interface MovieDetailsModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  isOpen,
  onClose,
}) => {
  const { state, dispatch } = useAppContext();
  const { showToast } = useToast();
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!isOpen || !movie) return null;

  const isInWatchlist = state.watchlist.some((item) => item.id === movie.id);
  const isWatched = state.watchedMovies.some((item) => item.id === movie.id);

  // Mock data
  const cast: Cast[] = [
    {
      id: 1,
      name: "Christian Bale",
      character: "Bruce Wayne",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Heath Ledger",
      character: "The Joker",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Aaron Eckhart",
      character: "Harvey Dent",
      photo:
        "https://images.unsplash.com/photo-1500648767791-c3f69c80808e?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const directors: Director[] = [
    {
      id: 1,
      name: "Christopher Nolan",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const friendReviews: FriendReview[] = [
    {
      id: 1,
      friendName: "Sarah Chen",
      friendAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      review:
        "Absolutely phenomenal! Heath Ledger's performance as the Joker is legendary.",
      date: "2024-01-20",
      helpful: 12,
      liked: false,
    },
  ];

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: movie.id });
      showToast("Removed from watchlist", "info");
    } else {
      dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });
      showToast("Added to watchlist", "success");
    }
  };

  const handleMarkAsWatched = () => {
    dispatch({ type: "ADD_TO_WATCHED", payload: movie });
    showToast("Marked as watched", "success");
  };

  const handleSubmitReview = () => {
    if (userRating === 0) {
      showToast("Please select a rating", "error");
      return;
    }
    showToast("Review submitted successfully!", "success");
    setShowReviewForm(false);
    setUserRating(0);
    setUserReview("");
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="absolute md:right-0 md:top-0 md:h-full md:w-96 lg:w-[28rem] bottom-0 left-0 right-0 md:bottom-auto max-h-[85vh] md:max-h-full bg-background-secondary/95 backdrop-blur-xl border-l border-border/30 md:border-l md:border-t-0 border-t md:rounded-none rounded-t-2xl shadow-2xl transform transition-transform duration-300 ease-out">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Scrollable Content */}
        <div className="h-full overflow-y-auto custom-scrollbar">
          {/* Movie Header */}
          <div className="relative">
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage: `url(${movie.backdrop || movie.poster})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Movie Info Overlay */}
            <div className="absolute bottom-4 left-4 right-12">
              <div className="flex gap-3">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded-lg shadow-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-bold text-white mb-1 truncate">
                    {movie.title}
                  </h1>
                  <div className="flex items-center gap-2 text-white/80 text-xs mb-1">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{movie.duration || "2h 32m"}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <Star
                      className="w-3 h-3 text-yellow-400"
                      fill="currentColor"
                    />
                    <span className="text-white/90 text-xs">
                      {movie.rating}
                    </span>
                    <span className="text-white/60 text-xs ml-1">IMDb</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleMarkAsWatched}
                disabled={isWatched}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-medium text-sm transition-all ${
                  isWatched
                    ? "bg-green-500/20 text-green-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-hover text-white"
                }`}
              >
                <Play className="w-4 h-4" fill="currentColor" />
                {isWatched ? "Watched" : "Watch"}
              </button>

              <button
                onClick={handleWatchlistToggle}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-medium text-sm transition-all ${
                  isInWatchlist
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "glass-button"
                }`}
              >
                {isInWatchlist ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>

              <button className="glass-button p-2.5 rounded-lg">
                <Share2 className="w-4 h-4" />
              </button>

              <button className="glass-button p-2.5 rounded-lg">
                <Heart className="w-4 h-4" />
              </button>
            </div>

            {/* Genres */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.genre.split(",").map((genre, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/20 text-primary rounded-md text-xs font-medium"
                  >
                    {genre.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Plot */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Plot
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {movie.description}
              </p>
            </div>

            {/* Cast */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Cast
              </h3>
              <div className="space-y-2">
                {cast.slice(0, 4).map((actor) => (
                  <div key={actor.id} className="flex items-center gap-3">
                    <img
                      src={actor.photo}
                      alt={actor.name}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-xs truncate">
                        {actor.name}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {actor.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Director */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Director
              </h3>
              <div className="flex items-center gap-3">
                {directors.map((director) => (
                  <div key={director.id} className="flex items-center gap-2">
                    <img
                      src={director.photo}
                      alt={director.name}
                      className="w-6 h-6 object-cover rounded-full"
                    />
                    <span className="font-medium text-foreground text-xs">
                      {director.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* User Review Section */}
            {isWatched && !showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="w-full glass-button py-2.5 text-sm rounded-lg"
              >
                Write a Review
              </button>
            )}

            {showReviewForm && (
              <div className="glass-card p-3 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Your Review
                </h3>
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserRating(star)}
                        className="group"
                      >
                        <Star
                          className={`w-5 h-5 transition-all ${
                            star <= userRating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-400 group-hover:text-yellow-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-xs"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSubmitReview}
                    className="flex-1 bg-primary hover:bg-primary-hover text-white py-2 rounded-lg font-medium text-xs transition-all"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 glass-button py-2 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Friends Reviews */}
            {friendReviews.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Friends Reviews ({friendReviews.length})
                </h3>
                <div className="space-y-3">
                  {friendReviews.map((review) => (
                    <div key={review.id} className="glass-card p-3">
                      <div className="flex items-start gap-2">
                        <img
                          src={review.friendAvatar}
                          alt={review.friendName}
                          className="w-6 h-6 object-cover rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-foreground text-xs truncate">
                              {review.friendName}
                            </h4>
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= review.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-400"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-foreground leading-relaxed mb-2">
                            {review.review}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                              <ThumbsUp className="w-3 h-3" />
                              {review.helpful}
                            </button>
                            <span>
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* External Links */}
            <div className="pt-2 border-t border-border/30">
              <button className="w-full flex items-center justify-center gap-2 glass-button py-2.5 text-sm rounded-lg">
                <ExternalLink className="w-4 h-4" />
                View on IMDb
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
