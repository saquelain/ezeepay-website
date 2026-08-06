// app/refund-policy/page.tsx
import LegalPageLayout, { type LegalSection } from "@/components/legal/LegalPageLayout";

const SECTIONS: LegalSection[] = [
  {
    id: "sale-on-platform",
    heading: "Sale on Platform",
    body: [
      "A sale is a final sale once it has been executed from your panel provided by Ezeepay and payment has been deducted for such sale. As a sale is done at any time from your panel/app, no refund, exchange or cancellation will be permitted. You, and only you, are responsible for information provided by you for purchases, and for all charges that result from those purchases. Ezeepay is not responsible for any purchase made with incorrect information — so it is you who needs to be cautious before placing any order from your panel/app.",
      "You are responsible for the mobile number or DTH account number provided/entered by you for prepaid recharge purchases, and for all charges that result from those purchases. Ezeepay is not responsible for any purchase of prepaid recharge for an incorrect mobile number, DTH account number, or incorrect toll or data-card information.",
      "If, for a transaction performed by you on the website, money has been charged to your card or bank account and the recharge is not delivered within 24 hours of completion of your transaction, you may inform us by sending an email to support@ezeepay.app or by raising a ticket. Ezeepay shall investigate the incident, and if it is found that money was charged to your card or bank account without delivery of the recharge, the money will be refunded to you within 7 working days from the date of receipt of your email. All refunds will be credited to your Ezeepay Wallet account. If the service is provided by a third party and it is a case of refund, it shall be processed as per the timeline given by the third party, and you are bound by the refund terms/policy of that third party.",
      "IT services once given/executed cannot be taken back; similarly, any alteration/amendment in those will result in additional charges.",
      "Charges for services provided by third parties depend entirely on those parties. If such parties alter their charges, they will be applied without prior notice. If a sale is executed after a hike in price, it shall be subject to the higher price of that product/service at any stage before or after completion of the service(s).",
      "The value/amount/payment stored in your Ezeepay Wallet shall NOT be refunded under ANY circumstances/conditions, and may only be utilised to make payments for services available in the login panel of our portal/mobile application. No interest will be payable on the balance available in the Ezeepay Wallet.",
      "If we receive a cancellation notice for a service order from you within 24 hours of placing the order, and the order has not been processed by us, we will be more than happy to cancel the order and refund the entire amount to you within 10 to 15 days. We will not be able to cancel orders that have already been processed by us.",
    ],
  },
  {
    id: "who-can-get-a-refund",
    heading: "Who Can Get a Refund?",
    body: [
      "Ezeepay refunds if payment is successfully credited to the Ezeepay Wallet but the user is not able to complete a recharge/money transfer. In such cases, the refund will only be made to your Ezeepay Wallet.",
    ],
  },
  {
    id: "how-to-request",
    heading: "How to Request a Refund",
    body: [
      "Mail us at support@ezeepay.app or raise a ticket from your Ezeepay app/web panel, clearly mentioning your current Ezeepay Wallet balance and the problem you are facing with the recharge/money transfer.",
    ],
  },
  {
    id: "replacement-policy",
    heading: "Replacement Policy",
    body: [
      "If you have received a damaged product, you must send us its best-quality pictures as soon as you receive it — delay is not permitted. Please return the product within 3 days from the time of delivery. We take responsibility only for manufacturing defects in the product, nothing else.",
      "The extended time to return a damaged product is within 7 to 8 working days (unavoidable/avoidable causes may sometimes play a role).",
      "The customer must return the product undamaged and in its original packing, which must not be tampered with in any way. If the product is damaged or the original-packing condition is not fulfilled, the product will not be accepted.",
      "If the service/product is provided by a third party and it is a case of refund/replacement, it shall be processed as per the timeline given by the third party, and you are bound by the refund/replacement policy of that third party.",
    ],
  },
  {
    id: "registration-services",
    heading: "Registration Services",
    body: [
      "Once you pay Ezeepay a fee for any subscription/service activation and we register you as a merchant, we will not refund the registration/subscription fee under any circumstances. If you register yourself with Ezeepay but do not avail of the services for any reason, Ezeepay is not responsible for a refund. An amount once paid for a product/panel is never refunded in any case. If you have paid us but are not registered on the Ezeepay platform, you may ask for a refund by mailing us at support@ezeepay.app.",
    ],
  },
  {
    id: "changes-in-policy",
    heading: "Changes in Policy",
    body: [
      "Ezeepay may at any time, without prior notice and at its sole discretion, amend these policies from time to time. You are therefore requested to review these policies periodically. Your continued use of the Ezeepay platform after any such amendments automatically implies your acceptance thereof.",
    ],
  },
  {
    id: "contact",
    heading: "Contact Us About This Policy",
    body: [
      "If you have queries or suggestions regarding our refund policies, kindly e-mail us at support@ezeepay.app.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      icon="refund"
      eyebrow="Cancellation & refunds"
      title="Refund"
      accent="Policy"
      updated="March 2026"
      sections={SECTIONS}
    />
  );
}