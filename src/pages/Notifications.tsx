import { ArrowLeft, Bell, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "status_update",
    title: "Report Status Updated",
    message: "Your report 'Pothole on Main Street' has been marked as Resolved by the Road Maintenance Department.",
    time: "2 hours ago",
    status: "resolved",
    unread: true
  },
  {
    id: 2,
    type: "status_update",
    title: "Report In Progress",
    message: "Your report 'Broken streetlight near park' is now being worked on by the Electrical Department.",
    time: "1 day ago",
    status: "progress",
    unread: true
  },
  {
    id: 3,
    type: "announcement",
    title: "City Announcement",
    message: "Water supply maintenance scheduled for tomorrow 9 AM - 2 PM in the Downtown area.",
    time: "2 days ago",
    status: "info",
    unread: false
  },
  {
    id: 4,
    type: "comment",
    title: "New Comment",
    message: "John Davis commented on your report 'Overflowing trash bins': 'I've noticed the same issue in my area.'",
    time: "3 days ago",
    status: "comment",
    unread: false
  },
  {
    id: 5,
    type: "status_update",
    title: "Report Acknowledged",
    message: "Your report 'Noise complaint - construction work' has been received and assigned to Noise Control Unit.",
    time: "1 week ago",
    status: "pending",
    unread: false
  }
];

const Notifications = () => {
  const navigate = useNavigate();

  const getNotificationIcon = (type: string, status: string) => {
    switch (type) {
      case "status_update":
        switch (status) {
          case "resolved":
            return <CheckCircle className="w-5 h-5 text-civic-green" />;
          case "progress":
            return <Clock className="w-5 h-5 text-civic-orange" />;
          default:
            return <Bell className="w-5 h-5 text-civic-yellow" />;
        }
      case "announcement":
        return <AlertTriangle className="w-5 h-5 text-civic-blue" />;
      case "comment":
        return <Bell className="w-5 h-5 text-civic-blue" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getNotificationBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="status-resolved text-xs">Resolved</Badge>;
      case "progress":
        return <Badge className="status-progress text-xs">In Progress</Badge>;
      case "pending":
        return <Badge className="status-pending text-xs">Pending</Badge>;
      case "info":
        return <Badge variant="outline" className="text-xs border-civic-blue text-civic-blue">Announcement</Badge>;
      case "comment":
        return <Badge variant="outline" className="text-xs">Comment</Badge>;
      default:
        return null;
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
            <h1 className="text-lg font-semibold">Notifications</h1>
          </div>
          <Button variant="ghost" size="sm" className="text-civic-blue">
            Mark all read
          </Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-3">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`civic-card cursor-pointer transition-all ${
              notification.unread ? 'border-civic-blue/30 bg-civic-blue-light/20' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type, notification.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-sm text-foreground">
                      {notification.title}
                    </h3>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-civic-blue rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                    {getNotificationBadge(notification.status)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* No more notifications message */}
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Bell className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">You're all caught up!</p>
          <p className="text-xs text-muted-foreground mt-1">No more notifications to show</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;