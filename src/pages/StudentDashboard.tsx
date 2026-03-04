import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Award, Sparkles, TrendingUp, Clock, Brain } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import ElectiveCard from "@/components/ElectiveCard";
import StatCard from "@/components/StatCard";
import { electives } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const allocatedElective = electives.find((e) => e.id === "1");

  const togglePreference = (id: string) => {
    if (submitted) return;
    setPreferences((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const handleSubmit = () => {
    if (preferences.length === 3) setSubmitted(true);
  };

  return (
    <DashboardLayout title="Student Dashboard" subtitle="Manage your elective preferences">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl gradient-primary p-8 mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/5 to-transparent" />
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-primary-foreground/5 blur-2xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-primary-foreground/70" />
              <span className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider">Welcome back</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-primary-foreground mb-2">
              Hello, {user?.name} 👋
            </h2>
            <p className="text-primary-foreground/50 text-sm max-w-md">
              Select your preferred open electives for this semester. AI recommendations are ready for you.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/elective-selection")}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-foreground text-foreground text-sm font-bold hover:bg-primary-foreground/90 transition-all shadow-lg"
            >
              <BookOpen size={16} /> Browse Electives
            </button>
            <button
              onClick={() => navigate("/allocation-result")}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-semibold hover:bg-primary-foreground/15 transition-all"
            >
              <Award size={16} /> Results
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        <StatCard title="Preferences Set" value={`${preferences.length}/3`} icon={<CheckCircle size={20} />} description="Complete your selection" delay={0.1} />
        <StatCard title="Available Electives" value={electives.length} icon={<BookOpen size={20} />} description="Open for registration" delay={0.2} />
        <StatCard title="AI Match Score" value="94%" icon={<Brain size={20} />} description="Based on your profile" trend="↑ 12% from last sem" delay={0.3} />
      </div>

      {/* Allocation Status */}
      {allocatedElective && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card-elevated p-6 mb-8 border-l-4 border-l-success"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle size={18} className="text-success" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground">Allocation Confirmed</h3>
              <p className="text-xs text-muted-foreground">Your elective has been assigned</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            You have been allocated: <span className="font-bold text-foreground">{allocatedElective.name}</span> ({allocatedElective.code}) with {allocatedElective.faculty}
          </p>
        </motion.div>
      )}

      {/* AI Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card-elevated p-6 mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Brain size={18} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground">AI Recommendation</h3>
            <p className="text-xs text-muted-foreground">Based on your profile and past performance</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Machine Learning", "Cloud Computing", "NLP"].map((name, i) => (
            <span key={i} className="badge-primary px-3 py-1.5 text-xs font-medium">{name}</span>
          ))}
        </div>
      </motion.div>

      {/* Preference Selection */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-display font-bold text-foreground">Select Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Choose exactly 3 electives ({preferences.length}/3 selected)
          </p>
        </div>
        {!submitted && preferences.length === 3 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleSubmit}
            className="btn-primary"
          >
            Submit Preferences
          </motion.button>
        )}
        {submitted && (
          <span className="badge-success flex items-center gap-2 px-4 py-2">
            <CheckCircle size={14} /> Preferences Submitted
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {electives.map((elective, i) => {
          const prefIndex = preferences.indexOf(elective.id);
          return (
            <ElectiveCard
              key={elective.id}
              elective={elective}
              selectable={!submitted}
              selected={prefIndex !== -1}
              preferenceLabel={prefIndex !== -1 ? `Preference ${prefIndex + 1}` : undefined}
              onSelect={() => togglePreference(elective.id)}
              delay={i * 0.05}
            />
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
