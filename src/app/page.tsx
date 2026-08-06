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

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <StatsStrip />
      <ProductPillars />
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