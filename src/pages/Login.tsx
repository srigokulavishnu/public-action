import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('hasSeenLogin', 'true');
      // Force app to re-check auth state
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Branding */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center civic-float">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">CivicConnect</h1>
          <p className="text-muted-foreground">Your voice for a better city</p>
        </div>

        {/* Auth Card */}
        <Card className="civic-card border-0">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <CardHeader className="text-center p-0 pb-4">
                  <CardTitle className="text-xl">Welcome back</CardTitle>
                  <CardDescription>Sign in to continue reporting and tracking issues</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4 p-0">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4 p-0 pt-4">
                  <Button 
                    type="submit" 
                    variant="civic" 
                    className="w-full h-12 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    Forgot your password? 
                    <button className="text-civic-blue hover:underline ml-1">Reset it here</button>
                  </p>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleLogin} className="space-y-4">
                <CardHeader className="text-center p-0 pb-4">
                  <CardTitle className="text-xl">Join your community</CardTitle>
                  <CardDescription>Create an account to start making a difference</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4 p-0">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John"
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe"
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input 
                      id="signupEmail" 
                      type="email" 
                      placeholder="your@email.com"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <Input 
                      id="signupPassword" 
                      type="password" 
                      placeholder="Create a secure password"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4 p-0 pt-4">
                  <Button 
                    type="submit" 
                    variant="civic" 
                    className="w-full h-12 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground leading-relaxed px-2">
                    By signing up, you agree to help make your city better and follow our community guidelines.
                  </p>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Features Preview */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="w-8 h-8 bg-civic-blue-light rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-civic-blue" />
            </div>
            <span>Connect with your community</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="w-8 h-8 bg-civic-orange-light rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-civic-orange" />
            </div>
            <span>Report issues safely and anonymously</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="w-8 h-8 bg-civic-green-light rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-civic-green" />
            </div>
            <span>Track resolution progress in real-time</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;