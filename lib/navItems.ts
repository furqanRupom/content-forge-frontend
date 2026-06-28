import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";
import { Role } from "@/enums/role.enum";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);
    return [
        {
            items: [
                {
                    title: "View App Site",
                    href: "/",
                    icon: "Home"
                },
                {
                    title: "Main Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard"
                },
            ]
        },
    ]
}

// Admin Navigation: Platform overview, metrics, and subscriber management
export const adminNavItems: NavSection[] = [
    {
        items: [
            {
                title: "User Control",
                href: "/admin/dashboard/users-management",
                icon: "Users",
            },
            {
                title: "Template Review",
                href: "/admin/dashboard/templates-moderation",
                icon: "LayoutTemplate",
            },
            {
                title: "System Telemetry",
                href: "/admin/dashboard/system-metrics",
                icon: "Activity",
            },
        ],
    },
];

// Manager Navigation: Template builders, analytics oversight, and audit logs
export const managerNavItems: NavSection[] = [
    {
        items: [
            {
                title: "Template Builder",
                href: "/manager/dashboard/manage-templates",
                icon: "FilePlus2",
            },
            {
                title: "Content Logs",
                href: "/manager/dashboard/generation-logs",
                icon: "FileText",
            },
            {
                title: "Usage Metrics",
                href: "/manager/dashboard/analytics",
                icon: "BarChart3",
            },
        ],
    },
];

// Standard User Navigation: Tooling suite for generating and storing AI assets
export const userNavItems: NavSection[] = [
    {
        items: [
            {
                title: "AI Workspace",
                href: "/dashboard/generate",
                icon: "Sparkles",
            },
            // {
            //     title: "Favorites Pool",
            //     href: "/dashboard/favorites",
            //     icon: "Star",
            // },
            {
                title: "Generation History",
                href: "/dashboard/history",
                icon: "History",
            },
        ],
    },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case Role.Admin:
            return [...commonNavItems, ...adminNavItems];

        case Role.Manager:
            return [...commonNavItems, ...managerNavItems];

        case Role.User:
            return [...commonNavItems, ...userNavItems];

        default:
            return commonNavItems;
    }
}
