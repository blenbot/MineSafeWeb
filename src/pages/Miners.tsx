import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/lib/api";

interface Miner {
  id: number;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  mining_site: string;
  created_at: string;
}

export default function Miners() {
  const [miners, setMiners] = useState<Miner[]>([]);
  const [filteredMiners, setFilteredMiners] = useState<Miner[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMiner, setSelectedMiner] = useState<Miner | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "",
    mining_site: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchMiners();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMiners(miners);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredMiners(
        miners.filter(
          (miner) =>
            miner.name.toLowerCase().includes(query) ||
            miner.user_id.toLowerCase().includes(query) ||
            miner.email.toLowerCase().includes(query) ||
            miner.role.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, miners]);

  const fetchMiners = async () => {
    try {
      setLoading(true);
      const data: any = await apiClient.getMiners();
      setMiners(data);
      setFilteredMiners(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load miners",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMiner = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Validation Error",
        description: "Name, email, and password are required",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiClient.createMiner(formData);
      toast({
        title: "Success",
        description: "Miner created successfully",
      });
      setIsCreateDialogOpen(false);
      resetForm();
      fetchMiners();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create miner",
        variant: "destructive",
      });
    }
  };

  const handleUpdateMiner = async () => {
    if (!selectedMiner) return;

    try {
      await apiClient.updateMiner(selectedMiner.user_id, {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        role: formData.role,
        mining_site: formData.mining_site,
      });
      toast({
        title: "Success",
        description: "Miner updated successfully",
      });
      setIsEditDialogOpen(false);
      setSelectedMiner(null);
      resetForm();
      fetchMiners();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update miner",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMiner = async () => {
    if (!selectedMiner) return;

    try {
      await apiClient.deleteMiner(selectedMiner.user_id);
      toast({
        title: "Success",
        description: "Miner deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setSelectedMiner(null);
      fetchMiners();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete miner",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (miner: Miner) => {
    setSelectedMiner(miner);
    setFormData({
      name: miner.name,
      email: miner.email,
      password: "",
      phone_number: miner.phone || "",
      role: miner.role || "",
      mining_site: miner.mining_site || "",
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (miner: Miner) => {
    setSelectedMiner(miner);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone_number: "",
      role: "",
      mining_site: "",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading miners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Miners</h1>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => {
            resetForm();
            setIsCreateDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Miner
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search miners by name, ID, email, or role..."
          className="pl-10 h-12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Miner ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Mining Site</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMiners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  {searchQuery ? "No miners found" : "No miners added yet"}
                </TableCell>
              </TableRow>
            ) : (
              filteredMiners.map((miner) => (
                <TableRow key={miner.user_id}>
                  <TableCell className="font-mono text-sm">
                    <Badge variant="outline">{miner.user_id}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{miner.name}</TableCell>
                  <TableCell>{miner.email}</TableCell>
                  <TableCell>{miner.phone || "—"}</TableCell>
                  <TableCell>{miner.role || "—"}</TableCell>
                  <TableCell>{miner.mining_site || "—"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(miner)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(miner)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Miner</DialogTitle>
            <DialogDescription>
              Create a new miner account. They will receive login credentials.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="create-name">Name *</Label>
              <Input
                id="create-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="create-email">Email *</Label>
              <Input
                id="create-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="create-password">Password *</Label>
              <Input
                id="create-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div>
              <Label htmlFor="create-phone">Phone Number</Label>
              <Input
                id="create-phone"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                placeholder="+1234567890"
              />
            </div>
            <div>
              <Label htmlFor="create-role">Role</Label>
              <Input
                id="create-role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Driller, Blaster, etc."
              />
            </div>
            <div>
              <Label htmlFor="create-site">Mining Site</Label>
              <Input
                id="create-site"
                value={formData.mining_site}
                onChange={(e) => setFormData({ ...formData, mining_site: e.target.value })}
                placeholder="Site A, Sector 2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateMiner}>Create Miner</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Miner</DialogTitle>
            <DialogDescription>
              Update miner information. Password cannot be changed here.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input
                id="edit-phone"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-role">Role</Label>
              <Input
                id="edit-role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-site">Mining Site</Label>
              <Input
                id="edit-site"
                value={formData.mining_site}
                onChange={(e) => setFormData({ ...formData, mining_site: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateMiner}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Miner</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedMiner?.name}? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMiner}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
