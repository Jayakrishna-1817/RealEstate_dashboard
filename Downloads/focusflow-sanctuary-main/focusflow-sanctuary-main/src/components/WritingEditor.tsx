import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Save, FileText, Clock, ArrowLeft, Maximize2, Minimize2, 
  Sparkles, Loader2, X, Check, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { draftsAPI, focusSessionsAPI, shopAPI, grammarAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface WritingEditorProps {
  draftId?: string;
  initialContent?: string;
  initialTitle?: string;
}

interface GrammarSuggestion {
  original: string;
  suggestion: string;
  explanation: string;
  offset: number;
  length: number;
}

const WritingEditor = ({ draftId, initialContent = "", initialTitle = "" }: WritingEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [wordCount, setWordCount] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [isCheckingGrammar, setIsCheckingGrammar] = useState(false);
  const [grammarSuggestions, setGrammarSuggestions] = useState<GrammarSuggestion[]>([]);
  const [showGrammarPanel, setShowGrammarPanel] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(draftId || null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [focusStartTime, setFocusStartTime] = useState<Date | null>(null);
  const [initialWordCount, setInitialWordCount] = useState(0);
  const [themeColors, setThemeColors] = useState<{bg: string, text: string} | null>(null);
  const [fontFamily, setFontFamily] = useState<string | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const prefs = await shopAPI.getPreferences();
        if (prefs.themeData?.colors) {
          setThemeColors(prefs.themeData.colors);
        }
        if (prefs.fontData?.fontFamily) {
          setFontFamily(prefs.fontData.fontFamily);
        }
      } catch (error) {
        console.error('Failed to load preferences:', error);
      }
    };
    loadPreferences();
  }, []);

  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    setWordCount(words);
  }, [content]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(500, textareaRef.current.scrollHeight)}px`;
    }
  }, [content]);

  const saveDraft = useCallback(async (showToast = false) => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const draftData = {
        title: title || "Untitled",
        content,
      };

      if (currentDraftId) {
        await draftsAPI.update(currentDraftId, draftData);
      } else {
        const data = await draftsAPI.create(draftData.title, draftData.content);
        if (data) setCurrentDraftId(data._id);
      }

      setLastSaved(new Date());
      if (showToast) {
        toast({
          title: "Saved",
          description: "Your draft has been saved successfully.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error saving",
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  }, [user, title, content, currentDraftId, toast]);

  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    if (content || title) {
      autoSaveTimeoutRef.current = setTimeout(() => {
        saveDraft(false);
      }, 2000);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [content, title, saveDraft]);

  const enterFullscreen = async () => {
    try {
      if (containerRef.current) {
        await containerRef.current.requestFullscreen();
        setFocusMode(true);
        setIsFullscreen(true);
        const currentWords = content.trim() ? content.trim().split(/\s+/).length : 0;
        setFocusStartTime(new Date());
        setInitialWordCount(currentWords);
        console.log('Focus mode started:', { startTime: new Date(), initialWords: currentWords });
        toast({
          title: "Focus Mode Activated",
          description: "Press ESC to exit. Stay focused!",
        });
      }
    } catch (error) {
      console.error("Failed to enter fullscreen:", error);
      toast({
        variant: "destructive",
        title: "Fullscreen not available",
        description: "Your browser may not support fullscreen mode.",
      });
    }
  };

  const exitFullscreen = async () => {
    if (focusStartTime) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - focusStartTime.getTime()) / 1000);
      const currentWords = content.trim() ? content.trim().split(/\s+/).length : 0;
      const wordsWritten = currentWords - initialWordCount;
      
      console.log('Focus mode ended:', { 
        startTime: focusStartTime, 
        endTime, 
        duration, 
        initialWords: initialWordCount,
        currentWords,
        wordsWritten 
      });
      
      try {
        await focusSessionsAPI.create({
          draftId: currentDraftId || undefined,
          duration,
          startTime: focusStartTime.toISOString(),
          endTime: endTime.toISOString(),
          wordCount: wordsWritten >= 0 ? wordsWritten : 0,
        });
        console.log('Focus session saved successfully');
        
        try {
          const creditResult = await shopAPI.awardCredits();
          console.log('Credit award result:', creditResult);
          if (creditResult.creditsAwarded > 0) {
            toast({
              title: `+${creditResult.creditsAwarded} Credits!`,
              description: creditResult.reason,
            });
          }
        } catch (error) {
          console.error('Failed to award credits:', error);
          toast({
            variant: "destructive",
            title: "Credit Error",
            description: error.message || "Failed to award credits",
          });
        }
      } catch (error) {
        console.error('Failed to save focus session:', error);
      }
    }
    
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    setFocusMode(false);
    setIsFullscreen(false);
    setShowExitWarning(false);
    setFocusStartTime(null);
    setInitialWordCount(0);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setShowExitWarning(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [isFullscreen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveDraft(true);
      }
      if (e.key === "Escape" && focusMode) {
        e.preventDefault();
        setShowExitWarning(true);
      }
      if (e.key === "F11" || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "F")) {
        e.preventDefault();
        if (!focusMode) {
          enterFullscreen();
        } else {
          setShowExitWarning(true);
        }
      }
    };

    const handleVisibilityChange = () => {
      if (focusMode && document.hidden) {
        toast({
          title: "Stay Focused!",
          description: "You're in focus mode. Stay on this tab to maintain your flow.",
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [focusMode, saveDraft]);

  const checkGrammar = async () => {
    if (!content.trim()) {
      toast({
        title: "Nothing to check",
        description: "Please write some text first.",
      });
      return;
    }

    setIsCheckingGrammar(true);
    setShowGrammarPanel(true);

    try {
      const data = await grammarAPI.check(content);

      if (data?.suggestions && data.suggestions.length > 0) {
        setGrammarSuggestions(data.suggestions);
        toast({
          title: "Grammar Check Complete",
          description: `Found ${data.suggestions.length} suggestion${data.suggestions.length > 1 ? 's' : ''}.`,
        });
      } else {
        setGrammarSuggestions([]);
        toast({
          title: "Looking good!",
          description: "No grammar issues found in your text.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error checking grammar",
        description: error.message || "Failed to check grammar",
      });
    } finally {
      setIsCheckingGrammar(false);
    }
  };

  const applySuggestion = (suggestion: GrammarSuggestion) => {
    const before = content.substring(0, suggestion.offset);
    const after = content.substring(suggestion.offset + suggestion.length);
    const newContent = before + suggestion.suggestion + after;
    
    setContent(newContent);
    
    const lengthDiff = suggestion.suggestion.length - suggestion.length;
    
    setGrammarSuggestions(prev => 
      prev
        .filter(s => s !== suggestion)
        .map(s => ({
          ...s,
          offset: s.offset > suggestion.offset ? s.offset + lengthDiff : s.offset
        }))
    );
    
    toast({
      title: "Applied",
      description: "Suggestion has been applied.",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const containerClasses = focusMode
    ? "fixed inset-0 z-50 bg-background flex flex-col"
    : "w-full max-w-4xl mx-auto";

  return (
    <div ref={containerRef} className={containerClasses}>
      {!focusMode && (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50 animate-fade-in">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="p-2 rounded-lg bg-coffee-light">
              <FileText className="w-5 h-5 text-coffee" />
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled document..."
              className="text-xl font-writing font-medium bg-transparent border-none outline-none placeholder:text-muted-foreground/60 text-foreground w-64 focus:w-80 transition-all duration-300"
            />
          </div>
          
          <div className="flex items-center gap-3">
            {lastSaved && (
              <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Saved at {formatTime(lastSaved)}
              </span>
            )}
            
            <Button
              variant="subtle"
              size="sm"
              onClick={checkGrammar}
              disabled={isCheckingGrammar}
            >
              {isCheckingGrammar ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              Grammar
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={enterFullscreen}
              title="Focus Mode (F11)"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={() => saveDraft(true)}
              disabled={isSaving}
              variant="default"
              size="sm"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save
            </Button>
          </div>
        </div>
      )}

      {focusMode && (
        <div className="flex items-center justify-between p-4 bg-background/95 backdrop-blur-sm">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled..."
            className="text-lg font-writing bg-transparent border-none outline-none text-foreground/80"
          />
          <div className="flex items-center gap-2">
            {isSaving && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
            <span className="text-sm text-muted-foreground font-ui">{wordCount} words</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowExitWarning(true)}
              title="Exit Focus Mode (Esc)"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className={`flex ${focusMode ? "flex-1 overflow-hidden" : ""}`}>
        <div 
          className={`relative ${focusMode ? "flex-1 overflow-auto p-8" : ""} ${
            showGrammarPanel && !focusMode ? "flex-1" : "w-full"
          }`}
        >
          <div 
            className={`relative paper-surface transition-all duration-500 ${
              isFocused ? "shadow-hover" : ""
            } ${focusMode ? "min-h-full" : "p-8 md:p-12"}`}
          >
            {!focusMode && (
              <>
                <div className="absolute top-0 left-0 w-16 h-16 opacity-20">
                  <div className="absolute top-4 left-4 w-8 h-px bg-coffee" />
                  <div className="absolute top-4 left-4 w-px h-8 bg-coffee" />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-20">
                  <div className="absolute bottom-4 right-4 w-8 h-px bg-coffee" />
                  <div className="absolute bottom-4 right-4 w-px h-8 bg-coffee" />
                </div>
              </>
            )}

            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Let your thoughts flow freely..."
              className={`w-full bg-transparent border-none outline-none resize-none writing-area ${
                focusMode ? "p-12 text-xl" : ""
              }`}
              style={{ 
                lineHeight: "2", 
                minHeight: focusMode ? "100%" : "500px",
                fontFamily: fontFamily || 'inherit',
                backgroundColor: themeColors?.bg || 'transparent',
                color: themeColors?.text || 'inherit'
              }}
            />
          </div>
        </div>

        {showGrammarPanel && !focusMode && (
          <div className="w-80 ml-6 paper-surface p-4 animate-fade-in max-h-[600px] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-ui font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-coffee" />
                Suggestions
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowGrammarPanel(false)}
                className="h-6 w-6"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {isCheckingGrammar ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-coffee" />
              </div>
            ) : grammarSuggestions.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-8">
                No issues found! Your writing looks great.
              </p>
            ) : (
              <div className="space-y-3">
                {grammarSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-muted/50 border border-border/50"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-sm line-through text-destructive">
                        {suggestion.original}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                    <span className="text-sm font-medium text-sage-dark block mb-2">
                      {suggestion.suggestion}
                    </span>
                    <p className="text-xs text-muted-foreground mb-3">
                      {suggestion.explanation}
                    </p>
                    <Button
                      variant="warm"
                      size="sm"
                      onClick={() => applySuggestion(suggestion)}
                      className="w-full"
                    >
                      <Check className="w-3 h-3" />
                      Apply
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {!focusMode && (
        <div className="flex items-center justify-between mt-4 px-2 text-sm text-muted-foreground font-ui">
          <span>{wordCount} {wordCount === 1 ? "word" : "words"}</span>
          <span className="text-xs">
            Press <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">Ctrl+Shift+F</kbd> for Focus Mode
          </span>
          <span>{content.length} characters</span>
        </div>
      )}

      {showExitWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="paper-surface p-8 max-w-md mx-4 animate-scale-in">
            <h3 className="text-2xl font-writing font-semibold text-foreground mb-3">
              Exit Focus Mode?
            </h3>
            <p className="text-muted-foreground font-ui mb-6">
              You're in the flow! Are you sure you want to leave focus mode and return to distractions?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={async () => {
                  setShowExitWarning(false);
                  if (containerRef.current && !document.fullscreenElement) {
                    try {
                      await containerRef.current.requestFullscreen();
                    } catch (error) {
                      console.error("Failed to re-enter fullscreen:", error);
                    }
                  }
                }}
                className="flex-1"
              >
                Stay Focused
              </Button>
              <Button
                variant="destructive"
                onClick={exitFullscreen}
                className="flex-1"
              >
                Exit Focus Mode
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingEditor;
