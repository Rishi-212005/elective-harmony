import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Send } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import ElectiveCard from "@/components/ElectiveCard";
import { electives } from "@/data/mockData";
import { toast } from "sonner";

const ElectiveSelection = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) => {
    if (submitted) return;
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(p => p !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const handleSubmit = () => {
    if (selected.length !== 3) return;
    setSubmitted(true);
    toast.success("Preferences submitted successfully!");
  };

  return (
    <DashboardLayout title="Elective Selection">
      <button
        onClick={() => navigate("/dashboard/student")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Choose Your Electives</h2>
          <p className="text-muted-foreground mt-1">
            Select exactly 3 electives in order of preference ({selected.length}/3)
          </p>
        </div>
        {!submitted && selected.length === 3 && (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Send size={16} /> Submit Preferences
          </button>
        )}
        {submitted && (
          <span className="flex items-center gap-2 text-sm font-medium text-success">
            <CheckCircle size={16} /> Submitted!
          </span>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {electives.map((e) => {
          const idx = selected.indexOf(e.id);
          return (
            <ElectiveCard
              key={e.id}
              elective={e}
              selectable={!submitted}
              selected={idx !== -1}
              preferenceLabel={idx !== -1 ? `Preference ${idx + 1}` : undefined}
              onSelect={() => toggle(e.id)}
            />
          );
        })}
      </motion.div>
    </DashboardLayout>
  );
};

export default ElectiveSelection;
