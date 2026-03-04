import { motion } from "framer-motion";
import { BookOpen, Users, Download, GraduationCap, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { electives, students } from "@/data/mockData";
import { toast } from "sonner";

const FacultyDashboard = () => {
  const assignedElective = electives[0];
  const assignedStudents = students.filter((s) => s.allocatedElective === assignedElective.id);
  const fillPct = Math.round(((assignedElective.totalSeats - assignedElective.remainingSeats) / assignedElective.totalSeats) * 100);

  return (
    <DashboardLayout title="Faculty Dashboard" subtitle="View your assigned elective and students">
      {/* Assigned Elective Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl gradient-primary p-8 mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/5 to-transparent" />
        <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-primary-foreground/5 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-primary-foreground/60" />
            <span className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider">Your Assigned Elective</span>
          </div>
          <h2 className="text-3xl font-display font-extrabold text-primary-foreground mb-2">{assignedElective.name}</h2>
          <p className="text-primary-foreground/50 text-sm mb-6">{assignedElective.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2.5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/10">
              <p className="text-[10px] text-primary-foreground/40 uppercase font-semibold">Code</p>
              <p className="font-bold text-primary-foreground text-sm">{assignedElective.code}</p>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/10">
              <p className="text-[10px] text-primary-foreground/40 uppercase font-semibold">Total Seats</p>
              <p className="font-bold text-primary-foreground text-sm">{assignedElective.totalSeats}</p>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/10">
              <p className="text-[10px] text-primary-foreground/40 uppercase font-semibold">Enrolled</p>
              <p className="font-bold text-primary-foreground text-sm">{assignedStudents.length}</p>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/10">
              <p className="text-[10px] text-primary-foreground/40 uppercase font-semibold">Fill Rate</p>
              <p className="font-bold text-primary-foreground text-sm">{fillPct}%</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        <StatCard title="Students Allocated" value={assignedStudents.length} icon={<Users size={20} />} delay={0.1} />
        <StatCard title="Seat Fill Rate" value={`${fillPct}%`} icon={<TrendingUp size={20} />} trend="On track" delay={0.2} />
        <StatCard title="Department" value={assignedElective.department} icon={<GraduationCap size={20} />} delay={0.3} />
      </div>

      {/* Student List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card-elevated overflow-hidden"
      >
        <div className="p-6 border-b border-border/50 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center">
              <Users size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground">Enrolled Students</h3>
              <p className="text-xs text-muted-foreground">{assignedStudents.length} students allocated</p>
            </div>
          </div>
          <button
            onClick={() => toast.success("Student list downloaded (UI demo)")}
            className="btn-secondary flex items-center gap-2 text-xs"
          >
            <Download size={14} /> Download CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                <th className="text-left px-6 py-3.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground">#</th>
                <th className="text-left px-6 py-3.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="text-left px-6 py-3.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Roll Number</th>
                <th className="text-left px-6 py-3.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Department</th>
                <th className="text-left px-6 py-3.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Semester</th>
              </tr>
            </thead>
            <tbody>
              {assignedStudents.map((s, i) => (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-6 py-4 text-muted-foreground text-xs">{i + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                        {s.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="badge-primary text-[10px]">{s.rollNumber}</span></td>
                  <td className="px-6 py-4 text-muted-foreground">{s.department}</td>
                  <td className="px-6 py-4 text-muted-foreground">{s.semester}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
