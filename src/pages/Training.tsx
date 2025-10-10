import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import moduleSafety from "@/assets/module-safety.jpg";

const modules = [
  {
    title: "Safety Induction",
    status: "Published",
    duration: "15 mins",
    image: moduleSafety,
  },
  {
    title: "Emergency Response",
    status: "Published",
    duration: "20 mins",
    image: moduleSafety,
  },
  {
    title: "Equipment Handling",
    status: "Draft",
    duration: "25 mins",
    image: moduleSafety,
  },
  {
    title: "First Aid Basics",
    status: "Published",
    duration: "30 mins",
    image: moduleSafety,
  },
  {
    title: "Environmental Awareness",
    status: "Draft",
    duration: "18 mins",
    image: moduleSafety,
  },
];

const tabs = ["All", "Published", "Draft"];

export default function Training() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Modules Library</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Module
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search modules..." className="pl-10 h-12" />
      </div>

      <div className="flex gap-2">
        {tabs.map((tab, index) => (
          <Button
            key={tab}
            variant={index === 0 ? "default" : "outline"}
            className={index === 0 ? "bg-primary hover:bg-primary/90" : ""}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative h-48 bg-muted">
              <img
                src={module.image}
                alt={module.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                {module.duration}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-3">{module.title}</h3>
              <div className="flex items-center justify-between">
                <Badge
                  variant={module.status === "Published" ? "default" : "secondary"}
                  className={module.status === "Published" ? "bg-primary" : ""}
                >
                  {module.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
