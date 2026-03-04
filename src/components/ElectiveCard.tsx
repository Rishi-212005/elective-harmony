import React from "react";
import { motion } from "framer-motion";
import { Elective } from "@/data/mockData";
import { Users, BookOpen } from "lucide-react";

interface ElectiveCardProps {
  elective: Elective;
  onSelect?: () => void;
  selected?: boolean;
  selectable?: boolean;
  preferenceLabel?: string;
}

const ElectiveCard: React.FC<ElectiveCardProps> = ({ elective, onSelect, selected, selectable = false, preferenceLabel }) => {
  const fillPercent = Math.round(((elective.totalSeats - elective.remainingSeats) / elective.totalSeats) * 100);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`glass-card p-5 cursor-pointer transition-all duration-300 ${
        selected ? "ring-2 ring-primary shadow-glow" : "hover:shadow-elevated"
      }`}
      onClick={selectable ? onSelect : undefined}
    >
      {preferenceLabel && (
        <span className="inline-block mb-2 px-2 py-0.5 rounded-full text-xs font-semibold gradient-primary text-primary-foreground">
          {preferenceLabel}
        </span>
      )}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-medium text-primary">{elective.code}</p>
          <h3 className="font-display font-semibold text-foreground text-lg leading-tight">{elective.name}</h3>
        </div>
        <BookOpen size={20} className="text-primary/60 shrink-0" />
      </div>
      <p className="text-sm text-muted-foreground mb-3">{elective.description}</p>
      <p className="text-sm text-muted-foreground mb-4">
        <span className="font-medium text-foreground">{elective.faculty}</span> · {elective.department}
      </p>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Users size={12} /> Seats</span>
          <span>{elective.totalSeats - elective.remainingSeats}/{elective.totalSeats}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-secondary">
          <div
            className="h-full rounded-full gradient-primary transition-all duration-500"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
      </div>
      {selectable && (
        <button
          onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
          className={`mt-4 w-full py-2 rounded-lg text-sm font-medium transition-all ${
            selected
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-primary/10"
          }`}
        >
          {selected ? "Selected ✓" : "Select"}
        </button>
      )}
    </motion.div>
  );
};

export default ElectiveCard;
