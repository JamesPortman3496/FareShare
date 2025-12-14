import AuroraBackground from "@/components/pages/home/AuroraBackground";
import FeatureGrid from "@/components/pages/home/FeatureGrid";
import HeroSection from "@/components/pages/home/HeroSection";
import HowItWorksSection from "@/components/pages/home/HowItWorksSection";
import PrimarySection from "@/components/pages/home/PrimarySection";

export default function HomePage() {
  return (
    <div className="relative space-y-14 pt-16">
      <AuroraBackground />

      <HeroSection />

      <FeatureGrid />

      <PrimarySection />

      <HowItWorksSection />
    </div>
  );
}
