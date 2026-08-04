import Hero from "@/components/sections/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import ProductPillars from "@/components/sections/ProductPillars";
import RoleSelector from "@/components/sections/RoleSelector";
import WhyEzeepay from "@/components/sections/WhyEzeepay";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ProductPillars />
      <RoleSelector />
      <WhyEzeepay />
      <div className="h-[200vh]" />
    </>
  );
}