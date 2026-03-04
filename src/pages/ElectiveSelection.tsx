import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ShoppingCart, Search, Info } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import ElectiveCard from "@/components/ElectiveCard";
import { electives } from "@/data/mockData";
import { toast } from "sonner";

const MIN_PREFS = 3;
const MAX_PREFS = 10;

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
      if (prev.length >= MAX_PREFS) {
        toast.error(`Maximum ${MAX_PREFS} preferences allowed`);
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleCheckout = () => {
    if (selected.length < MIN_PREFS) {
      toast.error(`Select at least ${MIN_PREFS} preferences`);
      return;
    }
    navigate("/preference-checkout", { state: { selected } });
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
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-foreground">Choose Your Electives</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Select {MIN_PREFS}–{MAX_PREFS} electives in order of preference ({selected.length}/{MAX_PREFS})
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-full sm:w-64"
              placeholder="Search electives..."
            />
          </div>
          {selected.length >= MIN_PREFS && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleCheckout}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} /> Checkout ({selected.length})
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Info banner */}
      <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-info/5 border border-info/20 mb-6 text-xs sm:text-sm text-muted-foreground">
        <Info size={16} className="text-info shrink-0 mt-0.5" />
        <span>Select minimum <strong className="text-foreground">{MIN_PREFS}</strong> and maximum <strong className="text-foreground">{MAX_PREFS}</strong> electives. Higher-ranked choices get priority. Allocation is based on CGPA.</span>
      </div>

      {/* Selected preferences summary */}
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass-card-elevated p-3 sm:p-4 mb-6"
        >
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Your picks:</span>
          <div className="flex flex-wrap items-center gap-2">
            {selected.map((id, i) => {
              const e = electives.find((el) => el.id === id);
              return (
                <span key={id} className="badge-primary flex items-center gap-1.5 px-3 py-1.5 text-xs">
                  <span className="font-bold">{i + 1}.</span> {e?.name}
                </span>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filtered.map((e, i) => {
          const idx = selected.indexOf(e.id);
          return (
            <ElectiveCard
              key={e.id}
              elective={e}
              selectable
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
