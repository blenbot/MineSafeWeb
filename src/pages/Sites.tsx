import { Plus, Upload, Search } from "lucide-react";
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

const sites = [
  {
    name: "Emerald Mine",
    code: "EMD001",
    region: "Northern Territory",
    supervisor: "Alex Turner",
    createdDate: "2023-08-15",
  },
  {
    name: "Ruby Quarry",
    code: "RBQ002",
    region: "Queensland",
    supervisor: "Olivia Bennett",
    createdDate: "2023-09-22",
  },
  {
    name: "Sapphire Pit",
    code: "SPP003",
    region: "Western Australia",
    supervisor: "Ethan Carter",
    createdDate: "2023-10-10",
  },
  {
    name: "Topaz Excavation",
    code: "TPZ004",
    region: "South Australia",
    supervisor: "Sophia Davis",
    createdDate: "2023-11-05",
  },
  {
    name: "Amethyst Dig",
    code: "AMD005",
    region: "Tasmania",
    supervisor: "Liam Foster",
    createdDate: "2023-12-01",
  },
];

export default function Sites() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mining Sites</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Upload className="mr-2 h-4 w-4" />
            Bulk Upload CSV
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add New Site
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search sites by name, code, or region..."
          className="pl-10 h-12"
        />
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>NAME</TableHead>
              <TableHead>CODE</TableHead>
              <TableHead>REGION</TableHead>
              <TableHead>SUPERVISOR</TableHead>
              <TableHead>CREATED DATE</TableHead>
              <TableHead className="text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sites.map((site) => (
              <TableRow key={site.code}>
                <TableCell className="font-medium">{site.name}</TableCell>
                <TableCell>{site.code}</TableCell>
                <TableCell>{site.region}</TableCell>
                <TableCell>{site.supervisor}</TableCell>
                <TableCell>{site.createdDate}</TableCell>
                <TableCell className="text-right">
                  <Button variant="link" className="text-primary h-auto p-0">
                    View / Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
