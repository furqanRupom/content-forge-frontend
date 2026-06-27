import { z } from "zod";

export const loginZodSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
})

export const registerZodSchema = z.object({
    name:z.string().min(5,"Name is Required !"),
    email: z.email("Invalid email address"),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
})

export const verifyEmailZodSchema = z.object({
    email:z.email("Invalid email address"),
    otp:z.string().min(6,"OTP is Required")
})


export const forgotPasswordZodSchema = z.object({
    email:z.email("Invalid email address"),
})

export const resetPasswordZodSchema = z.object({
    email:z.email("Invalid email address"),
    otp:z.string().min(6,"OTP is Required"),
    newPassword:z.string().min(8,"Password is Required")
})


export const changePasswordZodSchema = z.object({
    currentPassword:z.string().min(8,"Password is Required"),
    newPassword:z.string().min(8,"Password is Required")
})

export type ILoginPayload = z.infer<typeof loginZodSchema>;
export type IRegisterPayload = z.infer<typeof registerZodSchema>;
export type IVerifyEmailPayload = z.infer<typeof verifyEmailZodSchema>;
export type IForgotPasswordPayload = z.infer<typeof forgotPasswordZodSchema>;
export type IResetPasswordPayload = z.infer<typeof resetPasswordZodSchema>;
export type IChangePasswordPayload = z.infer<typeof changePasswordZodSchema>;
