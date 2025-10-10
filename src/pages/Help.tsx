import { ChevronRight, AlertTriangle, Zap, Sparkles, Wind, Lightbulb, Wrench, AlertCircle, BadgeCheck, Calendar, ClipboardCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const dgmsRegulations = [
  {
    icon: AlertTriangle,
    title: "Safety Measures for Underground Mining",
    subtitle: "Regulation 1",
  },
  {
    icon: Zap,
    title: "Handling Explosives in Mining Operations",
    subtitle: "Regulation 2",
  },
  {
    icon: Sparkles,
    title: "Emergency Response Procedures",
    subtitle: "Regulation 3",
  },
  {
    icon: Wind,
    title: "Ventilation Standards in Mines",
    subtitle: "Regulation 4",
  },
  {
    icon: Lightbulb,
    title: "Electrical Safety in Mining",
    subtitle: "Regulation 5",
  },
];

const internalSOPs = [
  {
    icon: Wrench,
    title: "Equipment Maintenance Checklist",
    subtitle: "SOP 1",
  },
  {
    icon: AlertCircle,
    title: "Incident Reporting Protocol",
    subtitle: "SOP 2",
  },
  {
    icon: BadgeCheck,
    title: "New Employee Orientation Guide",
    subtitle: "SOP 3",
  },
  {
    icon: Calendar,
    title: "Safety Training Schedule",
    subtitle: "SOP 4",
  },
  {
    icon: ClipboardCheck,
    title: "Site Inspection Procedures",
    subtitle: "SOP 5",
  },
];

export default function Help() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Help / SOPs</h1>
        <p className="text-muted-foreground">
          Access DGMS regulations and internal Standard Operating Procedures.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">DGMS Regulations</h2>
        <div className="space-y-3">
          {dgmsRegulations.map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-colors hover:bg-accent"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-accent p-3">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Internal SOPs</h2>
        <div className="space-y-3">
          {internalSOPs.map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-colors hover:bg-accent"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-accent p-3">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
