import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Brain,
  Users,
  Eye,
  RefreshCw,
  Heart,
  Star,
  Film,
  Tv,
  Save,
  MoreHorizontal,
  Moon,
  Sun,
  Monitor,
  Globe,
  Smartphone,
  Download,
  Trash2,
  LogOut,
  Mail,
  Lock,
  Camera,
  Mic,
  Volume2,
  VolumeX,
  Languages,
  Type,
  Accessibility,
  HelpCircle,
  ExternalLink,
  Check,
  X,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useAppContext, useToast } from "../lib/app-context";

interface UserPreferences {
  rewatchFrequency: "often" | "rarely" | "never";
  preferredGenres: string[];
  favoriteActors: string[];
  favoriteDirectors: string[];
  notificationSettings: {
    friendReviews: boolean;
    newSuggestions: boolean;
    socialActivity: boolean;
    weeklyDigest: boolean;
    watchParties: boolean;
    movieReleases: boolean;
    priceDrops: boolean;
    emailNotifications: boolean;
  };
  privacySettings: {
    profileVisible: boolean;
    watchHistoryVisible: boolean;
    ratingsVisible: boolean;
    showOnlineStatus: boolean;
    allowFriendRequests: boolean;
    shareWatchingActivity: boolean;
  };
  aiSettings: {
    suggestionsEnabled: boolean;
    collaborativeFiltering: boolean;
    moodBasedSuggestions: boolean;
    timeBasedSuggestions: boolean;
    weatherBasedSuggestions: boolean;
    trendingWeight: number;
    genreWeight: number;
  };
  displaySettings: {
    theme: "light" | "dark" | "auto";
    language: string;
    timezone: string;
    compactMode: boolean;
    animationsEnabled: boolean;
    highContrast: boolean;
  };
}

