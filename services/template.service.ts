"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ITemplate } from "@/types/template.types"
import { ITemplateCreatePayload, ITemplateUpdatePayload } from "@/zod/template.validation"


export async function getAllTemplates(queryString: string) {
    try {
        return await httpClient.get<ITemplate[]>(
            queryString ? `/template?${queryString}` : "/template"
        )
    } catch (error: any) {
        console.log("Error while fetching all templates")
        throw error
    }
}


export async function addNewTemplate(payload: ITemplateCreatePayload) {
    try {
        return await httpClient.post<ITemplate>("/template", payload)
    } catch (error: any) {
        console.log("Error while adding new template : ", error)
        throw error
    }
}


export async function updateTemplate(id: string, payload: ITemplateUpdatePayload) {
    try {
        return await httpClient.patch<ITemplate>(`/template/${id}`, payload)
    } catch (error: any) {
        console.log("Error while updating template :", error)
        throw error
    }
}


export async function getTemplate(id: string) {
    try {
        return await httpClient.get<ITemplate>(
            `/template/${id}`
        )
    } catch (error: any) {
        console.log("Error while fetching template : ", error)
        throw error
    }
}

export async function deleteTemplate(id: string) {
    try {
        return await httpClient.delete(
            `/template/${id}`
        )
    } catch (error: any) {
        console.log("Error while deleting template : ", error)
        throw error
    }
}