import { useState } from "react";
import { Heart, MessageCircle, Share, Plus, MapPin, Filter, Bell, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Enhanced mock data for public users
const mockPublicPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "SJ",
      location: "Downtown",
      type: "public"
    },
    timestamp: "2 hours ago",
    category: "Road",
    status: "pending",
    priority: "high",
    description: "Large pothole on Main Street causing traffic issues and vehicle damage. This needs immediate attention as it's getting worse daily.",
    image: "/api/placeholder/400/300",
    likes: 23,
    comments: 5,
    location: "Main St & 5th Ave",
    votes: 47
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      avatar: "MC",
      location: "Riverside",
      type: "public"
    },
    timestamp: "5 hours ago",
    category: "Sanitation",
    status: "progress",
    priority: "medium",
    description: "Overflowing trash bins near park entrance creating unsanitary conditions. Local wildlife being affected.",
    image: "/api/placeholder/400/300",
    likes: 41,
    comments: 12,
    location: "Riverside Park Entrance",
    votes: 67
  },
  {
    id: 3,
    user: {
      name: "Elena Rodriguez",
      avatar: "ER",
      location: "Northside",
      type: "public"
    },
    timestamp: "1 day ago",
    category: "Water",
    status: "resolved",
    priority: "critical",
    description: "Water main break caused flooding at intersection. Thanks to quick response, now fully resolved!",
    image: "/api/placeholder/400/300",
    likes: 89,
    comments: 24,
    location: "Oak Ave & Elm Street",
    votes: 156
  }
];

export const PublicFeed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(mockPublicPosts);
  const [filter, setFilter] = useState("all");
  const userName = localStorage.getItem('userName') || 'Community Member';
  const userArea = localStorage.getItem('userArea') || 'Your Area';

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { 
          label: "Pending Review", 
          className: "status-pending",
          color: "civic-yellow"
        };
      case "progress":
        return { 
          label: "In Progress", 
          className: "status-progress",
          color: "civic-orange"
        };
      case "resolved":
        return { 
          label: "Resolved", 
          className: "status-resolved",
          color: "civic-green"
        };
      default:
        return { 
          label: "Unknown", 
          className: "status-pending",
          color: "civic-yellow"
        };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "low":
        return { icon: "🟢", color: "text-civic-green" };
      case "medium":
        return { icon: "🟡", color: "text-civic-yellow" };
      case "high":
        return { icon: "🟠", color: "text-civic-orange" };
      case "critical":
        return { icon: "🔴", color: "text-destructive" };
      default:
        return { icon: "⚪", color: "text-muted-foreground" };
    }
  };

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleVote = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, votes: post.votes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Enhanced Header for Public Users */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-civic border-b border-border shadow-sm">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center civic-float">
                <div className="w-5 h-5 bg-white rounded-md"></div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">CivicConnect</h1>
                <p className="text-xs text-muted-foreground">{userName} • {userArea}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-civic-orange rounded-full"></div>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setFilter(filter === "all" ? "pending" : "all")}
                className={filter !== "all" ? "bg-civic-blue text-civic-blue-foreground" : ""}
              >
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Community Stats */}
      <div className="max-w-lg mx-auto p-4">
        <Card className="civic-card mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-civic-blue">127</div>
                <div className="text-xs text-muted-foreground">Active Reports</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-civic-green">89</div>
                <div className="text-xs text-muted-foreground">Resolved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-civic-orange">38</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feed */}
      <main className="pb-24">
        <div className="max-w-lg mx-auto px-4">
          {posts.map((post) => {
            const statusConfig = getStatusConfig(post.status);
            const priorityConfig = getPriorityConfig(post.priority);
            
            return (
              <Card key={post.id} className="civic-card mb-4 overflow-hidden">
                <CardContent className="p-0">
                  {/* Post Header */}
                  <div className="p-4 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={`/api/avatar/${post.user.avatar}`} />
                          <AvatarFallback className="bg-civic-blue text-civic-blue-foreground text-sm font-medium">
                            {post.user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{post.user.name}</span>
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              {post.category}
                            </Badge>
                            <span className="text-sm" title={`${post.priority} priority`}>
                              {priorityConfig.icon}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{post.location}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Badge className={`${statusConfig.className} text-xs font-medium px-3 py-1 rounded-full`}>
                        {statusConfig.label}
                      </Badge>
                    </div>

                    {/* Post Content */}
                    <div className="space-y-3">
                      <p className="text-sm text-foreground leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Post Image */}
                  <div className="relative bg-muted aspect-[4/3] mx-4 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-2xl bg-${statusConfig.color}-light flex items-center justify-center`}>
                        <MapPin className={`w-8 h-8 text-${statusConfig.color}`} />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2">
                        <p className="text-xs font-medium text-foreground">{post.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Post Actions */}
                  <div className="p-4 pt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-2 text-muted-foreground hover:text-civic-blue civic-interactive"
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{post.likes}</span>
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-2 text-muted-foreground hover:text-civic-orange civic-interactive"
                          onClick={() => handleVote(post.id)}
                        >
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm">{post.votes}</span>
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-2 text-muted-foreground hover:text-civic-blue civic-interactive"
                          onClick={() => navigate(`/post/${post.id}`)}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{post.comments}</span>
                        </Button>
                      </div>

                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-civic-blue civic-interactive"
                      >
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-6 z-50">
        <Button 
          className="w-14 h-14 rounded-full shadow-civic bg-gradient-primary hover:shadow-xl transition-all duration-300 civic-float"
          onClick={() => navigate("/create")}
        >
          <Plus className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-civic border-t border-border shadow-lg">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-around py-3">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2">
              <div className="w-6 h-6 bg-civic-blue rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              <span className="text-xs text-civic-blue font-medium">Feed</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2" onClick={() => navigate("/notifications")}>
              <div className="w-6 h-6 bg-muted rounded-lg flex items-center justify-center">
                <Bell className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">Updates</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2" onClick={() => navigate("/create")}>
              <div className="w-6 h-6 bg-muted rounded-lg flex items-center justify-center">
                <Plus className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">Report</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2" onClick={() => navigate("/profile")}>
              <div className="w-6 h-6 bg-muted rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
              </div>
              <span className="text-xs text-muted-foreground">Profile</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};