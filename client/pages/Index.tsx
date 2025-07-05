import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import MovieCard from "../components/MovieCard";
import { sampleMovies } from "../lib/movie-data";
import { useAppContext } from "../lib/app-context";

interface HomePageProps {
  onMovieClick?: (movie: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onMovieClick }) => {
  const { state } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Debounce search query for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Get popular movies for default state (top rated movies)
  const popularMovies = sampleMovies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Filter movies based on search query
  const searchResults = sampleMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      movie.year.toString().includes(debouncedSearchQuery),
  );

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleSearchBlur = () => {
    if (!searchQuery) {
      setIsSearchActive(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }
  };

  return (
    <div className="flex-1 bg-background min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Centered Search Section */}
        <div className="flex flex-col items-center justify-center min-h-[30vh] space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Discover Movies
            </h1>
          </div>

          {/* Centered Search Bar */}
          <div className="w-full max-w-3xl">
            <div className="relative">
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 w-8 h-8 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full pl-20 pr-8 py-8 bg-glass/40 backdrop-blur-xl border border-glass-border/30 rounded-3xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-glass/60 transition-all duration-300 text-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Search Results or Popular Movies */}
        <div className="mt-12">
          {isSearchActive && debouncedSearchQuery ? (
            // Search Results
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground">
                  {searchResults.length} Results
                </h2>
              </div>

              {searchResults.length === 0 ? (
                <div className="glass-card p-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-glass rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No movies found
                  </h3>
                  <p className="text-muted-foreground">
                    Try searching with different keywords or check your spelling
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {searchResults.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={onMovieClick}
                      size="medium"
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Popular Movies (Default State)
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground">
                  Popular Movies
                </h2>
              </div>

              <div className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
                  {popularMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="transform hover:scale-105 transition-all duration-300"
                    >
                      <MovieCard
                        movie={movie}
                        onClick={onMovieClick}
                        size="medium"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
