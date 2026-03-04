import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Award } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import ElectiveCard from "@/components/ElectiveCard";
import { electives } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const allocatedElective = electives.find(e => e.id === "1"); // mock

  const togglePreference = (id: string) => {
    if (submitted) return;
    setPreferences(prev => {
      if (prev.includes(id)) return prev.filter(p => p !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const handleSubmit = () => {
    if (preferences.length === 3) setSubmitted(true);
  };

  return (
    <DashboardLayout title="Student Dashboard">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-8"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Welcome back, {user?.name} 👋
            </h2>
            <p className="text-muted-foreground mt-1">Select your preferred open electives for this semester.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/elective-selection")}
              className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <BookOpen size={16} /> Browse Electives
            </button>
            <button
              onClick={() => navigate("/allocation-result")}
              className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2"
            >
              <Award size={16} /> View Result
            </button>
          </div>
        </div>
      </motion.div>

      {/* Allocation Status */}
      {allocatedElective && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-8 border-l-4 border-l-success"
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={20} className="text-success" />
            <h3 className="font-display font-semibold text-foreground">Allocation Result</h3>
          </div>
          <p className="text-muted-foreground">
            You have been allocated: <span className="font-semibold text-foreground">{allocatedElective.name}</span> ({allocatedElective.code}) with {allocatedElective.faculty}
          </p>
        </motion.div>
      )}

      {/* Preference Selection */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground">Select Preferences</h3>
          <p className="text-sm text-muted-foreground">Choose exactly 3 electives in order of preference ({preferences.length}/3 selected)</p>
        </div>
        {!submitted && preferences.length === 3 && (
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Submit Preferences
          </button>
        )}
        {submitted && (
          <span className="flex items-center gap-2 text-sm font-medium text-success">
            <CheckCircle size={16} /> Preferences Submitted
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {electives.map((elective) => {
          const prefIndex = preferences.indexOf(elective.id);
          return (
            <ElectiveCard
              key={elective.id}
              elective={elective}
              selectable={!submitted}
              selected={prefIndex !== -1}
              preferenceLabel={prefIndex !== -1 ? `Preference ${prefIndex + 1}` : undefined}
              onSelect={() => togglePreference(elective.id)}
            />
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
