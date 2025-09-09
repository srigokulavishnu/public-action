// CivicConnect - Modern Civic Engagement Platform

import { Button } from "@/components/ui/button";
import { Shield, Users, CheckCircle, TrendingUp, MapPin, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-24 text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mb-8 civic-float">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-foreground mb-6 text-shadow">
            Your Voice for a
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Better City</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Report civic issues, track their resolution, and connect with your community to build the city you want to live in.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="civic" 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 h-auto border-2"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-civic-blue-light rounded-2xl rotate-12 opacity-60"></div>
        <div className="absolute top-32 right-16 w-12 h-12 bg-civic-green-light rounded-xl -rotate-12 opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-civic-orange-light rounded-lg rotate-45 opacity-60"></div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Everything you need for civic engagement</h2>
          <p className="text-lg text-muted-foreground">Powerful tools to connect citizens with their local government</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card rounded-2xl p-8 civic-card text-center">
            <div className="w-16 h-16 bg-civic-blue-light rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-civic-blue" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">Location-Based Reporting</h3>
            <p className="text-muted-foreground">Report issues exactly where they happen with GPS accuracy and visual proof</p>
          </div>

          <div className="bg-card rounded-2xl p-8 civic-card text-center">
            <div className="w-16 h-16 bg-civic-orange-light rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-civic-orange" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">Real-Time Tracking</h3>
            <p className="text-muted-foreground">Follow your reports from submission to resolution with live status updates</p>
          </div>

          <div className="bg-card rounded-2xl p-8 civic-card text-center">
            <div className="w-16 h-16 bg-civic-green-light rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-civic-green" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">Community Engagement</h3>
            <p className="text-muted-foreground">Connect with neighbors, discuss issues, and work together for solutions</p>
          </div>

          <div className="bg-card rounded-2xl p-8 civic-card text-center lg:col-start-1">
            <div className="w-16 h-16 bg-civic-yellow-light rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-civic-yellow-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">Safe & Secure</h3>
            <p className="text-muted-foreground">Your privacy is protected with secure, anonymous reporting options</p>
          </div>

          <div className="bg-card rounded-2xl p-8 civic-card text-center">
            <div className="w-16 h-16 bg-civic-blue-light rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-civic-blue" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">Government Integration</h3>
            <p className="text-muted-foreground">Direct connection to city departments for faster response and resolution</p>
          </div>

          <div className="bg-card rounded-2xl p-8 civic-card text-center">
            <div className="w-16 h-16 bg-civic-green-light rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-civic-green" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">Proven Results</h3>
            <p className="text-muted-foreground">Join thousands of citizens making their communities better every day</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to make a difference?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join your community in building a better city, one report at a time.
          </p>
          <Button 
            variant="civic" 
            size="lg" 
            className="text-lg px-12 py-6 h-auto"
            onClick={() => navigate("/login")}
          >
            Start Reporting Issues
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
