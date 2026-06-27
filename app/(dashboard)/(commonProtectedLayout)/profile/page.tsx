

import { getUserInfo } from '@/services/auth.service';
import type { Metadata } from 'next';
import { Calendar, Mail, Shield, ShieldCheck, User, Sparkles, Clock, Edit3, Database, Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: "My Profile - Content Forge AI",
  description: "View and manage your personal profile details on Content Forge AI"
};

export default async function ProfilePage() {
  const user = await getUserInfo();

  // Extract the first letter securely for fallback avatar display
  const nameFallbackChar = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U';

  const memberSince = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : "N/A";

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Structural subtle background ambient lighting nodes */}
      <div className="absolute w-[500px] h-[500px] -top-40 -left-40 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute w-96 h-96 bottom-20 -right-20 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Page Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
          <div>
            <h1 className="font-sans text-2xl font-bold tracking-tight">Personal Profile</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Overview of your account identity, personal details, and registration logs.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-8 rounded-sm text-xs font-bold gap-1.5 shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </Button>
          </div>
        </div>

        {/* Multi-Section Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Panel: Identity Verification Layout */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border/60 rounded-sm p-6 shadow-sm text-center relative">
              <div className="absolute top-3 right-3">
                <Badge variant={user?.status === "ACTIVE" ? "default" : "secondary"} className="h-5 px-2 rounded-sm text-[9px] font-bold uppercase tracking-wide bg-primary/10 text-primary border-primary/20">
                  {user?.status || "INACTIVE"}
                </Badge>
              </div>

              {/* Avatar Logic Block: Showcase user photo if verified image exists; fall back to name initial otherwise */}
              <div className="flex justify-center mb-4 mt-2">
                <Avatar className="w-20 h-20 border border-border/80 rounded-sm bg-muted/20 p-1 shadow-sm">
                  {user?.image ? (
                    <AvatarImage src={user?.image} alt={user?.name || "User Avatar Identity"} className="object-cover rounded-sm" />
                  ) : null}
                  <AvatarFallback className="rounded-sm font-sans font-black text-2xl bg-primary/10 text-primary w-full h-full flex items-center justify-center">
                    {nameFallbackChar}
                  </AvatarFallback>
                </Avatar>
              </div>

              <h2 className="font-sans text-base font-bold text-foreground tracking-tight capitalize truncate">
                {user?.name || "Anonymous Identity"}
              </h2>
              <p className="text-[11px] text-muted-foreground font-mono mt-0.5 max-w-full truncate">ID: {user?.id}</p>

              <Separator className="bg-border/40 my-4" />

              <div className="flex flex-col gap-2 pt-1 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground inline-flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Account Status</span>
                  <span className="font-mono font-bold text-[11px] text-primary bg-primary/5 border border-primary/10 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">{user?.role || "USER"}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-muted-foreground inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Member Since</span>
                  <span className="font-semibold text-foreground">{memberSince}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Panel Box */}
            <div className="bg-card border border-border/60 rounded-sm p-5 shadow-sm space-y-3">
              <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase font-mono flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-primary" /> User Activity Overview
              </h3>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-muted/10 border border-border/40 rounded-sm">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Tokens Consumed</p>
                  <p className="font-sans text-lg font-bold text-foreground mt-0.5">0</p>
                </div>
                <div className="p-3 bg-muted/10 border border-border/40 rounded-sm">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">AI Generations</p>
                  <p className="font-sans text-lg font-bold text-foreground mt-0.5">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Primary Profile Workspace Form Data Fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border/60 rounded-sm p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Box Section 1: Identity Parameters */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground border-b border-border/40 pb-2">
                  <User className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-bold tracking-wider uppercase font-sans text-foreground">User Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">Full Name</p>
                    <div className="h-9 px-3 rounded-sm bg-muted/10 border border-border/40 text-xs font-semibold text-foreground flex items-center capitalize">
                      {user?.name}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">Email Address</p>
                    <div className="h-9 px-3 rounded-sm bg-muted/10 border border-border/40 text-xs font-semibold text-foreground flex items-center justify-between min-w-0">
                      <span className="truncate pr-2">{user?.email}</span>
                      {user?.emailVerified && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-sm shrink-0">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Box Section 2: Metadata Infrastructure Ledger */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-muted-foreground border-b border-border/40 pb-2">
                  <Database className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-bold tracking-wider uppercase font-sans text-foreground">Account Lifecycle History</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">Account Created</p>
                    <div className="h-9 px-3 rounded-sm bg-muted/10 border border-border/40 font-mono text-[11px] text-muted-foreground flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> {user?.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">Last Account Update</p>
                    <div className="h-9 px-3 rounded-sm bg-muted/10 border border-border/40 font-mono text-[11px] text-muted-foreground flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> {user?.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Footnote Notice */}
              <div className="pt-4 border-t border-border/40 flex items-center gap-2 text-[11px] text-muted-foreground">
                <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>To adjust or update your account email verification variables, please connect with platform support.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
