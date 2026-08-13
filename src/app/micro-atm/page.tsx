import MicroAtmHero from "@/components/micro-atm/MicroAtmHero";
import MicroAtmWhyChoose from "@/components/micro-atm/MicroAtmWhyChoose";
import MicroAtmVideoSection from "@/components/micro-atm/MicroAtmVideoSection";
import MicroAtmWhyNeeded from "@/components/micro-atm/MicroAtmWhyNeeded";
import MicroAtmReasons from "@/components/micro-atm/MicroAtmReasons";
import Resources from "@/components/sections/Resources";

export default function MicroAtmPage() {
  return (
    <>
      <MicroAtmHero />
      <MicroAtmVideoSection />
      <MicroAtmWhyNeeded />
      <MicroAtmReasons />
      <MicroAtmWhyChoose />
      <Resources />
    </>
  );
}