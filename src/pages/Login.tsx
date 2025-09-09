import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Users, CheckCircle, UserCheck, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleLogin = async (e: React.FormEvent, role?: string) => {
    e.preventDefault();
    setIsLoading(true);

    const finalRole = role || selectedRole || 'public';
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('hasSeenLogin', 'true');
      localStorage.setItem('userRole', finalRole);
      localStorage.setItem('userName', finalRole === 'authority' ? 'City Official' : 'Community Member');
      localStorage.setItem('userArea', finalRole === 'authority' ? 'Downtown District' : 'Riverside');
      // Force app to re-check auth state
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Branding */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center civic-float shadow-civic">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-foreground tracking-tight">CivicConnect</h1>
            <p className="text-lg text-muted-foreground">Bridging Communities & Authorities</p>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="civic-card cursor-pointer group hover:shadow-civic transition-all duration-300 border-2 hover:border-civic-blue/30"
            onClick={() => handleLogin(new Event('click') as any, 'public')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-civic-blue-light rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-civic-blue" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Public</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Report issues in your community</p>
            </CardContent>
          </Card>

          <Card 
            className="civic-card cursor-pointer group hover:shadow-civic transition-all duration-300 border-2 hover:border-civic-green/30"
            onClick={() => handleLogin(new Event('click') as any, 'authority')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-civic-green-light rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 text-civic-green" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Authority</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Manage & resolve community issues</p>
            </CardContent>
          </Card>
        </div>

        {/* Manual Auth Card - Alternative Option */}
        <Card className="civic-card border border-border/30">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/50">
              <TabsTrigger value="login" className="rounded-lg">Manual Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg">Manual Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
                <CardHeader className="text-center p-0 pb-4">
                  <CardTitle className="text-lg">Sign in with credentials</CardTitle>
                  <CardDescription className="text-sm">Enter your details to continue</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4 p-0">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com"
                      className="h-11 rounded-xl border-border/40 focus:border-civic-blue"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      className="h-11 rounded-xl border-border/40 focus:border-civic-blue"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                    <Select value={selectedRole} onValueChange={setSelectedRole} required>
                      <SelectTrigger className="h-11 rounded-xl border-border/40 focus:border-civic-blue">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-civic-blue" />
                            <span>Public - Report Issues</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="authority">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-civic-green" />
                            <span>Authority - Manage Issues</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-3 p-0 pt-4">
                  <Button 
                    type="submit" 
                    variant="civic" 
                    className="w-full h-11 text-sm font-medium rounded-xl"
                    disabled={isLoading || !selectedRole}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground">
                    Forgot your password? 
                    <button type="button" className="text-civic-blue hover:underline ml-1">Reset it here</button>
                  </p>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
                <CardHeader className="text-center p-0 pb-4">
                  <CardTitle className="text-lg">Create new account</CardTitle>
                  <CardDescription className="text-sm">Join the community platform</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4 p-0">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John"
                        className="h-11 rounded-xl border-border/40 focus:border-civic-blue"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe"
                        className="h-11 rounded-xl border-border/40 focus:border-civic-blue"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail" className="text-sm font-medium">Email</Label>
                    <Input 
                      id="signupEmail" 
                      type="email" 
                      placeholder="your@email.com"
                      className="h-11 rounded-xl border-border/40 focus:border-civic-blue"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword" className="text-sm font-medium">Password</Label>
                    <Input 
                      id="signupPassword" 
                      type="password" 
                      placeholder="Create a secure password"
                      className="h-11 rounded-xl border-border/40 focus:border-civic-blue"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupRole" className="text-sm font-medium">Account Type</Label>
                    <Select value={selectedRole} onValueChange={setSelectedRole} required>
                      <SelectTrigger className="h-11 rounded-xl border-border/40 focus:border-civic-blue">
                        <SelectValue placeholder="Choose account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-civic-blue" />
                            <span>Public Account</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="authority">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-civic-green" />
                            <span>Authority Account</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-3 p-0 pt-4">
                  <Button 
                    type="submit" 
                    variant="civic" 
                    className="w-full h-11 text-sm font-medium rounded-xl"
                    disabled={isLoading || !selectedRole}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground leading-relaxed px-2">
                    By signing up, you agree to our community guidelines and terms of service.
                  </p>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Features Preview */}
        <div className="bg-secondary/30 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-center text-foreground mb-4">Platform Features</h3>
          
          <div className="grid gap-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-10 h-10 bg-civic-blue-light rounded-xl flex items-center justify-center civic-float">
                <Users className="w-5 h-5 text-civic-blue" />
              </div>
              <div>
                <p className="font-medium text-foreground">Community Connection</p>
                <p className="text-xs text-muted-foreground">Connect citizens with local authorities</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-10 h-10 bg-civic-orange-light rounded-xl flex items-center justify-center civic-float">
                <Shield className="w-5 h-5 text-civic-orange" />
              </div>
              <div>
                <p className="font-medium text-foreground">Secure Reporting</p>
                <p className="text-xs text-muted-foreground">Report issues safely with photo evidence</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-10 h-10 bg-civic-green-light rounded-xl flex items-center justify-center civic-float">
                <CheckCircle className="w-5 h-5 text-civic-green" />
              </div>
              <div>
                <p className="font-medium text-foreground">Real-time Updates</p>
                <p className="text-xs text-muted-foreground">Track resolution progress and get updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;