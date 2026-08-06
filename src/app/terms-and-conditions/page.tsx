// app/terms-and-conditions/page.tsx
import LegalPageLayout, { type LegalSection } from "@/components/legal/LegalPageLayout";

const SECTIONS: LegalSection[] = [
  {
    id: "basic-overview",
    heading: "Basic Overview",
    body: [
      "This website and its offered products & services are powered by Ezeepay. Throughout the website, terms like \u201cwe\u201d, \u201cus\u201d, and \u201cour\u201d refer to Ezeepay and its products & services. Please read the following conditions, policies and notices related to the website for further information.",
    ],
  },
  {
    id: "acceptance-of-terms",
    heading: "Acceptance of Terms",
    body: [
      "By using our website and/or buying something from us, you engage in our services and agree to be bound by the following terms and conditions laid out by us. If you do not agree to the following terms and conditions, Ezeepay holds the authority to revoke your right to access the web portal and available features.",
    ],
  },
  {
    id: "content-copyright",
    heading: "Content Copyright Policy",
    body: [
      "The material — including all textual, audible, visual, and other types of media and information — as furnished on this website is the intellectual property of Ezeepay and licensed under the copyright law of the Constitution of India.",
      "The content furnished by this website may only be used for the in-house operational processes of Ezeepay, and its use is not permitted by any other business, service or organisation.",
    ],
  },
  {
    id: "trademark-policy",
    heading: "Trademark Policy",
    body: [
      "The name Ezeepay, its styled version ezeepay.app, and several sets of unique names, taglines and logos are registered trademarks of ezeepay.app, India. No individual or business may use these trademarks for their own commercial or promotional purpose, within the copyright- and trademark-law governing territory or outside territorial barriers. Anyone using our trademarks is liable to face criminal charges for infringing copyright and trademark laws.",
    ],
  },
  {
    id: "disclaimer",
    heading: "Disclaimer",
    body: [
      "No shared information in written or oral format provided by us or by you can be seen as a liable warranty.",
      "Any material download or acquisition of a product or service, while remaining within the service period, is undertaken with your agreement to any risk involved.",
      "You are responsible for your personal data loss due to system malfunction or virus attack, and you cannot hold Ezeepay responsible for such malfunctions.",
    ],
  },
  {
    id: "governing-law",
    heading: "Governing Law",
    body: [
      "Any claim made to receive monetary compensation for any damage or mishap relating to Ezeepay and its products and services shall be answered under the jurisdiction of the Government of India only. The company is not liable to entertain claims that are not mediated under the laws of the Government of India.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      icon="scale"
      eyebrow="The fine print, made clear"
      title="Terms &"
      accent="Conditions"
      updated="March 2026"
      sections={SECTIONS}
    />
  );
}