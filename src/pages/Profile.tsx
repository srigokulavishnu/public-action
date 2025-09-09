import { useState } from "react";
import { ArrowLeft, Settings, Bell, MapPin, Calendar, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

// Mock user data
const userData = {
  name: "Sarah Johnson",
  avatar: "SJ",
  email: "sarah.johnson@email.com",
  location: "Downtown District",
  joinDate: "March 2024",
  stats: {
    totalReports: 23,
    resolved: 18,
    inProgress: 4,
    pending: 1,
    points: 850
  }
};

// Mock reports data
const userReports = [
  {
    id: 1,
    title: "Pothole on Main Street",
    category: "Road",
    status: "resolved",
    date: "2 days ago",
    likes: 23,
    comments: 5
  },
  {
    id: 2,
    title: "Broken streetlight near park",
    category: "Electricity",
    status: "progress",
    date: "1 week ago",
    likes: 12,
    comments: 3
  },
  {
    id: 3,
    title: "Overflowing trash bins",
    category: "Garbage",
    status: "pending",
    date: "2 weeks ago",
    likes: 8,
    comments: 2
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("reports");

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "Pending", className: "status-pending" };
      case "progress":
        return { label: "In Progress", className: "status-progress" };
      case "resolved":
        return { label: "Resolved", className: "status-resolved" };
      default:
        return { label: "Unknown", className: "status-pending" };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-civic border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Profile</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-subtle p-6 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-4 border-card shadow-card">
              <AvatarImage src="/api/avatar/sarah" />
              <AvatarFallback className="bg-civic-blue text-civic-blue-foreground text-xl font-bold">
                {userData.avatar}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-1">
              <h2 className="text-xl font-bold text-foreground">{userData.name}</h2>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{userData.location}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>Joined {userData.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Community Points */}
          <Card className="bg-card/50 border-civic-blue/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-civic-blue" />
                  <span className="font-medium text-civic-blue">Community Points</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-civic-blue">{userData.stats.points}</p>
                  <p className="text-xs text-muted-foreground">Earned by helping your city</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="p-4 grid grid-cols-4 gap-3">
          <Card className="text-center">
            <CardContent className="p-3">
              <p className="text-lg font-bold text-foreground">{userData.stats.totalReports}</p>
              <p className="text-xs text-muted-foreground">Total Reports</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-3">
              <p className="text-lg font-bold text-civic-green">{userData.stats.resolved}</p>
              <p className="text-xs text-muted-foreground">Resolved</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-3">
              <p className="text-lg font-bold text-civic-orange">{userData.stats.inProgress}</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-3">
              <p className="text-lg font-bold text-civic-yellow">{userData.stats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <div className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="reports">My Reports</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="achievements">Badges</TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="space-y-3">
              {userReports.map((report) => {
                const statusConfig = getStatusConfig(report.status);
                
                return (
                  <Card key={report.id} className="civic-card">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm text-foreground mb-1">{report.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {report.category}
                            </Badge>
                            <Badge className={`${statusConfig.className} text-xs`}>
                              {statusConfig.label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{report.date}</span>
                        <div className="flex items-center gap-3">
                          <span>👍 {report.likes}</span>
                          <span>💬 {report.comments}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card className="civic-card">
                <CardHeader>
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                  <CardDescription>Your recent interactions with the community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-civic-blue rounded-full"></div>
                    <span>Liked "Water main issue on Oak Street"</span>
                    <span className="text-muted-foreground ml-auto">2h</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-civic-green rounded-full"></div>
                    <span>Your report "Pothole on Main St" was resolved</span>
                    <span className="text-muted-foreground ml-auto">1d</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-civic-orange rounded-full"></div>
                    <span>Commented on "Broken streetlight issue"</span>
                    <span className="text-muted-foreground ml-auto">3d</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Card className="text-center p-4 bg-civic-green-light">
                  <div className="w-12 h-12 bg-civic-green rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-civic-green-foreground" />
                  </div>
                  <h3 className="font-medium text-sm text-civic-green">Problem Solver</h3>
                  <p className="text-xs text-civic-green/80">10+ resolved reports</p>
                </Card>
                
                <Card className="text-center p-4 bg-civic-blue-light">
                  <div className="w-12 h-12 bg-civic-blue rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-civic-blue-foreground" />
                  </div>
                  <h3 className="font-medium text-sm text-civic-blue">Community Champion</h3>
                  <p className="text-xs text-civic-blue/80">Active contributor</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;