const SettingsPage: React.FC = () => {
  const { state } = useAppContext();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("account");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [preferences, setPreferences] = useState<UserPreferences>({
    rewatchFrequency: "rarely",
    preferredGenres: ["Action", "Sci-Fi", "Drama"],
    favoriteActors: ["Leonardo DiCaprio", "Christian Bale"],
    favoriteDirectors: ["Christopher Nolan", "Martin Scorsese"],
    notificationSettings: {
      friendReviews: true,
      newSuggestions: true,
      socialActivity: false,
      weeklyDigest: true,
      watchParties: true,
      movieReleases: true,
      priceDrops: false,
      emailNotifications: true,
    },
    privacySettings: {
      profileVisible: true,
      watchHistoryVisible: true,
      ratingsVisible: true,
      showOnlineStatus: true,
      allowFriendRequests: true,
      shareWatchingActivity: false,
    },
    aiSettings: {
      suggestionsEnabled: true,
      collaborativeFiltering: true,
      moodBasedSuggestions: true,
      timeBasedSuggestions: true,
      weatherBasedSuggestions: false,
      trendingWeight: 30,
      genreWeight: 70,
    },
    displaySettings: {
      theme: "dark",
      language: "en",
      timezone: "America/New_York",
      compactMode: false,
      animationsEnabled: true,
      highContrast: false,
    },
  });

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "preferences", label: "Preferences", icon: Heart },
    { id: "ai", label: "AI Settings", icon: Brain },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "display", label: "Display", icon: Palette },
    { id: "playback", label: "Playback", icon: Film },
    { id: "help", label: "Help", icon: HelpCircle },
  ];

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War",
    "Western",
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
  ];

  const timezones = [
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Seoul",
    "Australia/Sydney",
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast("Settings saved successfully!", "success");
    } catch (error) {
      showToast("Failed to save settings", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (section: keyof UserPreferences, key: string) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key as keyof (typeof prev)[typeof section]],
      },
    }));
  };

  const handleSliderChange = (
    section: keyof UserPreferences,
    key: string,
    value: number,
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const renderToggle = (enabled: boolean, onChange: () => void) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
        enabled ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      <div
        className={`absolute w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-0.5"
        } top-0.5`}
      />
    </button>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <User className="w-5 h-5 text-primary" />
          Profile Information
        </h3>

        <div className="flex items-start gap-6 mb-6">
          <div className="relative">
            <img
              src={state.user?.avatar}
              alt={state.user?.name}
              className="w-24 h-24 object-cover rounded-full"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={state.user?.name || ""}
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <input
                type="text"
                value={state.user?.username || ""}
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              value={state.user?.email || ""}
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bio
            </label>
            <textarea
              value={state.user?.bio || ""}
              rows={3}
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:border-primary resize-none"
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Lock className="w-5 h-5 text-primary" />
          Security
        </h3>
        <div className="space-y-4">
          <button className="w-full glass-button p-4 rounded-xl text-left hover:bg-accent/50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Change Password</h4>
                <p className="text-sm text-muted-foreground">
                  Update your account password
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>
          <button className="w-full glass-button p-4 rounded-xl text-left hover:bg-accent/50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-muted-foreground">
                  Add extra security to your account
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-red-500">Disabled</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </button>
          <button className="w-full glass-button p-4 rounded-xl text-left hover:bg-accent/50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Login Sessions</h4>
                <p className="text-sm text-muted-foreground">
                  Manage your active sessions
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card p-6 border-red-500/30">
        <h3 className="text-xl font-semibold text-red-500 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </h3>
        <div className="space-y-4">
          <button className="w-full glass-button p-4 rounded-xl text-left hover:bg-red-500/10 border border-red-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Export Data</h4>
                <p className="text-sm text-muted-foreground">
                  Download all your data
                </p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full glass-button p-4 rounded-xl text-left hover:bg-red-500/10 border border-red-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-red-500">Delete Account</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account
                </p>
              </div>
              <Trash2 className="w-4 h-4 text-red-500" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      {/* Rewatch Frequency */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <RefreshCw className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Rewatch Preferences
          </h3>
        </div>
        <p className="text-muted-foreground mb-6">
          How often do you like to rewatch movies? This helps our AI decide
          whether to suggest movies you've already seen.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              value: "often",
              label: "Often",
              description: "I love rewatching my favorite movies regularly",
            },
            {
              value: "rarely",
              label: "Rarely",
              description: "I occasionally rewatch special movies",
            },
            {
              value: "never",
              label: "Never",
              description: "I prefer to always watch new content",
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setPreferences({
                  ...preferences,
                  rewatchFrequency: option.value as any,
                })
              }
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                preferences.rewatchFrequency === option.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <h4 className="font-semibold text-foreground mb-2">
                {option.label}
              </h4>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Genres */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Film className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Preferred Genres
          </h3>
        </div>
        <p className="text-muted-foreground mb-6">
          Select your favorite genres to improve recommendations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => {
                const newGenres = preferences.preferredGenres.includes(genre)
                  ? preferences.preferredGenres.filter((g) => g !== genre)
                  : [...preferences.preferredGenres, genre];
                setPreferences({ ...preferences, preferredGenres: newGenres });
              }}
              className={`p-3 rounded-lg text-sm font-medium transition-all ${
                preferences.preferredGenres.includes(genre)
                  ? "bg-primary text-white"
                  : "glass-button"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Favorite People */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              Favorite Actors
            </h3>
          </div>
          <div className="space-y-3">
            {preferences.favoriteActors.map((actor, index) => (
              <div
                key={index}
                className="flex items-center justify-between glass p-3 rounded-lg"
              >
                <span className="text-foreground">{actor}</span>
                <button
                  onClick={() => {
                    const newActors = preferences.favoriteActors.filter(
                      (_, i) => i !== index,
                    );
                    setPreferences({
                      ...preferences,
                      favoriteActors: newActors,
                    });
                  }}
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button className="w-full glass-button p-3 rounded-lg text-muted-foreground hover:text-foreground">
              + Add Actor
            </button>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              Favorite Directors
            </h3>
          </div>
          <div className="space-y-3">
            {preferences.favoriteDirectors.map((director, index) => (
              <div
                key={index}
                className="flex items-center justify-between glass p-3 rounded-lg"
              >
                <span className="text-foreground">{director}</span>
                <button
                  onClick={() => {
                    const newDirectors = preferences.favoriteDirectors.filter(
                      (_, i) => i !== index,
                    );
                    setPreferences({
                      ...preferences,
                      favoriteDirectors: newDirectors,
                    });
                  }}
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button className="w-full glass-button p-3 rounded-lg text-muted-foreground hover:text-foreground">
              + Add Director
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAITab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            AI Recommendation Settings
          </h3>
        </div>
        <p className="text-muted-foreground mb-6">
          Customize how our AI generates suggestions for you
        </p>

        <div className="space-y-6">
          {/* AI Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Enable AI Suggestions
              </h4>
              <p className="text-sm text-muted-foreground">
                Get personalized movie and TV show recommendations
              </p>
            </div>
            {renderToggle(preferences.aiSettings.suggestionsEnabled, () =>
              handleToggle("aiSettings", "suggestionsEnabled"),
            )}
          </div>

          {/* Collaborative Filtering */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Community Recommendations
              </h4>
              <p className="text-sm text-muted-foreground">
                Get suggestions based on users with similar taste
              </p>
            </div>
            {renderToggle(preferences.aiSettings.collaborativeFiltering, () =>
              handleToggle("aiSettings", "collaborativeFiltering"),
            )}
          </div>

          {/* Mood-based Suggestions */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Mood-based Suggestions
              </h4>
              <p className="text-sm text-muted-foreground">
                Recommendations based on your current mood
              </p>
            </div>
            {renderToggle(preferences.aiSettings.moodBasedSuggestions, () =>
              handleToggle("aiSettings", "moodBasedSuggestions"),
            )}
          </div>

          {/* Time-based Suggestions */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Time-based Suggestions
              </h4>
              <p className="text-sm text-muted-foreground">
                Recommendations based on time of day and available time
              </p>
            </div>
            {renderToggle(preferences.aiSettings.timeBasedSuggestions, () =>
              handleToggle("aiSettings", "timeBasedSuggestions"),
            )}
          </div>

          {/* Weather-based Suggestions */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Weather-based Suggestions
              </h4>
              <p className="text-sm text-muted-foreground">
                Recommendations based on current weather conditions
              </p>
            </div>
            {renderToggle(preferences.aiSettings.weatherBasedSuggestions, () =>
              handleToggle("aiSettings", "weatherBasedSuggestions"),
            )}
          </div>

          {/* Weight Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold text-foreground">
                  Genre Preference Weight
                </h4>
                <span className="text-sm text-muted-foreground">
                  {preferences.aiSettings.genreWeight}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={preferences.aiSettings.genreWeight}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  handleSliderChange("aiSettings", "genreWeight", value);
                  handleSliderChange(
                    "aiSettings",
                    "trendingWeight",
                    100 - value,
                  );
                }}
                className="w-full h-2 bg-glass rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Personal Taste</span>
                <span>Popular Content</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Notification Preferences
          </h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Friend Reviews
              </h4>
              <p className="text-sm text-muted-foreground">
                Get notified when friends review movies
              </p>
            </div>
            {renderToggle(preferences.notificationSettings.friendReviews, () =>
              handleToggle("notificationSettings", "friendReviews"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                New Suggestions
              </h4>
              <p className="text-sm text-muted-foreground">
                AI-powered movie recommendations
              </p>
            </div>
            {renderToggle(preferences.notificationSettings.newSuggestions, () =>
              handleToggle("notificationSettings", "newSuggestions"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Social Activity
              </h4>
              <p className="text-sm text-muted-foreground">
                Friends' likes, comments, and activities
              </p>
            </div>
            {renderToggle(preferences.notificationSettings.socialActivity, () =>
              handleToggle("notificationSettings", "socialActivity"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Watch Parties
              </h4>
              <p className="text-sm text-muted-foreground">
                Invitations to watch movies together
              </p>
            </div>
            {renderToggle(preferences.notificationSettings.watchParties, () =>
              handleToggle("notificationSettings", "watchParties"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Movie Releases
              </h4>
              <p className="text-sm text-muted-foreground">
                New releases from favorite actors/directors
              </p>
            </div>
            {renderToggle(preferences.notificationSettings.movieReleases, () =>
              handleToggle("notificationSettings", "movieReleases"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Price Drops
              </h4>
              <p className="text-sm text-muted-foreground">
                Alerts when movie prices drop
              </p>
            </div>
            {renderToggle(preferences.notificationSettings.priceDrops, () =>
              handleToggle("notificationSettings", "priceDrops"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Weekly Digest
              </h4>
              <p className="text-sm text-muted-foreground">
                Weekly summary of recommendations and activity
              </p>
            </div>
            {renderToggle(preferences.notificationSettings.weeklyDigest, () =>
              handleToggle("notificationSettings", "weeklyDigest"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Email Notifications
              </h4>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            {renderToggle(
              preferences.notificationSettings.emailNotifications,
              () => handleToggle("notificationSettings", "emailNotifications"),
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Privacy Settings
          </h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Public Profile
              </h4>
              <p className="text-sm text-muted-foreground">
                Allow others to view your profile
              </p>
            </div>
            {renderToggle(preferences.privacySettings.profileVisible, () =>
              handleToggle("privacySettings", "profileVisible"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Watch History Visibility
              </h4>
              <p className="text-sm text-muted-foreground">
                Let friends see what you've watched
              </p>
            </div>
            {renderToggle(preferences.privacySettings.watchHistoryVisible, () =>
              handleToggle("privacySettings", "watchHistoryVisible"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Ratings Visibility
              </h4>
              <p className="text-sm text-muted-foreground">
                Show your ratings to others
              </p>
            </div>
            {renderToggle(preferences.privacySettings.ratingsVisible, () =>
              handleToggle("privacySettings", "ratingsVisible"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Online Status
              </h4>
              <p className="text-sm text-muted-foreground">
                Show when you're online
              </p>
            </div>
            {renderToggle(preferences.privacySettings.showOnlineStatus, () =>
              handleToggle("privacySettings", "showOnlineStatus"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Friend Requests
              </h4>
              <p className="text-sm text-muted-foreground">
                Allow others to send friend requests
              </p>
            </div>
            {renderToggle(preferences.privacySettings.allowFriendRequests, () =>
              handleToggle("privacySettings", "allowFriendRequests"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Share Watching Activity
              </h4>
              <p className="text-sm text-muted-foreground">
                Show what you're currently watching
              </p>
            </div>
            {renderToggle(
              preferences.privacySettings.shareWatchingActivity,
              () => handleToggle("privacySettings", "shareWatchingActivity"),
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDisplayTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Display Settings
          </h3>
        </div>

        <div className="space-y-6">
          {/* Theme Selection */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Theme</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "light", label: "Light", icon: Sun },
                { value: "dark", label: "Dark", icon: Moon },
                { value: "auto", label: "Auto", icon: Monitor },
              ].map((theme) => {
                const Icon = theme.icon;
                return (
                  <button
                    key={theme.value}
                    onClick={() =>
                      setPreferences({
                        ...preferences,
                        displaySettings: {
                          ...preferences.displaySettings,
                          theme: theme.value as any,
                        },
                      })
                    }
                    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      preferences.displaySettings.theme === theme.value
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{theme.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Language</h4>
            <select
              value={preferences.displaySettings.language}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  displaySettings: {
                    ...preferences.displaySettings,
                    language: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"
            >
              {languages.map((lang) => (
                <option
                  key={lang.code}
                  value={lang.code}
                  className="bg-background"
                >
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Timezone */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Timezone</h4>
            <select
              value={preferences.displaySettings.timezone}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  displaySettings: {
                    ...preferences.displaySettings,
                    timezone: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz} className="bg-background">
                  {tz}
                </option>
              ))}
            </select>
          </div>

          {/* Display Options */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Compact Mode
              </h4>
              <p className="text-sm text-muted-foreground">
                Use smaller cards and reduced spacing
              </p>
            </div>
            {renderToggle(preferences.displaySettings.compactMode, () =>
              handleToggle("displaySettings", "compactMode"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">Animations</h4>
              <p className="text-sm text-muted-foreground">
                Enable smooth transitions and animations
              </p>
            </div>
            {renderToggle(preferences.displaySettings.animationsEnabled, () =>
              handleToggle("displaySettings", "animationsEnabled"),
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                High Contrast
              </h4>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better visibility
              </p>
            </div>
            {renderToggle(preferences.displaySettings.highContrast, () =>
              handleToggle("displaySettings", "highContrast"),
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaybackTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Film className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Playback Settings
          </h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">Autoplay</h4>
              <p className="text-sm text-muted-foreground">
                Automatically play trailers and previews
              </p>
            </div>
            {renderToggle(preferences.playbackSettings.autoplay, () =>
              handleToggle("playbackSettings", "autoplay"),
            )}
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">
              Video Quality
            </h4>
            <select
              value={preferences.playbackSettings.qualityPreference}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  playbackSettings: {
                    ...preferences.playbackSettings,
                    qualityPreference: e.target.value as any,
                  },
                })
              }
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"
            >
              <option value="auto" className="bg-background">
                Auto
              </option>
              <option value="high" className="bg-background">
                High (1080p)
              </option>
              <option value="medium" className="bg-background">
                Medium (720p)
              </option>
              <option value="low" className="bg-background">
                Low (480p)
              </option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">Subtitles</h4>
              <p className="text-sm text-muted-foreground">
                Enable subtitles by default
              </p>
            </div>
            {renderToggle(preferences.playbackSettings.subtitlesEnabled, () =>
              handleToggle("playbackSettings", "subtitlesEnabled"),
            )}
          </div>

          {preferences.playbackSettings.subtitlesEnabled && (
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Subtitle Language
              </h4>
              <select
                value={preferences.playbackSettings.subtitleLanguage}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    playbackSettings: {
                      ...preferences.playbackSettings,
                      subtitleLanguage: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"
              >
                {languages.map((lang) => (
                  <option
                    key={lang.code}
                    value={lang.code}
                    className="bg-background"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">Sound</h4>
              <p className="text-sm text-muted-foreground">
                Enable audio for previews
              </p>
            </div>
            {renderToggle(preferences.playbackSettings.soundEnabled, () =>
              handleToggle("playbackSettings", "soundEnabled"),
            )}
          </div>

          {preferences.playbackSettings.soundEnabled && (
            <div>
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold text-foreground">Volume</h4>
                <span className="text-sm text-muted-foreground">
                  {preferences.playbackSettings.volume}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={preferences.playbackSettings.volume}
                onChange={(e) =>
                  handleSliderChange(
                    "playbackSettings",
                    "volume",
                    parseInt(e.target.value),
                  )
                }
                className="w-full h-2 bg-glass rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderHelpTab = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Help & Support
          </h3>
        </div>

        <div className="space-y-4">
          <button className="w-full glass-button p-4 rounded-xl text-left hover:bg-accent/50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">FAQ</h4>
                <p className="text-sm text-muted-foreground">
                  Frequently asked questions
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>

          <button className="w-full glass-button p-4 rounded-xl text-left hover:bg-accent/50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Contact Support</h4>
                <p className="text-sm text-muted-foreground">
                  Get help from our team
                </p>
              </div>
              <Mail className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>

          <button className="w-full glass-button p-4 rounded-xl text-left hover:bg-accent/50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Privacy Policy</h4>
                <p className="text-sm text-muted-foreground">
                  How we handle your data
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>

          <button className="w-full glass-button p-4 rounded-xl text-left hover:bg-accent/50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  Terms of Service
                </h4>
                <p className="text-sm text-muted-foreground">
                  Our terms and conditions
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>

          <div className="glass bg-accent/30 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  App Version
                </h4>
                <p className="text-sm text-muted-foreground">
                  CineTracker v1.2.0
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Last updated: January 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Sign Out</h3>
        <p className="text-muted-foreground mb-4">
          Sign out of your account on this device
        </p>
        <button className="glass-button px-6 py-3 rounded-xl flex items-center gap-2 text-foreground hover:bg-accent/50">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-background min-h-screen">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Settings
                </h1>
                <p className="text-muted-foreground">
                  Customize your CineTracker experience
                </p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-white"
                      : "glass-button text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "account" && renderAccountTab()}
          {activeTab === "preferences" && renderPreferencesTab()}
          {activeTab === "ai" && renderAITab()}
          {activeTab === "notifications" && renderNotificationsTab()}
          {activeTab === "privacy" && renderPrivacyTab()}
          {activeTab === "display" && renderDisplayTab()}
          {activeTab === "playback" && renderPlaybackTab()}
          {activeTab === "help" && renderHelpTab()}
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="glass-card max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold text-foreground">
                  Delete Account
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                This action cannot be undone. This will permanently delete your
                account and all associated data.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 glass-button py-3 rounded-xl"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition-all">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
