import React, { useState } from "react";
import {
  X,
  Play,
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
  ThumbsDown,
  MoreHorizontal,
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

  // Mock data - in real app, this would come from API
  const cast: Cast[] = [
    {
      id: 1,
      name: "Christian Bale",
      character: "Bruce Wayne / Batman",
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
        "Absolutely phenomenal! Heath Ledger's performance as the Joker is legendary. The cinematography and storyline are top-notch. A must-watch!",
      date: "2024-01-20",
      helpful: 12,
      liked: false,
    },
    {
      id: 2,
      friendName: "Mike Johnson",
      friendAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4,
      review:
        "Great action sequences and compelling storyline. Christopher Nolan outdid himself. Some parts felt a bit long but overall excellent.",
      date: "2024-01-18",
      helpful: 8,
      liked: true,
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
    setShowReviewForm(true);
  };

  const handleSubmitReview = () => {
    if (userRating === 0) {
      showToast("Please select a rating", "error");
      return;
    }

    // In real app, would save to backend
    showToast("Review submitted successfully!", "success");
    setShowReviewForm(false);
    setUserRating(0);
    setUserReview("");
  };

  const handleFriendReviewLike = (reviewId: number) => {
    showToast("Marked review as helpful", "success");
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="relative">
          <div
            className="h-64 bg-cover bg-center rounded-t-xl"
            style={{
              backgroundImage: `url(${movie.backdrop || movie.poster})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-t-xl" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Movie Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex gap-6">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-24 h-36 object-cover rounded-lg shadow-2xl flex-shrink-0"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-4 text-white/80 mb-3">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.duration || "2h 32m"}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                    />
                    <span>{movie.rating}</span>
                  </div>
                </div>
                <p className="text-white/90 text-sm">{movie.genre}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleMarkAsWatched}
              disabled={isWatched}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                isWatched
                  ? "bg-green-500/20 text-green-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-hover text-white"
              }`}
            >
              <Play className="w-5 h-5" fill="currentColor" />
              {isWatched ? "Watched" : "Mark as Watched"}
            </button>

            <button
              onClick={handleWatchlistToggle}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                isInWatchlist
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "glass-button"
              }`}
            >
              {isInWatchlist ? (
                <Check className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
            </button>

            <button className="glass-button p-3 rounded-xl">
              <Share2 className="w-5 h-5" />
            </button>

            <button className="glass-button p-3 rounded-xl">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Plot */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Plot</h3>
            <p className="text-muted-foreground leading-relaxed">
              {movie.description}
            </p>
          </div>

          {/* Cast */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Cast</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cast.map((actor) => (
                <div key={actor.id} className="glass-card p-4">
                  <img
                    src={actor.photo}
                    alt={actor.name}
                    className="w-16 h-16 object-cover rounded-full mx-auto mb-3"
                  />
                  <h4 className="font-semibold text-foreground text-center mb-1">
                    {actor.name}
                  </h4>
                  <p className="text-sm text-muted-foreground text-center">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Director */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Director
            </h3>
            <div className="flex items-center gap-4">
              {directors.map((director) => (
                <div key={director.id} className="flex items-center gap-3">
                  <img
                    src={director.photo}
                    alt={director.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <span className="font-medium text-foreground">
                    {director.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User Review Form */}
          {showReviewForm && (
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Share Your Review
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserRating(star)}
                        className="group"
                      >
                        <Star
                          className={`w-8 h-8 transition-all ${
                            star <= userRating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-400 group-hover:text-yellow-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Review (Optional)
                  </label>
                  <textarea
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    placeholder="Share your thoughts about this movie..."
                    className="w-full p-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    rows={4}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSubmitReview}
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-xl font-medium transition-all"
                  >
                    Submit Review
                  </button>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="glass-button px-6 py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Friends Reviews */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">
                Friends Reviews
              </h3>
              <span className="text-sm text-muted-foreground">
                {friendReviews.length} reviews from friends
              </span>
            </div>

            {friendReviews.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No reviews from friends yet. Be the first to watch and review!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {friendReviews.map((review) => (
                  <div key={review.id} className="glass-card p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.friendAvatar}
                        alt={review.friendName}
                        className="w-12 h-12 object-cover rounded-full flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-foreground">
                              {review.friendName}
                            </h4>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-400"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-foreground mb-3 leading-relaxed">
                          {review.review}
                        </p>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleFriendReviewLike(review.id)}
                            className={`flex items-center gap-2 text-sm transition-all ${
                              review.liked
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            Helpful ({review.helpful})
                          </button>
                          <button className="text-sm text-muted-foreground hover:text-foreground transition-all">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
