import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Users, Search, Filter } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { students, electives } from "@/data/mockData";

const branches = ["All", ...Array.from(new Set(students.map((s) => s.department)))];
const semesters = ["All", ...Array.from(new Set(students.map((s) => String(s.semester))))];

const AdminStudents = () => {
  const [branch, setBranch] = useState("All");
  const [semester, setSemester] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return students.filter((s) => {
      if (branch !== "All" && s.department !== branch) return false;
      if (semester !== "All" && String(s.semester) !== semester) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.rollNumber.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [branch, semester, search]);

  const getElectiveName = (id?: string) => {
    if (!id) return "—";
    return electives.find((e) => e.id === id)?.name || "—";
  };

  return (
    <DashboardLayout title="Student Management" subtitle="View all students who applied for electives">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or roll number..." className="input-field pl-9 w-full" />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <select value={branch} onChange={(e) => setBranch(e.target.value)} className="input-field pl-8 pr-8 appearance-none cursor-pointer text-sm min-w-[140px]">
              {branches.map((b) => <option key={b} value={b}>{b === "All" ? "All Branches" : b}</option>)}
            </select>
          </div>
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <select value={semester} onChange={(e) => setSemester(e.target.value)} className="input-field pl-8 pr-8 appearance-none cursor-pointer text-sm min-w-[130px]">
              {semesters.map((s) => <option key={s} value={s}>{s === "All" ? "All Semesters" : `Sem ${s}`}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-2 mb-4">
        <Users size={16} className="text-primary" />
        <span className="text-sm font-semibold text-foreground">{filtered.length} students found</span>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-muted/30">
                <th className="text-left px-3 sm:px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Roll No</th>
                <th className="text-left px-3 sm:px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="text-left px-3 sm:px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Branch</th>
                <th className="text-left px-3 sm:px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Sem</th>
                <th className="text-left px-3 sm:px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">CGPA</th>
                <th className="text-left px-3 sm:px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground hidden md:table-cell">Preferences</th>
                <th className="text-left px-3 sm:px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Allocated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="px-3 sm:px-5 py-3"><span className="badge-primary text-[10px]">{s.rollNumber}</span></td>
                  <td className="px-3 sm:px-5 py-3 font-semibold text-foreground">{s.name}</td>
                  <td className="px-3 sm:px-5 py-3 text-muted-foreground hidden sm:table-cell">{s.department}</td>
                  <td className="px-3 sm:px-5 py-3 text-muted-foreground">{s.semester}</td>
                  <td className="px-3 sm:px-5 py-3"><span className="font-semibold text-foreground">{s.cgpa}</span></td>
                  <td className="px-3 sm:px-5 py-3 hidden md:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {s.preferences.map((p, i) => {
                        const el = electives.find((e) => e.id === p);
                        return <span key={i} className="badge-secondary text-[9px]">{el?.code || p}</span>;
                      })}
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-3">
                    {s.allocatedElective ? (
                      <span className="badge-success text-[10px]">{getElectiveName(s.allocatedElective)}</span>
                    ) : (
                      <span className="badge-warning text-[10px]">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No students match filters.</div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminStudents;
