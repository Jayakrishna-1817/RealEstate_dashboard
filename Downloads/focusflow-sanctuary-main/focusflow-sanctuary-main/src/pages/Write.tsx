import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import WritingEditor from "@/components/WritingEditor";
import { useAuth } from "@/contexts/AuthContext";
import { draftsAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Write = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [draft, setDraft] = useState<{ title: string; content: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDraft = async () => {
      if (!user) return;
      
      if (!id) {
        // New draft - no need to fetch
        setDraft({ title: "", content: "" });
        setIsLoading(false);
        return;
      }

      try {
        const draft = await draftsAPI.getOne(id);
        setDraft({ title: draft.title, content: draft.content });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error loading draft",
          description: error.message,
        });
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      fetchDraft();
    }
  }, [id, user, authLoading, navigate, toast]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in">
          <Loader2 className="w-8 h-8 animate-spin text-coffee mx-auto mb-4" />
          <p className="text-muted-foreground font-ui">Loading your draft...</p>
        </div>
      </div>
    );
  }

  if (!draft) return null;

  return (
    <div className="min-h-screen bg-background py-8">
      <WritingEditor
        draftId={id}
        initialTitle={draft.title}
        initialContent={draft.content}
      />
    </div>
  );
};

export default Write;
