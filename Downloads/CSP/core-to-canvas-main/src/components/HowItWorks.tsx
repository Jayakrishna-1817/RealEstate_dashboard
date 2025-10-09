import { UserPlus, Search, CheckCircle, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register Your Account",
    description: "Create a free account with basic information to get started",
    step: "01",
  },
  {
    icon: Search,
    title: "Explore Services",
    description: "Browse schemes, jobs, or file complaints based on your needs",
    step: "02",
  },
  {
    icon: CheckCircle,
    title: "Take Action",
    description: "Apply for schemes, contact employers, or track your complaints",
    step: "03",
  },
  {
    icon: TrendingUp,
    title: "Grow & Prosper",
    description: "Benefit from opportunities and contribute to community development",
    step: "04",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple steps to access information and opportunities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="relative group"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/40 to-transparent" />
                )}
                
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                    <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
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