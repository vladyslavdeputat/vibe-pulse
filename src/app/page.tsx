import HeroSection from "@/components/homepage/HeroSection";
import AdvantagesSection from "@/components/homepage/AdvantagesSection";
import WhyUsSection from "@/components/homepage/WhyUsSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import FAQSection from "@/components/homepage/FAQSection";
import CTASection from "@/components/homepage/CTASection";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-background via-background to-background/60">
      <HeroSection />
      <AdvantagesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
