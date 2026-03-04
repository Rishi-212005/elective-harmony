import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  BookOpen,
  Users,
  BarChart3,
  Shield,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Brain,
  Zap,
  CheckCircle,
  ChevronRight,
  Star,
} from "lucide-react";

const features = [
  {
    icon: <Brain size={28} />,
    title: "AI-Powered Allocation",
    desc: "Intelligent algorithms analyze preferences, CGPA, and seat availability for optimal fair distribution.",
    color: "from-primary to-secondary",
  },
  {
    icon: <Zap size={28} />,
    title: "Real-time Selection",
    desc: "Students pick preferences with instant feedback on seat availability and demand trends.",
    color: "from-info to-primary",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Live Analytics",
    desc: "Comprehensive dashboards with popularity charts, utilization metrics, and allocation insights.",
    color: "from-secondary to-primary",
  },
  {
    icon: <Shield size={28} />,
    title: "Transparent & Fair",
    desc: "Every allocation is traceable, auditable, and based on clearly defined priority rules.",
    color: "from-success to-info",
  },
];

const stats = [
  { value: "10K+", label: "Students Served" },
  { value: "200+", label: "Electives Managed" },
  { value: "99%", label: "Allocation Success" },
  { value: "4.9★", label: "User Rating" },
];

const steps = [
  { num: "01", title: "Browse Electives", desc: "Explore available courses with detailed descriptions and seat info." },
  { num: "02", title: "Set Preferences", desc: "Rank your top 3 choices based on interest and career goals." },
  { num: "03", title: "AI Allocation", desc: "Our algorithm optimizes allocation for maximum satisfaction." },
  { num: "04", title: "View Results", desc: "Get instant notification of your allocated elective." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-card/60 backdrop-blur-2xl border-b border-border/30"
      >
        <div className="section-container h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow-sm">
              <GraduationCap className="text-primary-foreground" size={18} />
            </div>
            <span className="font-display font-bold text-base text-foreground">OE Manager</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Stats</a>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="btn-primary text-xs px-5 py-2.5"
          >
            Get Started
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-16 min-h-screen flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[128px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-[128px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-info/5 blur-[160px]" />
        </div>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="section-container relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm mb-8">
                <Sparkles size={14} className="text-primary-foreground/70" />
                <span className="text-xs font-semibold text-primary-foreground/70 tracking-wide uppercase">
                  AI-Powered Platform
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-primary-foreground leading-[0.95] tracking-tight mb-8">
                Smart Elective
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Management
                </span>
              </h1>

              <p className="text-lg md:text-xl text-primary-foreground/50 max-w-2xl mx-auto mb-12 leading-relaxed text-balance">
                Transform how your institution handles open elective selection with AI-driven allocation,
                real-time analytics, and a seamless student experience.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {(["student", "admin", "faculty"] as const).map((role, i) => (
                  <motion.button
                    key={role}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/login?role=${role}`)}
                    className={`group flex items-center gap-3 px-7 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 w-full sm:w-auto justify-center ${
                      i === 0
                        ? "gradient-primary text-primary-foreground shadow-glow"
                        : "bg-primary-foreground/8 backdrop-blur-sm border border-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/12"
                    }`}
                  >
                    {role === "student" && <GraduationCap size={18} />}
                    {role === "admin" && <Shield size={18} />}
                    {role === "faculty" && <BookOpen size={18} />}
                    {role.charAt(0).toUpperCase() + role.slice(1)} Login
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Floating cards decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <div className="w-48 p-4 rounded-2xl bg-primary-foreground/5 backdrop-blur-xl border border-primary-foreground/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-[10px] font-semibold text-primary-foreground/50">LIVE</span>
                  </div>
                  <p className="text-2xl font-display font-bold text-primary-foreground">847</p>
                  <p className="text-[10px] text-primary-foreground/40">Students allocated</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section id="stats" className="relative z-10 -mt-8">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-elevated p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-display font-extrabold gradient-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-28">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-primary mb-4 inline-block">Features</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-foreground mb-5 tracking-tight">
              Everything you need
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Built for modern institutions that value fairness, efficiency, and data-driven decisions.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass-card-hover p-8 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-primary-foreground mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-28 bg-muted/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-primary mb-4 inline-block">Process</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-foreground mb-5 tracking-tight">
              How it works
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Four simple steps to get your preferred elective.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative glass-card-hover p-6 text-center"
              >
                <span className="text-5xl font-display font-extrabold gradient-text opacity-30 block mb-3">
                  {step.num}
                </span>
                <h3 className="font-display font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30" size={20} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl gradient-hero p-12 md:p-20 text-center"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/20 blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-secondary/15 blur-[80px]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-primary-foreground mb-6 tracking-tight">
                Ready to get started?
              </h2>
              <p className="text-primary-foreground/50 text-lg mb-10 max-w-xl mx-auto">
                Join thousands of students and administrators using our AI-enhanced system.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary-foreground text-foreground font-bold text-sm hover:bg-primary-foreground/90 transition-all duration-200 shadow-xl"
              >
                Launch Dashboard <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="text-primary-foreground" size={14} />
            </div>
            <span className="font-display font-bold text-sm text-foreground">OE Manager</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 AI-Enhanced Open Elective Management System · Hackathon Demo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
