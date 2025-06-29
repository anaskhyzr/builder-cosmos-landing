import React, { useState } from "react";
import { Search, Bell, User } from "lucide-react";
import FeaturedMovie from "../components/FeaturedMovie";
import MovieCard from "../components/MovieCard";
import {
  getFeaturedMovie,
  sampleMovies,
  categories,
  getContinueWatching,
} from "../lib/movie-data";
import { useAppContext } from "../lib/app-context";

interface HomePageProps {
  onMovieClick?: (movie: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onMovieClick }) => {
  const { state } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredMovie = getFeaturedMovie();
  const continueWatching = getContinueWatching();

  const filteredMovies = sampleMovies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 bg-background min-h-screen">
      {/* Header */}
      <header className="glass-card m-6 mb-0">
        <div className="flex items-center justify-between p-6">
          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search movies"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-background-secondary transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 ml-6">
            <button className="glass-button p-3 rounded-xl">
              <Bell className="w-5 h-5 text-foreground" />
            </button>
            <button className="glass-button p-3 rounded-xl">
              <User className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="px-6 pb-6">
          <nav className="flex items-center gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.value
                    ? "text-primary bg-primary/10 border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Featured Movie */}
        {featuredMovie && !searchQuery && (
          <section>
            <FeaturedMovie
              movie={featuredMovie}
              onWatch={(movie) => onMovieClick?.(movie)}
            />
          </section>
        )}

        {/* Continue Watching */}
        {continueWatching.length > 0 && !searchQuery && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Continue Watching
              </h2>
              <button className="text-primary hover:text-primary-hover font-medium">
                See all
              </button>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
              {continueWatching.map((movie) => (
                <div key={movie.id} className="flex-shrink-0">
                  <MovieCard
                    movie={movie}
                    onClick={onMovieClick}
                    size="medium"
                    showProgress={true}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* You Might Like / Search Results */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {searchQuery ? "Search Results" : "You might like"}
            </h2>
            {!searchQuery && (
              <button className="text-primary hover:text-primary-hover font-medium">
                See all
              </button>
            )}
          </div>

          {filteredMovies.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-muted-foreground text-lg">
                {searchQuery
                  ? `No movies found for "${searchQuery}"`
                  : "No movies available"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredMovies.slice(0, 12).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={onMovieClick}
                  size="medium"
                />
              ))}
            </div>
          )}
        </section>

        {/* Trending Now */}
        {!searchQuery && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Trending Now
              </h2>
              <button className="text-primary hover:text-primary-hover font-medium">
                See all
              </button>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
              {sampleMovies
                .filter((movie) => movie.trending)
                .map((movie) => (
                  <div key={movie.id} className="flex-shrink-0">
                    <MovieCard
                      movie={movie}
                      onClick={onMovieClick}
                      size="large"
                    />
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Popular This Week */}
        {!searchQuery && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Popular This Week
              </h2>
              <button className="text-primary hover:text-primary-hover font-medium">
                See all
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {sampleMovies
                .slice()
                .reverse()
                .slice(0, 6)
                .map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={onMovieClick}
                    size="medium"
                  />
                ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default HomePage;
