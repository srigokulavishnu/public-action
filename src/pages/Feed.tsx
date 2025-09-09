import { useState, useEffect } from "react";
import { PublicFeed } from "@/components/PublicFeed";
import { AuthorityDashboard } from "@/components/AuthorityDashboard";

const Feed = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem('userRole') || 'public';
    setUserRole(role);
  }, []);

  // Show loading while determining role
  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-lg"></div>
          </div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Route to appropriate interface based on user role
  if (userRole === 'authority') {
    return <AuthorityDashboard />;
  }

  return <PublicFeed />;
};

export default Feed;