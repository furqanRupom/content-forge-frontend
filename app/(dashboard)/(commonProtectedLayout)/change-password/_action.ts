"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getActionErrorMessage } from "@/lib/errorMessage";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types,";
import { changePasswordZodSchema, IChangePasswordPayload } from "@/zod/auth.validation";

export const ChangePasswordAction = async (payload: IChangePasswordPayload): Promise<ApiResponse<ILoginResponse> | ApiErrorResponse> => {
  console.log(payload)
    const parsedPayload = changePasswordZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        }
    }
    try {

        const response = await httpClient.post<ILoginResponse>("/auth/change-password", parsedPayload.data);

        const { accessToken, refreshToken, token } = response.data;
        await setTokenInCookies("accessToken", accessToken);
        await setTokenInCookies("refreshToken", refreshToken);
        await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); 

        return response

    } catch (error: any) {
        return {
            success: false,
            message: getActionErrorMessage(error,"Password changing failed")
        }
    }
}
