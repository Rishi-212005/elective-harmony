import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Send, Edit3, BookOpen, User, Users, Hash } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { electives } from "@/data/mockData";
import { toast } from "sonner";

const PreferenceCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedIds: string[] = location.state?.selected || [];

  const selectedElectives = selectedIds
    .map((id) => electives.find((e) => e.id === id))
    .filter(Boolean);

  const handleSave = () => {
    toast.success("Preferences saved as draft! You can come back and submit later.");
  };

  const handleSubmit = () => {
    toast.success("Preferences submitted successfully!");
    navigate("/dashboard/student");
  };

  if (selectedElectives.length === 0) {
    return (
      <DashboardLayout title="Checkout" subtitle="Review your preferences">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen size={48} className="text-muted-foreground/30 mb-4" />
          <h2 className="font-display font-bold text-lg text-foreground mb-2">No Preferences Selected</h2>
          <p className="text-sm text-muted-foreground mb-4">Go back and select your preferred electives first.</p>
          <button onClick={() => navigate("/elective-selection")} className="btn-primary">
            Browse Electives
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Preference Checkout" subtitle="Review and confirm your selections">
      <button
        onClick={() => navigate("/elective-selection")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Selection
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-xl sm:text-2xl font-display font-extrabold text-foreground mb-1">Review Your Preferences</h2>
        <p className="text-sm text-muted-foreground">
          You have selected <strong className="text-foreground">{selectedElectives.length}</strong> elective(s). Review the details below before saving or submitting.
        </p>
      </motion.div>

      {/* Preference List */}
      <div className="space-y-4 mb-8">
        {selectedElectives.map((elective, i) => (
          <motion.div
            key={elective!.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card-elevated p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
              #{i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-display font-bold text-foreground text-sm sm:text-base">{elective!.name}</h3>
                  <span className="text-xs font-mono text-muted-foreground">{elective!.code}</span>
                </div>
                <span className="badge-primary text-xs px-2 py-1">Preference {i + 1}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{elective!.description}</p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User size={12} /> {elective!.faculty}
                </span>
                <span className="flex items-center gap-1.5">
                  <Hash size={12} /> {elective!.department}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={12} /> {elective!.remainingSeats}/{elective!.totalSeats} seats
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card-elevated p-5 sm:p-6 mb-6"
      >
        <h3 className="font-display font-bold text-foreground mb-3">Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-xs text-muted-foreground block">Total Selected</span>
            <span className="font-bold text-foreground">{selectedElectives.length} electives</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Top Choice</span>
            <span className="font-bold text-foreground">{selectedElectives[0]?.name}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Status</span>
            <span className="font-bold text-warning">Pending Review</span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <button
          onClick={() => navigate("/elective-selection")}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all flex-1"
        >
          <Edit3 size={16} /> Edit Selections
        </button>
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold hover:bg-secondary/20 transition-all flex-1"
        >
          <Save size={16} /> Save Draft
        </button>
        <button
          onClick={handleSubmit}
          className="btn-primary flex items-center justify-center gap-2 flex-1"
        >
          <Send size={16} /> Submit Preferences
        </button>
      </motion.div>
    </DashboardLayout>
  );
};

export default PreferenceCheckout;
