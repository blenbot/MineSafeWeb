import { ChevronRight, Users, Shield, Settings as SettingsIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const settingsItems = [
  {
    category: "User Management",
    items: [
      {
        icon: Users,
        title: "Users",
        description: "Manage user accounts, roles, and permissions.",
      },
      {
        icon: Shield,
        title: "Roles",
        description: "Manage roles and permissions for different user groups.",
      },
    ],
  },
  {
    category: "Global Settings",
    items: [
      {
        icon: SettingsIcon,
        title: "Settings",
        description: "Configure global settings for the application.",
      },
    ],
  },
];

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings & Admin</h1>
        <p className="text-muted-foreground">Manage users, roles, and global settings.</p>
      </div>

      {settingsItems.map((section, index) => (
        <div key={index} className="space-y-4">
          <h2 className="text-xl font-bold">{section.category}</h2>
          <div className="space-y-4">
            {section.items.map((item, itemIndex) => (
              <Card
                key={itemIndex}
                className="cursor-pointer transition-colors hover:bg-accent"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-accent p-3">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
