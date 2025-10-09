import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Eye, Award } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Community First",
    description: "We prioritize the needs of rural communities and work towards their empowerment.",
  },
  {
    icon: Target,
    title: "Transparency",
    description: "Open and honest communication in all our operations and services.",
  },
  {
    icon: Eye,
    title: "Accessibility",
    description: "Making information and services accessible to everyone, regardless of location.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to delivering high-quality services and continuous improvement.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary to-secondary py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                About Rural Connect
              </h1>
              <p className="text-lg text-white/90">
                Bridging the digital divide in rural India
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower rural communities by providing easy access to government schemes, 
                    employment opportunities, and a transparent platform for grievance redressal, 
                    thereby bridging the information gap between urban and rural India.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Eye className="h-6 w-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A digitally empowered rural India where every citizen has access to 
                    information, opportunities, and services, enabling them to participate 
                    fully in the nation's growth and development.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* About Content */}
            <div className="prose prose-lg max-w-none space-y-6">
              <h2 className="text-3xl font-bold">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed">
                Rural Connect is a comprehensive digital platform designed to address the critical 
                information gap faced by rural communities in India. We understand that access to 
                timely and accurate information about government schemes, employment opportunities, 
                and public services can transform lives.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform serves as a one-stop solution for rural citizens, providing them with 
                easy-to-understand information about various welfare schemes, connecting them with 
                local employment opportunities, and offering a transparent system for registering 
                and tracking complaints about public services.
              </p>
              
              <h2 className="text-3xl font-bold mt-12">What We Do</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Simplify access to government schemes with detailed eligibility criteria and application processes</li>
                <li>• Connect job seekers with local employment opportunities in their area</li>
                <li>• Provide a transparent platform for registering and tracking public service complaints</li>
                <li>• Offer multilingual support to ensure accessibility for all</li>
                <li>• Maintain updated and verified information from official sources</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
