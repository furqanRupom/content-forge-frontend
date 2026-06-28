"use server"

import { getActionErrorMessage } from "@/lib/errorMessage"
import { addNewTemplate } from "@/services/template.service"
import { ApiErrorResponse, ApiResponse } from "@/types/api.types"
import { ITemplate } from "@/types/template.types"
import { createTemplateSchema, ITemplateCreatePayload } from "@/zod/template.validation"

export const AddNewTemplateAction = async (payload: ITemplateCreatePayload): Promise<ApiResponse<ITemplate> | ApiErrorResponse> => {
    const parsedPayload = createTemplateSchema.safeParse(payload)
    if (!parsedPayload.success) {
        return {
            success: false, 
            message: parsedPayload.error.issues[0]?.message || "Invalid input",
        }
    }
    try {
        return await addNewTemplate(parsedPayload.data)
    } catch (error: unknown) {
        return {
            success: false,
            message: getActionErrorMessage(error, "Failed to add template"),
        }

    }
}