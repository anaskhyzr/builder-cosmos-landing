import { Movie } from "./movie-data";

export interface EnhancedSuggestion {
  movie: Movie;
  reason: string;
  confidence: number;
  type:
    | "mood"
    | "time"
    | "weather"
    | "seasonal"
    | "genre"
    | "sequel"
    | "collaborative"
    | "trending";
  context: {
    currentMood?: string;
    timeOfDay?: string;
    dayOfWeek?: string;
    weather?: string;
    season?: string;
  };
}

export interface UserContext {
  currentTime: Date;
  mood?: "energetic" | "relaxed" | "adventurous" | "romantic" | "thoughtful";
  weather?: "sunny" | "rainy" | "cloudy" | "snowy";
  availableTime?: "short" | "medium" | "long"; // <1hr, 1-2hr, >2hr
  device?: "mobile" | "tablet" | "tv" | "laptop";
  platform?: "netflix" | "prime" | "disney" | "hulu" | "theater";
}

export class EnhancedAIEngine {
  private watchHistory: Movie[];
  private userPreferences: any;
  private socialData: any;

  constructor(watchHistory: Movie[], userPreferences: any, socialData: any) {
    this.watchHistory = watchHistory;
    this.userPreferences = userPreferences;
    this.socialData = socialData;
  }

  generateEnhancedSuggestions(
    availableMovies: Movie[],
    userContext: UserContext,
  ): EnhancedSuggestion[] {
    const suggestions: EnhancedSuggestion[] = [];

    // 1. Mood-based recommendations
    suggestions.push(
      ...this.getMoodBasedSuggestions(availableMovies, userContext),
    );

    // 2. Time-sensitive suggestions
    suggestions.push(
      ...this.getTimeBasedSuggestions(availableMovies, userContext),
    );

    // 3. Weather-based recommendations
    suggestions.push(
      ...this.getWeatherBasedSuggestions(availableMovies, userContext),
    );

    // 4. Seasonal content suggestions
    suggestions.push(
      ...this.getSeasonalSuggestions(availableMovies, userContext),
    );

    // 5. Cross-platform availability
    suggestions.push(
      ...this.getPlatformBasedSuggestions(availableMovies, userContext),
    );

    // Remove duplicates and sort by confidence
    const uniqueSuggestions = suggestions
      .filter(
        (suggestion, index, self) =>
          index === self.findIndex((s) => s.movie.id === suggestion.movie.id),
      )
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 15);

