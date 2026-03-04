import React from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="stat-card"
  >
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
    </div>
    <p className="text-3xl font-display font-bold text-foreground">{value}</p>
    {description && <p className="text-xs text-muted-foreground">{description}</p>}
    {trend && <p className="text-xs font-medium text-success">{trend}</p>}
  </motion.div>
);

export default StatCard;
