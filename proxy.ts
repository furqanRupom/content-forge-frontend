import { NextRequest, NextResponse } from "next/server";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from "./lib/authUtils";
import { jwtUtils } from "./lib/jwtUtils";
import { isTokenExpiringSoon } from "./lib/tokenUtils";
import { getNewTokensWithRefreshToken, getUserInfo } from "./services/auth.service";
import { Role } from "./enums/role.enum";

async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
    try {
        const refresh = await getNewTokensWithRefreshToken(refreshToken);
        return !!refresh;
    } catch (error) {
        console.error("Error refreshing token in middleware:", error);
        return false;
    }
}

export async function proxy(request: NextRequest) {
    try {
        const { pathname } = request.nextUrl;
        const pathWithQuery = `${pathname}${request.nextUrl.search}`;
        const accessToken = request.cookies.get("accessToken")?.value;
        const refreshToken = request.cookies.get("refreshToken")?.value;

        // Unified verification checkpoint
        const tokenVerification = accessToken
            ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
            : { success: false, data: null };

        const isValidAccessToken = tokenVerification.success;
        const decodedAccessToken = tokenVerification.data;

        let userRole: Role | null = null;
        if (decodedAccessToken && decodedAccessToken.role) {
            userRole = decodedAccessToken.role as Role;
        }

        const routerOwner = getRouteOwner(pathname);
        const isAuth = isAuthRoute(pathname);

        // Proactively refresh token if access token is about to expire
        if (isValidAccessToken && refreshToken && (await isTokenExpiringSoon(accessToken!))) {
            const requestHeaders = new Headers(request.headers);
            const response = NextResponse.next({
                request: { headers: requestHeaders },
            });

            try {
                const refreshed = await refreshTokenMiddleware(refreshToken);
                if (refreshed) {
                    requestHeaders.set("x-token-refreshed", "1");
                }
                return NextResponse.next({
                    request: { headers: requestHeaders },
                    headers: response.headers
                });
            } catch (error) {
                console.error("Error refreshing token:", error);
            }
            return response;
        }

        // Rule 1: Logged-in users should not access auth pages
        if (
            isAuth &&
            isValidAccessToken &&
            pathname !== "/verify-email" &&
            pathname !== "/reset-password"
        ) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as any), request.url));
        }

        // Resolve user configuration once here to mitigate execution bottlenecks
        let userInfo = null;
        if (accessToken && isValidAccessToken) {
            userInfo = await getUserInfo();
        }

        // Rule 2: User trying to access reset-password page
        if (pathname === "/reset-password") {
            const email = request.nextUrl.searchParams.get("email");

            if (accessToken && isValidAccessToken && email && userInfo) {
                return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as any), request.url));
            }

            if (email) {
                return NextResponse.next();
            }

            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathWithQuery);
            return NextResponse.redirect(loginUrl);
        }

        // Rule 3: Public routes
        if (routerOwner === null) {
            return NextResponse.next();
        }

        // Rule 4: Protected routes checking
        if (!accessToken || !isValidAccessToken) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathWithQuery);
            return NextResponse.redirect(loginUrl);
        }

        // Guardrails for mandatory configurations (Verification / Mandatory Password Shifts)
        if (userInfo) {
            // Email Verification Loop
            if (userInfo.emailVerified === false) {
                if (pathname !== "/verify-email") {
                    const verifyEmailUrl = new URL("/verify-email", request.url);
                    verifyEmailUrl.searchParams.set("email", userInfo.email);
                    return NextResponse.redirect(verifyEmailUrl);
                }
                return NextResponse.next();
            }

            if (userInfo.emailVerified && pathname === "/verify-email") {
                return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as any), request.url));
            }

           
        }

        // Rule 5: Common shared protected route
        if (routerOwner === "common") {
            return NextResponse.next();
        }

        // Rule 6: Role-Based Routing enforcement using ContentForge target roles
        if (
            routerOwner === Role.Admin ||
            routerOwner === Role.Manager ||
            routerOwner === Role.User
        ) {
            if (routerOwner !== userRole) {
                return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as any), request.url));
            }
        }

        return NextResponse.next();

    } catch (error) {
        console.error("Error in proxy middleware:", error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ]
};
