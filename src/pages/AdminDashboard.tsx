import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BookOpen, CheckCircle, XCircle, Plus, Play, Lock, Trash2, Edit, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { electives as initialElectives, students, electivePopularity, seatUtilization, Elective } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";

const COLORS = ["#3b82f6", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#6366f1"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [electivesList, setElectivesList] = useState<Elective[]>(initialElectives);
  const [showModal, setShowModal] = useState(false);
  const [newElective, setNewElective] = useState({ code: "", name: "", faculty: "", department: "", totalSeats: 50, description: "" });

  const allocated = students.filter(s => s.allocatedElective).length;
  const unallocated = students.length - allocated;

  const handleAddElective = () => {
    if (!newElective.name || !newElective.code) return;
    setElectivesList(prev => [...prev, {
      ...newElective,
      id: String(prev.length + 1),
      remainingSeats: newElective.totalSeats,
    }]);
    setShowModal(false);
    setNewElective({ code: "", name: "", faculty: "", department: "", totalSeats: 50, description: "" });
    toast.success("Elective added successfully!");
  };

  const handleDelete = (id: string) => {
    setElectivesList(prev => prev.filter(e => e.id !== id));
    toast.success("Elective deleted.");
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Total Students" value={students.length} icon={<Users size={20} />} description="Registered for electives" />
        <StatCard title="Total Electives" value={electivesList.length} icon={<BookOpen size={20} />} description="Available this semester" />
        <StatCard title="Allocated" value={allocated} icon={<CheckCircle size={20} />} trend={`${Math.round((allocated/students.length)*100)}% allocation rate`} />
        <StatCard title="Unallocated" value={unallocated} icon={<XCircle size={20} />} description="Pending allocation" />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={16} /> Add Elective
        </button>
        <button onClick={() => toast.success("Allocation algorithm executed!")} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-success text-success-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Play size={16} /> Run Allocation
        </button>
        <button onClick={() => toast.success("Allocation locked!")} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-warning text-warning-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Lock size={16} /> Lock Allocation
        </button>
        <button onClick={() => navigate("/analytics")} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
          <BarChart3 size={16} /> Analytics
        </button>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Elective Popularity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={electivePopularity}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(215,16%,47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215,16%,47%)" />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214,32%,91%)" }} />
              <Bar dataKey="requests" fill="hsl(217,91%,50%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Seat Utilization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={seatUtilization} dataKey="filled" nameKey="fullName" cx="50%" cy="50%" outerRadius={100} label={({ fullName, percentage }) => `${fullName}: ${percentage}%`}>
                {seatUtilization.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Electives Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-display font-semibold text-foreground">Manage Electives</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50">
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Code</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Faculty</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Seats</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {electivesList.map((e) => (
                <tr key={e.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-3 font-medium text-primary">{e.code}</td>
                  <td className="px-6 py-3 text-foreground">{e.name}</td>
                  <td className="px-6 py-3 text-muted-foreground">{e.faculty}</td>
                  <td className="px-6 py-3 text-muted-foreground">{e.totalSeats - e.remainingSeats}/{e.totalSeats}</td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => toast.info("Edit modal — UI demo")} className="p-1.5 rounded-md hover:bg-primary/10 text-primary transition-colors"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(e.id)} className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Elective Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 w-full max-w-lg mx-4"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-lg text-foreground mb-4">Add New Elective</h3>
            <div className="space-y-3">
              {[
                { label: "Course Code", key: "code" as const, placeholder: "e.g. CS406" },
                { label: "Course Name", key: "name" as const, placeholder: "e.g. Data Science" },
                { label: "Faculty", key: "faculty" as const, placeholder: "e.g. Dr. Smith" },
                { label: "Department", key: "department" as const, placeholder: "e.g. Computer Science" },
                { label: "Description", key: "description" as const, placeholder: "Brief description" },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
                  <input
                    value={newElective[f.key]}
                    onChange={e => setNewElective(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Total Seats</label>
                <input
                  type="number"
                  value={newElective.totalSeats}
                  onChange={e => setNewElective(prev => ({ ...prev, totalSeats: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
                Cancel
              </button>
              <button onClick={handleAddElective} className="flex-1 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                Add Elective
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
