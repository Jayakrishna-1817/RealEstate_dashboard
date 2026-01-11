import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Feather, Shield, Cloud, Sparkles, ArrowRight, BookOpen, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => (
  <div
    className="paper-surface p-6 hover:shadow-hover transition-all duration-300 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 rounded-lg bg-coffee-light flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-coffee" />
    </div>
    <h3 className="font-ui font-semibold text-foreground text-lg mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm font-ui leading-relaxed">{description}</p>
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: Feather,
      title: "Distraction-Free",
      description: "A clean, minimal interface that lets your thoughts flow without interruption. No ads, no clutter.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your writing belongs to you. Personal authentication ensures every piece is safely stored.",
    },
    {
      icon: Cloud,
      title: "Auto-Save",
      description: "Never lose your work again. Your documents are automatically saved as you write.",
    },
    {
      icon: Sparkles,
      title: "AI Grammar Check",
      description: "On-demand grammar checking powered by AI. Get suggestions only when you ask for them.",
    },
  ];

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-coffee" />
            <span className="text-xl font-semibold font-ui text-foreground">FocusFlow</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Button variant="default" size="sm" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button variant="default" size="sm" onClick={() => navigate("/signup")}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 gradient-warmth opacity-50" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-coffee/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sage/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coffee-light text-coffee text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Your peaceful writing sanctuary
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-writing font-semibold text-foreground leading-tight mb-6 animate-fade-in-delay-1">
              Where thoughts{" "}
              <span className="text-coffee relative">
                flow freely
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-30"/>
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground font-ui leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-delay-2">
              A distraction-free writing space designed for students, writers, and dreamers. 
              No ads, no notifications — just pure, peaceful writing.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-3">
              <Button 
                variant="hero" 
                onClick={handleGetStarted}
                className="group"
              >
                Start Writing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero-outline" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            </div>

            {/* Social proof */}
            <p className="mt-12 text-sm text-muted-foreground font-ui animate-fade-in-delay-3">
              Trusted by students and educators across India
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-writing font-semibold text-foreground mb-4">
              Everything you need to focus
            </h2>
            <p className="text-muted-foreground font-ui max-w-xl mx-auto">
              Built with love by educators who understand what students and writers truly need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="relative">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl text-coffee/10 font-writing">"</div>
              <p className="text-2xl md:text-3xl font-writing text-foreground leading-relaxed italic mb-6">
                Students need a clean space where thoughts can flow freely — no ads, no notifications, just pure writing.
              </p>
              <footer className="text-muted-foreground font-ui">
                — <cite className="not-italic font-medium">Meenakshi Ma'am</cite>, English Teacher
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-coffee-light/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-writing font-semibold text-foreground mb-4">
            Ready to find your flow?
          </h2>
          <p className="text-muted-foreground font-ui mb-8 max-w-xl mx-auto">
            Join thousands of writers who have discovered the joy of distraction-free writing.
          </p>
          <Button 
            variant="hero" 
            onClick={handleGetStarted}
            className="group"
          >
            Start Writing Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-coffee" />
              <span className="font-ui font-medium text-foreground">FocusFlow</span>
            </div>
            <p className="text-sm text-muted-foreground font-ui">
              Made with ☕ in Bengaluru
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
