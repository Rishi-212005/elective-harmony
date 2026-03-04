import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { GraduationCap, Lock, User, ArrowLeft, AlertCircle } from "lucide-react";

const roleConfig: Record<UserRole, { label: string; hint: string; userLabel: string }> = {
  student: { label: "Student Login", hint: "Roll No: student / Pass: 123", userLabel: "Roll Number" },
  admin: { label: "Admin Login", hint: "Username: admin / Pass: admin123", userLabel: "Username" },
  faculty: { label: "Faculty Login", hint: "Username: faculty / Pass: faculty123", userLabel: "Username" },
};

const Login = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get("role") as UserRole) || "student";
  const [role, setRole] = useState<UserRole>(initialRole);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(role, username, password);
    if (success) {
      navigate(`/dashboard/${role}`);
    } else {
      setError("Invalid credentials. Check the hint below.");
    }
  };

  const config = roleConfig[role];

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-primary-foreground/60 hover:text-primary-foreground text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="text-primary-foreground" size={22} />
            </div>
            <h1 className="font-display font-bold text-xl text-foreground">{config.label}</h1>
          </div>

          {/* Role Tabs */}
          <div className="flex gap-1 p-1 bg-secondary rounded-lg mb-6">
            {(["student", "admin", "faculty"] as const).map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setError(""); }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  role === r
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{config.userLabel}</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder={`Enter ${config.userLabel.toLowerCase()}`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground text-center bg-secondary/50 rounded-lg p-2">
            💡 {config.hint}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
