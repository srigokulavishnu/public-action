import { useState } from "react";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  Users, 
  Settings, 
  BarChart3,
  Filter,
  Search,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

// Mock data for authority users - issues in their jurisdiction
const mockAuthorityIssues = [
  {
    id: 1,
    reporter: {
      name: "Sarah Johnson",
      avatar: "SJ",
      isAnonymous: false
    },
    timestamp: "2 hours ago",
    category: "Road",
    status: "pending",
    priority: "high",
    description: "Large pothole on Main Street causing traffic issues and vehicle damage. Multiple reports received.",
    location: "Main St & 5th Ave",
    votes: 47,
    comments: 5,
    assignedTo: null,
    estimatedCompletion: null,
    area: "Downtown District"
  },
  {
    id: 2,
    reporter: {
      name: "Mike Chen",
      avatar: "MC",
      isAnonymous: false
    },
    timestamp: "5 hours ago",
    category: "Sanitation",
    status: "progress",
    priority: "medium",
    description: "Overflowing trash bins near park entrance creating unsanitary conditions.",
    location: "Riverside Park Entrance",
    votes: 67,
    comments: 12,
    assignedTo: "Sanitation Team A",
    estimatedCompletion: "Tomorrow",
    area: "Downtown District"
  },
  {
    id: 3,
    reporter: {
      name: "Elena Rodriguez",
      avatar: "ER",
      isAnonymous: false
    },
    timestamp: "1 day ago",
    category: "Water",
    status: "resolved",
    priority: "critical",
    description: "Water main break caused flooding at intersection. Emergency repair completed.",
    location: "Oak Ave & Elm Street",
    votes: 156,
    comments: 24,
    assignedTo: "Water Department",
    estimatedCompletion: "Completed",
    area: "Downtown District"
  }
];

export const AuthorityDashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState(mockAuthorityIssues);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const userName = localStorage.getItem('userName') || 'City Official';
  const userArea = localStorage.getItem('userArea') || 'Downtown District';

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { 
          label: "Needs Action", 
          className: "status-pending",
          color: "civic-yellow",
          icon: Clock
        };
      case "progress":
        return { 
          label: "In Progress", 
          className: "status-progress",
          color: "civic-orange",
          icon: Settings
        };
      case "resolved":
        return { 
          label: "Resolved", 
          className: "status-resolved",
          color: "civic-green",
          icon: CheckCircle
        };
      default:
        return { 
          label: "Unknown", 
          className: "status-pending",
          color: "civic-yellow",
          icon: Clock
        };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "low":
        return { label: "Low", color: "text-civic-green", bg: "bg-civic-green-light" };
      case "medium":
        return { label: "Medium", color: "text-civic-yellow", bg: "bg-civic-yellow-light" };
      case "high":
        return { label: "High", color: "text-civic-orange", bg: "bg-civic-orange-light" };
      case "critical":
        return { label: "Critical", color: "text-destructive", bg: "bg-destructive/10" };
      default:
        return { label: "Unknown", color: "text-muted-foreground", bg: "bg-muted" };
    }
  };

  const updateStatus = (issueId: number, newStatus: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { ...issue, status: newStatus }
        : issue
    ));
  };

  const filteredIssues = issues.filter(issue => {
    if (filter !== "all" && issue.status !== filter) return false;
    if (searchQuery && !issue.description.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !issue.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const stats = {
    pending: issues.filter(i => i.status === "pending").length,
    progress: issues.filter(i => i.status === "progress").length,
    resolved: issues.filter(i => i.status === "resolved").length,
    total: issues.length
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Authority Header */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-civic border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-success rounded-xl flex items-center justify-center civic-float">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Authority Dashboard</h1>
                <p className="text-xs text-muted-foreground">{userName} • {userArea}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <BarChart3 className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="civic-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-civic-yellow">{stats.pending}</div>
              <div className="text-xs text-muted-foreground">Pending Review</div>
            </CardContent>
          </Card>
          
          <Card className="civic-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-civic-orange">{stats.progress}</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          
          <Card className="civic-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-civic-green">{stats.resolved}</div>
              <div className="text-xs text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
          
          <Card className="civic-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-civic-blue">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total Issues</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="civic-card mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search issues by description or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10"
                />
              </div>
              
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-48 h-10">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Issues</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.map((issue) => {
            const statusConfig = getStatusConfig(issue.status);
            const priorityConfig = getPriorityConfig(issue.priority);
            const StatusIcon = statusConfig.icon;
            
            return (
              <Card key={issue.id} className="civic-card">
                <CardContent className="p-0">
                  {/* Issue Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={`/api/avatar/${issue.reporter.avatar}`} />
                          <AvatarFallback className="bg-civic-blue text-civic-blue-foreground text-sm font-medium">
                            {issue.reporter.avatar}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {issue.reporter.isAnonymous ? "Anonymous Report" : issue.reporter.name}
                            </span>
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              {issue.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{issue.location}</span>
                            <span>•</span>
                            <span>{issue.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs px-2 py-1 ${priorityConfig.bg} ${priorityConfig.color} border-0`}>
                          {priorityConfig.label} Priority
                        </Badge>
                        <Badge className={`${statusConfig.className} text-xs font-medium px-3 py-1 rounded-full`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-foreground leading-relaxed mb-3">
                      {issue.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {issue.votes} community votes
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {issue.comments} comments
                        </span>
                      </div>
                      
                      {issue.assignedTo && (
                        <span>Assigned to: {issue.assignedTo}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-4 bg-secondary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {issue.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-civic-orange text-civic-orange-foreground hover:bg-civic-orange/90"
                              onClick={() => updateStatus(issue.id, "progress")}
                            >
                              Start Work
                            </Button>
                            <Button size="sm" variant="outline">
                              Assign Team
                            </Button>
                          </>
                        )}
                        
                        {issue.status === "progress" && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-civic-green text-civic-green-foreground hover:bg-civic-green/90"
                              onClick={() => updateStatus(issue.id, "resolved")}
                            >
                              Mark Resolved
                            </Button>
                            <Button size="sm" variant="outline">
                              Update Progress
                            </Button>
                          </>
                        )}

                        {issue.status === "resolved" && (
                          <Button size="sm" variant="outline" disabled>
                            ✓ Completed
                          </Button>
                        )}
                      </div>

                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => navigate(`/post/${issue.id}`)}
                        className="text-civic-blue hover:text-civic-blue"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>

                    {issue.estimatedCompletion && issue.status !== "resolved" && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          Estimated completion: <span className="text-foreground font-medium">{issue.estimatedCompletion}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredIssues.length === 0 && (
          <Card className="civic-card">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Issues Found</h3>
              <p className="text-muted-foreground">
                {searchQuery || filter !== "all" 
                  ? "Try adjusting your search or filter criteria." 
                  : "All issues in your area have been addressed!"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Navigation for Authority */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-civic border-t border-border shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-around py-3">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2">
              <div className="w-6 h-6 bg-civic-green rounded-lg flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-civic-green font-medium">Dashboard</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2">
              <div className="w-6 h-6 bg-muted rounded-lg flex items-center justify-center">
                <BarChart3 className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">Analytics</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2">
              <div className="w-6 h-6 bg-muted rounded-lg flex items-center justify-center">
                <Users className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">Teams</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 p-2" onClick={() => navigate("/profile")}>
              <div className="w-6 h-6 bg-muted rounded-lg flex items-center justify-center">
                <Settings className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">Settings</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};