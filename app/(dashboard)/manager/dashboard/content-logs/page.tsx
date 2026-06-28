import ContentLogsView from "@/components/modules/Dashboard/Manager/ContentLogsView";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Pipeline Logs - Manager Portal",
    description: "Granular system auditing and execution trace log details"
};

export default function ContentLogsPage() {
    return <ContentLogsView />;
}