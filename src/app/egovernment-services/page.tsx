import EgovServicesHero from "@/components/egovernment-services/EgovServicesHero";
import EgovServicesList from "@/components/egovernment-services/EgovServicesList";
import Resources from "@/components/sections/Resources";
export default function EgovServicesPage() {
  return (
    <>
      <EgovServicesHero />
      <EgovServicesList />
      <Resources />
    </>
  );
}