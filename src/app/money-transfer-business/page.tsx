import MoneyTransferHero from "@/components/money-transfer-business/MoneyTransferHero";
import MoneyTransferFlow from "@/components/money-transfer-business/MoneyTransferFlow";
import MoneyTransferAdvantages from "@/components/money-transfer-business/MoneyTransferAdvantages";
import MoneyTransferWhyChoose from "@/components/money-transfer-business/MoneyTransferWhyChoose";
import MoneyTransferStats from "@/components/money-transfer-business/MoneyTransferStats";
import MoneyTransferFinalCta from "@/components/money-transfer-business/MoneyTransferFinalCta";

export const metadata = {
  title: "Domestic Money Transfer (DMT) Business | Ezeepay",
  description:
    "Start a domestic money transfer business with Ezeepay. Instant, secure, Pan-India transfers with high commissions for retailers.",
};

export default function MoneyTransferBusinessPage() {
  return (
    <>
      <MoneyTransferHero />
      <MoneyTransferFlow />
      <MoneyTransferAdvantages />
      <MoneyTransferWhyChoose />
      <MoneyTransferStats />
      <MoneyTransferFinalCta />
    </>
  );
}