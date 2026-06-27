import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "ContentForge AI — AI-Powered Content Generation",
  description:
    "Create blogs, emails, ads, and social posts in seconds with 500+ expert templates and advanced AI generation. Start free, no credit card required.",
  keywords: [
    "AI content generation",
    "copywriting AI",
    "content templates",
    "blog writer AI",
    "email generator",
  ],
  openGraph: {
    title: "ContentForge AI",
    description: "Forge content that actually converts — in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
