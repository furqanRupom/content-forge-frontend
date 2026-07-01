"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

import { verifyEmailAction } from "@/app/(authGroup)/verify-email/_action";
import { IVerifyEmailPayload, verifyEmailZodSchema } from "@/zod/auth.validation";

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter()

  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [serverError, setServerError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  // 1. TanStack Query Mutation handler

const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IVerifyEmailPayload) => verifyEmailAction(payload),
    onSuccess: (result: any) => {
      if (result?.success) {
        toast.success("Account activated successfully!");
        router.push("/login"); // or wherever you want
      }else{
        router.push("/login");
      }
    },
    onError: (error: any) => {
      // ← CRITICAL: Handle NEXT_REDIRECT
      if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        toast.success("Account verified successfully!");
        throw error;                    // ← Re-throw so redirect works
      }

      // Normal error
      const message = error?.message || "Verification failed";
      setServerError(message);
      toast.error(message);
    },
  });
  // 2. TanStack Form coordination matching your structural pattern
  const form = useForm({
    defaultValues: {
      otp: "",
    },
    onSubmit: async () => {
      setServerError(null);

      if (!email) {
        setServerError("Missing critical email context. Return to login or registration.");
        return;
      }

      const fullCode = code.join("");

      try {
        const result = (await mutateAsync({ email, otp: fullCode })) as any;

        if (!result.success) {
          setServerError(result.message || "Invalid or expired OTP verification code.");
          return;
        }

        router.push("/login")
      } catch (error: any) {
        console.error(`Verification error: ${error.message}`);
        setServerError(error.message || "An unexpected error occurred during activation.");
      }
    },
  });

  const handleChange = (element: HTMLInputElement, index: number, field: any) => {
    if (isNaN(Number(element.value))) return;

    const updatedCode = [...code];
    updatedCode[index] = element.value;
    setCode(updatedCode);

    // Keep TanStack Form value synchronized for validation triggers
    field.setValue(updatedCode.join(""));

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

  const handleResend = async () => {
    if (!email) {
      toast.error("Cannot dispatch code without an associated email identity.");
      return;
    }
    setResending(true);
    try {
      toast.success("A fresh 6-digit verification code has been dispatched!");
    } catch {
      toast.error("Failed to resend authorization code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="space-y-5">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        <div className="space-y-2 text-center">

          {/* Bind TanStack Form Field configuration to custom input nodes */}
          <form.Field
            name="otp"
            validators={{ onChange: verifyEmailZodSchema.shape.otp }}
          >
            {(field) => (
              <div className="space-y-2">
                <div className="flex justify-center gap-2">
                  {code.map((num, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={num}
                      disabled={isPending}
                      ref={(el) => { if (el) inputsRef.current[idx] = el; }}
                      onChange={(e) => handleChange(e.target, idx, field)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      required
                      className="w-11 h-11 text-center font-sans font-bold text-base rounded-sm bg-muted/20 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none transition-colors disabled:opacity-50"
                    />
                  ))}
                </div>
                
                {/* Optional: Standard text fallback layout hook leveraging AppField error rendering */}
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <p className="text-[11px] text-destructive font-semibold mt-1">
                    {field.state.meta.errors.join(", ")}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
        </div>

        {/* Global Error Container */}
        {serverError && (
          <Alert variant="destructive" className="p-3 rounded-sm bg-destructive/10 text-destructive border-destructive/20">
            <AlertDescription className="text-xs font-semibold leading-tight">
              {serverError}
            </AlertDescription>
          </Alert>
        )}

        {/* Unified Application Submit Control Trigger */}
        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <AppSubmitButton
              isPending={isSubmitting || isPending}
              pendingLabel="Verifying account identity..."
              disabled={!canSubmit || code.some((val) => val === "")}
              className="w-full h-9 rounded-sm text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 cursor-pointer"
            >
              <span>Verify Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </form>

      <div className="mt-4 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs border-t border-border/40 pt-3.5">
        <span className="text-muted-foreground">Didn't receive a code?</span>
        <button
          type="button"
          onClick={handleResend}
          disabled={resending || isPending}
          className="text-primary font-bold hover:underline inline-flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-3 h-3 ${resending ? "animate-spin" : ""}`} />
          Resend Code
        </button>
      </div>
    </div>
  );
}
