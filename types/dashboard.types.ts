export interface NavItem {
    title: string,
    href: string,
    icon: string
}

export interface NavSection {
    title?: string,
    items: NavItem[]
}



export interface IRecentGeneration {
    id: string;
    inputPrompt: string;
    status: "COMPLETED" | "FAILED" | "PROCESSING" | "QUEUED";
    model: string;
    tokensUsed: number;
    createdAt: string;
    template: {
        id: string;
        title: string;
    } | null;
    generatedContent: {
        id: string;
        title: string;
        wordCount: number;
    } | null;
    user?: {
        id: string;
        name: string;
        email: string;
    };
}

export interface IRecentFavorite {
    id: string;
    createdAt: string;
    generatedContent: {
        id: string;
        title: string;
        job: {
            inputPrompt: string;
        };
    };
}

export interface IDashboardOverview {
    totalGenerations: number;
    completedGenerations: number;
    failedGenerations: number;
    successRate: number;
    totalFavorites: number;
    totalTemplates: number;
    totalTokensUsed: number;
    totalUsers?: number; // Optional since it's only appended for admin/managers
}

export interface IChartDataPoint {
    date: string;
    total: number;
    completed: number;
    failed: number;
    tokens: number;
}

export interface IDashboardChartResponse {
    period: string;
    data: IChartDataPoint[];
}

export interface IDashboardActivityResponse {
    recentGenerations: IRecentGeneration[];
    recentFavorites: IRecentFavorite[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface IPerformanceMetrics {
    topTemplates: Array<{
        id: string;
        title: string;
        count: number;
    }>;
    modelDistribution: Array<{
        model: string;
        usageCount: number;
        totalTokens: number;
    }>;
}

export interface IContentLogsMetrics {
    summary: {
        totalRuns: number;
        processingRuns: number;
        failedRuns: number;
        stabilityRate: number;
    };
    recentLogs: Array<{
        id: string;
        model: string;
        status: string;
        createdAt: string;
        inputPrompt: string;
        user: { name: string; email: string } | null;
        generatedContent: { title: string; wordCount: number } | null;
    }>;
}

export interface IUserPerformanceMetrics {
    summary: {
        totalUsers: number;
        newUsersCount: number;
        growthPercentage: number;
    };
    roles: Array<{
        role: string;
        count: number;
    }>;
    growthTimeline: Array<{
        date: string;
        registrations: number;
    }>;
}