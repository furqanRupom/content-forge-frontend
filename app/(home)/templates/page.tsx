import TemplatesPage from "@/components/templates/AllTemplates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Templates | ContentForge AI",
  description: "All templates page here"
};

// Explicit return added
const allTemplatesPage = () => {
  return (
    <main>
      <TemplatesPage />
    </main>
  );
};

export default allTemplatesPage;