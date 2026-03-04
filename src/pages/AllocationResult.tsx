import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, PartyPopper, BookOpen, User, MapPin, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { electives } from "@/data/mockData";
import { useEffect, useState } from "react";

const confettiColors = ["#3b82f6", "#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

const AllocationResult = () => {
  const navigate = useNavigate();
  const allocated = electives[0];
  const isAllocated = true;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isAllocated) {
      const timer = setTimeout(() => setShowConfetti(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isAllocated]);

  return (
    <DashboardLayout title="Allocation Result" subtitle="Your elective assignment">
      <button
        onClick={() => navigate("/dashboard/student")}
        className="btn-ghost flex items-center gap-2 mb-6"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="flex justify-center items-center min-h-[65vh] relative">
        {/* Confetti */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-sm animate-confetti"
                style={{
                  width: `${6 + Math.random() * 8}px`,
                  height: `${6 + Math.random() * 8}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${60 + Math.random() * 40}%`,
                  backgroundColor: confettiColors[i % confettiColors.length],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 1.5}s`,
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass-card-elevated p-10 md:p-12 max-w-lg w-full text-center"
        >
          {isAllocated ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-8"
              >
                <PartyPopper className="text-success" size={44} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="badge-success text-xs mb-4 inline-block px-4 py-1.5">
                  ✅ Successfully Allocated
                </span>
                <h2 className="text-3xl font-display font-extrabold text-foreground mb-3">
                  Congratulations! 🎉
                </h2>
                <p className="text-muted-foreground mb-8">
                  You have been successfully allocated to your preferred elective.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-muted/30 rounded-2xl p-6 text-left space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shrink-0 shadow-glow-sm">
                    <BookOpen className="text-primary-foreground" size={22} />
                  </div>
                  <div>
                    <span className="badge-primary text-[10px] mb-1">{allocated.code}</span>
                    <h3 className="font-display font-extrabold text-foreground text-xl">{allocated.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-semibold">Faculty</p>
                      <p className="text-sm font-semibold text-foreground">{allocated.faculty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-muted-foreground" />
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-semibold">Department</p>
                      <p className="text-sm font-semibold text-foreground">{allocated.department}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => navigate("/dashboard/student")}
                className="btn-primary mt-8 w-full"
              >
                Go to Dashboard
              </motion.button>
            </>
          ) : (
            <>
              <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="text-destructive" size={44} />
              </div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs font-bold mb-4">
                ❌ Not Allocated
              </span>
              <h2 className="text-3xl font-display font-extrabold text-foreground mb-3">
                Allocation Pending
              </h2>
              <p className="text-muted-foreground mb-8">
                Your elective has not been allocated yet. Please contact the admin for more information.
              </p>
              <button onClick={() => navigate("/dashboard/student")} className="btn-secondary w-full">
                Back to Dashboard
              </button>
            </>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AllocationResult;
