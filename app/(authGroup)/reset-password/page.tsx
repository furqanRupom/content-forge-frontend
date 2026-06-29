import { Suspense } from "react";
import Logo from "@/components/logo/LogoIcon";
import { Separator } from "@/components/ui/separator";
import ResetPasswordForm from "@/components/modules/Auth/ResetPasswordForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reset Password | ContentForge AI",
  description: "Create a new password for your ContentForge AI account.",
};
export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-12 px-4 bg-background">
      {/* Background radial layer lighting node */}
      <div className="absolute w-96 h-96 -bottom-16 -right-16 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card border border-border/60 rounded-sm p-6 sm:p-8 shadow-sm">
          
          <div className="text-center mb-6">
            <Logo className="flex items-center justify-center pb-5" />
            <Separator />
            <h1 className="font-sans text-xl font-bold text-foreground tracking-tight pt-5">Set new password</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Please choose a complex, strong password layout.</p>
          </div>

          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-muted-foreground animate-pulse">Initializing credentials console...</p>
            </div>
          }>
            <ResetPasswordForm />
          </Suspense>

        </div>
      </div>
    </main>
  );
}
