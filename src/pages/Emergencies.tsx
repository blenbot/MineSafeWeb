import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import mineSite1 from "@/assets/mine-site-1.jpg";

export default function Emergencies() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Emergency Details</h1>
          <p className="text-muted-foreground">Site: Alpha Mine | ID: 12345</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-primary">Active</Badge>
          <div className="text-right text-sm">
            <p className="text-muted-foreground">Created: 2024-01-15 10:00 AM</p>
            <p className="text-muted-foreground">Updated: 2024-01-15 10:15 AM</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Media</h2>
            <div className="space-y-4">
              <img
                src={mineSite1}
                alt="Emergency scene"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="grid grid-cols-3 gap-2">
                <img src={mineSite1} alt="Thumbnail 1" className="h-20 w-full object-cover rounded" />
                <img src={mineSite1} alt="Thumbnail 2" className="h-20 w-full object-cover rounded" />
                <div className="h-20 w-full bg-muted rounded flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">+2 more</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Metadata</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Severity</span>
                <Badge variant="destructive">High</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Device</span>
                <span className="font-medium">Sensor 123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">34.0522° N, 118.2437° W</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Miner</span>
                <span className="font-medium">Ethan Carter</span>
              </div>
              <div className="pt-2">
                <span className="text-muted-foreground block mb-2">Description</span>
                <p className="text-sm">Sensor triggered due to high methane levels.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Actions</h2>
          <div className="flex flex-wrap gap-2">
            <Button className="bg-primary hover:bg-primary/90">Mark Resolving</Button>
            <Button variant="outline">Mark Resolved</Button>
            <Button variant="outline">Close False Alarm</Button>
            <Button variant="outline">Assign</Button>
            <Button variant="outline">Escalate</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Audit Trail</h2>
          <div className="space-y-4">
            {[
              { title: "Emergency Created", time: "2024-01-15 10:00 AM" },
              { title: "Assigned to Supervisor", time: "2024-01-15 10:05 AM" },
              { title: "Status Updated to 'Resolving'", time: "2024-01-15 10:10 AM" },
            ].map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="rounded-full bg-primary p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
