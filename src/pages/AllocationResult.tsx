import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, PartyPopper, BookOpen } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { electives } from "@/data/mockData";
import { useEffect, useState } from "react";

const confettiColors = ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

const AllocationResult = () => {
  const navigate = useNavigate();
  const allocated = electives[0]; // Mock: student got Machine Learning
  const isAllocated = true; // Mock
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isAllocated) {
      setTimeout(() => setShowConfetti(true), 300);
    }
  }, [isAllocated]);

  return (
    <DashboardLayout title="Allocation Result">
      <button
        onClick={() => navigate("/dashboard/student")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="flex justify-center items-center min-h-[60vh] relative">
        {/* Confetti */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-sm animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${60 + Math.random() * 40}%`,
                  backgroundColor: confettiColors[i % confettiColors.length],
                  animationDelay: `${Math.random() * 1.5}s`,
                  animationDuration: `${1.5 + Math.random() * 1}s`,
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-10 max-w-lg w-full text-center"
        >
          {isAllocated ? (
            <>
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <PartyPopper className="text-success" size={40} />
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-success/10 text-success text-sm font-semibold mb-4">
                ✅ Allocated
              </span>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Congratulations!
              </h2>
              <p className="text-muted-foreground mb-6">
                You have been successfully allocated to your preferred elective.
              </p>
              <div className="bg-secondary/50 rounded-xl p-6 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="text-primary" size={24} />
                  <div>
                    <p className="text-xs text-muted-foreground">{allocated.code}</p>
                    <h3 className="font-display font-bold text-foreground text-lg">{allocated.name}</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Faculty</p>
                    <p className="font-medium text-foreground">{allocated.faculty}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Department</p>
                    <p className="font-medium text-foreground">{allocated.department}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-destructive" size={40} />
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-semibold mb-4">
                ❌ Not Allocated
              </span>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Allocation Pending
              </h2>
              <p className="text-muted-foreground">
                Your elective has not been allocated yet. Please contact the admin.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AllocationResult;
