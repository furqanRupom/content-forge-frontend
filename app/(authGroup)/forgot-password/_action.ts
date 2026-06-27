"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getActionErrorMessage } from "@/lib/errorMessage";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { forgotPasswordZodSchema, IForgotPasswordPayload } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const forgotPasswordAction = async (payload: IForgotPasswordPayload): Promise<ApiResponse<null> | ApiErrorResponse> => {
  console.log(payload)
    const parsedPayload = forgotPasswordZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        }
    }
    try {

        const response = await httpClient.post<null>("/auth/forgot-password", parsedPayload.data);

        // if(response.success){
        //   redirect(`/reset-password?email=${payload.email}`)
        // }
        return response

    } catch (error: any) {
      console.log(error)
        return {
            success: false,
            message: getActionErrorMessage(error,"Forgot Password failed")
        }
    }
}
