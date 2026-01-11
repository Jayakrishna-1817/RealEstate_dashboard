import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "signup";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await signUp(email, password, name);
        if (error) throw error;
        toast({
          title: "Account Created!",
          description: "Please sign in to continue.",
        });
        setTimeout(() => navigate("/login"), 100);
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        setTimeout(() => navigate("/dashboard"), 100);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 gradient-warmth opacity-30" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-coffee/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sage/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative w-full max-w-md">
        <div className="paper-surface p-8 animate-fade-in">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <BookOpen className="w-8 h-8 text-coffee" />
            <span className="text-2xl font-semibold font-ui text-foreground">FocusFlow</span>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-writing font-semibold text-foreground mb-2">
              {mode === "login" ? "Welcome back" : "Create your sanctuary"}
            </h1>
            <p className="text-muted-foreground font-ui">
              {mode === "login"
                ? "Sign in to continue your writing journey"
                : "Start your distraction-free writing journey"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-ui">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-10 h-12 bg-background border-border/50 focus:border-primary font-ui"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-ui">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 bg-background border-border/50 focus:border-primary font-ui"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-ui">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="pl-10 h-12 bg-background border-border/50 focus:border-primary font-ui"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full h-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Switch mode link */}
          <p className="text-center text-muted-foreground font-ui mt-6">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </a>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
