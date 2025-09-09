import { useState } from "react";
import { ArrowLeft, Camera, MapPin, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { value: "road", label: "🛣️ Road Issues" },
  { value: "water", label: "💧 Water & Drainage" },
  { value: "electricity", label: "⚡ Electrical" },
  { value: "garbage", label: "🗑️ Waste Management" },
  { value: "safety", label: "🚨 Safety & Security" },
  { value: "parks", label: "🌳 Parks & Recreation" },
  { value: "noise", label: "🔊 Noise Complaints" },
  { value: "other", label: "📋 Other" }
];

const CreatePost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    location: "Current Location",
    priority: "normal"
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedImages.length > 3) {
      toast({
        title: "Too many images",
        description: "You can upload up to 3 images per report",
        variant: "destructive"
      });
      return;
    }
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description.trim() || !formData.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report submitted successfully!",
        description: "Your report has been sent to the relevant authorities",
      });
      navigate("/");
    }, 2000);
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
            <h1 className="text-lg font-semibold">Report Issue</h1>
          </div>
          <Button 
            variant="civic" 
            size="sm" 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6 max-w-lg mx-auto">
        {/* Photo Upload Section */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Add Photos or Videos</Label>
          
          <div className="grid grid-cols-3 gap-3">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                <img 
                  src={URL.createObjectURL(image)} 
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 w-6 h-6 rounded-full"
                  onClick={() => removeImage(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
            
            {selectedImages.length < 3 && (
              <label className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-civic-blue/50 flex flex-col items-center justify-center cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors civic-interactive">
                <Camera className="w-6 h-6 text-muted-foreground mb-1" />
                <span className="text-xs text-muted-foreground text-center">Add Photo</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground">
            Upload up to 3 photos or videos to help authorities understand the issue better
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-base font-medium">
            Describe the Problem *
          </Label>
          <Textarea
            id="description"
            placeholder="Please provide a detailed description of the issue you're reporting..."
            className="resize-none h-32 rounded-xl"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
          />
        </div>

        {/* Category Selection */}
        <div className="space-y-2">
          <Label className="text-base font-medium">Category *</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Select the type of issue" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label className="text-base font-medium">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="h-12 pl-10 rounded-xl"
              placeholder="Enter location or use current location"
            />
          </div>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            className="w-full h-10 rounded-xl border-dashed"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Use Current Location
          </Button>
        </div>

        {/* Priority Level */}
        <div className="space-y-2">
          <Label className="text-base font-medium">Priority Level</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "low", label: "Low", color: "civic-green" },
              { value: "normal", label: "Normal", color: "civic-yellow" },
              { value: "urgent", label: "Urgent", color: "civic-orange" }
            ].map((priority) => (
              <Button
                key={priority.value}
                type="button"
                variant={formData.priority === priority.value ? "default" : "outline"}
                className={`h-12 rounded-xl ${
                  formData.priority === priority.value 
                    ? `bg-${priority.color} text-${priority.color}-foreground hover:bg-${priority.color}/90` 
                    : ''
                }`}
                onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
              >
                {priority.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-civic-blue-light rounded-xl p-4 space-y-2">
          <h3 className="font-medium text-civic-blue text-sm">Reporting Guidelines</h3>
          <ul className="text-xs text-civic-blue space-y-1">
            <li>• Be specific and accurate in your description</li>
            <li>• Include clear photos if possible</li>
            <li>• Ensure the location is correct</li>
            <li>• Report emergencies to 911 immediately</li>
          </ul>
        </div>

        {/* Submit Button - Mobile */}
        <div className="pt-4">
          <Button 
            type="submit" 
            variant="civic" 
            className="w-full h-12 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting Report..." : "Submit Report"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;