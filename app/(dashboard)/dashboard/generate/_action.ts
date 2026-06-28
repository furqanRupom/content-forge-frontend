"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { getActionErrorMessage } from "@/lib/errorMessage"
import {
    createNewGeneration,
    updateGeneration,
    getGeneration,
    deleteGeneration
} from "@/services/generation.service"
import { ApiErrorResponse, ApiResponse } from "@/types/api.types"
import {
    IGenerationJobPayload,
    IGenerationSuccessPayload,

} from "@/types/generation.types"
import {
    createGenerationSchema,
    ICreateGenerationPayload,
    IUpdateGenerationPayload
} from "@/zod/generation.validation"

/**
 * Onboard & execute a brand new generation job
 */
export const CreateGenerationAction = async (
    payload: ICreateGenerationPayload
): Promise<ApiResponse<IGenerationSuccessPayload> | ApiErrorResponse> => {
    const parsedPayload = createGenerationSchema.safeParse(payload)
    if (!parsedPayload.success) {
        return {
            success: false,
            message: parsedPayload.error.issues[0]?.message || "Invalid input parameters",
        }
    }

    try {
        return await createNewGeneration(parsedPayload.data)
    } catch (error: unknown) {
        return {
            success: false,
            message: getActionErrorMessage(error, "Failed to initialize content generation execution stream"),
        }
    }
}

/**
 * Fetch a singular Generation Job context by its Unique Identifier
 */
export const GetGenerationAction = async (
    id: string
): Promise<ApiResponse<IGenerationJobPayload> | ApiErrorResponse> => {
    if (!id) {
        return { success: false, message: "Invalid or missing identity sequence" }
    }

    try {
        return await getGeneration(id)
    } catch (error: unknown) {
        return {
            success: false,
            message: getActionErrorMessage(error, "Failed to retrieve the target generation records"),
        }
    }
}


export const UpdateGenerationAction = async (
    id: string,
    payload: IUpdateGenerationPayload
): Promise<ApiResponse<IGenerationJobPayload> | ApiErrorResponse> => {
    if (!id) {
        return { success: false, message: "Invalid or missing identity sequence" }
    }

    try {
        return await updateGeneration(id, payload)
    } catch (error: unknown) {
        return {
            success: false,
            message: getActionErrorMessage(error, "Failed to patch modification states for this generation instance"),
        }
    }
}

/**
 * Remove historical generation payload records from the persistence layer
 */
export const DeleteGenerationAction = async (
    id: string
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
    if (!id) {
        return { success: false, message: "Invalid or missing identity sequence" }
    }

    try {
        return await deleteGeneration(id)
    } catch (error: unknown) {
        return {
            success: false,
            message: getActionErrorMessage(error, "Failed to purge structural data allocation map for this job entry"),
        }
    }
}


export const RegenerateAction = async (
    id: string
): Promise<ApiResponse<IGenerationJobPayload> | ApiErrorResponse> => {
    if (!id) {
        return { success: false, message: "Invalid or missing identity sequence" }
    }

    try {
        // Direct route proxy communication out to your base controller endpoint mapping setup
        return await httpClient.post<IGenerationJobPayload>(`/generation/${id}/regenerate`, {})
    } catch (error: unknown) {
        return {
            success: false,
            message: getActionErrorMessage(error, "Failed to safely recalculate or execute model regeneration sequence"),
        }
    }
}