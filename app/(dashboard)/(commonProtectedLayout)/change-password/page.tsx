import type { Metadata } from "next";
import { KeyRound, ShieldAlert, Sparkles, Clock, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "@/components/modules/Dashboard/Common/ChangePasswordForm";

export const metadata: Metadata = {
  title: "Security & Credentials - Content Forge AI",
  description: "Securely modify your personal authentication profile access records"
};

export default function ChangePasswordPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient decorative light layer nodes */}
      <div className="absolute w-[500px] h-[500px] -top-40 -left-40 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute w-96 h-96 bottom-20 -right-20 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Page Section Main Headline Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
          <div>
            <h1 className="font-sans text-2xl font-bold tracking-tight">Account Security</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Update your security tokens, manage authorization passwords, and verify credential integrity variables.
            </p>
          </div>
        </div>

        {/* Dashboard Balanced Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Panel: Information and Best Practices Guidelines */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-card border border-border/60 rounded-sm p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold tracking-wider text-foreground uppercase font-sans flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" /> Password Requirements
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                To guarantee full identity encryption protection across the AI ecosystem, confirm that your updated system access phrases follow standard authorization practices:
              </p>
              
              <Separator className="bg-border/40" />
              
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Must be at least <b>8 characters</b> in length.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Cannot match previous authorization configurations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Avoid common identifiers or local text combinations.</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border/60 rounded-sm p-5 shadow-sm bg-muted/5 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground">Session Warning</h4>
                <p className="text-[11px] text-muted-foreground leading-normal">
                  Updating your password updates active cookie verification hashes. Be prepared to log back into secondary machines if requested.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Primary Change Password Action Module */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border/60 rounded-sm p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="flex items-center gap-2 text-muted-foreground border-b border-border/40 pb-2">
                <KeyRound className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-bold tracking-wider uppercase font-sans text-foreground">Modify Access Credentials</h3>
              </div>

              {/* Mounted Action Form Layout */}
              <ChangePasswordForm />

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
