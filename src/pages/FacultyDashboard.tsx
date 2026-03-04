import { motion } from "framer-motion";
import { BookOpen, Users, Download } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { electives, students } from "@/data/mockData";
import { toast } from "sonner";

const FacultyDashboard = () => {
  const assignedElective = electives[0]; // Dr. Priya Sharma → Machine Learning
  const assignedStudents = students.filter(s => s.allocatedElective === assignedElective.id);

  return (
    <DashboardLayout title="Faculty Dashboard">
      {/* Assigned Elective */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="text-primary" size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Your Assigned Elective</p>
            <h2 className="text-xl font-display font-bold text-foreground">{assignedElective.name}</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Course Code</p>
            <p className="font-semibold text-foreground">{assignedElective.code}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Total Seats</p>
            <p className="font-semibold text-foreground">{assignedElective.totalSeats}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Students Allocated</p>
            <p className="font-semibold text-foreground">{assignedStudents.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Student List */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-primary" />
            <h3 className="font-display font-semibold text-foreground">Allocated Students</h3>
          </div>
          <button
            onClick={() => toast.success("Student list downloaded (UI demo)")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            <Download size={14} /> Download List
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50">
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">#</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Roll Number</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Department</th>
                <th className="text-left px-6 py-3 font-medium text-muted-foreground">Semester</th>
              </tr>
            </thead>
            <tbody>
              {assignedStudents.map((s, i) => (
                <tr key={s.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-3 text-muted-foreground">{i + 1}</td>
                  <td className="px-6 py-3 font-medium text-foreground">{s.name}</td>
                  <td className="px-6 py-3 text-primary">{s.rollNumber}</td>
                  <td className="px-6 py-3 text-muted-foreground">{s.department}</td>
                  <td className="px-6 py-3 text-muted-foreground">{s.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
