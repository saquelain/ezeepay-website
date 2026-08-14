import UtilityBillPaymentHero from "@/components/utility-bill-payment/UtilityBillPaymentHero";
import UtilityBillPaymentList from "@/components/utility-bill-payment/UtilityBillPaymentList";
import Resources from "@/components/sections/Resources";

export const metadata = {
  title: "Utility & Bill Payments | Ezeepay",
  description:
    "Make electricity, mobile, DTH, and other bill payments for your customers with Ezeepay and earn commission on every transaction.",
};

export default function UtilityBillPaymentPage() {
  return (
    <>
      <UtilityBillPaymentHero />
      <UtilityBillPaymentList />
      <Resources />
    </>
  );
}