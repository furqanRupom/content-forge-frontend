

import GenerationsHistoryTable from "@/components/modules/User/GenerationHistoryManagement/GenerationHistoryTable"
import { getAllGenerations } from "@/services/generation.service"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Generation History | ContentForge AI",
    description: "View your past AI content generation jobs, export results, and track your usage history.",
};

const GenerationHistoryPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const queryParamsObjects = await searchParams

    const queryString = Object.keys(queryParamsObjects)
        .map((key) => {
            const value = queryParamsObjects[key]

            if (value === undefined) return ""

            if (Array.isArray(value)) {
                return value
                    .map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
                    .join("&")
            }

            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        })
        .filter(Boolean)
        .join("&")

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["generations", queryString],
        queryFn: () => getAllGenerations(queryString),
        staleTime: 1000 * 60 * 60,   
        gcTime: 1000 * 60 * 60 * 6,   
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <GenerationsHistoryTable initialQueryString={queryString} />
        </HydrationBoundary>
    )
}

export default GenerationHistoryPage