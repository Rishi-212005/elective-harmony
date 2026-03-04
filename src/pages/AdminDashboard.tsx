import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, BookOpen, CheckCircle, XCircle, Plus, Play, Lock, Trash2, Edit, BarChart3, TrendingUp, X, Upload,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import {
  electives as initialElectives, students, electivePopularity, seatUtilization, Elective,
} from "@/data/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { toast } from "sonner";

const CHART_COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [electivesList, setElectivesList] = useState<Elective[]>(initialElectives);
  const [showModal, setShowModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [newElective, setNewElective] = useState({
    code: "", name: "", faculty: "", department: "", totalSeats: 70, description: "",
  });

  const allocated = students.filter((s) => s.allocatedElective).length;
  const unallocated = students.length - allocated;

  const handleAddElective = () => {
    if (!newElective.name || !newElective.code) return;
    setElectivesList((prev) => [
      ...prev,
      { ...newElective, id: String(prev.length + 1), remainingSeats: newElective.totalSeats },
    ]);
    setShowModal(false);
    setNewElective({ code: "", name: "", faculty: "", department: "", totalSeats: 70, description: "" });
    toast.success("Elective added successfully!");
  };

  const handleDelete = (id: string) => {
    setElectivesList((prev) => prev.filter((e) => e.id !== id));
    toast.success("Elective deleted.");
  };

  const handleCsvUpload = () => {
    toast.success("CSV file imported successfully! (UI demo)");
    setShowCsvModal(false);
  };

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Manage electives and allocations">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        <StatCard title="Total Students" value={students.length} icon={<Users size={20} />} description="Registered for electives" delay={0} gradient />
        <StatCard title="Total Electives" value={electivesList.length} icon={<BookOpen size={20} />} description="Available this semester" delay={0.1} />
        <StatCard title="Allocated" value={allocated} icon={<CheckCircle size={20} />} trend={`${Math.round((allocated / students.length) * 100)}% success rate`} delay={0.2} />
        <StatCard title="Unallocated" value={unallocated} icon={<XCircle size={20} />} description="Pending allocation" delay={0.3} />
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2 sm:gap-3 mb-8"
      >
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-xs sm:text-sm">
          <Plus size={16} /> Add Elective
        </button>
        <button onClick={() => setShowCsvModal(true)} className="btn-secondary flex items-center gap-2 text-xs sm:text-sm">
          <Upload size={16} /> CSV Upload
        </button>
        <button
          onClick={() => toast.success("AI allocation algorithm executed successfully!")}
          className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm gradient-success text-success-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <Play size={16} /> Run AI Allocation
        </button>
        <button
          onClick={() => toast.success("Allocation has been locked!")}
          className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-warning text-warning-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <Lock size={16} /> Lock
        </button>
        <button onClick={() => navigate("/analytics")} className="btn-secondary flex items-center gap-2 text-xs sm:text-sm">
          <BarChart3 size={16} /> Analytics
        </button>
      </motion.div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card-elevated p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <TrendingUp size={18} className="text-primary" />
            <h3 className="font-display font-bold text-foreground text-sm sm:text-base">Elective Popularity</h3>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={electivePopularity}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(220,9%,46%)" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(220,9%,46%)" }} />
              <Tooltip contentStyle={{ borderRadius: "1rem", border: "1px solid hsl(220,13%,91%)", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Bar dataKey="requests" radius={[8, 8, 0, 0]}>
                {electivePopularity.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card-elevated p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <BarChart3 size={18} className="text-secondary" />
            <h3 className="font-display font-bold text-foreground text-sm sm:text-base">Seat Utilization</h3>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={seatUtilization} dataKey="filled" nameKey="fullName" cx="50%" cy="50%" outerRadius={90} innerRadius={45} paddingAngle={3} label={({ percentage }) => `${percentage}%`}>
                {seatUtilization.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Electives Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card-elevated overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-border/50 flex items-center justify-between">
          <h3 className="font-display font-bold text-foreground text-sm sm:text-base">Manage Electives</h3>
          <span className="badge-primary">{electivesList.length} courses</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-muted/30">
                <th className="text-left px-3 sm:px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Code</th>
                <th className="text-left px-3 sm:px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="text-left px-3 sm:px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Faculty</th>
                <th className="text-left px-3 sm:px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Seats</th>
                <th className="text-left px-3 sm:px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground hidden md:table-cell">Status</th>
                <th className="text-left px-3 sm:px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {electivesList.map((e) => {
                const pct = Math.round(((e.totalSeats - e.remainingSeats) / e.totalSeats) * 100);
                return (
                  <tr key={e.id} className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4"><span className="badge-primary text-[10px]">{e.code}</span></td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-foreground">{e.name}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-muted-foreground hidden sm:table-cell">{e.faculty}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 sm:w-16 progress-bar">
                          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{e.totalSeats - e.remainingSeats}/{e.totalSeats}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                      <span className={pct > 80 ? "badge-warning text-[10px]" : "badge-success text-[10px]"}>
                        {pct > 80 ? "Almost Full" : "Available"}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex gap-1">
                        <button onClick={() => toast.info("Edit elective — UI demo")} className="p-1.5 sm:p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"><Edit size={14} /></button>
                        <button onClick={() => handleDelete(e.id)} className="p-1.5 sm:p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Elective Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-card rounded-3xl border border-border/50 shadow-xl w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border/50">
                <h3 className="font-display font-bold text-lg text-foreground">Add New Elective</h3>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-muted transition-colors"><X size={16} className="text-muted-foreground" /></button>
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                {[
                  { label: "Course Code", key: "code" as const, placeholder: "e.g. CS406" },
                  { label: "Course Name", key: "name" as const, placeholder: "e.g. Data Science" },
                  { label: "Faculty", key: "faculty" as const, placeholder: "e.g. Dr. Smith" },
                  { label: "Department", key: "department" as const, placeholder: "e.g. Computer Science" },
                  { label: "Description", key: "description" as const, placeholder: "Brief description" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">{f.label}</label>
                    <input value={newElective[f.key]} onChange={(e) => setNewElective((prev) => ({ ...prev, [f.key]: e.target.value }))} className="input-field" placeholder={f.placeholder} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Total Seats (default: 70)</label>
                  <input type="number" value={newElective.totalSeats} onChange={(e) => setNewElective((prev) => ({ ...prev, totalSeats: Number(e.target.value) }))} className="input-field" />
                </div>
              </div>
              <div className="flex gap-3 p-5 sm:p-6 pt-0">
                <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button onClick={handleAddElective} className="btn-primary flex-1">Add Elective</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSV Upload Modal */}
      <AnimatePresence>
        {showCsvModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4" onClick={() => setShowCsvModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-card rounded-3xl border border-border/50 shadow-xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border/50">
                <h3 className="font-display font-bold text-lg text-foreground">CSV Bulk Upload</h3>
                <button onClick={() => setShowCsvModal(false)} className="p-2 rounded-xl hover:bg-muted transition-colors"><X size={16} className="text-muted-foreground" /></button>
              </div>
              <div className="p-5 sm:p-6">
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center mb-4 hover:border-primary/40 transition-colors cursor-pointer">
                  <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm font-semibold text-foreground mb-1">Drop CSV file here</p>
                  <p className="text-xs text-muted-foreground">or click to browse</p>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Supported: Students CSV (ID, Name, CGPA, Preferences) or Electives CSV (ID, Name, Seat Limit)
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setShowCsvModal(false)} className="btn-secondary flex-1">Cancel</button>
                  <button onClick={handleCsvUpload} className="btn-primary flex-1">Import</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default AdminDashboard;
