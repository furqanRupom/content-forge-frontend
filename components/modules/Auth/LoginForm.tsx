"use client";

import { loginAction } from "@/app/(authGroup)/login/_action";
import Logo from "@/components/logo/LogoIcon";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface LoginFormProps {
    redirectPath?: string;
}

const LoginForm = ({ redirectPath }: LoginFormProps) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: ILoginPayload) => loginAction(payload, redirectPath),
    });

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = (await mutateAsync(value)) as any;
                if (!result.success) {
                    setServerError(result.message || "Login failed");
                    return;
                }
            } catch (error: any) {
                console.error(`Login failed: ${error.message}`);
                setServerError(`Login failed: ${error.message}`);
            }
        },
    });

    const handleGoogleAuthRedirect = () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        window.location.href = `${baseUrl}/auth/login/google`;
    };

    const fillDemoCredentials = () => {
        form.setFieldValue("email", "content-forge@manager.com");
        form.setFieldValue("password", "CFManager@12345");
    };

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-12 px-4 bg-background">
            <div className="absolute w-96 h-96 -top-24 -left-24 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
            <div className="absolute w-80 h-80 -bottom-16 -right-16 rounded-full bg-primary/5 blur-[90px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-card border border-border/60 rounded-sm p-6 sm:p-8 shadow-sm">
                    <div className="text-center mb-6">
                        <Logo className="flex justify-center items-center pb-5" />
                        <Separator />
                        <h1 className="font-sans text-xl font-bold text-foreground tracking-tight pt-5">Welcome back</h1>
                        <p className="text-xs text-muted-foreground mt-0.5">Sign in to your workspace account</p>
                    </div>

                    {/* Demo Credentials Helper */}
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={fillDemoCredentials}
                        className="w-full h-8 rounded-sm text-[10px] font-bold text-muted-foreground bg-muted/30 hover:bg-muted hover:text-foreground border border-dashed border-border mb-5 transition-all gap-1.5 cursor-pointer"
                    >
                        <Sparkles className="h-3 w-3" />
                       Login as a Manager
                    </Button>

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
                            or continue with email
                        </span>
                    </div>

                    <form
                        method="POST"
                        noValidate
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-8"
                    >
                        <form.Field
                            name="email"
                            validators={{ onChange: loginZodSchema.shape.email }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Email address"
                                    type="email"
                                    placeholder="you@company.com"
                                    className="h-9 rounded-sm bg-muted/20 border-border/60 text-xs focus-visible:ring-1 focus-visible:ring-primary/40 transition-colors"
                                />
                            )}
                        </form.Field>

                        <form.Field
                            name="password"
                            validators={{ onChange: loginZodSchema.shape.password }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="h-9 rounded-sm bg-muted/20 border-border/60 text-xs focus-visible:ring-1 focus-visible:ring-primary/40 transition-colors"
                                    append={
                                        <Button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer mr-1"
                                        >
                                            {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                        </Button>
                                    }
                                />
                            )}
                        </form.Field>

                        <div className="text-right mt-1.5">
                            <Link href="/forgot-password" className="text-[11px] font-bold text-primary hover:underline underline-offset-2">
                                Forgot password?
                            </Link>
                        </div>

                        {serverError && (
                            <Alert variant="destructive" className="p-3 rounded-sm bg-destructive/10 text-destructive border-destructive/20">
                                <AlertDescription className="text-xs font-semibold leading-tight">{serverError}</AlertDescription>
                            </Alert>
                        )}

                        <form.Subscribe
                            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
                        >
                            {([canSubmit, isSubmitting]) => (
                                <AppSubmitButton
                                    isPending={isSubmitting || isPending}
                                    pendingLabel="Signing in to workspace..."
                                    disabled={!canSubmit}
                                    className="w-full h-9 rounded-sm text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
                                >
                                    <span>Sign in</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </AppSubmitButton>
                            )}
                        </form.Subscribe>
                    </form>

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
};

export default LoginForm;