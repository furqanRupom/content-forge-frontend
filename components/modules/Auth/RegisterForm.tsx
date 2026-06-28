"use client";


import { RegisterAction } from "@/app/(authGroup)/register/_action";
import Logo from "@/components/logo/LogoIcon";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IRegisterPayload, registerZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const perks = [
    "10 free AI generations every day",
    "Access to 50+ starter templates",
    "No credit card required",
];

const RegisterForm = () => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: IRegisterPayload) => RegisterAction(payload),
    });

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = (await mutateAsync(value)) as any;

                if (!result.success) {
                    setServerError(result.message || "Registration failed");
                    return;
                }
            } catch (error: any) {
                console.error(`Registration error: ${error.message}`);
                setServerError(`Registration failed: ${error.message}`);
            }
        },
    });

    const handleGoogleAuthRedirect = () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        window.location.href = `${baseUrl}/auth/login/google`;
    };

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-12 px-4 bg-background">
            {/* Structural ambient structural background layouts */}
            <div className="absolute w-125 h-125 -top-32 -right-32 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
            <div className="absolute w-96 h-96 -bottom-24 -left-24 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">

                {/* Left column: Value Perk Metrics Panel */}
                <div className="hidden md:block space-y-6 pr-4">
                  <Logo />

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
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                {perk}
                            </li>
                        ))}
                    </ul>

                    {/* User Testimonial Panel */}
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

                {/* Right column: Form entry contexts */}
                <div className="bg-card border border-border/60 rounded-sm p-6 sm:p-8 shadow-sm">
                    <div className="md:hidden flex justify-center mb-6">
                        <Link href="/" className="inline-flex items-center gap-2 group">
                            <div className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center shadow-sm">
                                <Zap className="w-3.5 h-3.5 text-primary-foreground fill-current" strokeWidth={2} />
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

                    {/* Singular Google Gate Interface */}
                    <div className="mb-5">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleAuthRedirect}
                            className="w-full h-9 rounded-sm border-border/60 hover:border-primary/40 text-xs font-bold gap-2 bg-background shadow-sm transition-all cursor-pointer"
                        >
                            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </Button>
                    </div>

                    <div className="relative mb-5">
                        <Separator className="bg-border/40" />
                        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground/80">
                            or with email
                        </span>
                    </div>

                    {/* Register Submission Framework */}
                    <form
                        method="POST"
                        action="#"
                        noValidate
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-4"
                    >
                        {/* Full Name Element */}
                        <form.Field
                            name="name"
                            validators={{ onChange: registerZodSchema?.shape?.name }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Full name"
                                    type="text"
                                    placeholder="Jane Smith"
                                />
                            )}
                        </form.Field>

                        {/* Email Address Element */}
                        <form.Field
                            name="email"
                            validators={{ onChange: registerZodSchema?.shape?.email }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Email address"
                                    type="email"
                                    placeholder="you@company.com"
                                />
                            )}
                        </form.Field>

                        {/* Password Element */}
                        <form.Field
                            name="password"
                            validators={{ onChange: registerZodSchema?.shape?.password }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Min. 8 characters"
                                    append={
                                        <Button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer mr-1"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                                            ) : (
                                                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                                            )}
                                        </Button>
                                    }
                                />
                            )}
                        </form.Field>

                        {/* Compliance Matrix Notice */}
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            By creating an account you agree to our{" "}
                            <Link href="/terms" className="text-primary hover:underline underline-offset-2 font-medium">Terms</Link>
                            {" "}and{" "}
                            <Link href="/privacy" className="text-primary hover:underline underline-offset-2 font-medium">Privacy Policy</Link>.
                        </p>

                        {/* Error notifications container */}
                        {serverError && (
                            <Alert variant="destructive" className="p-3 rounded-sm bg-destructive/10 text-destructive border-destructive/20">
                                <AlertDescription className="text-xs font-semibold leading-tight">{serverError}</AlertDescription>
                            </Alert>
                        )}

                        {/* Form submission executor node */}
                        <form.Subscribe
                            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
                        >
                            {([canSubmit, isSubmitting]) => (
                                <AppSubmitButton
                                    isPending={isSubmitting || isPending}
                                    pendingLabel="Forging your account..."
                                    disabled={!canSubmit}
                                >
                                    <span>Create Free Account</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </AppSubmitButton>
                            )}
                        </form.Subscribe>
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
};

export default RegisterForm;
