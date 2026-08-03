import Hero from "@/components/sections/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import ProductPillars from "@/components/sections/ProductPillars";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ProductPillars />
      <div className="h-[200vh]" />
    </>
  );
}