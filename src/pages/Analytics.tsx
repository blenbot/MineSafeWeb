import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const learners = [
  { name: "Ethan Carter", streak: "7 days", lastActivity: "2 days ago", attempts: 3 },
  { name: "Olivia Bennett", streak: "12 days", lastActivity: "1 day ago", attempts: 5 },
  { name: "Noah Thompson", streak: "3 days", lastActivity: "5 days ago", attempts: 2 },
  { name: "Ava Harper", streak: "9 days", lastActivity: "3 days ago", attempts: 4 },
  { name: "Liam Foster", streak: "5 days", lastActivity: "4 days ago", attempts: 3 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Learner Analytics</h1>
          <p className="text-muted-foreground">
            Track and analyze learner performance across all training modules.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Learners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">245</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Quiz Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">82%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Learning Streaks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">150</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learner Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>LEARNER</TableHead>
                <TableHead>STREAK</TableHead>
                <TableHead>LAST ACTIVITY</TableHead>
                <TableHead className="text-right">QUIZ ATTEMPTS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {learners.map((learner, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{learner.name}</TableCell>
                  <TableCell>{learner.streak}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {learner.lastActivity}
                  </TableCell>
                  <TableCell className="text-right">{learner.attempts}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Streak Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Calendar heatmap visualization</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Note: Leaderboard is optional and requires learner opt-in for privacy.
              </p>
              <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Top performers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
