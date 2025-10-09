import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

const schemes = [
  {
    title: "Pradhan Mantri Awas Yojana",
    category: "Housing",
    description: "Financial assistance for construction of pucca houses to rural households without a pucca house.",
    eligibility: "BPL families, SC/ST families, minorities",
    benefits: "₹1.2 lakhs to ₹1.3 lakhs subsidy",
  },
  {
    title: "MGNREGA",
    category: "Employment",
    description: "Provides at least 100 days of guaranteed wage employment in a financial year to rural households.",
    eligibility: "Adult members of rural households",
    benefits: "Guaranteed 100 days employment",
  },
  {
    title: "PM-KISAN",
    category: "Agriculture",
    description: "Income support to all landholding farmers' families with installments of ₹2000.",
    eligibility: "Small and marginal farmers",
    benefits: "₹6000 per year in three installments",
  },
  {
    title: "Ayushman Bharat",
    category: "Healthcare",
    description: "Health insurance scheme providing coverage of ₹5 lakhs per family per year.",
    eligibility: "Poor and vulnerable families",
    benefits: "Free health insurance coverage",
  },
  {
    title: "Sukanya Samriddhi Yojana",
    category: "Education",
    description: "Savings scheme for girl child with attractive interest rates.",
    eligibility: "Parents/guardians of girl child",
    benefits: "High interest rates and tax benefits",
  },
  {
    title: "Pradhan Mantri Ujjwala Yojana",
    category: "Energy",
    description: "Free LPG connections to women from BPL households.",
    eligibility: "BPL women",
    benefits: "Free LPG connection",
  },
];

const Schemes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary to-secondary py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Government Schemes
              </h1>
              <p className="text-lg text-white/90">
                Discover welfare schemes and benefits you're eligible for
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search schemes..."
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="employment">Employment</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Schemes Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schemes.map((scheme, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{scheme.title}</CardTitle>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {scheme.category}
                      </span>
                    </div>
                    <CardDescription>{scheme.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Eligibility:</p>
                      <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Benefits:</p>
                      <p className="text-sm text-muted-foreground">{scheme.benefits}</p>
                    </div>
                    <Button className="w-full mt-4">Apply Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Schemes;
