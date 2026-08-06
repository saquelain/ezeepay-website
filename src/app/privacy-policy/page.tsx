// app/privacy-policy/page.tsx
import LegalPageLayout, { type LegalSection } from "@/components/legal/LegalPageLayout";

const SECTIONS: LegalSection[] = [
  {
    id: "information-we-collect",
    heading: "Information We Collect",
    body: [
      "We simply collect your information to provide a better and richer experience on your subsequent visits. For example, what kind of mobile recharge you supposedly want, what kind of bus type you like to travel in, and what kind of deals or offers you like the most. We collect your information in two different ways.",
    ],
  },
  {
    id: "technical-information",
    heading: "Technical Information — What We Fetch",
    body: [
      "Whenever you use our service, our analytics fetches your technical information, like your browser, IP address, your operating system, and much other technically relevant information.",
    ],
  },
  {
    id: "why-we-collect",
    heading: "Why We Collect & How We Use It",
    body: [
      "We collect your personal information to understand your personal behaviour and choices, so we can create a better experience for you whenever you visit our web portal — and secondly, to offer you better deals and propagation than your ideal choice.",
      "We collect your technical information simply for the sake of improving our back-end technology, so we can give you a quick and hassle-free experience, and you always come back to use our service.",
    ],
  },
  {
    id: "access-and-update",
    heading: "Accessing & Updating Your Information",
    body: [
      "We always provide an access point to your information whenever you use our services, so there is no need to worry about information access and updation. In any case, if you have any problem accessing your own information, you can always contact us.",
    ],
  },
  {
    id: "use-of-information",
    heading: "Use of Demographic, Profile & Personal Data",
    body: [
      "We use personal information to provide the services you request. We use your personal information to resolve disputes; troubleshoot problems; send money and collect money; measure consumer interest in our products and services; and we may use this information to keep you apprised of any online and offline offers, products, services, and updates made available to our customers.",
      "We use the information thus obtained to customise your experience; detect and protect us against error, fraud and other criminal activity; enforce our terms and conditions, which are an integral part of the use of this application; and as otherwise described to you at the time of such collection.",
      "We identify and use your IP address to help diagnose problems with our server and to administer our app. Your IP address is also used to help identify you and to gather broad demographic information. We use the SMS platform for sending messages related to password reset, beneficiary addition, and maintenance notifications for our agents.",
    ],
  },
  {
    id: "sharing",
    heading: "Sharing of Personal Information",
    body: [
      "We may disclose personal information if required to do so by law, or in the good-faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal processes. We may disclose personal information to law enforcement offices upon such requests, third-party rights owners, or others in the good-faith belief that such disclosure is reasonably necessary to: enforce our Terms or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public.",
      "We will share some or all of your personal information with another business entity should we (or our assets) plan to merge with, or be acquired by, that business entity, or in a re-organisation, amalgamation, or restructuring of business. Should such a transaction occur, the other business entity (or the new combined entity) will be required to follow this privacy policy with respect to your personal information.",
    ],
  },
  {
    id: "no-third-party-disclosure",
    heading: "No Disclosure to Third Parties",
    body: [
      "We don't share any personal or confidential information with any third party for commercial or personal profit. However, we use your information for our in-house projects to make better future products and services.",
    ],
  },
  {
    id: "security",
    heading: "100% Secured & Certified",
    body: [
      "We are a GeoTrust-certified service, which guarantees your personal information is in safe hands and 100% secured from any internet hack or data-theft attacks. Along with GeoTrust SSL certification, we have also employed many security checks to make a leak-free system.",
    ],
  },
  {
    id: "policy-changes",
    heading: "Policy Changes",
    body: [
      "Our Privacy Policy may change every once in a while. Though we make these changes on the growing demand of consumers or to comply with Government or industry guidelines, we won't decrease your rights under this Privacy Policy without your voice being heard. We will post any changes to the Privacy Policy here on this page — so keep visiting this page for regular updates.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      icon="shield"
      eyebrow="Your data, protected"
      title="Privacy"
      accent="Policy"
      updated="March 2026"
      sections={SECTIONS}
    />
  );
}