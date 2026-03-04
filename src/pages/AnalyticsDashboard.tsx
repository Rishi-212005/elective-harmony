import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { students, electives, electivePopularity, seatUtilization } from "@/data/mockData";
import { Users, BookOpen, TrendingUp, CheckCircle, BarChart3, Activity } from "lucide-react";

const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

const departmentData = [
  { name: "Computer Science", students: 6 },
  { name: "Electronics", students: 2 },
  { name: "Mechanical", students: 1 },
  { name: "Civil", students: 1 },
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

const allocated = students.filter((s) => s.allocatedElective).length;

const AnalyticsDashboard = () => (
  <DashboardLayout title="Analytics Dashboard" subtitle="Comprehensive allocation insights">
    {/* Stats */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <StatCard title="Total Students" value={students.length} icon={<Users size={20} />} delay={0} />
      <StatCard title="Total Electives" value={electives.length} icon={<BookOpen size={20} />} delay={0.1} />
      <StatCard title="Allocation Rate" value={`${Math.round((allocated / students.length) * 100)}%`} icon={<TrendingUp size={20} />} delay={0.2} gradient />
      <StatCard title="Avg Satisfaction" value="87%" icon={<CheckCircle size={20} />} description="Based on preference match" delay={0.3} />
    </div>

    {/* Charts row 1 */}
    <div className="grid lg:grid-cols-2 gap-6 mb-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card-elevated p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={18} className="text-primary" />
          <h3 className="font-display font-bold text-foreground">Elective Demand</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={electivePopularity}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} />
            <Tooltip contentStyle={{ borderRadius: "1rem", border: "1px solid hsl(220,13%,91%)", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)", fontSize: 12 }} />
            <Bar dataKey="requests" radius={[8, 8, 0, 0]}>
              {electivePopularity.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card-elevated p-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity size={18} className="text-info" />
          <h3 className="font-display font-bold text-foreground">Selection Trend</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} />
            <Tooltip contentStyle={{ borderRadius: "1rem", border: "1px solid hsl(220,13%,91%)", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)", fontSize: 12 }} />
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(221,83%,53%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(221,83%,53%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="selections" stroke="hsl(221,83%,53%)" strokeWidth={2.5} fill="url(#areaGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Charts row 2 */}
    <div className="grid lg:grid-cols-2 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card-elevated p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={18} className="text-secondary" />
          <h3 className="font-display font-bold text-foreground">Seat Utilization</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={seatUtilization} dataKey="filled" nameKey="fullName" cx="50%" cy="50%" outerRadius={100} innerRadius={50} paddingAngle={3} label={({ percentage }) => `${percentage}%`}>
              {seatUtilization.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card-elevated p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users size={18} className="text-success" />
          <h3 className="font-display font-bold text-foreground">Students by Department</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
            <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} width={120} />
            <Tooltip contentStyle={{ borderRadius: "1rem", border: "1px solid hsl(220,13%,91%)", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)", fontSize: 12 }} />
            <Bar dataKey="students" radius={[0, 8, 8, 0]}>
              {departmentData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  </DashboardLayout>
);

export default AnalyticsDashboard;
