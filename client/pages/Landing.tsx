import React from "react";
import {
  Play,
  Sparkles,
  Users,
  BarChart3,
  Heart,
  Star,
  ArrowRight,
  CheckCircle,
  Trophy,
  Zap,
  Globe,
  Shield,
} from "lucide-react";
import Logo from "../components/Logo";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Recommendations",
      description:
        "Get personalized movie suggestions based on your mood, time, weather, and viewing history.",
    },
    {
      icon: Users,
      title: "Social Movie Experience",
      description:
        "Connect with friends, share reviews, create watch parties, and discover what others are watching.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Track your viewing habits, analyze genre preferences, and get insights into your movie journey.",
    },
    {
      icon: Heart,
      title: "Smart Watchlists",
      description:
        "Organize your must-watch movies with intelligent categorization and sharing features.",
    },
    {
      icon: Trophy,
      title: "Achievements & Gamification",
      description:
        "Unlock badges, complete challenges, and compete with friends on movie leaderboards.",
    },
    {
      icon: Shield,
      title: "Privacy-First Design",
      description:
        "Your movie preferences and data are secure with our privacy-focused approach.",
    },
  ];

  const stats = [
    { label: "Movies Tracked", value: "50K+" },
    { label: "Active Users", value: "10K+" },
    { label: "Reviews Shared", value: "100K+" },
    { label: "AI Recommendations", value: "1M+" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      avatar: "SC",
      role: "Movie Enthusiast",
      quote:
        "CineTracker's AI suggestions are spot-on! It recommended hidden gems I never would have found.",
    },
    {
      name: "Marcus Rodriguez",
      avatar: "MR",
      role: "Film Critic",
      quote:
        "The analytics feature helped me understand my movie preferences better than any other platform.",
    },
    {
      name: "Emma Thompson",
      avatar: "ET",
      role: "Social Viewer",
      quote:
        "Love the watch party feature! Connecting with friends over movies has never been easier.",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/7234393/pexels-photo-7234393.jpeg')`,
          }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="glass-card mb-8">
            <div className="flex items-center justify-center mb-8">
              <Logo size="large" showText={false} />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                CineTracker
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Your AI-powered movie companion for discovering, tracking, and
              sharing your cinematic journey with friends.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onGetStarted}
                className="group bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="glass-button text-foreground px-8 py-4 rounded-xl font-semibold flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Everything you need to track movies
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From AI recommendations to social features, CineTracker has all
              the tools to enhance your movie-watching experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="glass-card group hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-background-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How CineTracker Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up & Set Preferences",
                description:
                  "Create your account and tell us about your movie preferences, favorite genres, and actors.",
              },
              {
                step: "02",
                title: "Get AI Recommendations",
                description:
                  "Our AI analyzes your taste and suggests movies based on your mood, time, and viewing history.",
              },
              {
                step: "03",
                title: "Track & Share",
                description:
                  "Add movies to your watchlist, track what you've watched, and share reviews with friends.",
              },
            ].map((step, index) => (
              <div key={index} className="glass-card text-center relative">
                <div className="text-6xl font-bold text-primary/20 mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What users are saying
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of movie lovers who trust CineTracker
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to start your movie journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join CineTracker today and discover your next favorite movie with
              AI-powered recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onGetStarted}
                className="group bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Start Tracking Movies
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Free to start
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-xl font-bold text-foreground">
                CineTracker
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 CineTracker. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <Globe className="w-4 h-4" />
                <span>English</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
