import InsuranceHero from "@/components/insurance/InsuranceHero";
import InsuranceList from "@/components/insurance/InsuranceList";

export const metadata = {
  title: "Insurance Services | Ezeepay",
  description:
    "Offer life, health, and motor insurance to your customers with Ezeepay and earn commission on every policy sold.",
};

export default function InsurancePage() {
  return (
    <>
      <InsuranceHero />
      <InsuranceList />
    </>
  );
}