    return uniqueSuggestions;
  }

  private getMoodBasedSuggestions(
    movies: Movie[],
    context: UserContext,
  ): EnhancedSuggestion[] {
    const suggestions: EnhancedSuggestion[] = [];
    const { mood } = context;

    if (!mood) return suggestions;

    const moodGenreMap = {
      energetic: ["Action", "Adventure", "Thriller"],
      relaxed: ["Comedy", "Romance", "Animation"],
      adventurous: ["Adventure", "Sci-Fi", "Fantasy"],
      romantic: ["Romance", "Drama"],
      thoughtful: ["Drama", "Documentary", "Mystery"],
    };

    const preferredGenres = moodGenreMap[mood] || [];

    movies.forEach((movie) => {
      const movieGenres = movie.genre.split(",").map((g) => g.trim());
      const genreMatch = movieGenres.some((g) => preferredGenres.includes(g));

      if (genreMatch) {
        suggestions.push({
          movie,
          reason: `Perfect for your ${mood} mood`,
          confidence: 85 + Math.random() * 10,
          type: "mood",
          context: { currentMood: mood },
        });
      }
    });

    return suggestions;
  }

  private getTimeBasedSuggestions(
    movies: Movie[],
    context: UserContext,
  ): EnhancedSuggestion[] {
    const suggestions: EnhancedSuggestion[] = [];
    const { currentTime, availableTime } = context;
    const hour = currentTime.getHours();
    const dayOfWeek = currentTime.getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    movies.forEach((movie) => {
      let shouldSuggest = false;
      let reason = "";
      let confidence = 70;

      // Evening time (6 PM - 11 PM) - suggest longer, more immersive content
      if (hour >= 18 && hour <= 23) {
        if (movie.category === "movie" && movie.rating >= 8.0) {
          shouldSuggest = true;
          reason = "Perfect evening entertainment";
          confidence = 80;
        }
      }

      // Late night (11 PM - 2 AM) - suggest lighter content
      if (hour >= 23 || hour <= 2) {
        if (
          movie.genre.includes("Comedy") ||
          movie.genre.includes("Animation")
        ) {
          shouldSuggest = true;
          reason = "Great for late-night relaxation";
          confidence = 75;
        }
      }

      // Weekday lunch break - suggest shorter content
      if (!isWeekend && hour >= 12 && hour <= 14) {
        if (
          movie.category === "tv" ||
          (movie.duration && movie.duration.includes("1h"))
        ) {
          shouldSuggest = true;
          reason = "Perfect for a quick lunch break";
          confidence = 85;
        }
      }

      // Weekend binge time
      if (isWeekend && hour >= 10 && hour <= 16) {
        if (movie.category === "tv" || movie.genre.includes("Drama")) {
          shouldSuggest = true;
          reason = "Ideal for weekend binge-watching";
          confidence = 90;
        }
      }

      if (shouldSuggest) {
        suggestions.push({
          movie,
          reason,
          confidence: confidence + Math.random() * 10,
          type: "time",
          context: {
            timeOfDay:
              hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening",
            dayOfWeek: isWeekend ? "weekend" : "weekday",
          },
        });
      }
    });

    return suggestions;
  }

  private getWeatherBasedSuggestions(
    movies: Movie[],
    context: UserContext,
  ): EnhancedSuggestion[] {
    const suggestions: EnhancedSuggestion[] = [];
    const { weather } = context;

    if (!weather) return suggestions;

    const weatherMovieMap = {
      rainy: {
        genres: ["Drama", "Romance", "Mystery"],
        reason: "Cozy films for a rainy day",
        confidence: 80,
      },
      sunny: {
        genres: ["Adventure", "Comedy", "Animation"],
        reason: "Uplifting content for a beautiful day",
        confidence: 75,
      },
      snowy: {
        genres: ["Family", "Animation", "Romance"],
        reason: "Warm and heartwarming for snowy weather",
        confidence: 85,
      },
      cloudy: {
        genres: ["Thriller", "Mystery", "Drama"],
        reason: "Atmospheric content matching the mood",
        confidence: 70,
      },
    };

    const weatherPrefs = weatherMovieMap[weather];
    if (!weatherPrefs) return suggestions;

    movies.forEach((movie) => {
      const movieGenres = movie.genre.split(",").map((g) => g.trim());
      const genreMatch = movieGenres.some((g) =>
        weatherPrefs.genres.includes(g),
      );

      if (genreMatch) {
        suggestions.push({
          movie,
          reason: weatherPrefs.reason,
          confidence: weatherPrefs.confidence + Math.random() * 15,
          type: "weather",
          context: { weather },
        });
      }
    });

    return suggestions;
  }

  private getSeasonalSuggestions(
    movies: Movie[],
    context: UserContext,
  ): EnhancedSuggestion[] {
    const suggestions: EnhancedSuggestion[] = [];
    const month = context.currentTime.getMonth();

    // Determine season
    let season: string;
    if (month >= 2 && month <= 4) season = "spring";
    else if (month >= 5 && month <= 7) season = "summer";
    else if (month >= 8 && month <= 10) season = "fall";
    else season = "winter";

    const seasonalPrefs = {
      spring: {
        keywords: ["adventure", "comedy", "romance"],
        reason: "Fresh and uplifting content for spring",
      },
      summer: {
        keywords: ["action", "adventure", "blockbuster"],
        reason: "High-energy summer entertainment",
      },
      fall: {
        keywords: ["thriller", "mystery", "drama"],
        reason: "Atmospheric content for autumn",
      },
      winter: {
        keywords: ["family", "drama", "romance"],
        reason: "Cozy winter viewing",
      },
    };

    const prefs = seasonalPrefs[season as keyof typeof seasonalPrefs];

    movies.forEach((movie) => {
      const description = movie.description.toLowerCase();
      const genre = movie.genre.toLowerCase();

      const matchesKeywords = prefs.keywords.some(
        (keyword) => description.includes(keyword) || genre.includes(keyword),
      );

      if (matchesKeywords) {
        suggestions.push({
          movie,
          reason: prefs.reason,
          confidence: 75 + Math.random() * 20,
          type: "seasonal",
          context: { season },
        });
      }
    });

    return suggestions;
  }

  private getPlatformBasedSuggestions(
    movies: Movie[],
    context: UserContext,
  ): EnhancedSuggestion[] {
    const suggestions: EnhancedSuggestion[] = [];
    const { platform } = context;

    // Mock platform availability - in real app, this would come from APIs
    const platformContent = {
      netflix: ["Drama", "Thriller", "Documentary"],
      prime: ["Action", "Sci-Fi", "Comedy"],
      disney: ["Animation", "Family", "Adventure"],
      hulu: ["Comedy", "Crime", "Mystery"],
    };

    if (
      !platform ||
      !platformContent[platform as keyof typeof platformContent]
    ) {
      return suggestions;
    }

    const availableGenres =
      platformContent[platform as keyof typeof platformContent];

    movies.forEach((movie) => {
      const movieGenres = movie.genre.split(",").map((g) => g.trim());
      const isAvailable = movieGenres.some((g) => availableGenres.includes(g));

      if (isAvailable) {
        suggestions.push({
          movie,
          reason: `Available now on ${platform}`,
          confidence: 95,
          type: "trending",
          context: {},
        });
      }
    });

    return suggestions;
  }
}

