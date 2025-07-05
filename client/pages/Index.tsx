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
    <div className="flex-1 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Centered Search Section */}
        <div className="flex flex-col items-center justify-center min-h-[25vh] space-y-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-light text-foreground/90">
              Discover Movies
            </h1>
          </div>

          {/* Centered Search Bar */}
          <div className="w-full max-w-2xl">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full pl-14 pr-6 py-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-foreground/90 placeholder-foreground/40 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all duration-200 text-base shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Search Results or Popular Movies */}
        <div className="mt-12">
          {isSearchActive && debouncedSearchQuery ? (
            // Search Results
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-light text-foreground/80 mb-1">
                  Search Results
                </h2>
                <p className="text-sm text-foreground/50">
                  {searchResults.length} movies found
                </p>
              </div>

              {searchResults.length === 0 ? (
                <div className="glass-card p-16 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-white/5 rounded-2xl flex items-center justify-center">
                    <Search className="w-10 h-10 text-foreground/30" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground/80 mb-2">
                    No movies found
                  </h3>
                  <p className="text-foreground/50 text-sm">
                    Try different keywords or check your spelling
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6">
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
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground">
                  Popular Movies
                </h2>
              </div>

              <div className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
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
