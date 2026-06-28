import ManagerDashboardView from "@/components/modules/Dashboard/ManagerDashboardView";
import { getUserInfo } from "@/services/auth.service";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Manager Portal - Content Forge AI",
    description: "Administrative intelligence and pipeline logs monitoring matrix"
};

export default async function ManagerDashboardPage() {
    const response = await getUserInfo();
    const user = response?.data || null;

    return <ManagerDashboardView initialUser={user} />;
}