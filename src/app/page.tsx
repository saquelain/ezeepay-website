import Hero from "@/components/sections/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import ProductPillars from "@/components/sections/ProductPillars";
import RoleSelector from "@/components/sections/RoleSelector";
import WhyEzeepay from "@/components/sections/WhyEzeepay";
import Testimonials from "@/components/sections/Testimonials";
import TrustSecurity from "@/components/sections/TrustSecurity";
import Resources from "@/components/sections/Resources";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ProductPillars />
      <RoleSelector />
      <WhyEzeepay />
      <Testimonials />
      <TrustSecurity />
      <Resources />
      {/* <div className="h-[200vh]" /> */}
    </>
  );
}