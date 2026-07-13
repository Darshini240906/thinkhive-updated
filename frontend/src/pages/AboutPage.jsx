import { Link } from "react-router-dom";
import { Brain, ArrowLeft, Linkedin, Github, User } from "lucide-react";

// Placeholder team data — replace image, name, role, bio, linkedin, github
// for each of the 3 members before shipping.
const TEAM = [
  {
    image: null,
    name: "Member Name 1",
    role: "Role / Title",
    bio: "Short bio goes here — a sentence or two about what this person built or focused on.",
    linkedin: "https://linkedin.com/in/placeholder-1",
    github: "https://github.com/placeholder-1",
  },
  {
    image: null,
    name: "Member Name 2",
    role: "Role / Title",
    bio: "Short bio goes here — a sentence or two about what this person built or focused on.",
    linkedin: "https://linkedin.com/in/placeholder-2",
    github: "https://github.com/placeholder-2",
  },
  {
    image: null,
    name: "Member Name 3",
    role: "Role / Title",
    bio: "Short bio goes here — a sentence or two about what this person built or focused on.",
    linkedin: "https://linkedin.com/in/placeholder-3",
    github: "https://github.com/placeholder-3",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base text-cream">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-base-deep/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold">
              <Brain size={16} className="text-base-deep" />
            </div>
            <span className="font-display text-lg font-bold text-cream">ThinkHive</span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-rose-muted hover:text-cream transition-colors">
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>
      </nav>

      {/* Intro */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/3 top-0 h-80 w-80 rounded-full bg-gold/8 blur-3xl animate-fade-in" />
          <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-gold/5 blur-3xl animate-fade-in" style={{ animationDelay: "150ms" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl stagger-item">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-gold">
            About Us
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-cream md:text-5xl">
            The team behind <span className="text-gold">ThinkHive</span>
          </h1>
          <p className="mt-6 text-lg text-rose-muted">
            {/* Placeholder — replace with real company description */}
            Stop searching. Start asking.  ThinkHive-your organization's brain, on demand.
          </p>
        </div>
      </section>

      {/* Team cards */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid gap-8 md:grid-cols-3">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className="stagger-item group relative rounded-2xl border border-border bg-surface p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_20px_40px_-15px_rgba(212,175,106,0.25)]"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Avatar placeholder */}
              <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-gold/30 bg-base-deep/40 transition-transform duration-300 group-hover:scale-105">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                ) : (
                  <User size={40} className="text-rose-muted/50" />
                )}
              </div>

              <h3 className="font-display text-xl font-semibold text-cream">{member.name}</h3>
              <p className="mt-1 text-sm font-mono uppercase tracking-wide text-gold">{member.role}</p>
              <p className="mt-4 text-sm text-rose-muted">{member.bio}</p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-rose-muted transition-colors hover:border-gold/40 hover:text-gold"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-rose-muted transition-colors hover:border-gold/40 hover:text-gold"
                >
                  <Github size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}