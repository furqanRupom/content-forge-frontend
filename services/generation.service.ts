"use server"

import { httpClient } from "@/lib/axios/httpClient"


export async function getAllGenerations(queryString: string) {
    try {
        return await httpClient.get(
            queryString ? `/generation?${queryString}` : "/generation"
        )
    } catch (error: any) {
        console.log("Error while fetching all generations")
        throw error
    }
}


export async function createNewGeneration(payload: any) {
    try {
        return await httpClient.post("/generation", payload)
    } catch (error: any) {
        console.log("Error while adding new generation : ", error)
        throw error
    }
}


export async function updateGeneration(id: string, payload: any) {
    try {
        return await httpClient.patch(`/generation/${id}`, payload)
    } catch (error: any) {
        console.log("Error while updating generation :", error)
        throw error
    }
}


export async function getGeneration(id: string) {
    try {
        return await httpClient.get(
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
            `/generation/${id}`,{}
        )
    } catch (error: any) {
        console.log("Error while re-generating : ", error)
        throw error
    }
}