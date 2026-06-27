"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const perks = [
  "10 free AI generations every day",
  "Access to 50+ starter templates",
  "No credit card required",
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-12 px-4 bg-background">
      {/* Structural ambient structural background layout */}
      <div className="absolute w-[500px] h-[500px] -top-32 -right-32 rounded-full bg-primary/5 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute w-96 h-96 -bottom-24 -left-24 rounded-full bg-primary/5 blur-[100px] pointer-events-none animate-pulse-slow" />

      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left column: value block */}
        <div className="hidden md:block space-y-6 pr-4">
          <Link href="/" className="inline-flex items-center gap-2 group w-fit">
            <div className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center shadow-sm">
              <Zap className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-sans font-bold text-base tracking-tight text-foreground">
              Content<span className="text-primary">Forge</span>
              <span className="text-[10px] font-bold ml-0.5 text-muted-foreground/80 uppercase">AI</span>
            </span>
          </Link>

          <div className="space-y-3">
            <h1 className="font-sans text-3xl font-bold tracking-tight leading-tight text-foreground text-balance">
              Start forging <br />
              <span className="text-primary">great content</span> <br />
              today — free.
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              Join 50,000+ creators who use ContentForge AI to write faster and
              publish smarter. Your first generation is waiting.
            </p>
          </div>

          <ul className="space-y-2.5 pt-1">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2.5 text-xs font-medium text-foreground/90">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {perk}
              </li>
            ))}
          </ul>

          {/* Testimonial Panel */}
          <div className="bg-card border border-border/60 rounded-sm p-4 shadow-sm">
            <p className="text-xs text-muted-foreground leading-relaxed mb-3 italic">
              "I wrote an entire email sequence in 20 minutes. ContentForge is the tool I wish I had 3 years ago."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-sm bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-sm">
                JK
              </div>
              <div>
                <div className="text-xs font-bold text-foreground leading-none mb-0.5">Jamie Kim</div>
                <div className="text-[10px] font-medium text-muted-foreground">Content Strategist</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Form entry context */}
        <div className="bg-card border border-border/60 rounded-sm p-6 sm:p-8 shadow-sm">
          <div className="md:hidden flex justify-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center shadow-sm">
                <Zap className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-sans font-bold text-base tracking-tight text-foreground">
                Content<span className="text-primary">Forge</span>
              </span>
            </Link>
          </div>

          <div className="mb-5 text-center md:text-left">
            <h2 className="font-sans text-lg font-bold text-foreground tracking-tight">Create your account</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Free forever — upgrade when you're ready.</p>
          </div>

          {/* OAuth Matrix */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <Button variant="outline" className="h-9 rounded-sm border-border/60 hover:border-primary/40 text-xs font-bold gap-2 bg-background shadow-sm transition-all">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-9 rounded-sm border-border/60 hover:border-primary/40 text-xs font-bold gap-2 bg-background shadow-sm transition-all">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Button>
          </div>

          <div className="relative mb-5">
            <Separator className="bg-border/40" />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground/80">
              or with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs font-bold tracking-tight text-foreground">Full name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jane Smith"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="h-9 rounded-sm bg-muted/20 border-border/60 focus-visible:ring-1 focus-visible:ring-primary/40 text-xs transition-colors"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs font-bold tracking-tight text-foreground">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="h-9 rounded-sm bg-muted/20 border-border/60 focus-visible:ring-1 focus-visible:ring-primary/40 text-xs transition-colors"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-xs font-bold tracking-tight text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={8}
                  className="h-9 rounded-sm bg-muted/20 border-border/60 focus-visible:ring-1 focus-visible:ring-primary/40 pr-9 text-xs transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <p className="text-[10px] text-muted-foreground leading-relaxed">
              By creating an account you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline underline-offset-2 font-medium">Terms</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-primary hover:underline underline-offset-2 font-medium">Privacy Policy</Link>.
            </p>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-9 rounded-sm text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>Create Free Account <ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
