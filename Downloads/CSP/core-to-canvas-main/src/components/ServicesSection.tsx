import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Briefcase, MessageSquare, ArrowRight } from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Government Schemes",
    description: "Access comprehensive information about welfare schemes, eligibility criteria, and application processes. Filter by category and region.",
    color: "text-primary",
    bgGradient: "from-primary/10 to-primary/5",
    link: "/schemes",
  },
  {
    icon: Briefcase,
    title: "Local Employment",
    description: "Discover job opportunities in your area. Connect with local employers and find work that matches your skills and location.",
    color: "text-secondary",
    bgGradient: "from-secondary/10 to-secondary/5",
    link: "/jobs",
  },
  {
    icon: MessageSquare,
    title: "Complaint Registration",
    description: "Report public service issues and track their resolution. Your voice matters in improving community services and governance.",
    color: "text-accent",
    bgGradient: "from-accent/10 to-accent/5",
    link: "/complaints",
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay informed, find opportunities, and make your voice heard
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.bgGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={service.link}>
                    <Button variant="ghost" className="group/btn p-0 h-auto font-semibold">
                      Explore
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};