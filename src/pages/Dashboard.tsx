import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, TrendingUp, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import apiClient from "@/lib/api";

interface DashboardStats {
  total_miners: number;
  active_miners: number;
  total_modules: number;
  monthly_completions: number;
  average_score: number;
  today_completions: number;
}

interface Emergency {
  id: number;
  user_name: string;
  severity: string;
  issue: string;
  location?: string;
  reporting_time: string;
  status: string;
}

interface LearningStreak {
  miner_id: string;
  miner_name: string;
  current_streak: number;
  total_modules: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [streaks, setStreaks] = useState<LearningStreak[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats (supervisor only)
      if (user?.role === "SUPERVISOR") {
        const statsData: any = await apiClient.getDashboardStats();
        setStats(statsData);

        const streaksData: any = await apiClient.getLearningStreaks();
        setStreaks(streaksData.slice(0, 5)); // Top 5
      }

      // Fetch recent emergencies
      const emergenciesData: any = await apiClient.getEmergencies({ status: "PENDING" });
      setEmergencies(emergenciesData.slice(0, 5)); // Latest 5
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toUpperCase()) {
      case "HIGH":
      case "CRITICAL":
        return "bg-red-500";
      case "MEDIUM":
        return "bg-yellow-500";
      case "LOW":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name}
          </p>
        </div>
      </div>

      {/* Stats Cards - Supervisor Only */}
      {user?.role === "SUPERVISOR" && stats && (
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Miners</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_miners}</div>
              <p className="text-xs text-muted-foreground">
                {stats.active_miners} active this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Completions
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today_completions}</div>
              <p className="text-xs text-muted-foreground">
                {stats.monthly_completions} this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.average_score.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.total_modules} modules available
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Emergency Feed */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Emergencies</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/emergencies")}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencies.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No recent emergencies
              </p>
            ) : (
              emergencies.map((emergency) => (
                <div
                  key={emergency.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/emergencies`)}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${getSeverityColor(
                      emergency.severity
                    )}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm truncate">
                        {emergency.issue || "Emergency Reported"}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {emergency.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {emergency.user_name} • {emergency.location || "Location unavailable"}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(emergency.reporting_time)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Learning Streaks - Supervisor Only */}
        {user?.role === "SUPERVISOR" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Learning Streaks</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/miners")}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {streaks.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No streak data available
                </p>
              ) : (
                streaks.map((streak, index) => (
                  <div
                    key={streak.miner_id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{streak.miner_name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {streak.total_modules} modules completed
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {streak.current_streak}
                      </div>
                      <p className="text-xs text-muted-foreground">day streak</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )}

        {/* Miner View */}
        {user?.role === "MINER" && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate("/training")}
              >
                <Video className="mr-2 h-4 w-4" />
                View Training Modules
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate("/emergencies")}
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Report Emergency
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
