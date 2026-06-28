"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { IGenerationJobPayload, IGenerationSuccessPayload } from "@/types/generation.types"
import { ICreateGenerationPayload, IUpdateGenerationPayload } from "@/zod/generation.validation"


export async function getAllGenerations(queryString: string) {
    try {
        return await httpClient.get<IGenerationJobPayload[]>(
            queryString ? `/generation?${queryString}` : "/generation"
        )
    } catch (error: any) {
        console.log("Error while fetching all generations")
        throw error
    }
}


export async function createNewGeneration(payload: ICreateGenerationPayload) {
    try {
        return await httpClient.post<IGenerationSuccessPayload>("/generation", payload)
    } catch (error: any) {
        console.log("Error while adding new generation : ", error)
        throw error
    }
}


export async function updateGeneration(id: string, payload: IUpdateGenerationPayload) {
    try {
        return await httpClient.patch<IGenerationJobPayload>(`/generation/${id}`, payload)
    } catch (error: any) {
        console.log("Error while updating generation :", error)
        throw error
    }
}


export async function getGeneration(id: string) {
    try {
        return await httpClient.get<IGenerationJobPayload>(
            `/generation/${id}`
        )
    } catch (error: any) {
        console.log("Error while fetching generation : ", error)
        throw error
    }
}

export async function deleteGeneration(id: string) {
    try {
        return await httpClient.delete(
            `/generation/${id}`
        )
    } catch (error: any) {
        console.log("Error while deleting generation : ", error)
        throw error
    }
}

export async function reGenerate(id: string) {
    try {
        return await httpClient.post(
            `/generation/${id}/regenerate`,{}
        )
    } catch (error: any) {
        console.log("Error while re-generating : ", error)
        throw error
    }
}