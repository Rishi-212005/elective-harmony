import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, ArrowLeft, UserPlus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const degrees = ["B.Tech", "M.Tech", "B.E.", "M.E.", "BCA", "MCA", "B.Sc", "M.Sc"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const branches = [
  "Computer Science", "Electronics", "Mechanical", "Civil",
  "Electrical", "Information Technology", "Chemical", "Biotechnology",
];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

const StudentRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    email: "",
    degree: "",
    year: "",
    branch: "",
    semester: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!form.email.endsWith(".edu") && !form.email.endsWith(".ac.in")) {
      toast.warning("Please use your college email address");
    }
    // Mock registration
    toast.success("Registration successful! Please login.");
    navigate("/login");
  };

  const selectClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all appearance-none";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-lg"
      >
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Login
        </button>

        <div className="glass-card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow-sm">
              <GraduationCap className="text-primary-foreground" size={20} />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-xl text-foreground">Student Registration</h1>
              <p className="text-xs text-muted-foreground">Create your account to get started</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Full Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="input-field w-full"
                placeholder="Enter your full name"
              />
            </div>

            {/* Roll Number */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Roll Number *</label>
              <input
                type="text"
                required
                value={form.rollNumber}
                onChange={(e) => update("rollNumber", e.target.value)}
                className="input-field w-full"
                placeholder="e.g., 20CS101"
              />
            </div>

            {/* College Email */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">College Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="input-field w-full"
                placeholder="yourname@college.ac.in"
              />
            </div>

            {/* Degree & Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Degree *</label>
                <select
                  required
                  value={form.degree}
                  onChange={(e) => update("degree", e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select Degree</option>
                  {degrees.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Year *</label>
                <select
                  required
                  value={form.year}
                  onChange={(e) => update("year", e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Branch & Semester */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Branch *</label>
                <select
                  required
                  value={form.branch}
                  onChange={(e) => update("branch", e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select Branch</option>
                  {branches.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Semester *</label>
                <select
                  required
                  value={form.semester}
                  onChange={(e) => update("semester", e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select Sem</option>
                  {semesters.map((s) => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    className="input-field w-full pr-11"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    className="input-field w-full pr-11"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              <UserPlus size={16} /> Register
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <button type="button" onClick={() => navigate("/login")} className="text-primary font-semibold hover:underline">
                Login here
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentRegister;
