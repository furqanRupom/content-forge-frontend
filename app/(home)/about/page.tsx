import { Metadata } from "next";
import { Zap, Target, Shield, Users } from "lucide-react";
import CTASection from "@/components/home/Cta";

export const metadata: Metadata = {
  title: "About Us | ContentForge AI",
  description: "Learn about the mission, values, and core team behind ContentForge AI — crafting specialized production tools for modern content creators.",
};

const values = [
  {
    icon: Target,
    title: "Accuracy over hype",
    description:
      "We build AI tools that actually work for real content needs — not demos that look good in screenshots but fail in production.",
  },
  {
    icon: Shield,
    title: "Privacy first",
    description:
      "Your content is yours. We never use your outputs to train models, never sell your data, and encrypt everything at rest.",
  },
  {
    icon: Users,
    title: "Built for creators",
    description:
      "Every feature is designed with the daily workflow of a real content creator in mind — not an enterprise IT checklist.",
  },
  {
    icon: Zap,
    title: "Speed matters",
    description:
      "Content opportunity windows close fast. We optimize for sub-5-second generation so you can publish while ideas are hot.",
  },
];

const team = [
  { name: "Alex Morgan", role: "Co-founder & CEO", avatar: "AM", bio: "Former head of content at three Series B startups. Spent 8 years writing copy before building tools to do it better." },
  { name: "Riya Patel", role: "Co-founder & CTO", avatar: "RP", bio: "ML engineer who built recommendation systems at scale. Obsessed with making AI outputs feel human." },
  { name: "Leo Strauss", role: "Head of Design", avatar: "LS", bio: "Product designer with a background in editorial. Believes great tools get out of the writer's way." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20 pb-0 relative overflow-hidden">
      {/* Structural ambient background color glow */}
      <div className="absolute w-96 h-96 -top-24 -left-24 rounded-full bg-primary/5 blur-[100px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mission Header */}
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-1.5 bg-muted/60 border border-border/40 rounded-sm px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary tracking-wider mb-2.5">
            Our Mission
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-balance text-foreground">
            We built the tool <br />
            we <span className="text-primary">always wanted</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            ContentForge AI was born out of frustration with tools that overpromised
            and underdelivered. We're a small team of writers, engineers, and designers
            who believe AI should amplify creative work — not replace the craft behind it.
          </p>
        </div>

        {/* Values Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-card border border-border/60 rounded-sm p-5 shadow-sm transition-colors hover:border-primary/40 duration-200">
              <div className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center mb-3.5">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-sans font-bold text-sm text-foreground mb-1.5 tracking-tight">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Team Profiles */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              The <span className="text-primary">people</span> behind ContentForge
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {team.map((member) => (
              <div key={member.name} className="bg-card border border-border/60 rounded-sm p-5 text-center shadow-sm hover:border-primary/40 transition-colors duration-200">
                <div className="w-12 h-12 rounded-sm bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-xs font-bold shadow-sm">
                  {member.avatar}
                </div>
                <h3 className="font-sans font-bold text-sm text-foreground mb-0.5 tracking-tight">{member.name}</h3>
                <p className="text-[10px] font-bold text-primary uppercase tracking-wide mb-2.5">{member.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed text-balance">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="bg-card border border-border/60 rounded-sm p-8 text-center mb-12 shadow-sm">
          <h2 className="font-sans text-base font-bold text-foreground mb-6 tracking-tight">ContentForge by the numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "2023", label: "Founded" },
              { value: "50K+", label: "Creators" },
              { value: "2.4M", label: "Pieces created" },
              { value: "4.9★", label: "Average rating" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="font-sans text-2xl font-bold text-primary tracking-tight mb-0.5">{value}</div>
                <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-0">
        <CTASection />
      </div>
    </main>
  );
}
