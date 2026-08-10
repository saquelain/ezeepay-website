import BankingServiceHero from "@/components/banking-service/BankingServiceHero";
import BankingServicesList from "@/components/banking-service/BankingServicesList";
import BankingCtaBanner from "@/components/banking-service/BankingCtaBanner";
import BankingFinalCta from "@/components/banking-service/BankingFinalCta";

export default function BankingServicePage() {
  return (
    <>
      <BankingServiceHero />
      <BankingServicesList />
      <BankingCtaBanner />
      <BankingFinalCta />
      {/* more sections go here as we build them out */}
    </>
  );
}