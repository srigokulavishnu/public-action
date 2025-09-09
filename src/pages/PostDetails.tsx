import { useState } from "react";
import { ArrowLeft, Heart, MessageCircle, Share, MapPin, Calendar, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";

// Mock post data
const mockPost = {
  id: 1,
  user: {
    name: "Sarah Johnson",
    avatar: "SJ",
    location: "Downtown"
  },
  timestamp: "2 hours ago",
  category: "Road",
  status: "pending",
  description: "Large pothole on Main Street causing traffic issues. Multiple cars have been damaged and it's creating a safety hazard for drivers and cyclists. The hole is approximately 2 feet wide and 6 inches deep.",
  image: "/api/placeholder/400/300",
  likes: 23,
  comments: [
    {
      id: 1,
      user: { name: "Mike Chen", avatar: "MC" },
      content: "I've seen this too. Almost damaged my tire yesterday!",
      timestamp: "1 hour ago",
      likes: 5
    },
    {
      id: 2,
      user: { name: "City Road Dept", avatar: "CRD", isOfficial: true },
      content: "Thank you for reporting this. We've assigned a crew to assess and repair this pothole. Expected completion within 48 hours.",
      timestamp: "30 minutes ago",
      likes: 12
    }
  ],
  location: "Main St & 5th Ave",
  priority: "normal",
  reportNumber: "CR-2024-0156"
};

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(mockPost);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

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

  const handleLike = () => {
    setIsLiked(!isLiked);
    setPost(prev => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: post.comments.length + 1,
      user: { name: "You", avatar: "YU" },
      content: newComment,
      timestamp: "just now",
      likes: 0
    };

    setPost(prev => ({
      ...prev,
      comments: [...prev.comments, comment]
    }));
    setNewComment("");
  };

  const statusConfig = getStatusConfig(post.status);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-civic border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Report Details</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Share className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto">
        {/* Post Header */}
        <div className="p-4 bg-card border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={`/api/avatar/${post.user.avatar}`} />
                <AvatarFallback className="bg-civic-blue text-civic-blue-foreground font-medium">
                  {post.user.avatar}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{post.user.name}</span>
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

          {/* Report Number */}
          <div className="bg-muted rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Report ID:</span>
              <span className="font-mono font-medium">{post.reportNumber}</span>
            </div>
          </div>
        </div>

        {/* Post Image */}
        <div className="relative aspect-[4/3] bg-muted">
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted flex items-center justify-center">
            <div className={`w-20 h-20 rounded-3xl bg-${statusConfig.color}-light flex items-center justify-center`}>
              <MapPin className={`w-10 h-10 text-${statusConfig.color}`} />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-card/90 backdrop-blur-sm rounded-xl px-4 py-3">
              <p className="font-medium text-foreground mb-1">{post.location}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Reported {post.timestamp}
              </p>
            </div>
          </div>
        </div>

        {/* Post Description */}
        <div className="p-4 bg-card border-b border-border">
          <p className="text-foreground leading-relaxed mb-4">
            {post.description}
          </p>
          
          {/* Priority and Status */}
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Flag className="w-3 h-3" />
              Normal Priority
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`flex items-center gap-2 ${isLiked ? 'text-civic-blue' : 'text-muted-foreground'} hover:text-civic-blue civic-interactive`}
                onClick={handleLike}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{post.likes}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2 text-muted-foreground hover:text-civic-blue civic-interactive"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{post.comments.length}</span>
              </Button>
            </div>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-4 space-y-4">
          <h3 className="font-semibold text-foreground">Comments ({post.comments.length})</h3>
          
          {/* Add Comment */}
          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="resize-none rounded-xl"
              rows={3}
            />
            <div className="flex justify-end">
              <Button 
                type="submit" 
                variant="civic" 
                size="sm"
                disabled={!newComment.trim()}
              >
                Post Comment
              </Button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <Card key={comment.id} className="civic-card">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={`/api/avatar/${comment.user.avatar}`} />
                      <AvatarFallback className={`text-xs ${comment.user.isOfficial ? 'bg-civic-blue text-civic-blue-foreground' : 'bg-muted'}`}>
                        {comment.user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">
                          {comment.user.name}
                        </span>
                        {comment.user.isOfficial && (
                          <Badge variant="secondary" className="text-xs bg-civic-blue text-civic-blue-foreground">
                            Official
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {comment.timestamp}
                        </span>
                      </div>
                      
                      <p className="text-sm text-foreground leading-relaxed mb-2">
                        {comment.content}
                      </p>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-civic-blue p-0 h-auto text-xs"
                      >
                        👍 {comment.likes}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;