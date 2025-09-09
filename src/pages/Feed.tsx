import { useState } from "react";
import { Heart, MessageCircle, Share, Plus, MapPin, Filter, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "SJ",
      location: "Downtown"
    },
    timestamp: "2 hours ago",
    category: "Road",
    status: "pending",
    description: "Large pothole on Main Street causing traffic issues. Multiple cars have been damaged.",
    image: "/api/placeholder/400/300",
    likes: 23,
    comments: 5,
    location: "Main St & 5th Ave"
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      avatar: "MC",
      location: "Riverside"
    },
    timestamp: "5 hours ago",
    category: "Garbage",
    status: "progress",
    description: "Overflowing trash bins near the park entrance. Attracting pests and creating unsanitary conditions.",
    image: "/api/placeholder/400/300",
    likes: 41,
    comments: 12,
    location: "Riverside Park Entrance"
  },
  {
    id: 3,
    user: {
      name: "Elena Rodriguez",
      avatar: "ER",
      location: "Northside"
    },
    timestamp: "1 day ago",
    category: "Water",
    status: "resolved",
    description: "Water main break flooding the intersection. Emergency crews needed immediately.",
    image: "/api/placeholder/400/300",
    likes: 89,
    comments: 24,
    location: "Oak Ave & Elm Street"
  }
];

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(mockPosts);
  const [filter, setFilter] = useState("all");

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { 
          label: "Pending", 
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

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-civic border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-foreground">CivicConnect</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-civic-orange rounded-full"></div>
            </Button>
            
            <Button variant="ghost" size="icon" onClick={() => setFilter(filter === "all" ? "pending" : "all")}>
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Feed */}
      <main className="pb-20">
        <div className="max-w-lg mx-auto">
          {posts.map((post) => {
            const statusConfig = getStatusConfig(post.status);
            
            return (
              <article key={post.id} className="bg-card border-b border-border p-4 civic-interactive">
                {/* Post Header */}
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
                  
                  {/* Post Image */}
                  <div className="relative overflow-hidden rounded-xl bg-muted aspect-[4/3]">
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
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
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
                      className="flex items-center gap-2 text-muted-foreground hover:text-civic-blue civic-interactive"
                      onClick={() => navigate(`/post/${post.id}`)}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-2 text-muted-foreground hover:text-civic-blue civic-interactive"
                    >
                      <Share className="w-4 h-4" />
                      <span className="text-sm">Share</span>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          variant="civic"
          size="lg"
          className="w-14 h-14 rounded-full shadow-civic civic-float"
          onClick={() => navigate("/create")}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-civic border-t border-border">
        <div className="flex items-center justify-around py-2">
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2">
            <div className="w-6 h-6 bg-civic-blue rounded-lg"></div>
            <span className="text-xs text-civic-blue font-medium">Feed</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2" onClick={() => navigate("/notifications")}>
            <div className="w-6 h-6 bg-muted rounded-lg"></div>
            <span className="text-xs text-muted-foreground">Notifications</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2" onClick={() => navigate("/create")}>
            <div className="w-6 h-6 bg-muted rounded-lg"></div>
            <span className="text-xs text-muted-foreground">Report</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2" onClick={() => navigate("/profile")}>
            <div className="w-6 h-6 bg-muted rounded-lg"></div>
            <span className="text-xs text-muted-foreground">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Feed;