import React, { useState, useEffect } from "react";
import {
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  Star,
  RefreshCw,
  Filter,
  Lightbulb,
  Target,
  Brain,
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
  Zap,
  Heart,
  Calendar,
  Smartphone,
} from "lucide-react";
import { useAppContext } from "../lib/app-context";
import { Movie, sampleMovies } from "../lib/movie-data";
import MovieCard from "../components/MovieCard";
import {
  EnhancedAIEngine,
  EnhancedSuggestion,
  UserContext,
  detectUserContext,
} from "../lib/enhanced-ai";

const AISuggestionsPage: React.FC = () => {
  const { state } = useAppContext();
  const [suggestions, setSuggestions] = useState<EnhancedSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedReason, setSelectedReason] = useState("all");
  const [userContext, setUserContext] = useState<UserContext | null>(null);
  const [aiEngine, setAiEngine] = useState<EnhancedAIEngine | null>(null);

  useEffect(() => {
    const initializeAI = async () => {
      setIsGenerating(true);

      // Initialize AI engine and detect user context
      const context = await detectUserContext();
      setUserContext(context);

      const engine = new EnhancedAIEngine(
        state.watchedMovies,
        {}, // User preferences would be loaded here
        {}, // Social data would be loaded here
      );
      setAiEngine(engine);

      // Generate enhanced suggestions
      const watchedIds = state.watchedMovies.map((m) => m.id);
      const watchlistIds = state.watchlist.map((m) => m.id);
      const excludeIds = [...watchedIds, ...watchlistIds];

      const availableMovies = sampleMovies.filter(
        (movie) => !excludeIds.includes(movie.id),
      );

      const enhancedSuggestions = engine.generateEnhancedSuggestions(
        availableMovies,
        context,
      );

      setSuggestions(enhancedSuggestions);
      setIsGenerating(false);
    };

    // Simulate AI processing time
    const timer = setTimeout(() => {
      initializeAI();
    }, 1500);

    return () => clearTimeout(timer);
  }, [state.watchedMovies, state.watchlist]);

  const filteredSuggestions =
    selectedReason === "all"
      ? suggestions
      : suggestions.filter((s) => s.type === selectedReason);

  const reasonTypes = [
    { id: "all", label: "All Suggestions", icon: Sparkles },
    { id: "mood", label: "Mood-Based", icon: Heart },
    { id: "time", label: "Time-Perfect", icon: Clock },
    { id: "weather", label: "Weather-Matched", icon: Cloud },
    { id: "seasonal", label: "Seasonal", icon: Calendar },
    { id: "genre", label: "Genre Match", icon: Target },
    { id: "sequel", label: "Sequels", icon: RefreshCw },
    { id: "collaborative", label: "Community", icon: Users },
    { id: "trending", label: "Platform Available", icon: TrendingUp },
  ];

  return (
    <div className="flex-1 bg-background min-h-screen">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  AI Suggestions
                </h1>
                <p className="text-muted-foreground">
                  Personalized recommendations based on your watch history and
                  preferences
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsGenerating(true);
                setTimeout(() => {
                  setSuggestions(generateSuggestions());
                  setIsGenerating(false);
                }, 1000);
              }}
              disabled={isGenerating}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-5 h-5 ${isGenerating ? "animate-spin" : ""}`}
              />
              Refresh Suggestions
            </button>
          </div>

          {/* Algorithm Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="glass bg-primary/10 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">
                  Learning from
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {state.watchedMovies.length} watched movies and your rating
                patterns
              </p>
            </div>
            <div className="glass bg-green-500/10 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-green-500" />
                <span className="font-medium text-foreground">
                  Accuracy Rate
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {Math.round(
                  suggestions.reduce((acc, s) => acc + s.confidence, 0) /
                    suggestions.length || 0,
                )}
                % confidence in recommendations
              </p>
            </div>
            <div className="glass bg-blue-500/10 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-foreground">
                  Community Data
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on users with 85% similar taste
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {reasonTypes.map((type) => {
              const Icon = type.icon;
              const isActive = selectedReason === type.id;
              const count = suggestions.filter(
                (s) => type.id === "all" || s.type === type.id,
              ).length;

              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedReason(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "glass-button text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {type.label}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Suggestions Grid */}
        {isGenerating ? (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              AI is analyzing your preferences...
            </h3>
            <p className="text-muted-foreground">
              Generating personalized recommendations based on your watch
              history
            </p>
          </div>
        ) : filteredSuggestions.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No suggestions available
            </h3>
            <p className="text-muted-foreground">
              Watch more movies to get better AI recommendations
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredSuggestions.map((suggestion, index) => (
              <div key={suggestion.movie.id} className="glass-card p-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <MovieCard movie={suggestion.movie} size="medium" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {suggestion.movie.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {suggestion.movie.description}
                      </p>
                    </div>

                    {/* AI Reasoning */}
                    <div className="bg-primary/10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">
                          Why we recommend this
                        </span>
                        <div className="ml-auto flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{
                                width: `${suggestion.confidence}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {Math.round(suggestion.confidence)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-foreground">{suggestion.reason}</p>
                    </div>

                    {/* Movie Details */}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{suggestion.movie.rating}</span>
                      </div>
                      <span>{suggestion.movie.year}</span>
                      <span>{suggestion.movie.genre.split(",")[0]}</span>
                      <span className="capitalize">
                        {suggestion.movie.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestionsPage;
