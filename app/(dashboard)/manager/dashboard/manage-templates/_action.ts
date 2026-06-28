"use server"

import { getActionErrorMessage } from "@/lib/errorMessage"
import { deleteTemplate, getTemplate, updateTemplate } from "@/services/template.service"
import { ApiErrorResponse, ApiResponse } from "@/types/api.types"
import { ITemplate } from "@/types/template.types"
import { ITemplateUpdatePayload, updateTemplateSchema } from "@/zod/template.validation"

export const UpdateTemplateAction = async (id: string, payload: ITemplateUpdatePayload): Promise<ApiResponse<ITemplate> | ApiErrorResponse> => {
    if (!id) {
        return {
            success: false,
            message: "Invalid Id format"
        }
    }
    const parsedPayload = updateTemplateSchema.safeParse(payload)
    if (!parsedPayload.success) {
        return {
            success: false,
            message: parsedPayload.error.issues[0]?.message || "Invalid input",
        }
    }
    try {
        return await updateTemplate(id, parsedPayload.data)
    } catch (error: unknown) {
        return {
            success: false,
            message: getActionErrorMessage(error, "Failed to update template"),
        }
    }
}
export const DeleteTemplateAction = async (id: string) : Promise<ApiResponse<unknown> | ApiErrorResponse> => {
    if (!id) {
        return {
            success: false,
            message: "Invalid Id format"
        }
    }
    try {
        return await deleteTemplate(id)
    } catch (error: unknown) {
        return {
            success: false,
            message: getActionErrorMessage(error, "Failed to delete template"),
        }

    }
}
export const ViewTemplateAction = async (id: string): Promise<ApiResponse<ITemplate> | ApiErrorResponse> => {
    if (!id) {
        return {
            success: false,
            message: "Invalid Id format"
        }
    }

    try {
        return await getTemplate(id)
    } catch (error: unknown) {
        return {
            success: false,
            message: getActionErrorMessage(error, "Failed to get template"),
        }

    }
}