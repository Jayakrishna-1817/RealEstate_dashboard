import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, Briefcase } from "lucide-react";

const jobs = [
  {
    title: "Farm Supervisor",
    company: "Green Valley Farms",
    location: "Kurnool District",
    type: "Full-time",
    salary: "₹15,000 - ₹20,000/month",
    description: "Supervise daily farm operations and manage farm workers.",
    posted: "2 days ago",
  },
  {
    title: "Dairy Farm Worker",
    company: "Milk Producers Cooperative",
    location: "Anantapur District",
    type: "Full-time",
    salary: "₹12,000 - ₹15,000/month",
    description: "Assist in dairy operations including milking and animal care.",
    posted: "3 days ago",
  },
  {
    title: "Village Accountant",
    company: "Gram Panchayat Office",
    location: "Chittoor District",
    type: "Contract",
    salary: "₹18,000 - ₹25,000/month",
    description: "Maintain village records and assist in administrative tasks.",
    posted: "5 days ago",
  },
  {
    title: "Agricultural Extension Officer",
    company: "State Agriculture Department",
    location: "Multiple Districts",
    type: "Government",
    salary: "₹25,000 - ₹35,000/month",
    description: "Provide technical guidance to farmers on modern farming techniques.",
    posted: "1 week ago",
  },
  {
    title: "Electrician",
    company: "Rural Electrification Corporation",
    location: "Krishna District",
    type: "Full-time",
    salary: "₹20,000 - ₹28,000/month",
    description: "Installation and maintenance of electrical systems in rural areas.",
    posted: "1 week ago",
  },
  {
    title: "Health Worker (ASHA)",
    company: "Health Department",
    location: "West Godavari District",
    type: "Part-time",
    salary: "₹10,000 - ₹15,000/month",
    description: "Community health worker providing basic healthcare services.",
    posted: "2 weeks ago",
  },
];

const Jobs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary via-secondary to-accent py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Local Employment Opportunities
              </h1>
              <p className="text-lg text-white/90">
                Find jobs in your area that match your skills
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search jobs..."
                  className="pl-10"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Location..."
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Jobs List */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <CardDescription className="text-base mb-3">{job.company}</CardDescription>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.posted}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2">{job.salary}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <Button>Apply Now</Button>
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

export default Jobs;
