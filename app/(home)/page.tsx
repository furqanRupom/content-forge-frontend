import CTASection from "@/components/home/Cta";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import HowItWorksSection from "@/components/home/HowItWorks";
import PricingSection from "@/components/home/Pricing";
import SocialProofSection from "@/components/home/SocialProof";
import TemplatesSection from "@/components/home/Templates";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProofSection />
      <Features />
      <HowItWorksSection />
      <TemplatesSection />
      <PricingSection />
      <CTASection />
    </>
  );
}
