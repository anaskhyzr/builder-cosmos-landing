import React, { useState } from "react";
import {
  Users,
  UserPlus,
  MessageCircle,
  Play,
  Calendar,
  Trophy,
  Crown,
  Star,
  Clock,
  Video,
  Share2,
  Plus,
  Search,
  Filter,
  Zap,
  Target,
  Award,
  Flame,
  Heart,
  Eye,
  Film,
  MoreHorizontal,
  Phone,
  Send,
} from "lucide-react";
import { useAppContext } from "../lib/app-context";

interface WatchParty {
  id: string;
  movieTitle: string;
  moviePoster: string;
  hostName: string;
  hostAvatar: string;
  scheduledTime: string;
  participants: number;
  maxParticipants: number;
  isLive: boolean;
  platform: string;
  description: string;
}

interface MovieClub {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  currentMovie: string;
  nextMeeting: string;
  isPrivate: boolean;
  bannerImage: string;
  moderators: string[];
}

interface MovieChallenge {
  id: string;
  title: string;
  description: string;
  type: "weekly" | "monthly" | "themed";
  participants: number;
  prize: string;
  deadline: string;
  progress: number;
  isParticipating: boolean;
  requirements: string[];
}

interface UserList {
  id: string;
  title: string;
  description: string;
  movieCount: number;
  isPublic: boolean;
  likes: number;
  creator: string;
  createdDate: string;
  thumbnail: string;
}

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  status: "online" | "offline" | "watching";
  lastSeen: string;
  mutualFriends: number;
  commonMovies: number;
  isOnline: boolean;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  message: string;
  timestamp: string;
  type: "text" | "movie" | "image";
  movieData?: {
    title: string;
    poster: string;
    rating: number;
  };
}

interface ChatConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: ChatMessage[];
}

