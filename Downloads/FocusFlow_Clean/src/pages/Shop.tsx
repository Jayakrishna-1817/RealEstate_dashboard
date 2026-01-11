import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingBag, Palette, Type, Lock, Check, Coins,
  ArrowLeft, BookOpen, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { shopAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface ShopItem {
  id: string;
  type: string;
  name: string;
  description: string;
  price: number;
  purchased: boolean;
  active: boolean;
  colors?: { bg: string; text: string };
  fontFamily?: string;
}

const Shop = () => {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [itemsData, creditsData] = await Promise.all([
        shopAPI.getItems(),
        shopAPI.getCredits(),
      ]);
      setItems(itemsData);
      setCredits(creditsData.credits);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading shop",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (item: ShopItem) => {
    setPurchasingId(item.id);
    try {
      const result = await shopAPI.purchase(item.id);
      setCredits(result.credits);
      toast({
        title: "Purchase Successful!",
        description: result.message,
      });
      await fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Purchase Failed",
        description: error.message,
      });
    } finally {
      setPurchasingId(null);
    }
  };

  const handleActivate = async (item: ShopItem) => {
    try {
      await shopAPI.activate(item.id);
      toast({
        title: "Activated!",
        description: `${item.name} is now active.`,
      });
      await fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Activation Failed",
        description: error.message,
      });
    }
  };

  const themes = items.filter(i => i.type === 'theme');
  const fonts = items.filter(i => i.type === 'font');

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
            <span className="text-xl font-semibold font-ui text-foreground">Rewards Shop</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-coffee/10 border border-coffee/20">
              <Coins className="w-5 h-5 text-coffee" />
              <span className="font-semibold text-foreground">{credits}</span>
              <span className="text-sm text-muted-foreground">credits</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Info Banner */}
        <div className="paper-surface p-6 mb-8 animate-fade-in">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-coffee flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-writing font-semibold text-foreground mb-2">
                Earn Credits by Writing in Focus Mode!
              </h2>
              <p className="text-muted-foreground font-ui">
                Complete focus sessions to earn credits. Use them to unlock beautiful themes and fonts to customize your writing experience.
              </p>
            </div>
          </div>
        </div>

        {/* Themes Section */}
        <div className="mb-12 animate-fade-in-delay-1">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-coffee" />
            <h2 className="text-2xl font-writing font-semibold text-foreground">Themes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((item) => (
              <div
                key={item.id}
                className="paper-surface p-6 hover:shadow-hover transition-all duration-300"
                style={item.colors ? { 
                  backgroundColor: item.colors.bg + '20',
                  borderColor: item.colors.bg + '40'
                } : {}}
              >
                {item.active && (
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-coffee/10 text-coffee text-xs font-semibold mb-3">
                    <Check className="w-3 h-3" />
                    Active
                  </div>
                )}
                <h3 className="font-ui font-semibold text-foreground text-lg mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground font-ui mb-4">{item.description}</p>
                
                {item.colors && (
                  <div className="flex gap-2 mb-4">
                    <div className="w-12 h-12 rounded border" style={{ backgroundColor: item.colors.bg }} />
                    <div className="w-12 h-12 rounded border" style={{ backgroundColor: item.colors.text }} />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-coffee font-semibold">
                    <Coins className="w-4 h-4" />
                    {item.price}
                  </div>
                  
                  {item.purchased ? (
                    <Button
                      variant={item.active ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleActivate(item)}
                      disabled={item.active}
                    >
                      {item.active ? "Active" : "Activate"}
                    </Button>
                  ) : (
                    <Button
                      variant="warm"
                      size="sm"
                      onClick={() => handlePurchase(item)}
                      disabled={credits < item.price || purchasingId === item.id}
                    >
                      {credits < item.price && <Lock className="w-4 h-4" />}
                      {purchasingId === item.id ? "Purchasing..." : "Purchase"}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fonts Section */}
        <div className="animate-fade-in-delay-2">
          <div className="flex items-center gap-3 mb-6">
            <Type className="w-6 h-6 text-coffee" />
            <h2 className="text-2xl font-writing font-semibold text-foreground">Fonts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fonts.map((item) => (
              <div
                key={item.id}
                className="paper-surface p-6 hover:shadow-hover transition-all duration-300"
              >
                {item.active && (
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-coffee/10 text-coffee text-xs font-semibold mb-3">
                    <Check className="w-3 h-3" />
                    Active
                  </div>
                )}
                <h3 className="font-ui font-semibold text-foreground text-lg mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground font-ui mb-4">{item.description}</p>
                
                {item.fontFamily && (
                  <p
                    className="text-lg mb-4 text-foreground"
                    style={{ fontFamily: item.fontFamily }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-coffee font-semibold">
                    <Coins className="w-4 h-4" />
                    {item.price}
                  </div>
                  
                  {item.purchased ? (
                    <Button
                      variant={item.active ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleActivate(item)}
                      disabled={item.active}
                    >
                      {item.active ? "Active" : "Activate"}
                    </Button>
                  ) : (
                    <Button
                      variant="warm"
                      size="sm"
                      onClick={() => handlePurchase(item)}
                      disabled={credits < item.price || purchasingId === item.id}
                    >
                      {credits < item.price && <Lock className="w-4 h-4" />}
                      {purchasingId === item.id ? "Purchasing..." : "Purchase"}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shop;
