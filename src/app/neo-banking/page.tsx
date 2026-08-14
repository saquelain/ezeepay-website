import NeoBankingHero from "@/components/neo-banking/NeoBankingHero";
import NeoBankingList from "@/components/neo-banking/NeoBankingList";
import Resources from "@/components/sections/Resources";

export const metadata = {
  title: "Neo Banking Services | Ezeepay",
  description:
    "Open bank accounts, transfer money, and apply for credit/debit cards for your customers with Ezeepay's neo-banking services and earn commission on every transaction.",
};

export default function NeoBankingPage() {
  return (
    <>
      <NeoBankingHero />
      <NeoBankingList />
      <Resources />
    </>
  );
}