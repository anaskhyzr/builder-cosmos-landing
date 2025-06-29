import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Movie } from "./movie-data";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  joinDate: string;
  favoriteGenres: string[];
  bio: string;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  watchlist: Movie[];
  watchedMovies: Movie[];
  watchLaterMovies: Movie[];
  currentPage: string;
  selectedMovie: Movie | null;
  showMovieModal: boolean;
}

type AppAction =
  | { type: "SET_AUTH_STATE"; payload: boolean }
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_CURRENT_PAGE"; payload: string }
  | { type: "ADD_TO_WATCHLIST"; payload: Movie }
  | { type: "REMOVE_FROM_WATCHLIST"; payload: number }
  | { type: "ADD_TO_WATCHED"; payload: Movie }
  | { type: "ADD_TO_WATCH_LATER"; payload: Movie }
  | { type: "SET_SELECTED_MOVIE"; payload: Movie | null }
  | { type: "TOGGLE_MOVIE_MODAL"; payload: boolean };

const initialState: AppState = {
  user: {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    username: "johndoe123",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    joinDate: "2024-01-15",
    favoriteGenres: ["Action", "Sci-Fi", "Drama"],
    bio: "Movie enthusiast and casual critic",
  },
  isAuthenticated: true,
  watchlist: [],
  watchedMovies: [],
  watchLaterMovies: [],
  currentPage: "home",
  selectedMovie: null,
  showMovieModal: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_AUTH_STATE":
      return { ...state, isAuthenticated: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "ADD_TO_WATCHLIST":
      if (state.watchlist.some((movie) => movie.id === action.payload.id)) {
        return state;
      }
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload,
        ),
      };
    case "ADD_TO_WATCHED":
      if (state.watchedMovies.some((movie) => movie.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        watchedMovies: [...state.watchedMovies, action.payload],
      };
    case "ADD_TO_WATCH_LATER":
      if (
        state.watchLaterMovies.some((movie) => movie.id === action.payload.id)
      ) {
        return state;
      }
      return {
        ...state,
        watchLaterMovies: [...state.watchLaterMovies, action.payload],
      };
    case "SET_SELECTED_MOVIE":
      return { ...state, selectedMovie: action.payload };
    case "TOGGLE_MOVIE_MODAL":
      return { ...state, showMovieModal: action.payload };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export const useToast = () => {
  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    // Simple toast implementation - you can enhance this later
    console.log(`Toast [${type}]: ${message}`);
  };

  return { showToast };
};
