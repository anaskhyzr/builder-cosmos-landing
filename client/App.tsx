import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useAppContext } from "./lib/app-context";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/Index";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import SocialPage from "./pages/Social";
import WatchlistPage from "./pages/Watchlist";
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

const SettingsPage = () => (
  <div className="flex-1 bg-background min-h-screen p-6">
    <div className="glass-card p-12 text-center">
      <h1 className="text-3xl font-bold text-foreground mb-4">Settings</h1>
      <p className="text-muted-foreground">
        User settings and preferences coming soon...
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

      {/* Movie Modal (placeholder for now) */}
      {state.showMovieModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="glass-card max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {state.selectedMovie?.title}
                </h2>
                <button
                  onClick={() =>
                    dispatch({ type: "TOGGLE_MOVIE_MODAL", payload: false })
                  }
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              <p className="text-muted-foreground">
                Movie details modal coming soon...
              </p>
            </div>
          </div>
        </div>
      )}
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
