import React from "react";
import { Calendar, Film, Clock, Star, Edit } from "lucide-react";
import { useAppContext } from "../lib/app-context";
import MovieCard from "../components/MovieCard";

const ProfilePage: React.FC = () => {
  const { state } = useAppContext();

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
