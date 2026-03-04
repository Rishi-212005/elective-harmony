import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Send, Filter, Search } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import ElectiveCard from "@/components/ElectiveCard";
import { electives } from "@/data/mockData";
import { toast } from "sonner";

const ElectiveSelection = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = electives.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.faculty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggle = (id: string) => {
    if (submitted) return;
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
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
    <DashboardLayout title="Elective Selection" subtitle="Choose your preferred electives">
      <button
        onClick={() => navigate("/dashboard/student")}
        className="btn-ghost flex items-center gap-2 mb-6"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Header with search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
      >
        <div>
          <h2 className="text-2xl font-display font-extrabold text-foreground">Choose Your Electives</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Select exactly 3 electives in order of preference ({selected.length}/3)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-64"
              placeholder="Search electives..."
            />
          </div>
          {!submitted && selected.length === 3 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleSubmit}
              className="btn-primary flex items-center gap-2"
            >
              <Send size={16} /> Submit
            </motion.button>
          )}
          {submitted && (
            <span className="badge-success flex items-center gap-2 px-4 py-2">
              <CheckCircle size={14} /> Submitted!
            </span>
          )}
        </div>
      </motion.div>

      {/* Selected preferences summary */}
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass-card-elevated p-4 mb-6 flex flex-wrap items-center gap-3"
        >
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your picks:</span>
          {selected.map((id, i) => {
            const e = electives.find((el) => el.id === id);
            return (
              <span key={id} className="badge-primary flex items-center gap-1.5 px-3 py-1.5">
                <span className="font-bold">{i + 1}.</span> {e?.name}
              </span>
            );
          })}
        </motion.div>
      )}

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((e, i) => {
          const idx = selected.indexOf(e.id);
          return (
            <ElectiveCard
              key={e.id}
              elective={e}
              selectable={!submitted}
              selected={idx !== -1}
              preferenceLabel={idx !== -1 ? `Preference ${idx + 1}` : undefined}
              onSelect={() => toggle(e.id)}
              delay={i * 0.05}
            />
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default ElectiveSelection;
