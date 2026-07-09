import { Link } from "react-router-dom";
import { Brain, FileSearch, Shield, Zap, Globe, BarChart3, ArrowRight, CheckCircle, Moon, Sun, Users, FolderOpen, FileText, Gauge } from "lucide-react";
import Typewriter from "../components/common/Typewriter";
import { useTheme } from "../context/ThemeContext";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";

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

// Illustrative only — not pulled from live data, since this panel renders
// on the public landing page before any login/auth exists.
const SAMPLE_STATS = [
  { icon: Users, label: "Employees", value: "148" },
  { icon: FolderOpen, label: "Domains", value: "32" },
  { icon: FileText, label: "Documents", value: "1.2k" },
  { icon: Gauge, label: "Uptime", value: "99.8%" },
];

const SAMPLE_GAPS = [
  { label: "Security", pct: 35 },
  { label: "Go-to-Market", pct: 28 },
];

const TAGLINE = "From scattered documents to cited, confidential, conversational intelligence.";

export default function LandingPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-base text-cream">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-base-deep/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/15 p-1">
              <img
                src={isDark ? logoDark : logoLight}
                alt="ThinkHive"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-display text-lg font-bold text-cream">ThinkHive</span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-rose-muted md:flex">
            <a href="#features" className="hover:text-cream transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-cream transition-colors">How it Works</a>
            <Link to="/about" className="hover:text-cream transition-colors">About Us</Link>
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
      <section className="relative flex min-h-screen items-center px-6 pt-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gold/8 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
          {/* Ambient sage glow behind the illustrative panel — echoes the
              logo's green negative space. Light mode only; see index.css. */}
          <div className="absolute right-[10%] top-[8%] h-[38rem] w-[34rem] rounded-[3rem] bg-sage/25 blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-gold">
              AI-Powered Administration
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold leading-tight text-cream md:text-6xl min-h-[2.4em]">
              From Document Chaos to Enterprise Intelligence
              <br />
              <span className="text-gold"></span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-rose-muted lg:mx-0 min-h-[3.5em]">
              <Typewriter text={TAGLINE} speed={35} />
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link to="/register" className="flex items-center gap-2 rounded-xl bg-gold px-8 py-4 text-base font-semibold text-base-deep hover:bg-gold-light transition-colors">
                Start free trial <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="rounded-xl border border-border px-8 py-4 text-base text-cream hover:border-gold/40 transition-colors">
                Watch demo
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-rose-muted lg:justify-start">
              {["No credit card required", "5-minute setup", "Your data stays yours"].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-success" />{t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: illustrative panel — floats over a soft ambient sage
              wash (see the blurred shape above), rather than a boxed panel. */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg font-semibold text-cream">Platform Overview</h3>
                <span className="rounded-full bg-gold/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-gold">Sample data</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {SAMPLE_STATS.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl bg-base-deep/40 p-4">
                    <Icon size={16} className="mb-2 text-gold/70" />
                    <p className="font-display text-2xl font-bold text-cream">{value}</p>
                    <p className="text-xs text-rose-muted">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg font-semibold text-cream">Knowledge Gap Alert</h3>
                <span className="rounded-full bg-gold/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-gold">Sample data</span>
              </div>
              <div className="space-y-4">
                {SAMPLE_GAPS.map(({ label, pct }) => (
                  <div key={label}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="text-cream">{label}</span>
                      <span className="text-danger">{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-deep/50">
                      <div className="h-full rounded-full bg-danger" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
      <section className="border-t border-border bg-base-deep py-24 text-center">
        <h2 className="font-display text-4xl font-bold text-cream md:text-5xl">Ready to take control?</h2>
        <p className="mt-4 text-rose-muted">Start free. No credit card required. Full platform access for 14 days.</p>
        <Link to="/register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold px-10 py-4 font-semibold text-base-deep hover:bg-gold-light transition-colors">
          Start free trial <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}