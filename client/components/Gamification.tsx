import React, { useState, useEffect } from "react";
import {
  Trophy,
  Star,
  Zap,
  Target,
  Award,
  Medal,
  Crown,
  Flame,
  Users,
  Calendar,
  Film,
  TrendingUp,
  CheckCircle,
  Lock,
  Gift,
} from "lucide-react";
import { useAppContext, useToast } from "../lib/app-context";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: "streak" | "genre" | "social" | "rating" | "milestone";
  requirement: number;
  progress: number;
  unlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
  reward: string;
  unlockedDate?: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "monthly" | "seasonal";
  target: number;
  progress: number;
  timeLeft: string;
  reward: string;
  participants?: number;
  isActive: boolean;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  earned: boolean;
  earnedDate?: string;
}

const GamificationDashboard: React.FC = () => {
  const { state } = useAppContext();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("achievements");
  const [userLevel, setUserLevel] = useState(12);
  const [currentXP, setCurrentXP] = useState(2340);
  const [nextLevelXP, setNextLevelXP] = useState(2500);

  // Mock data - in real app, this would come from backend
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first-movie",
      title: "First Steps",
      description: "Watch your first movie",
      icon: Film,
      category: "milestone",
      requirement: 1,
      progress: 1,
      unlocked: true,
      rarity: "common",
      reward: "+50 XP",
      unlockedDate: "2024-01-15",
    },
    {
      id: "movie-marathon",
      title: "Movie Marathon",
      description: "Watch 10 movies in a single day",
      icon: Zap,
      category: "streak",
      requirement: 10,
      progress: 3,
      unlocked: false,
      rarity: "epic",
      reward: "+500 XP, Marathon Badge",
    },
    {
      id: "genre-explorer",
      title: "Genre Explorer",
      description: "Watch movies from 10 different genres",
      icon: Target,
      category: "genre",
      requirement: 10,
      progress: 7,
      unlocked: false,
      rarity: "rare",
      reward: "+200 XP, Explorer Badge",
    },
    {
      id: "social-butterfly",
      title: "Social Butterfly",
      description: "Add 25 friends",
      icon: Users,
      category: "social",
      requirement: 25,
      progress: 12,
      unlocked: false,
      rarity: "rare",
      reward: "+300 XP, Social Badge",
    },
    {
      id: "critic",
      title: "Movie Critic",
      description: "Rate 100 movies",
      icon: Star,
      category: "rating",
      requirement: 100,
      progress: 67,
      unlocked: false,
      rarity: "epic",
      reward: "+400 XP, Critic Badge",
    },
    {
      id: "legendary-viewer",
      title: "Legendary Viewer",
      description: "Watch 1000 movies",
      icon: Crown,
      category: "milestone",
      requirement: 1000,
      progress: 89,
      unlocked: false,
      rarity: "legendary",
      reward: "+1000 XP, Crown Badge, Special Title",
    },
  ]);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "daily-watch",
      title: "Daily Movie",
      description: "Watch 1 movie today",
      type: "daily",
      target: 1,
      progress: 0,
      timeLeft: "18h 30m",
      reward: "+50 XP",
      isActive: true,
    },
    {
      id: "weekend-binge",
      title: "Weekend Warrior",
      description: "Watch 5 movies this weekend",
      type: "weekly",
      target: 5,
      progress: 2,
      timeLeft: "2d 14h",
      reward: "+200 XP, Weekend Badge",
      participants: 234,
      isActive: true,
    },
    {
      id: "january-challenge",
      title: "New Year, New Movies",
      description: "Watch 31 movies in January",
      type: "monthly",
      target: 31,
      progress: 12,
      timeLeft: "18d 6h",
      reward: "+500 XP, Resolution Badge",
      participants: 1205,
      isActive: true,
    },
    {
      id: "winter-cozy",
      title: "Cozy Winter Viewing",
      description: "Watch 15 romance/family movies this winter",
      type: "seasonal",
      target: 15,
      progress: 4,
      timeLeft: "45d 12h",
      reward: "+300 XP, Cozy Badge",
      participants: 567,
      isActive: true,
    },
  ]);

  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "early-bird",
      name: "Early Bird",
      description: "Watch movies before 9 AM",
      icon: Calendar,
      color: "text-yellow-500",
      earned: true,
      earnedDate: "2024-01-20",
    },
    {
      id: "night-owl",
      name: "Night Owl",
      description: "Watch movies after midnight",
      icon: Film,
      color: "text-purple-500",
      earned: true,
      earnedDate: "2024-01-18",
    },
    {
      id: "trend-setter",
      name: "Trend Setter",
      description: "Watch trending movies within 24h of release",
      icon: TrendingUp,
      color: "text-green-500",
      earned: false,
    },
    {
      id: "perfectionist",
      name: "Perfectionist",
      description: "Rate 10 movies with 5 stars",
      icon: Star,
      color: "text-blue-500",
      earned: false,
    },
  ]);

  const tabs = [
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "challenges", label: "Challenges", icon: Target },
    { id: "badges", label: "Badges", icon: Medal },
    { id: "leaderboard", label: "Leaderboard", icon: Crown },
  ];

  const rarityColors = {
    common: "border-gray-400 bg-gray-400/10",
    rare: "border-blue-400 bg-blue-400/10",
    epic: "border-purple-400 bg-purple-400/10",
    legendary: "border-yellow-400 bg-yellow-400/10",
  };

  const handleClaimReward = (achievementId: string) => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === achievementId
          ? {
              ...achievement,
              unlocked: true,
              unlockedDate: new Date().toISOString(),
            }
          : achievement,
      ),
    );
    showToast("Achievement unlocked! Reward claimed.", "success");
    setCurrentXP((prev) => prev + 100);
  };

  const renderProgressBar = (progress: number, target: number) => {
    const percentage = Math.min((progress / target) * 100, 100);
    return (
      <div className="w-full bg-glass rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  const renderAchievementsTab = () => (
    <div className="space-y-6">
      {/* Level Progress */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">{userLevel}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                Level {userLevel}
              </h3>
              <p className="text-muted-foreground">Movie Enthusiast</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {currentXP} XP
            </div>
            <div className="text-sm text-muted-foreground">
              {nextLevelXP - currentXP} XP to next level
            </div>
          </div>
        </div>
        {renderProgressBar(currentXP, nextLevelXP)}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          const isClaimable =
            achievement.progress >= achievement.requirement &&
            !achievement.unlocked;

          return (
            <div
              key={achievement.id}
              className={`glass-card p-6 relative ${rarityColors[achievement.rarity]} ${
                achievement.unlocked ? "opacity-80" : ""
              }`}
            >
              {/* Rarity Indicator */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    achievement.rarity === "legendary"
                      ? "bg-yellow-400/20 text-yellow-400"
                      : achievement.rarity === "epic"
                        ? "bg-purple-400/20 text-purple-400"
                        : achievement.rarity === "rare"
                          ? "bg-blue-400/20 text-blue-400"
                          : "bg-gray-400/20 text-gray-400"
                  }`}
                >
                  {achievement.rarity}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    achievement.unlocked
                      ? "bg-green-500/20"
                      : isClaimable
                        ? "bg-primary/20"
                        : "bg-glass"
                  }`}
                >
                  {achievement.unlocked ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : (
                    <Icon
                      className={`w-8 h-8 ${
                        isClaimable ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {achievement.description}
                  </p>

                  {!achievement.unlocked && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground">
                          {achievement.progress}/{achievement.requirement}
                        </span>
                      </div>
                      {renderProgressBar(
                        achievement.progress,
                        achievement.requirement,
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      {achievement.reward}
                    </span>
                    {achievement.unlocked ? (
                      <div className="flex items-center gap-1 text-sm text-green-500">
                        <CheckCircle className="w-4 h-4" />
                        Unlocked
                      </div>
                    ) : isClaimable ? (
                      <button
                        onClick={() => handleClaimReward(achievement.id)}
                        className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                      >
                        Claim
                      </button>
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderChallengesTab = () => (
    <div className="space-y-6">
      {challenges.map((challenge) => (
        <div key={challenge.id} className="glass-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {challenge.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    challenge.type === "daily"
                      ? "bg-green-500/20 text-green-500"
                      : challenge.type === "weekly"
                        ? "bg-blue-500/20 text-blue-500"
                        : challenge.type === "monthly"
                          ? "bg-purple-500/20 text-purple-500"
                          : "bg-orange-500/20 text-orange-500"
                  }`}
                >
                  {challenge.type}
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                {challenge.description}
              </p>
            </div>
            <div className="text-right ml-6">
              <div className="text-sm text-muted-foreground mb-1">
                Time Left
              </div>
              <div className="font-semibold text-foreground">
                {challenge.timeLeft}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground">
                  {challenge.progress}/{challenge.target}
                </span>
              </div>
              {renderProgressBar(challenge.progress, challenge.target)}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-primary">
                  <Gift className="w-4 h-4" />
                  {challenge.reward}
                </div>
                {challenge.participants && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {challenge.participants.toLocaleString()} participants
                  </div>
                )}
              </div>

              {challenge.progress >= challenge.target ? (
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                  Claim Reward
                </button>
              ) : (
                <div className="text-sm text-muted-foreground">
                  {((challenge.progress / challenge.target) * 100).toFixed(0)}%
                  Complete
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBadgesTab = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {badges.map((badge) => {
        const Icon = badge.icon;

        return (
          <div
            key={badge.id}
            className={`glass-card p-6 text-center ${
              badge.earned ? "bg-primary/5 border-primary/30" : "opacity-60"
            }`}
          >
            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                badge.earned ? "bg-primary/20" : "bg-glass"
              }`}
            >
              <Icon
                className={`w-8 h-8 ${badge.earned ? badge.color : "text-muted-foreground"}`}
              />
            </div>
            <h4 className="font-semibold text-foreground mb-2">{badge.name}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {badge.description}
            </p>
            {badge.earned ? (
              <div className="text-sm text-green-500">
                Earned {new Date(badge.earnedDate || "").toLocaleDateString()}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Not earned</div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderLeaderboardTab = () => (
    <div className="glass-card p-12 text-center">
      <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Leaderboard Coming Soon
      </h3>
      <p className="text-muted-foreground">
        Compete with friends and see who's the ultimate movie enthusiast!
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-4 overflow-x-auto">
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

      {/* Tab Content */}
      <div>
        {activeTab === "achievements" && renderAchievementsTab()}
        {activeTab === "challenges" && renderChallengesTab()}
        {activeTab === "badges" && renderBadgesTab()}
        {activeTab === "leaderboard" && renderLeaderboardTab()}
      </div>
    </div>
  );
};

export default GamificationDashboard;
