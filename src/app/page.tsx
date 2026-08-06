import Hero from "@/components/sections/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import ProductPillars from "@/components/sections/ProductPillars";
import RoleSelector from "@/components/sections/RoleSelector";
import WhyEzeepay from "@/components/sections/WhyEzeepay";
import Testimonials from "@/components/sections/Testimonials";
import TrustSecurity from "@/components/sections/TrustSecurity";
import Resources from "@/components/sections/Resources";
import FAQ from "@/components/sections/FAQ";
import TrustedBy from "@/components/sections/TrustedBy";
import YouTubeVideos from "@/components/sections/YouTubeVideos";
import ImpactIndia from "@/components/sections/ImpactIndia";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import ServicesOrbit from "@/components/sections/ServicesOrbit";
export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ServicesShowcase />
      <ServicesOrbit />
      <StatsStrip />
      <ProductPillars />
      <ImpactIndia />
      <RoleSelector />
      <WhyEzeepay />
      <Testimonials />
      <TrustSecurity />
      <FAQ />
      <Resources />
      <YouTubeVideos />
      {/* <div className="h-[200vh]" /> */}
    </>
  );
}