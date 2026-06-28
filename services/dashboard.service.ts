"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { 
  IDashboardOverview, 
  IDashboardChartResponse, 
  IDashboardActivityResponse, 
  IPerformanceMetrics,
  IContentLogsMetrics,
  IUserPerformanceMetrics
} from "@/types/dashboard.types"

/**
 * Fetches general high-level overview metadata counts
 */
export async function getDashboardOverview() {
  try {
    return await httpClient.get<IDashboardOverview>("/dashboard/overview")
  } catch (error: any) {
    console.error("Error while fetching dashboard overview:", error)
    throw error
  }
}

/**
 * Fetches chronologically bucketed history data points for graphs
 * @param queryString e.g. "period=7d" or "period=30d"
 */
export async function getDashboardChartData(queryString?: string) {
  try {
    return await httpClient.get<IDashboardChartResponse>(
      queryString ? `/dashboard/chart-data?${queryString}` : "/dashboard/chart-data"
    )
  } catch (error: any) {
    console.error("Error while fetching chart data:", error)
    throw error
  }
}

/**
 * Fetches recent dynamic operational content workflows with tracking metadata pagination
 * @param queryString e.g. "page=1&limit=20"
 */
export async function getDashboardActivity(queryString?: string) {
  try {
    return await httpClient.get<IDashboardActivityResponse>(
      queryString ? `/dashboard/activity?${queryString}` : "/dashboard/activity"
    )
  } catch (error: any) {
    console.error("Error while fetching operational dashboard activity:", error)
    throw error
  }
}

/**
 * Fetches top templates and model distributions usage percentages
 */
export async function getPerformanceMetrics() {
  try {
    return await httpClient.get<IPerformanceMetrics>("/dashboard/metrics")
  } catch (error: any) {
    console.error("Error while fetching engine performance metrics:", error)
    throw error
  }
}

/**
 * MANAGER/ADMIN ONLY: Fetches administrative global processing logs
 */
export async function getContentLogsMetrics() {
  try {
    return await httpClient.get<IContentLogsMetrics>("/dashboard/content-logs")
  } catch (error: any) {
    console.error("Error while fetching manager content logs metrics:", error)
    throw error
  }
}

/**
 * MANAGER/ADMIN ONLY: Fetches core workspace identity user generation analytics
 * @param queryString e.g. "period=30d"
 */
export async function getUserPerformanceMetrics(queryString?: string) {
  try {
    return await httpClient.get<IUserPerformanceMetrics>(
      queryString ? `/dashboard/user-metrics?${queryString}` : "/dashboard/user-metrics"
    )
  } catch (error: any) {
    console.error("Error while fetching manager user analytics metrics:", error)
    throw error
  }
}