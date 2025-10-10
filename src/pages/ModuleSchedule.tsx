import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ModuleSchedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Module of the Day</h1>
        <p className="text-muted-foreground">
          Schedule and manage daily learning modules for miners.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Today's Module</h2>
        <Card>
          <CardContent className="p-6">
            <div className="mb-2">
              <span className="text-sm text-primary font-medium">Today, July 26, 2024</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Safety Procedures for Blasting Operations
            </h3>
            <p className="text-muted-foreground mb-6">
              Ensure all miners are aware of the latest safety protocols for blasting
              operations. This module covers pre-blast checks, evacuation procedures, and
              post-blast inspections.
            </p>
            <Button variant="outline" className="text-primary border-primary">
              Override Today's Module
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold mb-4">Schedule New Module</h2>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label>Site</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Site" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emerald">Emerald Mine</SelectItem>
                    <SelectItem value="ruby">Ruby Quarry</SelectItem>
                    <SelectItem value="sapphire">Sapphire Pit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Module</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Module" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety">Safety Induction</SelectItem>
                    <SelectItem value="emergency">Emergency Response</SelectItem>
                    <SelectItem value="equipment">Equipment Handling</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="repeat-mode">Repeat every working day</Label>
                <Switch id="repeat-mode" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Calendar</h2>
          <Card>
            <CardContent className="p-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Schedule Module
        </Button>
      </div>
    </div>
  );
}
