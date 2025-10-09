import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

const recentComplaints = [
  {
    id: "CMP001",
    title: "Street Light Not Working",
    category: "Infrastructure",
    status: "In Progress",
    date: "2024-01-15",
  },
  {
    id: "CMP002",
    title: "Water Supply Issue",
    category: "Utilities",
    status: "Resolved",
    date: "2024-01-10",
  },
  {
    id: "CMP003",
    title: "Road Damage",
    category: "Infrastructure",
    status: "Pending",
    date: "2024-01-20",
  },
];

const Complaints = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "In Progress":
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-accent via-accent to-primary py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Complaint Registration
              </h1>
              <p className="text-lg text-white/90">
                Report issues and track their resolution transparently
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Complaint Form */}
            <Card>
              <CardHeader>
                <CardTitle>Register New Complaint</CardTitle>
                <CardDescription>
                  Fill out the form below to submit your complaint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Complaint Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="sanitation">Sanitation</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter location" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your complaint in detail..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Complaint
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Track Complaints */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Track Your Complaint</CardTitle>
                  <CardDescription>
                    Enter your complaint ID to check status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input placeholder="Enter complaint ID (e.g., CMP001)" />
                    <Button>Track</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Complaints</CardTitle>
                  <CardDescription>
                    View status of recently filed complaints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentComplaints.map((complaint) => (
                      <div
                        key={complaint.id}
                        className="p-4 border rounded-lg space-y-2 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{complaint.title}</p>
                            <p className="text-sm text-muted-foreground">
                              ID: {complaint.id} • {complaint.date}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`flex items-center gap-1 ${getStatusColor(complaint.status)}`}
                          >
                            {getStatusIcon(complaint.status)}
                            {complaint.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Category: {complaint.category}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Complaints;
