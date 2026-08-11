import AepsHero from "@/components/aeps-registration-online/AepsHero";
import AepsWhatIsAeps from "@/components/aeps-registration-online/AepsWhatIsAeps";
import AepsVideoSection from "@/components/aeps-registration-online/AepsVideoSection";
import AepsHowItWorks from "@/components/aeps-registration-online/AepsHowItWorks";
import AepsFeatures from "@/components/aeps-registration-online/AepsFeatures";
import AepsWhyChoose from "@/components/aeps-registration-online/AepsWhyChoose";
import Resources from "@/components/sections/Resources";

export const metadata = {
  title: "AePS Registration Online | Ezeepay",
  description:
    "Become an AEPS agent with Ezeepay and offer banking services to your customers through your retail shop.",
};

export default function AepsRegistrationPage() {
  return (
    <main>
      <AepsHero />
      <AepsWhatIsAeps />
      <AepsHowItWorks />
      <AepsFeatures />
      <AepsVideoSection />
      <AepsWhyChoose />
      <Resources />
    </main>
  );
}
