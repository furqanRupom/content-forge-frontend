"use client";

import { useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

import { ResetPasswordAction } from "@/app/(authGroup)/reset-password/_action"; 
import { IResetPasswordPayload, resetPasswordZodSchema } from "@/zod/auth.validation";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [showPass, setShowPass] = useState(false);
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [serverError, setServerError] = useState<string | null>(null);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IResetPasswordPayload) => ResetPasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onChange: ({ value }) => {
        if (value.newPassword !== value.confirmPassword) {
          return {
            form: "Passwords do not match",
          };
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      if (!email) {
        setServerError("Missing your linked email context. Try the forgot password sequence again.");
        return;
      }

      try {
        const result = (await mutateAsync({
          email,
          otp: code.join(""),
          newPassword: value.newPassword,
        })) as any;

        if (!result.success) {
          setServerError(result.message || "Password resetting failed.");
          return;
        }

        toast.success("Password changed successfully! Redirecting...");
        router.push("/login");
      } catch (error: any) {
        console.error(`Reset Password failed: ${error.message}`);
        setServerError(error.message || "An unexpected error occurred.");
      }
    },
  });

  const handleOtpChange = (element: HTMLInputElement, index: number, field: any) => {
    if (isNaN(Number(element.value))) return;

    const updatedCode = [...code];
    updatedCode[index] = element.value;
    setCode(updatedCode);

    // Keep TanStack form internal sync alive
    field.setValue(updatedCode.join(""));

    // Focus sequence orchestration
    if (element.value !== "" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      {/* Box Grid Layout for Security Token */}
      <form.Field
        name="otp"
        validators={{ onChange: resetPasswordZodSchema.shape.otp }}
      >
        {(field) => (
          <div className="space-y-5 text-center">
            <Label className="text-xs font-bold tracking-tight text-foreground block text-left mb-1">
              Verification Code
            </Label>
            <div className="flex justify-between gap-2">
              {code.map((num, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={num}
                  disabled={isPending}
                  ref={(el) => { if (el) inputsRef.current[idx] = el; }}
                  onChange={(e) => handleOtpChange(e.target, idx, field)}
                  onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                  required
                  className="w-12 h-12 text-center font-sans font-bold text-lg rounded-sm bg-muted/20 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none transition-colors disabled:opacity-50"
                />
              ))}
            </div>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
              <p className="text-[11px] text-destructive font-semibold text-left mt-1">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      {/* Enhanced structural space sizing for password fields */}
      <div className="space-y-8">
        {/* New Password Field */}
        <form.Field
          name="newPassword"
          validators={{ onChange: resetPasswordZodSchema.shape.newPassword }}
        >
          {(field) => (
            <div className="space-y-5">
              <AppField
                field={field}
                label="New password"
                type={showPass ? "text" : "password"}
                placeholder="Min. 8 characters"
                className="h-10 rounded-sm bg-muted/20 border-border/60 text-xs focus-visible:ring-1 focus-visible:ring-primary/40 transition-colors"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPass((prev) => !prev)}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer mr-1"
                  >
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </Button>
                }
              />
            </div>
          )}
        </form.Field>

        {/* Confirm Password Field */}
        <form.Field name="confirmPassword">
          {(field) => (
            <div className="space-y-5">
              <AppField
                field={field}
                label="Confirm new password"
                type="password"
                placeholder="Re-enter password"
                className="h-10 rounded-sm bg-muted/20 border-border/60 text-xs focus-visible:ring-1 focus-visible:ring-primary/40 transition-colors"
              />
            </div>
          )}
        </form.Field>
      </div>

      {/* Error Output Portal */}
      {(serverError || form.state.errors.length > 0) && (
        <Alert variant="destructive" className="p-3  rounded-sm bg-destructive/10 text-destructive border-destructive/20">
          <AlertDescription className="text-xs font-semibold leading-tight">
            {serverError || form.state.errors.join(", ")}
          </AlertDescription>
        </Alert>
      )}

      {/* Primary Interaction Component Trigger */}
      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
        {([canSubmit, isSubmitting]) => (
          <AppSubmitButton
            isPending={isSubmitting || isPending}
            pendingLabel="Updating authorization records..."
            disabled={!canSubmit || code.some((val) => val === "")}
            className="w-full h-10 rounded-sm text-xs  font-bold flex items-center justify-center gap-1.5 shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 cursor-pointer mt-12"
          >
            <span>Update Password</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </AppSubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
}
