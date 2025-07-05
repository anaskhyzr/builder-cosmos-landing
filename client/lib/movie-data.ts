export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  backdrop?: string;
  description: string;
  duration?: string;
  category: "movie" | "animation" | "military";
  trending?: boolean;
  featured?: boolean;
  progress?: number; // for continue watching
}

export const sampleMovies: Movie[] = [
  {
    id: 1,
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    rating: 8.7,
    genre: "Animation, Action, Adventure",
    poster:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=450&fit=crop",
    backdrop:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=450&fit=crop",
    description:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    duration: "2h 20m",
    category: "animation",
    trending: true,
    featured: true,
  },
  {
    id: 2,
    title: "The Flash",
    year: 2023,
    rating: 6.9,
    genre: "Action, Adventure, Sci-Fi",
    poster:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
    description:
      "Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without super heroes.",
    duration: "2h 24m",
    category: "movie",
  },

  {
    id: 4,
    title: "Elemental",
    year: 2023,
    rating: 7.0,
    genre: "Animation, Comedy, Family",
    poster:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop",
    description:
      "Follows Ember and Wade, in a city where fire-, water-, land- and air-residents live together.",
    duration: "1h 43m",
    category: "animation",
  },
  {
    id: 5,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    genre: "Adventure, Drama, Sci-Fi",
    poster:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=450&fit=crop",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    duration: "2h 49m",
    category: "movie",
  },

  {
    id: 7,
    title: "Transformers: Rise of the Beasts",
    year: 2023,
    rating: 6.0,
    genre: "Action, Adventure, Sci-Fi",
    poster:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=450&fit=crop",
    description:
      "During the '90s, a new faction of Transformers - the Maximals - join the Autobots as allies in the battle for Earth.",
    duration: "2h 7m",
    category: "movie",
    progress: 75,
  },
  {
    id: 8,
    title: "Loki Season 2",
    year: 2023,
    rating: 8.2,
    genre: "Action, Adventure, Fantasy",
    poster:
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=300&h=450&fit=crop",
    description:
      "Loki finds himself in a battle for the soul of the Time Variance Authority.",
    duration: "50m",
    category: "tv",
    progress: 30,
  },
  {
    id: 9,
    title: "Avatar: The Way of Water",
    year: 2022,
    rating: 7.6,
    genre: "Action, Adventure, Drama",
    poster:
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
    description:
      "Jake Sully lives with his newfound family formed on the planet of Pandora.",
    duration: "3h 12m",
    category: "movie",
  },
  {
    id: 10,
    title: "The Last Kingdom: Seven Kings Must Die",
    year: 2023,
    rating: 7.0,
    genre: "Action, Drama, History",
    poster:
      "https://images.unsplash.com/photo-1489599558132-3b4b0b7c11c2?w=300&h=450&fit=crop",
    description:
      "In the wake of King Edward's death, Uhtred of Bebbanburg and his comrades adventure across a fractured kingdom.",
    duration: "1h 51m",
    category: "military",
  },
];

export const categories = [
  { id: "all", label: "All Movies", value: "all" },
  { id: "animation", label: "Animation", value: "animation" },
  { id: "military", label: "Military", value: "military" },
  { id: "more", label: "More", value: "more" },
];

export const getMoviesByCategory = (category: string): Movie[] => {
  if (category === "all") return sampleMovies;
  return sampleMovies.filter((movie) => movie.category === category);
};

export const getTrendingMovies = (): Movie[] => {
  return sampleMovies.filter((movie) => movie.trending);
};

export const getFeaturedMovie = (): Movie | undefined => {
  return sampleMovies.find((movie) => movie.featured);
};

export const getContinueWatching = (): Movie[] => {
  return sampleMovies.filter((movie) => movie.progress && movie.progress > 0);
};
