import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { students, electives, electivePopularity, seatUtilization } from "@/data/mockData";
import { Users, BookOpen, TrendingUp, CheckCircle } from "lucide-react";

const COLORS = ["#3b82f6", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#6366f1"];

const departmentData = [
  { name: "CS", students: 6 },
  { name: "EC", students: 2 },
  { name: "ME", students: 1 },
  { name: "CE", students: 1 },
];

const trendData = [
  { day: "Day 1", selections: 12 },
  { day: "Day 2", selections: 35 },
  { day: "Day 3", selections: 58 },
  { day: "Day 4", selections: 72 },
  { day: "Day 5", selections: 89 },
  { day: "Day 6", selections: 95 },
  { day: "Day 7", selections: 100 },
];

const allocated = students.filter(s => s.allocatedElective).length;

const AnalyticsDashboard = () => (
  <DashboardLayout title="Analytics Dashboard">
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <StatCard title="Total Students" value={students.length} icon={<Users size={20} />} />
      <StatCard title="Total Electives" value={electives.length} icon={<BookOpen size={20} />} />
      <StatCard title="Allocation Rate" value={`${Math.round((allocated/students.length)*100)}%`} icon={<TrendingUp size={20} />} />
      <StatCard title="Avg Satisfaction" value="87%" icon={<CheckCircle size={20} />} description="Based on preference match" />
    </div>

    <div className="grid lg:grid-cols-2 gap-6 mb-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Elective Demand</h3>
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
        <h3 className="font-display font-semibold text-foreground mb-4">Selection Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(215,16%,47%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(215,16%,47%)" />
            <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214,32%,91%)" }} />
            <Area type="monotone" dataKey="selections" stroke="hsl(199,89%,48%)" fill="hsl(199,89%,48%)" fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Seat Utilization</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={seatUtilization} dataKey="filled" nameKey="fullName" cx="50%" cy="50%" outerRadius={100} label={({ fullName, percentage }) => `${fullName}: ${percentage}%`}>
              {seatUtilization.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Students by Department</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
            <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(215,16%,47%)" />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="hsl(215,16%,47%)" />
            <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214,32%,91%)" }} />
            <Bar dataKey="students" fill="hsl(142,71%,45%)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  </DashboardLayout>
);

export default AnalyticsDashboard;
