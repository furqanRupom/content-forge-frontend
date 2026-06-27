"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getActionErrorMessage } from "@/lib/errorMessage";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import {  IVerifyEmailPayload,verifyEmailZodSchema} from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const verifyEmailAction = async (payload: IVerifyEmailPayload): Promise<ApiResponse<null> | ApiErrorResponse> => {
  console.log(payload)
    const parsedPayload = verifyEmailZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        }
    }
    try {

        const response = await httpClient.post<null>("/auth/verify-email", parsedPayload.data);

        if(response.success){
          redirect("/login")
        }
        return response

    } catch (error: any) {
        return {
            success: false,
            message: getActionErrorMessage(error,"Email Verification failed")
        }
    }
}
