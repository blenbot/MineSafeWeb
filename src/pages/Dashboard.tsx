import { Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import mineSite1 from "@/assets/mine-site-1.jpg";
import mineEquipment from "@/assets/mine-equipment.jpg";

const emergencies = [
  {
    title: "Gas Leak Detected",
    location: "Sector 4, Level 2",
    time: "2m ago",
    image: mineSite1,
  },
  {
    title: "Equipment Malfunction",
    location: "Sector 1, Level 1",
    time: "15m ago",
    image: mineEquipment,
  },
  {
    title: "Minor Injury Reported",
    location: "Sector 3, Level 3",
    time: "1h ago",
    image: mineSite1,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Miners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">245</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Emergencies Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Training Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">85%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Emergency Feed</h2>

          {emergencies.map((emergency, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={emergency.image}
                    alt={emergency.title}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{emergency.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {emergency.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{emergency.time}</span>
                      <Button size="sm" className="h-7 bg-primary hover:bg-primary/90">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search location or miner..."
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Map View</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
