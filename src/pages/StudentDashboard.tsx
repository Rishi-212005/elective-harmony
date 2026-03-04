import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Award, Sparkles, Brain } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import ElectiveCard from "@/components/ElectiveCard";
import StatCard from "@/components/StatCard";
import { electives } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

const MIN_PREFS = 3;
const MAX_PREFS = 10;

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
      if (prev.length >= MAX_PREFS) return prev;
      return [...prev, id];
    });
  };

  const handleSubmit = () => {
    if (preferences.length >= MIN_PREFS) setSubmitted(true);
  };

  return (
    <DashboardLayout title="Student Dashboard" subtitle="Manage your elective preferences">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl gradient-primary p-5 sm:p-8 mb-6 sm:mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/5 to-transparent" />
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-primary-foreground/5 blur-2xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Sparkles size={16} className="text-primary-foreground/70" />
              <span className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider">Welcome back</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-primary-foreground mb-1 sm:mb-2">
              Hello, {user?.name} 👋
            </h2>
            <p className="text-primary-foreground/50 text-xs sm:text-sm max-w-md">
              Select {MIN_PREFS}–{MAX_PREFS} preferred open electives. AI recommendations are ready for you.
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate("/elective-selection")}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-primary-foreground text-foreground text-xs sm:text-sm font-bold hover:bg-primary-foreground/90 transition-all shadow-lg flex-1 sm:flex-initial justify-center"
            >
              <BookOpen size={16} /> Browse
            </button>
            <button
              onClick={() => navigate("/allocation-result")}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary-foreground/15 transition-all flex-1 sm:flex-initial justify-center"
            >
              <Award size={16} /> Results
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 mb-6 sm:mb-8">
        <StatCard title="Preferences Set" value={`${preferences.length}/${MAX_PREFS}`} icon={<CheckCircle size={20} />} description={`Min ${MIN_PREFS} required`} delay={0.1} />
        <StatCard title="Available Electives" value={electives.length} icon={<BookOpen size={20} />} description="Open for registration" delay={0.2} />
        <StatCard title="AI Match Score" value="94%" icon={<Brain size={20} />} description="Based on your profile" trend="↑ 12% from last sem" delay={0.3} />
      </div>

      {/* Allocation Status */}
      {allocatedElective && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card-elevated p-4 sm:p-6 mb-6 sm:mb-8 border-l-4 border-l-success"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle size={18} className="text-success" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground text-sm sm:text-base">Allocation Confirmed</h3>
              <p className="text-xs text-muted-foreground">Your elective has been assigned</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            You have been allocated: <span className="font-bold text-foreground">{allocatedElective.name}</span> ({allocatedElective.code}) with {allocatedElective.faculty}
          </p>
        </motion.div>
      )}

      {/* AI Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card-elevated p-4 sm:p-6 mb-6 sm:mb-8"
      >
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Brain size={18} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground text-sm sm:text-base">AI Recommendation</h3>
            <p className="text-xs text-muted-foreground">Based on your CGPA and past performance</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Machine Learning", "Cloud Computing", "NLP"].map((name, i) => (
            <span key={i} className="badge-primary px-3 py-1.5 text-xs font-medium">{name}</span>
          ))}
        </div>
      </motion.div>

      {/* Preference Selection */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-display font-bold text-foreground">Select Preferences</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Choose {MIN_PREFS}–{MAX_PREFS} electives ({preferences.length} selected)
          </p>
        </div>
        {!submitted && preferences.length >= MIN_PREFS && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleSubmit}
            className="btn-primary text-sm w-full sm:w-auto"
          >
            Submit Preferences ({preferences.length})
          </motion.button>
        )}
        {submitted && (
          <span className="badge-success flex items-center gap-2 px-4 py-2">
            <CheckCircle size={14} /> Preferences Submitted
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
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
