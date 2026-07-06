import { Link } from "react-router-dom";
import { Brain, FileSearch, Shield, Zap, Globe, BarChart3, ArrowRight, CheckCircle, Moon, Sun } from "lucide-react";
import Typewriter from "../components/common/Typewriter";
import { useTheme } from "../context/ThemeContext";

const FEATURES = [
  { icon: FileSearch, title: "Smart Document Q&A", desc: "Ask questions in plain language. Get cited answers from your own documents." },
  { icon: Shield, title: "PII Sanitisation", desc: "Every document stripped of personal data before reaching any AI model." },
  { icon: Brain, title: "AI Confidence Scoring", desc: "Every answer rated for reliability so you always know how much to trust it." },
  { icon: Globe, title: "Multilingual Support", desc: "Ask in Tamil, Hindi, French or 100+ languages. Get answers in the same language." },
  { icon: Zap, title: "Voice Query", desc: "Speak your question. Whisper transcribes it and the AI answers." },
  { icon: BarChart3, title: "Audit Trail", desc: "Every query, every answer, every source — logged for compliance." },
];

const DOMAINS = [
  { n: "HR", e: "👥", d: "Leave policies, onboarding, compliance" },
  { n: "Finance", e: "💰", d: "Reports, vendor contracts, invoicing" },
  { n: "IT", e: "💻", d: "Runbooks, incidents, code review" },
  { n: "Manufacturing", e: "🏭", d: "Equipment manuals, safety alerts" },
  { n: "Sales", e: "📈", d: "Battlecards, proposals, intel" },
  { n: "Legal", e: "⚖️", d: "Contract review, regulatory compliance" },
];

const STEPS = [
  { n: "01", t: "Connect your workspace", d: "Link your existing tools with native integrations — no configuration headaches." },
  { n: "02", t: "Configure your roles", d: "Set granular permissions for every team member with our visual role builder." },
  { n: "03", t: "Invite your team", d: "Onboard users with automated welcome flows and instant role assignment." },
  { n: "04", t: "Operate confidently", d: "Monitor, manage, and iterate with a real-time audit trail behind everything." },
];

export default function LandingPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-base text-cream">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-base-deep/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold">
              <Brain size={16} className="text-base-deep" />
            </div>
            <span className="font-display text-lg font-bold text-cream">ThinkHive</span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-rose-muted md:flex">
            <a href="#features" className="hover:text-cream transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-cream transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-cream transition-colors">Pricing</a>
            <a href="#about" className="hover:text-cream transition-colors">About Us</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex h-6 w-11 items-center rounded-full bg-surface-hover px-0.5 transition-colors"
            >
              <div className={`flex h-5 w-5 items-center justify-center rounded-full bg-gold transition-transform ${isDark ? "translate-x-0" : "translate-x-5"}`}>
                {isDark ? <Moon size={11} className="text-base-deep" /> : <Sun size={11} className="text-base-deep" />}
              </div>
            </button>
            <Link to="/login" className="flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-base-deep hover:bg-gold-light transition-colors">
              <ArrowRight size={14} className="rotate-180" /> Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gold/8 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-gold">
            Everything You Need
          </span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight text-cream md:text-6xl min-h-[2.4em]">
            <Typewriter text="Seven modules." speed={55} />
            <br />
            <span className="text-gold">One command centre.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-rose-muted">
            ThinkHive converts your unstructured documents into a conversational, cited, and auditable knowledge base. Ask anything. Get answers from your own files. In any language.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/register" className="flex items-center gap-2 rounded-xl bg-gold px-8 py-4 text-base font-semibold text-base-deep hover:bg-gold-light transition-colors">
              Start free trial <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="rounded-xl border border-border px-8 py-4 text-base text-cream hover:border-gold/40 transition-colors">
              Watch demo
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-rose-muted">
            {["No credit card required", "5-minute setup", "Your data stays yours"].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-success" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-gold mb-3">Everything You Need</p>
        <h2 className="text-center font-display text-3xl font-bold mb-4 text-cream">Seven modules. One command centre.</h2>
        <p className="text-center text-rose-muted mb-16">Built for enterprise teams who take knowledge seriously</p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="stagger-item rounded-2xl border border-border bg-surface p-8 hover:border-gold/30 transition-colors"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                <Icon size={22} className="text-gold" />
              </div>
              <h3 className="mb-1.5 font-display text-lg font-semibold text-cream">{title}</h3>
              <p className="text-sm text-rose-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works — numbered steps */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-gold mb-3">Simple Process</p>
        <h2 className="text-center font-display text-3xl font-bold mb-16 text-cream">Up and running in minutes</h2>
        <div className="grid gap-8 md:grid-cols-4">
          {STEPS.map(({ n, t, d }, i) => (
            <div key={n} className="stagger-item" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="font-display text-4xl font-bold text-danger/40">{n}</span>
              <h3 className="mt-4 font-display text-lg font-semibold text-cream">{t}</h3>
              <p className="mt-2 text-sm text-rose-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Domains */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-gold mb-3">Every Department</p>
        <h2 className="text-center font-display text-3xl font-bold mb-16 text-cream">Works for every team</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map(({ n, e, d }, i) => (
            <div
              key={n}
              className="stagger-item rounded-xl border border-border bg-surface p-5 hover:border-gold/30 transition-colors"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-2xl">{e}</span>
              <h3 className="mt-2 font-display font-semibold text-cream">{n}</h3>
              <p className="mt-1 text-sm text-rose-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="pricing" className="border-t border-border bg-base-deep py-24 text-center">
        <h2 className="font-display text-4xl font-bold text-cream md:text-5xl">Ready to take control?</h2>
        <p className="mt-4 text-rose-muted">Start free. No credit card required. Full platform access for 14 days.</p>
        <Link to="/register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold px-10 py-4 font-semibold text-base-deep hover:bg-gold-light transition-colors">
          Start free trial <ArrowRight size={18} />
        </Link>
      </section>

      <footer id="about" className="border-t border-border bg-base-deep py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold">
              <Brain size={14} className="text-base-deep" />
            </div>
            <span className="font-display font-bold text-cream">ThinkHive</span>
          </div>
          <div className="flex gap-6 text-sm text-rose-muted">
            <a href="#" className="hover:text-cream transition-colors">Privacy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms</a>
            <a href="#" className="hover:text-cream transition-colors">Security</a>
            <a href="#" className="hover:text-cream transition-colors">Status</a>
            <a href="#" className="hover:text-cream transition-colors">Docs</a>
          </div>
          <p className="text-sm text-rose-muted/60">© {new Date().getFullYear()} ThinkHive, Inc.</p>
        </div>
      </footer>
    </div>
  );
}