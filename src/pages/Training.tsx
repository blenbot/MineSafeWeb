import { useEffect, useState } from "react";
import { Plus, Search, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import apiClient from "@/lib/api";
import moduleSafety from "@/assets/module-safety.jpg";

interface VideoModule {
  id: number;
  title: string;
  description: string;
  video_url: string;
  thumbnail?: string;
  duration: number;
  category?: string;
  created_by?: string;
  is_active: boolean;
  created_at: string;
}

export default function Training() {
  const [modules, setModules] = useState<VideoModule[]>([]);
  const [filteredModules, setFilteredModules] = useState<VideoModule[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<VideoModule | null>(null);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
    thumbnail: "",
    duration: 0,
    category: "",
  });
  const { user } = useAuth();
  const { toast } = useToast();

  const tabs = ["All", "Published", "Draft"];

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    filterModules();
  }, [searchQuery, selectedTab, modules]);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const data: any = await apiClient.getModules();
      setModules(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load modules",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterModules = () => {
    let filtered = modules;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (module) =>
          module.title.toLowerCase().includes(query) ||
          module.description.toLowerCase().includes(query)
      );
    }

    // Filter by tab
    if (selectedTab === "Published") {
      filtered = filtered.filter((module) => module.is_active);
    } else if (selectedTab === "Draft") {
      filtered = filtered.filter((module) => !module.is_active);
    }

    setFilteredModules(filtered);
  };

  const handleCreateModule = async () => {
    if (!formData.title || !formData.video_url) {
      toast({
        title: "Validation Error",
        description: "Title and video URL are required",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiClient.createModule(formData);
      toast({
        title: "Success",
        description: "Module created successfully",
      });
      setIsCreateDialogOpen(false);
      resetForm();
      fetchModules();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create module",
        variant: "destructive",
      });
    }
  };

  const handleStarVideo = async (moduleId: number) => {
    try {
      await apiClient.setStarVideo(moduleId.toString());
      toast({
        title: "Success",
        description: "Starred video set successfully",
      });
      fetchModules(); // Refresh list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to set starred video",
        variant: "destructive",
      });
    }
  };  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      video_url: "",
      thumbnail: "",
      duration: 0,
      category: "",
    });
  };

  const handlePlayVideo = (module: VideoModule) => {
    setSelectedModule(module);
    setIsVideoDialogOpen(true);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min${mins !== 1 ? "s" : ""}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading modules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Training Modules</h1>
        {user?.role === "SUPERVISOR" && (
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={() => {
              resetForm();
              setIsCreateDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Module
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search modules..."
          className="pl-10 h-12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={selectedTab === tab ? "default" : "outline"}
            className={selectedTab === tab ? "bg-primary hover:bg-primary/90" : ""}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredModules.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            {searchQuery ? "No modules found" : "No modules available"}
          </div>
        ) : (
          filteredModules.map((module) => (
            <Card key={module.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div 
                className="relative h-48 bg-muted group cursor-pointer"
                onClick={() => handlePlayVideo(module)}
              >
                <img
                  src={module.thumbnail || moduleSafety}
                  alt={module.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
                {module.duration > 0 && (
                  <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                    {formatDuration(module.duration)}
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{module.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {module.description || "No description available"}
                </p>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={module.is_active ? "default" : "secondary"}
                    className={module.is_active ? "bg-primary" : ""}
                  >
                    {module.is_active ? "Published" : "Draft"}
                  </Badge>
                  {user?.role === "SUPERVISOR" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStarVideo(module.id)}
                      title="Set as star video"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create Module Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Training Module</DialogTitle>
            <DialogDescription>
              Add a new video training module for miners.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Safety Induction"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the training module"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="video-url">Video URL *</Label>
              <Input
                id="video-url"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                placeholder="https://example.com/video.mp4"
              />
            </div>
            <div>
              <Label htmlFor="thumbnail-url">Thumbnail URL</Label>
              <Input
                id="thumbnail-url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Safety"
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })
                }
                placeholder="900"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateModule}>Create Module</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Player Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedModule?.title}</DialogTitle>
            <DialogDescription>{selectedModule?.description}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              src={selectedModule?.video_url}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
