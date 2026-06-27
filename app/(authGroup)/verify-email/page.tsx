import { Suspense } from "react";
import Logo from "@/components/logo/LogoIcon";
import { Separator } from "@/components/ui/separator";
import VerifyEmailForm from "@/components/modules/Auth/VerifyEmailForm";

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-12 px-4 bg-background">
      {/* Background Subtle Gradient */}
      <div className="absolute w-96 h-96 -top-24 -left-24 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card border border-border/60 rounded-sm p-6 sm:p-8 shadow-sm">
          
          <div className="text-center mb-6">
            <Logo className="flex items-center justify-center pb-5" />
            <Separator />
            <h1 className="font-sans text-xl font-bold text-foreground tracking-tight pt-5">Verify your email</h1>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
              We sent a 6-digit verification code to your email address. Enter it below to activate your account.
            </p>
          </div>

          {/* Suspense Wrapper encapsulates Search Parameters Hook footprint */}
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-muted-foreground animate-pulse">Loading secure code engine...</p>
            </div>
          }>
            <VerifyEmailForm />
          </Suspense>

        </div>
      </div>
    </main>
  );
}
