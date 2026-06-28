import UsageMetricsView from "@/components/modules/Dashboard/Manager/UsageMetricsView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Performance Metrics - Manager Portal",
    description: "User registrations and layout template processing distributions"
};

export default function UsageMetricsPage() {
    return <UsageMetricsView />;
}