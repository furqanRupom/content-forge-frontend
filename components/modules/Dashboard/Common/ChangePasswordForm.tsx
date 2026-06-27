"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
import { toast } from "sonner";

import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

import { IChangePasswordPayload, changePasswordZodSchema } from "@/zod/auth.validation";
import { ChangePasswordAction } from "@/app/(dashboard)/(commonProtectedLayout)/change-password/_action";

export default function ChangePasswordForm() {
  const router = useRouter();
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IChangePasswordPayload) => ChangePasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onChange: ({ value }) => {
        if (value.newPassword !== value.confirmPassword) {
          return {
            form: "New passwords do not match",
          };
        }
        if (value.currentPassword && value.currentPassword === value.newPassword) {
          return {
            form: "New password cannot be identical to your current password",
          };
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const result = (await mutateAsync({
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
        })) as any;

        if (!result.success) {
          setServerError(result.message || "Failed to update credentials registry.");
          return;
        }

        toast.success("Security credentials updated successfully!");
        form.reset();
        router.push("/profile");
      } catch (error: any) {
        console.error(`Change Password runtime catch hit: ${error.message}`);
        setServerError(error.message || "An unexpected systemic exception occurred.");
      }
    },
  });

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-7 w-full"
    >
      
      {/* Isolated Row Layout for Current Password with generous spacing */}
      <form.Field
        name="currentPassword"
        validators={{ onChange: changePasswordZodSchema.shape.currentPassword }}
      >
        {(field) => (
          <div className="space-y-2">
            <AppField
              field={field}
              label="Current Password"
              type={showCurrentPass ? "text" : "password"}
              placeholder="Enter active account password verification payload"
              className="h-12 rounded-sm bg-muted/10 border-border/60 text-xs focus-visible:ring-1 focus-visible:ring-primary/40 transition-colors w-full"
              append={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCurrentPass((prev) => !prev)}
                  className="h-9 w-9 text-muted-foreground hover:text-foreground cursor-pointer mr-1"
                >
                  {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              }
            />
          </div>
        )}
      </form.Field>

      {/* Balanced Side-by-Side Grid - Enlarged space dimensions prevent overlapping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
        
        {/* New Password Field Block */}
        <form.Field
          name="newPassword"
          validators={{ onChange: changePasswordZodSchema.shape.newPassword }}
        >
          {(field) => (
            <div className="space-y-5">
              <AppField
                field={field}
                label="New Password"
                type={showNewPass ? "text" : "password"}
                placeholder="Minimum 8 characters length"
                className="h-12 rounded-sm bg-muted/10 border-border/60 text-xs focus-visible:ring-1 focus-visible:ring-primary/40 transition-colors w-full"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowNewPass((prev) => !prev)}
                    className="h-9 w-9 text-muted-foreground hover:text-foreground cursor-pointer mr-1"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                }
              />
            </div>
          )}
        </form.Field>

        {/* Confirm New Password Field Block */}
        <form.Field name="confirmPassword">
          {(field) => (
            <div className="space-y-5">
              <AppField
                field={field}
                label="Confirm New Password"
                type="password"
                placeholder="Re-enter verification layout string"
                className="h-12 rounded-sm bg-muted/10 border-border/60 text-xs focus-visible:ring-1 focus-visible:ring-primary/40 transition-colors w-full"
              />
            </div>
          )}
        </form.Field>
      </div>

      {/* Structural Server Error Notification Block */}
      {(serverError || form.state.errors.length > 0) && (
        <Alert variant="destructive" className="p-4 rounded-sm bg-destructive/10 text-destructive border-destructive/20 mt-2">
          <AlertDescription className="text-xs font-semibold leading-tight">
            {serverError || form.state.errors.join(", ")}
          </AlertDescription>
        </Alert>
      )}

      <Separator className="bg-border/40 my-4" />

      {/* Reconfigured Bottom Action Bar to guarantee components don't collapse or overflow */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-2">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground max-w-md">
          <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Confirm your entry strings match rules perfectly before submitting update operations.</span>
        </div>

        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <AppSubmitButton
              isPending={isSubmitting || isPending}
              pendingLabel="Modifying records..."
              disabled={!canSubmit}
              className="w-full sm:w-auto h-11 rounded-sm text-xs font-bold flex items-center justify-center gap-2 shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 cursor-pointer px-6 sm:min-w-[220px] shrink-0"
            >
              <span>Commit Password Change</span>
              <ArrowRight className="w-4 h-4" />
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
