import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { students, electives, electivePopularity, seatUtilization, allocationRounds, fairnessData } from "@/data/mockData";
import { Users, BookOpen, TrendingUp, CheckCircle, BarChart3, Activity, Eye, Shield, Play, Pause } from "lucide-react";

const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

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

const AnalyticsDashboard = () => {
  const [activeRound, setActiveRound] = useState(0);
  const [simulating, setSimulating] = useState(false);

  const startSimulation = () => {
    setSimulating(true);
    setActiveRound(0);
    let round = 0;
    const interval = setInterval(() => {
      round++;
      if (round >= allocationRounds.length) {
        clearInterval(interval);
        setSimulating(false);
        return;
      }
      setActiveRound(round);
    }, 1500);
  };

  return (
    <DashboardLayout title="Analytics Dashboard" subtitle="Comprehensive allocation insights">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        <StatCard title="Total Students" value={students.length} icon={<Users size={20} />} delay={0} />
        <StatCard title="Total Electives" value={electives.length} icon={<BookOpen size={20} />} delay={0.1} />
        <StatCard title="Allocation Rate" value={`${Math.round((allocated / students.length) * 100)}%`} icon={<TrendingUp size={20} />} delay={0.2} gradient />
        <StatCard title="Avg Satisfaction" value="87%" icon={<CheckCircle size={20} />} description="Based on preference match" delay={0.3} />
      </div>

      {/* Allocation Round Visualization */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card-elevated p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Eye size={18} className="text-primary" />
            <h3 className="font-display font-bold text-foreground text-sm sm:text-base">Allocation Round Visualization</h3>
          </div>
          <button
            onClick={startSimulation}
            disabled={simulating}
            className="btn-primary flex items-center gap-2 text-xs disabled:opacity-50"
          >
            {simulating ? <><Pause size={14} /> Simulating...</> : <><Play size={14} /> Run Simulation</>}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {allocationRounds.map((round, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.4, scale: 0.95 }}
              animate={{
                opacity: i <= activeRound ? 1 : 0.4,
                scale: i === activeRound ? 1.02 : 0.95,
                borderColor: i === activeRound ? "hsl(221,83%,53%)" : "hsl(220,13%,91%)",
              }}
              transition={{ duration: 0.4 }}
              className={`p-3 sm:p-4 rounded-xl border-2 text-center ${i <= activeRound ? "bg-primary/5" : "bg-muted/30"}`}
            >
              <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Round {round.round}</p>
              <p className="text-xl sm:text-2xl font-display font-extrabold text-foreground">{round.allocated}</p>
              <p className="text-[10px] text-muted-foreground">allocated</p>
              {i <= activeRound && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-primary font-medium mt-2 leading-tight">
                  {round.description}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fairness Analytics */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card-elevated p-4 sm:p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Shield size={18} className="text-secondary" />
          <h3 className="font-display font-bold text-foreground text-sm sm:text-base">Fairness Analytics by CGPA Range</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-muted/30">
                <th className="text-left px-3 sm:px-4 py-2.5 font-semibold text-xs uppercase text-muted-foreground">CGPA Range</th>
                <th className="text-center px-3 sm:px-4 py-2.5 font-semibold text-xs uppercase text-muted-foreground">Students</th>
                <th className="text-center px-3 sm:px-4 py-2.5 font-semibold text-xs uppercase text-muted-foreground">1st Pref</th>
                <th className="text-center px-3 sm:px-4 py-2.5 font-semibold text-xs uppercase text-muted-foreground">2nd Pref</th>
                <th className="text-center px-3 sm:px-4 py-2.5 font-semibold text-xs uppercase text-muted-foreground">3rd Pref</th>
                <th className="text-center px-3 sm:px-4 py-2.5 font-semibold text-xs uppercase text-muted-foreground hidden sm:table-cell">Unalloc.</th>
                <th className="text-center px-3 sm:px-4 py-2.5 font-semibold text-xs uppercase text-muted-foreground">Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {fairnessData.map((row, i) => (
                <tr key={i} className="border-t border-border/30">
                  <td className="px-3 sm:px-4 py-3 font-semibold text-foreground">{row.range}</td>
                  <td className="px-3 sm:px-4 py-3 text-center">{row.students}</td>
                  <td className="px-3 sm:px-4 py-3 text-center"><span className="badge-success text-[10px]">{row.gotFirst}</span></td>
                  <td className="px-3 sm:px-4 py-3 text-center"><span className="badge-primary text-[10px]">{row.gotSecond}</span></td>
                  <td className="px-3 sm:px-4 py-3 text-center"><span className="badge-warning text-[10px]">{row.gotThird}</span></td>
                  <td className="px-3 sm:px-4 py-3 text-center hidden sm:table-cell">{row.unallocated > 0 ? <span className="text-destructive font-bold">{row.unallocated}</span> : "—"}</td>
                  <td className="px-3 sm:px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 sm:w-16 progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${row.satisfaction}%` }} />
                      </div>
                      <span className="text-xs font-semibold">{row.satisfaction}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card-elevated p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <BarChart3 size={18} className="text-primary" />
            <h3 className="font-display font-bold text-foreground text-sm sm:text-base">Elective Demand</h3>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={electivePopularity}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(220,9%,46%)" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(220,9%,46%)" }} />
              <Tooltip contentStyle={{ borderRadius: "1rem", border: "1px solid hsl(220,13%,91%)", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Bar dataKey="requests" radius={[8, 8, 0, 0]}>
                {electivePopularity.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card-elevated p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Activity size={18} className="text-info" />
            <h3 className="font-display font-bold text-foreground text-sm sm:text-base">Selection Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(220,9%,46%)" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(220,9%,46%)" }} />
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
      <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card-elevated p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <TrendingUp size={18} className="text-secondary" />
            <h3 className="font-display font-bold text-foreground text-sm sm:text-base">Seat Utilization</h3>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={seatUtilization} dataKey="filled" nameKey="fullName" cx="50%" cy="50%" outerRadius={90} innerRadius={45} paddingAngle={3} label={({ percentage }) => `${percentage}%`}>
                {seatUtilization.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="glass-card-elevated p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Users size={18} className="text-success" />
            <h3 className="font-display font-bold text-foreground text-sm sm:text-base">CGPA Distribution of Allocated Students</h3>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={fairnessData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis dataKey="range" tick={{ fontSize: 10, fill: "hsl(220,9%,46%)" }} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(220,9%,46%)" }} />
              <Tooltip contentStyle={{ borderRadius: "1rem", border: "1px solid hsl(220,13%,91%)", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Bar dataKey="gotFirst" name="1st Pref" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
              <Bar dataKey="gotSecond" name="2nd Pref" stackId="a" fill="#3b82f6" />
              <Bar dataKey="gotThird" name="3rd Pref" stackId="a" fill="#f59e0b" />
              <Bar dataKey="unallocated" name="Unallocated" stackId="a" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsDashboard;
