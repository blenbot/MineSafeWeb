import { useEffect, useState } from "react";
import { Plus, AlertCircle, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import apiClient from "@/lib/api";

interface Emergency {
  id: number;
  user_id: string;
  user_name: string;
  emergency_id: string;
  severity: string;
  issue: string;
  media_url?: string;
  media_status: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  reporting_time: string;
  status: string;
  created_at: string;
}

export default function Emergencies() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [filteredEmergencies, setFilteredEmergencies] = useState<Emergency[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
  const [formData, setFormData] = useState({
    emergency_id: "",
    severity: "MEDIUM",
    issue: "",
    latitude: "",
    longitude: "",
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchEmergencies();
  }, []);

  useEffect(() => {
    filterEmergencies();
  }, [statusFilter, emergencies]);

  const fetchEmergencies = async () => {
    try {
      setLoading(true);
      const data: any = await apiClient.getEmergencies();
      setEmergencies(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load emergencies",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterEmergencies = () => {
    if (statusFilter === "ALL") {
      setFilteredEmergencies(emergencies);
    } else {
      setFilteredEmergencies(emergencies.filter((e) => e.status === statusFilter));
    }
  };

  const handleReportEmergency = async () => {
    if (!formData.emergency_id || !formData.issue) {
      toast({
        title: "Validation Error",
        description: "Emergency ID and issue description are required",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiClient.reportEmergency({
        emergency_id: formData.emergency_id,
        severity: formData.severity,
        issue: formData.issue,
        latitude: formData.latitude ? parseFloat(formData.latitude) : undefined,
        longitude: formData.longitude ? parseFloat(formData.longitude) : undefined,
      });
      toast({
        title: "Success",
        description: "Emergency reported successfully",
      });
      setIsReportDialogOpen(false);
      resetForm();
      fetchEmergencies();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to report emergency",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async (emergencyId: number, newStatus: string) => {
    try {
      await apiClient.updateEmergencyStatus(emergencyId, newStatus);
      toast({
        title: "Success",
        description: "Emergency status updated",
      });
      fetchEmergencies();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      emergency_id: "",
      severity: "MEDIUM",
      issue: "",
      latitude: "",
      longitude: "",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toUpperCase()) {
      case "HIGH":
      case "CRITICAL":
        return "bg-red-500 text-white";
      case "MEDIUM":
        return "bg-yellow-500 text-white";
      case "LOW":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "bg-orange-500 text-white";
      case "RESOLVING":
        return "bg-blue-500 text-white";
      case "RESOLVED":
        return "bg-green-500 text-white";
      case "FALSE_ALARM":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading emergencies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Emergency Reports</h1>
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="RESOLVING">Resolving</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
              <SelectItem value="FALSE_ALARM">False Alarm</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => {
              resetForm();
              setIsReportDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Report Emergency
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredEmergencies.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              {statusFilter === "ALL"
                ? "No emergencies reported"
                : `No ${statusFilter.toLowerCase()} emergencies`}
            </CardContent>
          </Card>
        ) : (
          filteredEmergencies.map((emergency) => (
            <Card key={emergency.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <CardTitle className="text-xl">
                        {emergency.issue || "Emergency Report"}
                      </CardTitle>
                      <Badge className={getSeverityColor(emergency.severity)}>
                        {emergency.severity}
                      </Badge>
                      <Badge className={getStatusColor(emergency.status)}>
                        {emergency.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>ID: {emergency.emergency_id}</span>
                      <span>•</span>
                      <span>Reporter: {emergency.user_name}</span>
                    </div>
                  </div>
                  {user?.role === "SUPERVISOR" && emergency.status === "PENDING" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(emergency.id, "RESOLVING")}
                      >
                        Mark Resolving
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateStatus(emergency.id, "FALSE_ALARM")}
                      >
                        False Alarm
                      </Button>
                    </div>
                  )}
                  {user?.role === "SUPERVISOR" && emergency.status === "RESOLVING" && (
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(emergency.id, "RESOLVED")}
                    >
                      Mark Resolved
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Reported:</span>
                      <span className="font-medium">
                        {formatTime(emergency.reporting_time)}
                      </span>
                    </div>
                    {emergency.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{emergency.location}</span>
                      </div>
                    )}
                    {emergency.latitude && emergency.longitude && (
                      <div className="text-sm text-muted-foreground">
                        Coordinates: {emergency.latitude.toFixed(6)}, {emergency.longitude.toFixed(6)}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Media Status:</span>
                      <span className="ml-2 font-medium">
                        {emergency.media_status || "PENDING"}
                      </span>
                    </div>
                    {emergency.media_url && (
                      <div className="text-sm">
                        <a
                          href={emergency.media_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          View Media
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Report Emergency Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Emergency</DialogTitle>
            <DialogDescription>
              Submit a new emergency report. Include as much detail as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="emergency-id">Emergency ID *</Label>
              <Input
                id="emergency-id"
                value={formData.emergency_id}
                onChange={(e) =>
                  setFormData({ ...formData, emergency_id: e.target.value })
                }
                placeholder="EMRG-001"
              />
            </div>
            <div>
              <Label htmlFor="severity">Severity *</Label>
              <Select
                value={formData.severity}
                onValueChange={(value) =>
                  setFormData({ ...formData, severity: value })
                }
              >
                <SelectTrigger id="severity">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="CRITICAL">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="issue">Issue Description *</Label>
              <Textarea
                id="issue"
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                placeholder="Describe the emergency situation..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) =>
                    setFormData({ ...formData, latitude: e.target.value })
                  }
                  placeholder="28.7041"
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) =>
                    setFormData({ ...formData, longitude: e.target.value })
                  }
                  placeholder="77.1025"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReportEmergency} className="bg-red-600 hover:bg-red-700">
              Report Emergency
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
