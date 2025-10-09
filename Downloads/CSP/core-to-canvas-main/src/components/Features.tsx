import { Globe, Smartphone, Shield, Clock, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Access content in your preferred language for better understanding",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Optimized for low-end devices and slow network connections",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with industry-standard security measures",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Access information and services anytime, anywhere",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built for rural communities by understanding their needs",
  },
  {
    icon: TrendingUp,
    title: "Regular Updates",
    description: "Stay informed with the latest schemes and opportunities",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Key Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed with accessibility and ease of use in mind
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="flex items-start space-x-4 p-6 rounded-xl bg-card hover:bg-card/80 transition-all hover:shadow-lg border border-border group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};