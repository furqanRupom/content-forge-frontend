import Logo from "@/components/logo/LogoIcon";
import ForgotPasswordForm from "@/components/modules/Auth/ForgotPasswordForm";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Forgot Password | ContentForge AI",
  description: "Enter your email to receive instructions on how to reset your ContentForge AI account password.",
};
export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-12 px-4 bg-background">
      {/* Background glowing effects */}
      <div className="absolute w-96 h-96 -top-24 -right-24 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card border border-border/60 rounded-sm p-6 sm:p-8 shadow-sm">
          
          <div className="text-center mb-4">
            <Logo className="flex justify-center items-center pb-5" />
            <Separator />
            <h1 className="font-sans text-xl font-bold text-foreground tracking-tight pt-5">Forgot password</h1>
          </div>

          {/* Separated client handler block */}
          <ForgotPasswordForm />

        </div>
      </div>
    </main>
  );
}
