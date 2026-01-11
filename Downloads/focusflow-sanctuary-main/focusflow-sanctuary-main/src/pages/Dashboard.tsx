import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, FileText, Clock, Trash2, Star, StarOff, 
  LogOut, BookOpen, Search, Loader2, User, ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { draftsAPI } from "@/lib/api";

interface Draft {
  _id: string;
  title: string;
  content: string;
  wordCount: number;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch drafts
  useEffect(() => {
    const fetchDrafts = async () => {
      if (!user) return;
      
      try {
        const data = await draftsAPI.getAll();
        setDrafts(data || []);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error loading drafts",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrafts();
  }, [user, toast]);

  // Create new draft
  const createNewDraft = async () => {
    if (!user) return;

    try {
      const data = await draftsAPI.create();
      if (data) {
        navigate(`/write/${data._id}`);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating draft",
        description: error.message,
      });
    }
  };

  // Delete draft
  const deleteDraft = async (id: string) => {
    setDeletingId(id);
    try {
      await draftsAPI.delete(id);
      
      setDrafts(prev => prev.filter(d => d._id !== id));
      toast({
        title: "Deleted",
        description: "Draft has been deleted.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting draft",
        description: error.message,
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Toggle favorite
  const toggleFavorite = async (id: string, currentValue: boolean) => {
    try {
      await draftsAPI.update(id, { isFavorite: !currentValue });
      
      setDrafts(prev => prev.map(d => 
        d._id === id ? { ...d, isFavorite: !currentValue } : d
      ));
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating draft",
        description: error.message,
      });
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  // Filter drafts by search
  const filteredDrafts = drafts.filter(draft =>
    draft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    draft.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate favorites
  const favoriteDrafts = filteredDrafts.filter(d => d.isFavorite);
  const regularDrafts = filteredDrafts.filter(d => !d.isFavorite);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const getPreview = (content: string) => {
    if (!content) return "No content yet...";
    return content.slice(0, 100) + (content.length > 100 ? "..." : "");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-coffee" />
            <span className="text-xl font-semibold font-ui text-foreground">FocusFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground font-ui hidden sm:block">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={() => navigate("/shop")}>
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Shop</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}>
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-writing font-semibold text-foreground mb-1">
              Your Drafts
            </h1>
            <p className="text-muted-foreground font-ui">
              {drafts.length} {drafts.length === 1 ? "draft" : "drafts"}
            </p>
          </div>
          <Button variant="hero" onClick={createNewDraft}>
            <Plus className="w-5 h-5" />
            New Draft
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md animate-fade-in-delay-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search drafts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-card border-border/50"
          />
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-coffee" />
          </div>
        ) : filteredDrafts.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-writing text-foreground mb-2">
              {searchQuery ? "No drafts found" : "No drafts yet"}
            </h2>
            <p className="text-muted-foreground font-ui mb-6">
              {searchQuery 
                ? "Try a different search term" 
                : "Create your first draft and start writing"}
            </p>
            {!searchQuery && (
              <Button variant="hero" onClick={createNewDraft}>
                <Plus className="w-5 h-5" />
                Create Your First Draft
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Favorites */}
            {favoriteDrafts.length > 0 && (
              <div className="animate-fade-in-delay-2">
                <h2 className="text-lg font-ui font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-coffee fill-coffee" />
                  Favorites
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteDrafts.map((draft) => (
                    <DraftCard
                      key={draft._id}
                      draft={draft}
                      onOpen={() => navigate(`/write/${draft._id}`)}
                      onDelete={() => deleteDraft(draft._id)}
                      onToggleFavorite={() => toggleFavorite(draft._id, draft.isFavorite)}
                      isDeleting={deletingId === draft._id}
                      formatDate={formatDate}
                      getPreview={getPreview}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Regular drafts */}
            {regularDrafts.length > 0 && (
              <div className="animate-fade-in-delay-3">
                {favoriteDrafts.length > 0 && (
                  <h2 className="text-lg font-ui font-semibold text-foreground mb-4">
                    All Drafts
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regularDrafts.map((draft) => (
                    <DraftCard
                      key={draft._id}
                      draft={draft}
                      onOpen={() => navigate(`/write/${draft._id}`)}
                      onDelete={() => deleteDraft(draft._id)}
                      onToggleFavorite={() => toggleFavorite(draft._id, draft.isFavorite)}
                      isDeleting={deletingId === draft._id}
                      formatDate={formatDate}
                      getPreview={getPreview}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

// Draft Card Component
interface DraftCardProps {
  draft: Draft;
  onOpen: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
  isDeleting: boolean;
  formatDate: (date: string) => string;
  getPreview: (content: string) => string;
}

const DraftCard = ({ 
  draft, 
  onOpen, 
  onDelete, 
  onToggleFavorite, 
  isDeleting,
  formatDate,
  getPreview 
}: DraftCardProps) => {
  return (
    <div 
      className="paper-surface p-5 hover:shadow-hover transition-all duration-300 cursor-pointer group"
      onClick={onOpen}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-coffee" />
          <h3 className="font-ui font-semibold text-foreground truncate max-w-[180px]">
            {draft.title}
          </h3>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
          >
            {draft.isFavorite ? (
              <Star className="w-4 h-4 text-coffee fill-coffee" />
            ) : (
              <StarOff className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground font-ui line-clamp-2 mb-4">
        {getPreview(draft.content)}
      </p>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground font-ui">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatDate(draft.updatedAt)}
        </span>
        <span>{draft.wordCount} words</span>
      </div>
    </div>
  );
};

export default Dashboard;
