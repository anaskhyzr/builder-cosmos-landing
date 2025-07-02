import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useAppContext } from "./lib/app-context";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/Index";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import SocialPage from "./pages/Social";
import EnhancedSocialPage from "./pages/EnhancedSocial";
import WatchlistPage from "./pages/Watchlist";
import AISuggestionsPage from "./pages/AISuggestions";
import AnalyticsPage from "./pages/Analytics";
import SettingsPage from "./pages/Settings";
import MovieDetailsModal from "./components/MovieDetailsModal";
import GamificationDashboard from "./components/Gamification";
import NotFound from "./pages/NotFound";

// Placeholder components for other pages
const SearchPage = () => (
  <div className="flex-1 bg-background min-h-screen p-6">
    <div className="glass-card p-12 text-center">
      <h1 className="text-3xl font-bold text-foreground mb-4">Search</h1>
      <p className="text-muted-foreground">
        Advanced search functionality coming soon...
      </p>
    </div>
  </div>
);

const CategoryPage = ({ category }: { category: string }) => (
  <div className="flex-1 bg-background min-h-screen p-6">
    <div className="glass-card p-12 text-center">
      <h1 className="text-3xl font-bold text-foreground mb-4 capitalize">
        {category}
      </h1>
      <p className="text-muted-foreground">{category} content coming soon...</p>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [currentPage, setCurrentPage] = useState("home");

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  };

  const handleMovieClick = (movie: any) => {
    dispatch({ type: "SET_SELECTED_MOVIE", payload: movie });
    dispatch({ type: "TOGGLE_MOVIE_MODAL", payload: true });
  };

  const handleLogin = () => {
    setCurrentPage("home");
  };

  // If not authenticated, show login page
  if (!state.isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onMovieClick={handleMovieClick} />;
      case "search":
        return <SearchPage />;
      case "profile":
        return <ProfilePage />;
      case "social":
        return <SocialPage />;
      case "watchlist":
        return <WatchlistPage />;
      case "ai-suggestions":
        return <AISuggestionsPage />;
      case "settings":
        return <SettingsPage />;
      case "movies":
        return <CategoryPage category="movies" />;
      case "tv":
        return <CategoryPage category="tv series" />;
      case "animation":
        return <CategoryPage category="animation" />;
      case "military":
        return <CategoryPage category="military" />;
      case "more":
        return <CategoryPage category="more content" />;
      default:
        return <HomePage onMovieClick={handleMovieClick} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />

      {/* Main Content */}
      <main className="flex-1">{renderPage()}</main>

      {/* Movie Details Modal */}
      <MovieDetailsModal
        movie={state.selectedMovie}
        isOpen={state.showMovieModal}
        onClose={() => dispatch({ type: "TOGGLE_MOVIE_MODAL", payload: false })}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