// Utility functions for context detection
export const detectUserContext = async (): Promise<UserContext> => {
  const currentTime = new Date();

  // Mock implementations - in real app, these would use actual APIs/sensors
  const weather = await mockGetWeather();
  const mood = detectMoodFromRecentActivity();

  return {
    currentTime,
    weather,
    mood,
    availableTime: getAvailableTime(currentTime),
    device: detectDevice(),
    platform: getUserPreferredPlatform(),
  };
};

const mockGetWeather = async (): Promise<
  "sunny" | "rainy" | "cloudy" | "snowy"
> => {
  // Mock weather API call
  const weathers = ["sunny", "rainy", "cloudy", "snowy"] as const;
  return weathers[Math.floor(Math.random() * weathers.length)];
};

const detectMoodFromRecentActivity = ():
  | "energetic"
  | "relaxed"
  | "adventurous"
  | "romantic"
  | "thoughtful" => {
  // Mock mood detection based on recent app activity, time of day, etc.
  const moods = [
    "energetic",
    "relaxed",
    "adventurous",
    "romantic",
    "thoughtful",
  ] as const;
  return moods[Math.floor(Math.random() * moods.length)];
};

const getAvailableTime = (currentTime: Date): "short" | "medium" | "long" => {
  const hour = currentTime.getHours();
  if (hour >= 12 && hour <= 14) return "short"; // Lunch break
  if (hour >= 18 && hour <= 20) return "medium"; // Early evening
  return "long"; // Weekend or late evening
};

const detectDevice = (): "mobile" | "tablet" | "tv" | "laptop" => {
  // Mock device detection
  const devices = ["mobile", "tablet", "tv", "laptop"] as const;
  return devices[Math.floor(Math.random() * devices.length)];
};

const getUserPreferredPlatform = ():
  | "netflix"
  | "prime"
  | "disney"
  | "hulu" => {
  // Mock user preference
  const platforms = ["netflix", "prime", "disney", "hulu"] as const;
  return platforms[Math.floor(Math.random() * platforms.length)];
};
