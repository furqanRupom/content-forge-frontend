"use client";

import { Users, FileText, Zap, Globe } from "lucide-react";

const stats = [
  { value: "50K+", label: "Active creators", icon: Users },
  { value: "2.4M", label: "Pieces generated", icon: FileText },
  { value: "< 5s", label: "Average generation time", icon: Zap },
  { value: "25+", label: "Languages supported", icon: Globe },
];

const testimonials = [
  {
    quote:
      "ContentForge cut our content production time by 80%. What used to take our team a full day now takes an hour.",
    author: "Sarah Chen",
    role: "Head of Marketing",
    company: "Vesper Labs",
    avatar: "SC",
  },
  {
    quote:
      "The template quality is unreal. I generated 3 months of email campaigns in an afternoon. My agency clients are blown away.",
    author: "Marcus Reid",
    role: "Freelance Copywriter",
    company: "Independent",
    avatar: "MR",
  },
  {
    quote:
      "Finally an AI writing tool that understands context. The outputs actually sound like my brand, not a robot.",
    author: "Priya Nair",
    role: "Founder",
    company: "Bloom Commerce",
    avatar: "PN",
  },
];

export default function SocialProofSection() {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      {/* Background shading matching system variables */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <div className="absolute w-80 h-80 top-1/2 -translate-y-1/2 -left-48 rounded-full bg-primary/5 blur-[90px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats Row Block */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="bg-card border border-border/60 rounded-sm p-5 text-center group transition-all duration-200 hover:border-primary/40 shadow-sm">
              <div className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center mx-auto mb-3 transition-colors group-hover:bg-primary/15">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="font-sans text-2xl font-bold text-primary mb-0.5 tracking-tight">{value}</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Title Group */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-muted/60 border border-border/40 rounded-sm px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary tracking-wider mb-2.5">
            What creators say
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Trusted by <span className="text-primary">50,000+ teams</span>
          </h2>
        </div>

        {/* Testimonial Cards Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card border border-border/60 rounded-sm p-5 flex flex-col justify-between gap-5 transition-all duration-200 hover:border-primary/40 shadow-sm group">
              <div>
                <span className="text-3xl font-serif text-primary/30 leading-none block -mb-1 select-none">“</span>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed text-balance">{t.quote}</p>
              </div>

              <div className="flex items-center gap-3 border-t border-border/50 pt-3.5">
                {/* Avatar with fixed fallback using theme primary definitions */}
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold tracking-wider shadow-sm flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground tracking-tight">{t.author}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