const EnhancedSocialPage: React.FC = () => {
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState("friends");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showAddFriend, setShowAddFriend] = useState(false);

  // Mock friends data
  const friends: Friend[] = [
    {
      id: "1",
      name: "Sarah Chen",
      username: "sarahc_movies",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      status: "online",
      lastSeen: "now",
      mutualFriends: 12,
      commonMovies: 45,
      isOnline: true,
    },
    {
      id: "2",
      name: "Mike Johnson",
      username: "mikej_cinema",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      status: "watching",
      lastSeen: "5 min ago",
      mutualFriends: 8,
      commonMovies: 32,
      isOnline: true,
    },
    {
      id: "3",
      name: "Emma Davis",
      username: "emmad_films",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      status: "offline",
      lastSeen: "2 hours ago",
      mutualFriends: 15,
      commonMovies: 67,
      isOnline: false,
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      username: "alexr_moviebuff",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-c3f69c80808e?w=100&h=100&fit=crop&crop=face",
      status: "online",
      lastSeen: "now",
      mutualFriends: 6,
      commonMovies: 28,
      isOnline: true,
    },
  ];

  // Mock chat conversations
  const [conversations, setConversations] = useState<ChatConversation[]>([
    {
      id: "chat-1",
      participantId: "1",
      participantName: "Sarah Chen",
      participantAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      lastMessage: "Have you seen the new Spider-Man movie?",
      lastMessageTime: "2 min ago",
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: "msg-1",
          senderId: "1",
          senderName: "Sarah Chen",
          senderAvatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
          message: "Hey! What are you watching tonight?",
          timestamp: "10:30 PM",
          type: "text",
        },
        {
          id: "msg-2",
          senderId: "me",
          senderName: "You",
          senderAvatar: state.user?.avatar || "",
          message: "Not sure yet! Any recommendations?",
          timestamp: "10:32 PM",
          type: "text",
        },
        {
          id: "msg-3",
          senderId: "1",
          senderName: "Sarah Chen",
          senderAvatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
          message: "Have you seen the new Spider-Man movie?",
          timestamp: "10:35 PM",
          type: "text",
        },
      ],
    },
    {
      id: "chat-2",
      participantId: "2",
      participantName: "Mike Johnson",
      participantAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      lastMessage: "Movie night tomorrow?",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: "msg-4",
          senderId: "2",
          senderName: "Mike Johnson",
          senderAvatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          message: "Movie night tomorrow?",
          timestamp: "9:30 PM",
          type: "text",
        },
      ],
    },
  ]);

  // Mock suggested friends
  const suggestedFriends: Friend[] = [
    {
      id: "5",
      name: "Jessica Park",
      username: "jess_cinephile",
      avatar:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
      status: "online",
      lastSeen: "now",
      mutualFriends: 5,
      commonMovies: 23,
      isOnline: true,
    },
    {
      id: "6",
      name: "David Kim",
      username: "david_movies",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      status: "offline",
      lastSeen: "1 day ago",
      mutualFriends: 3,
      commonMovies: 18,
      isOnline: false,
    },
  ];

  // Mock data
  const watchParties: WatchParty[] = [
    {
      id: "1",
      movieTitle: "Spider-Man: Across the Spider-Verse",
      moviePoster:
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=450&fit=crop",
      hostName: "Sarah Chen",
      hostAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      scheduledTime: "2024-01-25 8:00 PM",
      participants: 8,
      maxParticipants: 12,
      isLive: false,
      platform: "Netflix",
      description:
        "Join us for an amazing animated adventure! Bringing snacks and good vibes.",
    },
    {
      id: "2",
      movieTitle: "The Dark Knight",
      moviePoster:
        "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
      hostName: "Mike Johnson",
      hostAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      scheduledTime: "Live Now",
      participants: 15,
      maxParticipants: 20,
      isLive: true,
      platform: "HBO Max",
      description: "Classic Nolan masterpiece watch party. No spoilers please!",
    },
  ];

  const movieClubs: MovieClub[] = [
    {
      id: "1",
      name: "Sci-Fi Enthusiasts",
      description:
        "Exploring the best science fiction films from classic to contemporary",
      memberCount: 234,
      category: "Sci-Fi",
      currentMovie: "Blade Runner 2049",
      nextMeeting: "2024-01-30 7:00 PM",
      isPrivate: false,
      bannerImage:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
      moderators: ["Alex Kim", "Rachel Green"],
    },
    {
      id: "2",
      name: "Horror Movie Club",
      description: "For those who love a good scare and spine-tingling thrills",
      memberCount: 156,
      category: "Horror",
      currentMovie: "Hereditary",
      nextMeeting: "2024-02-01 9:00 PM",
      isPrivate: false,
      bannerImage:
        "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&h=400&fit=crop",
      moderators: ["Jordan Smith"],
    },
  ];

  const movieChallenges: MovieChallenge[] = [
    {
      id: "1",
      title: "Around the World in 30 Films",
      description: "Watch movies from 30 different countries this month",
      type: "monthly",
      participants: 1250,
      prize: "Premium subscription + exclusive badge",
      deadline: "2024-01-31",
      progress: 12,
      isParticipating: true,
      requirements: [
        "Watch films from 30 different countries",
        "Rate each film",
        "Share one review",
      ],
    },
    {
      id: "2",
      title: "Oscar Prediction Challenge",
      description: "Predict this year's Oscar winners before the ceremony",
      type: "themed",
      participants: 2341,
      prize: "Movie theater gift cards",
      deadline: "2024-03-10",
      progress: 0,
      isParticipating: false,
      requirements: [
        "Submit predictions for all major categories",
        "Watch at least 5 nominated films",
        "Participate in prediction discussion",
      ],
    },
  ];

  const userLists: UserList[] = [
    {
      id: "1",
      title: "Hidden Gems of 2023",
      description: "Underrated movies that deserve more attention",
      movieCount: 25,
      isPublic: true,
      likes: 342,
      creator: "FilmBuff_2023",
      createdDate: "2024-01-15",
      thumbnail:
        "https://images.unsplash.com/photo-1489599558132-3b4b0b7c11c2?w=300&h=200&fit=crop",
    },
    {
      id: "2",
      title: "Best Date Night Movies",
      description: "Perfect romantic films for couples",
      movieCount: 18,
      isPublic: true,
      likes: 567,
      creator: "RomanceExpert",
      createdDate: "2024-01-10",
      thumbnail:
        "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=200&fit=crop",
    },
  ];

  const tabs = [
    { id: "friends", label: "Friends", icon: Users },
    { id: "chats", label: "Chats", icon: MessageCircle },
    { id: "watch-parties", label: "Watch Parties", icon: Play },
    { id: "movie-clubs", label: "Movie Clubs", icon: Users },
    { id: "challenges", label: "Challenges", icon: Trophy },
    { id: "user-lists", label: "Movie Lists", icon: Star },
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      senderName: "You",
      senderAvatar: state.user?.avatar || "",
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "text",
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedChat
          ? {
              ...conv,
              messages: [...conv.messages, newMsg],
              lastMessage: newMessage,
              lastMessageTime: "now",
            }
          : conv,
      ),
    );

    setNewMessage("");
  };

  const handleAddFriend = (friendId: string) => {
    console.log("Adding friend:", friendId);
    setShowAddFriend(false);
  };

  const renderFriendsTab = () => (
    <div className="space-y-6">
      {/* Add Friend Section */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">My Friends</h3>
          <button
            onClick={() => setShowAddFriend(true)}
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            Add Friend
          </button>
        </div>

        {/* Search Friends */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>

        {/* Friends List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          ? "bg-blue-500"
                          : "bg-gray-500"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">
                    {friend.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    @{friend.username}
                  </p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>{friend.mutualFriends} mutual friends</span>
                    <span>•</span>
                    <span>{friend.commonMovies} common movies</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const existingConv = conversations.find(
                        (c) => c.participantId === friend.id,
                      );
                      if (existingConv) {
                        setSelectedChat(existingConv.id);
                      } else {
                        setSelectedChat(`chat-${friend.id}`);
                      }
                    }}
                    className="glass-button p-2 rounded-lg"
                  >
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

      {/* Suggested Friends */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          People You May Know
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedFriends.map((friend) => (
            <div key={friend.id} className="glass bg-accent/30 p-4 rounded-xl">
              <div className="flex items-center gap-4">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">
                    {friend.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    @{friend.username}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {friend.mutualFriends} mutual friends
                  </p>
                </div>
                <button
                  onClick={() => handleAddFriend(friend.id)}
                  className="bg-primary hover:bg-primary-hover text-white px-3 py-1 rounded-lg text-sm transition-all"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChatsTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Chat List */}
      <div className="lg:col-span-1">
        <div className="glass-card h-full flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Messages
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {conversations && conversations.length > 0 ? (
              conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-accent/30 transition-all text-left ${
                    selectedChat === conv.id
                      ? "bg-primary/10 border-r-2 border-primary"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    {conv.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-foreground truncate">
                        {conv.participantName}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {conv.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs">
                      {conv.unreadCount}
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No conversations yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <div className="glass-card h-full flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      conversations.find((c) => c.id === selectedChat)
                        ?.participantAvatar
                    }
                    alt=""
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {
                        conversations.find((c) => c.id === selectedChat)
                          ?.participantName
                      }
                    </h3>
                    <p className="text-sm text-green-500">Online</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <button className="glass-button p-2 rounded-lg">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="glass-button p-2 rounded-lg">
                      <Video className="w-4 h-4" />
                    </button>
                    <button className="glass-button p-2 rounded-lg">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4">
                {conversations
                  .find((c) => c.id === selectedChat)
                  ?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.senderId === "me" ? "flex-row-reverse" : ""}`}
                    >
                      <img
                        src={message.senderAvatar}
                        alt=""
                        className="w-8 h-8 object-cover rounded-full flex-shrink-0"
                      />
                      <div
                        className={`max-w-xs lg:max-w-md ${message.senderId === "me" ? "text-right" : ""}`}
                      >
                        <div
                          className={`p-3 rounded-xl ${
                            message.senderId === "me"
                              ? "bg-primary text-white"
                              : "bg-accent text-foreground"
                          }`}
                        >
                          <p>{message.message}</p>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1 block">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <button className="glass-button p-2 rounded-lg">
                    <Plus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="bg-primary hover:bg-primary-hover text-white p-2 rounded-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Select a conversation
                </h3>
                <p className="text-muted-foreground">
                  Choose a friend to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderWatchPartiesTab = () => (
    <div className="space-y-6">
      {/* Create Party Button */}
      <div className="glass-card p-6 text-center bg-gradient-to-r from-primary/10 to-primary/5">
        <Video className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Start Your Own Watch Party
        </h3>
        <p className="text-muted-foreground mb-4">
          Invite friends to watch movies together in real-time
        </p>
        <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-medium transition-all">
          Create Watch Party
        </button>
      </div>

      {/* Active and Upcoming Parties */}
      <div className="space-y-4">
        {watchParties.map((party) => (
          <div key={party.id} className="glass-card p-6">
            <div className="flex gap-6">
              <img
                src={party.moviePoster}
                alt={party.movieTitle}
                className="w-24 h-36 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {party.movieTitle}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>Hosted by {party.hostName}</span>
                      <span>•</span>
                      <span>{party.platform}</span>
                    </div>
                  </div>
                  {party.isLive && (
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground mb-4">
                  {party.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {party.scheduledTime}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {party.participants}/{party.maxParticipants}
                    </div>
                  </div>
                  <button
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      party.isLive
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-primary hover:bg-primary-hover text-white"
                    }`}
                  >
                    {party.isLive ? "Join Now" : "RSVP"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMovieClubsTab = () => (
    <div className="space-y-6">
      {/* Join/Create Club Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 text-center">
          <Users className="w-12 h-12 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Join a Club
          </h3>
          <p className="text-muted-foreground mb-4">
            Find communities that share your movie interests
          </p>
          <button className="glass-button px-4 py-2 rounded-lg">
            Browse Clubs
          </button>
        </div>
        <div className="glass-card p-6 text-center">
          <Plus className="w-12 h-12 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Create Club
          </h3>
          <p className="text-muted-foreground mb-4">
            Start your own movie discussion community
          </p>
          <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-all">
            Create Club
          </button>
        </div>
      </div>

      {/* Club List */}
      <div className="space-y-4">
        {movieClubs.map((club) => (
          <div key={club.id} className="glass-card overflow-hidden">
            <div
              className="h-32 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${club.bannerImage})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-4 left-6 text-white">
                <h3 className="text-xl font-bold mb-1">{club.name}</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span>{club.memberCount} members</span>
                  <span>•</span>
                  <span>{club.category}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">{club.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-muted-foreground block">
                    Currently Discussing
                  </span>
                  <span className="font-medium text-foreground">
                    {club.currentMovie}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block">
                    Next Meeting
                  </span>
                  <span className="font-medium text-foreground">
                    {club.nextMeeting}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Moderated by:
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {club.moderators.join(", ")}
                  </span>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-all">
                  Join Club
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChallengesTab = () => (
    <div className="space-y-6">
      {movieChallenges.map((challenge) => (
        <div key={challenge.id} className="glass-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {challenge.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    challenge.type === "weekly"
                      ? "bg-green-500/20 text-green-500"
                      : challenge.type === "monthly"
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-purple-500/20 text-purple-500"
                  }`}
                >
                  {challenge.type}
                </span>
                {challenge.isParticipating && (
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                    Participating
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-4">
                {challenge.description}
              </p>
            </div>
            <div className="text-right ml-6">
              <div className="text-sm text-muted-foreground mb-1">Deadline</div>
              <div className="font-semibold text-foreground">
                {new Date(challenge.deadline).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {challenge.isParticipating && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Your Progress</span>
                  <span className="text-foreground">
                    {challenge.progress}/30
                  </span>
                </div>
                <div className="w-full bg-glass rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{
                      width: `${(challenge.progress / 30) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <div className="glass bg-accent/30 p-4 rounded-xl">
              <h4 className="font-medium text-foreground mb-2">Requirements</h4>
              <ul className="space-y-1">
                {challenge.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Target className="w-3 h-3" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 text-sm text-primary">
                  <Trophy className="w-4 h-4" />
                  {challenge.prize}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {challenge.participants.toLocaleString()} participants
                </div>
              </div>

              {challenge.isParticipating ? (
                <button className="glass-button px-4 py-2 rounded-lg text-muted-foreground">
                  View Progress
                </button>
              ) : (
                <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg transition-all">
                  Join Challenge
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderUserListsTab = () => (
    <div className="space-y-6">
      {/* Create List Button */}
      <div className="glass-card p-6 text-center">
        <Star className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Create Your Movie List
        </h3>
        <p className="text-muted-foreground mb-4">
          Curate and share your favorite movies with the community
        </p>
        <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-medium transition-all">
          Create New List
        </button>
      </div>

      {/* User Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userLists.map((list) => (
          <div key={list.id} className="glass-card overflow-hidden">
            <img
              src={list.thumbnail}
              alt={list.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {list.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    by {list.creator}
                  </p>
                </div>
                {list.isPublic && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-lg text-xs">
                    Public
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-4">{list.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{list.movieCount} movies</span>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {list.likes}
                  </div>
                </div>
                <button className="glass-button px-4 py-2 rounded-lg">
                  View List
                </button>
              </div>
            </div>
          </div>
        ))}
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
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Social Hub
                </h1>
                <p className="text-muted-foreground">
                  Connect, watch together, and discover movies with friends
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <button className="glass-button p-2 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

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
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "friends" && renderFriendsTab()}
          {activeTab === "chats" && renderChatsTab()}
          {activeTab === "watch-parties" && renderWatchPartiesTab()}
          {activeTab === "movie-clubs" && renderMovieClubsTab()}
          {activeTab === "challenges" && renderChallengesTab()}
          {activeTab === "user-lists" && renderUserListsTab()}
        </div>
      </div>
    </div>
  );
};

export default EnhancedSocialPage;
