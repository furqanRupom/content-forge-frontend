import { Role } from "@/enums/role.enum";

// ContentForge supports User, Manager (Content Editors), and Admin roles
export type UserRole = Role.Admin | Role.User | Role.Manager;

export const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email"
];

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}

export type RouteConfig = {
    exact: string[],
    pattern: RegExp[]
}

// Routes accessible by any authenticated personnel (Settings, Profile updates)
export const commonProtectedRoutes: RouteConfig = {
    exact: [
        "/settings",
        "/profile",
        "/settings/security"
    ],
    pattern: []
}

// Admin panel for user control, global usage analytics, and platform limits
export const adminProtectedRoutes: RouteConfig = {
    pattern: [/^\/admin\/dashboard/],
    exact: []
}

// Manager/Editor panel for adding templates, monitoring generation queues, and logs
export const managerProtectedRoutes: RouteConfig = {
    pattern: [/^\/manager\/dashboard/],
    exact: []
}

// Standard application portal workspace for regular content generation
export const userProtectedRoutes: RouteConfig = {
    pattern: [/^\/dashboard/],
    exact: []
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
}

export const getRouteOwner = (pathname: string): Role | "common" | null => {
    // Specific nested structures must be evaluated prior to the generic dashboard base
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return Role.Admin;
    }

    if (isRouteMatches(pathname, managerProtectedRoutes)) {
        return Role.Manager;
    }

    if (isRouteMatches(pathname, userProtectedRoutes)) {
        return Role.User;
    }

    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "common";
    }

    return null; // Public routes (/pricing, /templates, /about)
}

export const getDefaultDashboardRoute = (role: UserRole) => {
    if (role === Role.Admin) {
        return "/admin/dashboard";
    }
    if (role === Role.Manager) {
        return "/manager/dashboard";
    }
    if (role === Role.User) {
        return "/dashboard";
    }
    return "/";
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole) => {
    const sanitizedRedirectPath = redirectPath.split("?")[0] || redirectPath;
    const routeOwner = getRouteOwner(sanitizedRedirectPath);

    if (routeOwner === null || routeOwner === "common") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}