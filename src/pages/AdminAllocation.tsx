import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Play, Users, CheckCircle, XCircle, Filter, Search, Lock, RotateCcw } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { students, electives, allocationRounds } from "@/data/mockData";
import { toast } from "sonner";

const branches = ["All", ...Array.from(new Set(students.map((s) => s.department)))];
const semesters = ["All", ...Array.from(new Set(students.map((s) => String(s.semester))))];

const AdminAllocation = () => {
  const [branch, setBranch] = useState("All");
  const [semester, setSemester] = useState("All");
  const [search, setSearch] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [allocationDone, setAllocationDone] = useState(false);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      if (branch !== "All" && s.department !== branch) return false;
      if (semester !== "All" && String(s.semester) !== semester) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.rollNumber.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [branch, semester, search]);

  const allocated = filtered.filter((s) => s.allocatedElective).length;
  const unallocated = filtered.length - allocated;

  const getElectiveName = (id?: string) => {
    if (!id) return "—";
    return electives.find((e) => e.id === id)?.name || "—";
  };

  const runAllocation = () => {
    setIsRunning(true);
    setCurrentRound(0);
    setAllocationDone(false);

    let round = 0;
    const interval = setInterval(() => {
      round++;
      setCurrentRound(round);
      if (round >= allocationRounds.length) {
        clearInterval(interval);
        setIsRunning(false);
        setAllocationDone(true);
        toast.success("AI Allocation completed successfully!");
      }
    }, 1200);
  };

  const resetAllocation = () => {
    setCurrentRound(0);
    setAllocationDone(false);
    toast.info("Allocation reset.");
  };

  return (
    <DashboardLayout title="Allocation Management" subtitle="Run and manage the AI-based elective allocation">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Students" value={filtered.length} icon={<Users size={18} />} description="In current filter" delay={0} gradient />
        <StatCard title="Allocated" value={allocated} icon={<CheckCircle size={18} />} trend={`${filtered.length > 0 ? Math.round((allocated / filtered.length) * 100) : 0}%`} delay={0.1} />
        <StatCard title="Unallocated" value={unallocated} icon={<XCircle size={18} />} description="Pending" delay={0.2} />
        <StatCard title="Rounds" value={`${currentRound}/${allocationRounds.length}`} icon={<Play size={18} />} description={isRunning ? "Running..." : allocationDone ? "Complete" : "Ready"} delay={0.3} />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={runAllocation}
          disabled={isRunning}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm gradient-success text-success-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={16} className={isRunning ? "animate-spin" : ""} /> {isRunning ? "Running..." : "Run AI Allocation"}
        </button>
        <button
          onClick={() => toast.success("Allocation locked!")}
          disabled={!allocationDone}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-warning text-warning-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Lock size={16} /> Lock Allocation
        </button>
        <button onClick={resetAllocation} className="btn-secondary flex items-center gap-2 text-sm">
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      {/* Round Progress */}
      {(isRunning || allocationDone) && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card-elevated p-5 mb-6">
          <h3 className="font-display font-bold text-sm text-foreground mb-4">Allocation Rounds</h3>
          <div className="space-y-3">
            {allocationRounds.map((r, i) => (
              <motion.div
                key={r.round}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: i < currentRound ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
                  i < currentRound ? "border-primary/30 bg-primary/5" : "border-border/30 bg-muted/10"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  i < currentRound ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {r.round}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{r.description}</p>
                  <p className="text-xs text-muted-foreground">Allocated: {r.allocated} · Unallocated: {r.unallocated}</p>
                </div>
                {i < currentRound && <CheckCircle size={16} className="text-primary shrink-0" />}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." className="input-field pl-9 w-full" />
        </div>
        <div className="flex gap-3">
          <select value={branch} onChange={(e) => setBranch(e.target.value)} className="input-field appearance-none cursor-pointer text-sm min-w-[140px]">
            {branches.map((b) => <option key={b} value={b}>{b === "All" ? "All Branches" : b}</option>)}
          </select>
          <select value={semester} onChange={(e) => setSemester(e.target.value)} className="input-field appearance-none cursor-pointer text-sm min-w-[130px]">
            {semesters.map((s) => <option key={s} value={s}>{s === "All" ? "All Semesters" : `Sem ${s}`}</option>)}
          </select>
        </div>
      </div>

      {/* Student Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card-elevated overflow-hidden">
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
                <th className="text-left px-3 sm:px-5 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="px-3 sm:px-5 py-3"><span className="badge-primary text-[10px]">{s.rollNumber}</span></td>
                  <td className="px-3 sm:px-5 py-3 font-semibold text-foreground">{s.name}</td>
                  <td className="px-3 sm:px-5 py-3 text-muted-foreground hidden sm:table-cell">{s.department}</td>
                  <td className="px-3 sm:px-5 py-3 text-muted-foreground">{s.semester}</td>
                  <td className="px-3 sm:px-5 py-3 font-semibold text-foreground">{s.cgpa}</td>
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

export default AdminAllocation;
