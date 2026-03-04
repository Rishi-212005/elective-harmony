import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, BarChart3, Shield, Sparkles, ArrowRight, GraduationCap } from "lucide-react";

const features = [
  { icon: <Sparkles size={24} />, title: "AI-Powered Allocation", desc: "Smart algorithms ensure fair and optimal elective distribution." },
  { icon: <BookOpen size={24} />, title: "Easy Selection", desc: "Students choose preferences with an intuitive drag-and-rank interface." },
  { icon: <BarChart3 size={24} />, title: "Real-time Analytics", desc: "Admins get instant insights into demand, seats, and trends." },
  { icon: <Shield size={24} />, title: "Transparent Process", desc: "Every allocation decision is traceable and auditable." },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),_transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 backdrop-blur flex items-center justify-center">
                <GraduationCap className="text-primary-foreground" size={28} />
              </div>
              <span className="text-primary-foreground/70 font-display text-sm tracking-wide uppercase">
                Open Elective Management
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
              AI-Enhanced
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Elective System
              </span>
            </h1>
            <p className="text-xl text-primary-foreground/70 mb-10 max-w-xl leading-relaxed">
              A smarter way to manage open elective selection, allocation, and analytics — powered by intelligent algorithms.
            </p>
            <div className="flex flex-wrap gap-4">
              {(["student", "admin", "faculty"] as const).map((role) => (
                <motion.button
                  key={role}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/login?role=${role}`)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <Users size={16} />
                  {role.charAt(0).toUpperCase() + role.slice(1)} Login
                  <ArrowRight size={14} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Floating shapes */}
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-cyan-400/10 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </section>

      {/* Features */}
      <section className="py-24 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Why Choose Our System?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Built for modern institutions that value fairness, efficiency, and data-driven decisions.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                {f.icon}
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 AI-Enhanced Open Elective Management System. Built for Hackathon Demo.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
