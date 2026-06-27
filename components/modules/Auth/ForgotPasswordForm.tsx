"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { forgotPasswordAction } from "@/app/(authGroup)/forgot-password/_action"; 
import { IForgotPasswordPayload, forgotPasswordZodSchema } from "@/zod/auth.validation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter()

  // 1. Setup your typical Mutation handler
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IForgotPasswordPayload) => forgotPasswordAction(payload),
  });

  // 2. Setup TanStack Form orchestration
  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = (await mutateAsync(value)) as any;
        console.log(result)

        if (!result.success) {
          setServerError(result.message || "Failed to process forgot password request.");
          return;
        }

        // Action handles server redirection to `/reset-password?email=...` on success,
        // but if it relies on client state rendering toggle:
        setSubmitted(true);
        toast.success("Reset path generated successfully!");
        router.push(`/reset-password?email=${value.email}`)
      } catch (error: any) {
        console.error(`Forgot password flow failed: ${error.message}`);
        setServerError(error.message || "An expected error occurred.");
      }
    },
  });

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
          {!submitted
            ? "Enter your account email below and we will pass along a secure link to reset your credentials."
            : "Check your inbox. We sent a secure link to restore access if an account exists."}
        </p>
      </div>

      {!submitted ? (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Email Field Managed by TanStack Form */}
          <form.Field
            name="email"
            validators={{ onChange: forgotPasswordZodSchema.shape.email }}
          >
            {(field) => (
              <div className="space-y-1">
                <AppField
                  field={field}
                  label="Email address"
                  type="email"
                  placeholder="you@company.com"
                  className="h-9 rounded-sm bg-muted/20 border-border/60 text-xs focus-visible:ring-1 focus-visible:ring-primary/40 transition-colors"
                />
              </div>
            )}
          </form.Field>

          {/* Error Container */}
          {serverError && (
            <Alert variant="destructive" className="p-3 rounded-sm bg-destructive/10 text-destructive border-destructive/20">
              <AlertDescription className="text-xs font-semibold leading-tight">
                {serverError}
              </AlertDescription>
            </Alert>
          )}

          {/* AppSubmitButton to handle pending and valid states seamlessly */}
          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Sending reset link..."
                disabled={!canSubmit}
                className="w-full h-9 mt-10 rounded-sm text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 cursor-pointer"
              >
                <span>Send Reset Link</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      ) : (
        <div className="space-y-3 pt-1">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setSubmitted(false);
              form.reset();
            }}
            className="w-full h-9 rounded-sm border-border/60 hover:border-primary/40 text-xs font-bold bg-background shadow-sm cursor-pointer"
          >
            Resend email address
          </Button>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground mt-5 border-t border-border/40 pt-3.5">
        <Link href="/login" className="text-muted-foreground font-bold hover:text-primary inline-flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to sign in
        </Link>
      </p>
    </div>
  );
}
