"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getActionErrorMessage } from "@/lib/errorMessage";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { IResetPasswordPayload, resetPasswordZodSchema } from "@/zod/auth.validation";

export const ResetPasswordAction = async (payload: IResetPasswordPayload): Promise<ApiResponse<null> | ApiErrorResponse> => {
  console.log(payload)
    const parsedPayload = resetPasswordZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        }
    }
    try {

        const response = await httpClient.post<null>("/auth/reset-password", parsedPayload.data);

        // if(response.success){
        //   redirect("/login")
        // }
        return response

    } catch (error: any) {
        return {
            success: false,
            message: getActionErrorMessage(error,"Password reseting failed")
        }
    }
}
