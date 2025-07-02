import React, { useState } from "react";
import {
  Users,
  UserPlus,
  MessageCircle,
  Search,
  MoreHorizontal,
  Star,
  Calendar,
  Settings,
  Send,
  Phone,
  Video,
  Heart,
  Film,
} from "lucide-react";
import { useAppContext } from "../lib/app-context";

const SocialPage: React.FC = () => {
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState("friends");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  // Mock friends data
  const friends = [
    {
      id: 1,
      name: "Sarah Chen",
      username: "sarahc",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      status: "online",
      lastSeen: "2 min ago",
      mutualMovies: 23,
      favoriteGenre: "Sci-Fi",
    },
    {
      id: 2,
      name: "Mike Johnson",
      username: "mikej",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      status: "watching",
      lastSeen: "5 min ago",
      mutualMovies: 18,
      favoriteGenre: "Action",
    },
    {
      id: 3,
      name: "Emma Davis",
      username: "emmad",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      status: "offline",
      lastSeen: "1 hour ago",
      mutualMovies: 31,
      favoriteGenre: "Drama",
    },
  ];

  // Mock chat data
  const chats = [
    {
      id: 1,
      name: "Movie Night Planning",
      type: "group",
      participants: 4,
      lastMessage: "What about watching Inception tonight?",
      lastTime: "2 min ago",
      unread: 3,
    },
    {
      id: 2,
      name: "Sarah Chen",
      type: "direct",
      lastMessage: "Just finished watching that movie you recommended!",
      lastTime: "5 min ago",
      unread: 1,
    },
    {
      id: 3,
      name: "Horror Movie Club",
      type: "group",
      participants: 8,
      lastMessage: "Anyone up for a scary movie marathon this weekend?",
      lastTime: "1 hour ago",
      unread: 0,
    },
  ];

  const tabs = [
    { id: "friends", label: "Friends", icon: Users },
    { id: "discover", label: "Discover", icon: UserPlus },
    { id: "chats", label: "Chats", icon: MessageCircle },
  ];

  const renderFriendsTab = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-background-secondary transition-all"
        />
      </div>

      {/* Friends List */}
      <div className="space-y-4">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="glass-card p-4 hover:bg-card-hover transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                    friend.status === "online"
                      ? "bg-green-500"
                      : friend.status === "watching"
                        ? "bg-primary"
                        : "bg-gray-500"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">
                    {friend.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    @{friend.username}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{friend.mutualMovies} mutual movies</span>
                  <span>•</span>
                  <span>Loves {friend.favoriteGenre}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="glass-button p-2 rounded-lg">
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button className="glass-button p-2 rounded-lg">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDiscoverTab = () => (
    <div className="space-y-6">
      <div className="text-center glass-card p-8">
        <UserPlus className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Discover Movie Friends
        </h3>
        <p className="text-muted-foreground mb-6">
          Connect with people who share your taste in movies
        </p>
        <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-medium transition-all">
          Find Friends
        </button>
      </div>

      {/* Suggested Friends */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Suggested for You
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-accent/50 rounded-xl p-4 text-center">
              <img
                src={`https://images.unsplash.com/photo-${1500648767791 + i}-c3f69c80808e?w=80&h=80&fit=crop&crop=face`}
                alt="User"
                className="w-16 h-16 object-cover rounded-full mx-auto mb-3"
              />
              <h4 className="font-medium text-foreground mb-1">User {i}</h4>
              <p className="text-sm text-muted-foreground mb-3">85% match</p>
              <button className="glass-button px-4 py-2 rounded-lg text-sm">
                Add Friend
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChatsTab = () => (
    <div className="space-y-4">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`glass-card p-4 cursor-pointer transition-all ${
            selectedChat === chat.id
              ? "bg-primary/10 border-primary/30"
              : "hover:bg-card-hover"
          }`}
          onClick={() => setSelectedChat(chat.id)}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                {chat.type === "group" ? (
                  <Users className="w-6 h-6 text-primary" />
                ) : (
                  <MessageCircle className="w-6 h-6 text-primary" />
                )}
              </div>
              {chat.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">
                    {chat.unread}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">{chat.name}</h3>
                {chat.type === "group" && (
                  <span className="text-xs text-muted-foreground">
                    {chat.participants} members
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {chat.lastMessage}
              </p>
            </div>
            <div className="text-xs text-muted-foreground">{chat.lastTime}</div>
          </div>
        </div>
      ))}

      {/* Chat Actions */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <button className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-medium transition-all">
            Start New Chat
          </button>
          <button className="glass-button p-3 rounded-xl">
            <Users className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-background min-h-screen">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Social Hub
              </h1>
              <p className="text-muted-foreground">
                Connect with friends and share your movie experiences
              </p>
            </div>
            <button className="glass-button p-3 rounded-xl">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <nav className="flex gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="glass-card p-6">
          {activeTab === "friends" && renderFriendsTab()}
          {activeTab === "discover" && renderDiscoverTab()}
          {activeTab === "chats" && renderChatsTab()}
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
