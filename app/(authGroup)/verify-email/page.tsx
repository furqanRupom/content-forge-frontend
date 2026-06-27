"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Zap, Mail, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function VerifyEmailPage() {
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const updatedCode = [...code];
    updatedCode[index] = element.value;
    setCode(updatedCode);

    // Auto-focus next input slot
    if (element.value !== "" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const handleResend = async () => {
    setResending(true);
    setTimeout(() => setResending(false), 1500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-12 px-4 bg-background">
      <div className="absolute w-96 h-96 -top-24 -left-24 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      
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
            <h1 className="font-sans text-xl font-bold text-foreground tracking-tight">Verify your email</h1>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
              We sent a 6-digit verification code to your email address. Enter it below to activate your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 text-center">
              <Label className="text-xs font-bold tracking-tight text-foreground uppercase tracking-wider text-muted-foreground/80">
                Security Verification Code
              </Label>
              <div className="flex justify-center gap-2">
                {code.map((num, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={num}
                    ref={(el) => { if (el) inputsRef.current[idx] = el; }}
                    onChange={(e) => handleChange(e.target, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    required
                    className="w-11 h-11 text-center font-sans font-bold text-base rounded-sm bg-muted/20 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none transition-colors"
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || code.some((val) => val === "")}
              className="w-full h-9 rounded-sm text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>Verify Account <ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </Button>
          </form>

          <div className="mt-4 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs border-t border-border/40 pt-3.5">
            <span className="text-muted-foreground">Didn't receive a code?</span>
            <button 
              onClick={handleResend}
              disabled={resending}
              className="text-primary font-bold hover:underline inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${resending ? 'animate-spin' : ''}`} />
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
