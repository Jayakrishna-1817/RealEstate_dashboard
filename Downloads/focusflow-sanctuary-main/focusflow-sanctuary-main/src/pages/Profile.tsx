import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, Clock, Calendar, TrendingUp, Award, 
  ArrowLeft, BookOpen, Timer, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { focusSessionsAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface FocusSession {
  _id: string;
  duration: number;
  startTime: string;
  endTime: string;
  wordCount: number;
  draftId?: {
    title: string;
  };
}

interface Stats {
  totalSessions: number;
  totalDuration: number;
  totalWords: number;
  averageDuration: number;
  todayDuration: number;
  todaySessions: number;
  weekDuration: number;
  weekSessions: number;
}

const Profile = () => {
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionsData, statsData] = await Promise.all([
          focusSessionsAPI.getAll(),
          focusSessionsAPI.getStats(),
        ]);
        setSessions(sessionsData);
        setStats(statsData);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error loading profile",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Clock className="w-8 h-8 animate-spin text-coffee mx-auto mb-4" />
          <p className="text-muted-foreground font-ui">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <BookOpen className="w-6 h-6 text-coffee" />
            <span className="text-xl font-semibold font-ui text-foreground">FocusFlow</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-coffee/10 flex items-center justify-center">
            <User className="w-8 h-8 text-coffee" />
          </div>
          <div>
            <h1 className="text-3xl font-writing font-semibold text-foreground">
              {user?.name}
            </h1>
            <p className="text-muted-foreground font-ui">{user?.email}</p>
          </div>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in-delay-1">
            <div className="paper-surface p-6">
              <div className="flex items-center gap-3 mb-2">
                <Timer className="w-5 h-5 text-coffee" />
                <h3 className="font-ui font-semibold text-foreground">Total Time</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">{formatDuration(stats.totalDuration)}</p>
              <p className="text-sm text-muted-foreground mt-1">{stats.totalSessions} sessions</p>
            </div>

            <div className="paper-surface p-6">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-coffee" />
                <h3 className="font-ui font-semibold text-foreground">Today</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">{formatDuration(stats.todayDuration)}</p>
              <p className="text-sm text-muted-foreground mt-1">{stats.todaySessions} sessions</p>
            </div>

            <div className="paper-surface p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-coffee" />
                <h3 className="font-ui font-semibold text-foreground">This Week</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">{formatDuration(stats.weekDuration)}</p>
              <p className="text-sm text-muted-foreground mt-1">{stats.weekSessions} sessions</p>
            </div>

            <div className="paper-surface p-6">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-coffee" />
                <h3 className="font-ui font-semibold text-foreground">Words Written</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">{stats.totalWords}</p>
              <p className="text-sm text-muted-foreground mt-1">in focus mode</p>
            </div>
          </div>
        )}

        {/* Session History */}
        <div className="animate-fade-in-delay-2">
          <h2 className="text-2xl font-writing font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-coffee" />
            Focus Session History
          </h2>

          {sessions.length === 0 ? (
            <div className="paper-surface p-12 text-center">
              <Clock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-ui">
                No focus sessions yet. Start writing in focus mode to track your progress!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session._id}
                  className="paper-surface p-4 hover:shadow-hover transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Timer className="w-4 h-4 text-coffee" />
                        <span className="font-ui font-semibold text-foreground">
                          {formatDuration(session.duration)}
                        </span>
                        {session.draftId && (
                          <span className="text-sm text-muted-foreground">
                            • {session.draftId.title}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground font-ui">
                        {formatDateTime(session.startTime)} - {formatDateTime(session.endTime)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-sage-dark">
                        {session.wordCount} words
                      </p>
                      <p className="text-xs text-muted-foreground">written</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
