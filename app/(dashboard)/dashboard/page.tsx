import { getUserInfo } from "@/services/auth.service";
import { Metadata } from "next";
import UserDashboardView from "@/components/modules/Dashboard/UserDashboardView";

export const metadata: Metadata = {
    title: "Dashboard - Content Forge AI",
    description: "User dashboard workspace overview index"
};

export default async function DashboardPage() {
    const response = await getUserInfo();
    const user = response?.data || null;

    return <UserDashboardView initialUser={user} />;
}