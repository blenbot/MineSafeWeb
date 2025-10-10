import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const miners = [
  {
    name: "Ethan Carter",
    employeeId: "EMP001",
    role: "Driller",
    phone: "+1-555-123-4567",
    status: "Active",
    lastSeen: "2 hours ago",
    completion: 80,
  },
  {
    name: "Olivia Bennett",
    employeeId: "EMP002",
    role: "Blaster",
    phone: "+1-555-987-6543",
    status: "Active",
    lastSeen: "1 hour ago",
    completion: 95,
  },
  {
    name: "Liam Harper",
    employeeId: "EMP003",
    role: "Loader Operator",
    phone: "+1-555-246-8013",
    status: "Inactive",
    lastSeen: "3 days ago",
    completion: 60,
  },
  {
    name: "Sophia Turner",
    employeeId: "EMP004",
    role: "Safety Officer",
    phone: "+1-555-135-7924",
    status: "Active",
    lastSeen: "30 minutes ago",
    completion: 100,
  },
];

export default function Miners() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Miners</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Miner
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search miners by name, ID, or role..."
          className="pl-10 h-12"
        />
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Miner</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead>Modules Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {miners.map((miner) => (
              <TableRow key={miner.employeeId}>
                <TableCell className="font-medium">{miner.name}</TableCell>
                <TableCell>{miner.employeeId}</TableCell>
                <TableCell>{miner.role}</TableCell>
                <TableCell>{miner.phone}</TableCell>
                <TableCell>
                  <Badge
                    variant={miner.status === "Active" ? "default" : "secondary"}
                    className={miner.status === "Active" ? "bg-primary" : ""}
                  >
                    {miner.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{miner.lastSeen}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={miner.completion} className="w-24 h-2" />
                    <span className="text-sm font-medium">{miner.completion}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
