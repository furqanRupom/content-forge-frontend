"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Zap, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Add auth logic here
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-12 px-4 bg-background">
      {/* Structural subtle ambient lighting node */}
      <div className="absolute w-96 h-96 -top-24 -left-24 rounded-full bg-primary/5 blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute w-80 h-80 -bottom-16 -right-16 rounded-full bg-primary/5 blur-[90px] pointer-events-none animate-pulse-slow" />

      <div className="relative z-10 w-full max-w-md">
        {/* Main Card Frame */}
        <div className="bg-card border border-border/60 rounded-sm p-6 sm:p-8 shadow-sm">
          
          {/* Logo & Header Block */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center shadow-sm">
                <Zap className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-sans font-bold text-base tracking-tight text-foreground">
                Content<span className="text-primary">Forge</span>
              </span>
            </Link>
            <h1 className="font-sans text-xl font-bold text-foreground tracking-tight">Welcome back</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Sign in to your account to continue</p>
          </div>

          {/* Social Auth Grid Matrix */}
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
              or continue with email
            </span>
          </div>

          {/* Form Processing Entry Blocks */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs font-bold tracking-tight text-foreground">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-9 rounded-sm bg-muted/20 border-border/60 focus-visible:ring-1 focus-visible:ring-primary/40 text-xs transition-colors"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-bold tracking-tight text-foreground">Password</Label>
                <Link href="/forgot-password" className="text-[11px] font-bold text-primary hover:underline underline-offset-2">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-9 rounded-sm text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 mt-1"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>Sign in <ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </Button>
          </form>

          {/* Secure Alternate Entry Context Action */}
          <div className="mt-3.5">
            <button className="w-full h-9 bg-card border border-border/60 hover:border-primary/40 rounded-sm text-xs font-bold text-foreground/80 hover:text-foreground transition-all flex items-center justify-center gap-1.5 shadow-sm">
              <Mail className="w-3.5 h-3.5 text-primary" />
              Sign in with OTP code
            </button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-5">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline underline-offset-2">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
