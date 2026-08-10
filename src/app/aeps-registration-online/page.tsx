import AepsHero from "@/components/aeps-registration-online/AepsHero";
import AepsVideoSection from "@/components/aeps-registration-online/AepsVideoSection";
import AepsBenefits from "@/components/aeps-registration-online/AepsBenefits";
import AepsHowItWorks from "@/components/aeps-registration-online/AepsHowItWorks";
import AepsWhyChoose from "@/components/aeps-registration-online/AepsWhyChoose";
import AepsBlogStrip from "@/components/aeps-registration-online/AepsBlogStrip";

export const metadata = {
  title: "AePS Registration Online | Ezeepay",
  description:
    "Become an AEPS agent with Ezeepay and offer banking services to your customers through your retail shop.",
};

export default function AepsRegistrationPage() {
  return (
    <main>
      <AepsHero />
      <AepsVideoSection />
      <AepsBenefits />
      <AepsHowItWorks />
      <AepsWhyChoose />
      <AepsBlogStrip />
    </main>
  );
}