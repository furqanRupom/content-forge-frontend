"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-12 px-4 bg-background">
      <div className="absolute w-96 h-96 -top-24 -right-24 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card border border-border/60 rounded-sm p-6 sm:p-8 shadow-sm">
          
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center shadow-sm">
                <Zap className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-sans font-bold text-base tracking-tight text-foreground">
                Content<span className="text-primary">Forge</span>
              </span>
            </Link>
            <h1 className="font-sans text-xl font-bold text-foreground tracking-tight">Reset password</h1>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
              {!submitted 
                ? "Enter your account email below and we will pass along a secure link to reset your credentials."
                : "Check your inbox. We sent a secure link to restore access if an account exists."}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-9 rounded-sm text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>Send Reset Link <ArrowRight className="w-3.5 h-3.5" /></>
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-3 pt-1">
              <Button
                variant="outline"
                onClick={() => setSubmitted(false)}
                className="w-full h-9 rounded-sm border-border/60 hover:border-primary/40 text-xs font-bold bg-background shadow-sm"
              >
                Resend email address
              </Button>
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground mt-5 border-t border-border/40 pt-3.5">
            <Link href="/login" className="text-muted-foreground font-bold hover:text-primary inline-flex items-center gap-1.5">
              <ArrowLeft className="w-3 h-3" /> Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
