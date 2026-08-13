import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  IdCard,
  FileCheck2,
  Wallet,
  ReceiptText,
  ShieldCheck,
  Clock,
  Building2,
  Zap,
  BadgeCheck,
} from "lucide-react";

const SERVICES = [
  {
    title: "PAN Card",
    description:
      "A Permanent Account Number (PAN) card is a unique identification document created once for a customer. Help people in remote areas or villages file for a PAN card easily — fill out the form online at your store and submit it over the internet, while earning money for the service.",
    image: "/images/services/egovernment-services/pan-card.png",
    href: "#",
    tags: [
      { icon: IdCard, label: "Identity Document" },
      { icon: Zap, label: "Online Filing" },
      { icon: Wallet, label: "Earn Commission" },
    ],
  },
  {
    title: "ITR",
    description:
      "People in cities have several options to file income tax returns, but it's difficult in rural areas. Help rural customers file their ITR using Ezeepay — follow all the steps on screen, provide earning and investment proofs, submit, and earn a good commission.",
    image: "/images/services/egovernment-services/itr.png",
    href: "#",
    tags: [
      { icon: ReceiptText, label: "Income Tax Filing" },
      { icon: FileCheck2, label: "Guided Steps" },
      { icon: Wallet, label: "Good Commission" },
    ],
  },
  {
    title: "GST Registration",
    description:
      "Goods and Service Tax registration is important for every business, in metro cities and villages alike. Provide GST registration to people living far from urban centres — submit important documents in a few clicks and build a real business out of it.",
    image: "/images/services/egovernment-services/gst-registration.png",
    href: "#",
    tags: [
      { icon: Building2, label: "For Every Business" },
      { icon: ShieldCheck, label: "Secure Submission" },
      { icon: Wallet, label: "Build a Business" },
    ],
  },
  {
    title: "MSME Registration",
    description:
      "Registration of Micro, Small & Medium Enterprises (MSME) has several benefits for businesses. Help local people register for MSME by filling out the form on Ezeepay — quick, safe, and secure, taking just a few minutes, with a commission for every registration.",
    image: "/images/services/egovernment-services/msme-registration.png",
    href: "#",
    tags: [
      { icon: BadgeCheck, label: "Business Benefits" },
      { icon: Clock, label: "Minutes to Complete" },
      { icon: ShieldCheck, label: "Safe & Secure" },
    ],
  },
];

export default function EgovServicesList() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F5FB] py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[420px] max-w-4xl rounded-full bg-brand-purple-light blur-[130px] opacity-50"
      />

      <div className="relative mx-auto w-full max-w-[90rem] px-6 lg:px-12">
        {/* ── Section heading ── */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand-purple/15 bg-white px-5 py-2 text-sm font-medium text-brand-purple shadow-sm">
            E-Governance Services
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-brand-purple-dark md:text-5xl">
            Offer the Best{" "}
            <span className="relative inline-block text-brand-orange">
              E-Governance Services
              <svg
                aria-hidden
                viewBox="0 0 160 18"
                className="absolute left-0 top-full mt-1 h-3 w-full text-brand-purple"
                fill="none"
              >
                <path
                  d="M2 12C40 2 110 2 158 12"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brand-grey">
            Provide all e-governance services to your customers using Ezeepay,
            in the comfort of your shop, and help people living in rural
            areas.
          </p>
        </div>

        {/* ── Service cards ── */}
        <div className="relative mt-14 space-y-8">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="grid grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-brand-purple/10 transition-shadow hover:shadow-lg hover:shadow-brand-purple/10 md:grid-cols-[280px_1fr_auto]"
            >
              {/* Image */}
              <div className="relative flex items-center justify-center bg-gradient-to-br from-brand-purple-light to-[#EDE7F8] p-6">
                <div className="relative h-52 w-full md:h-full md:min-h-[220px]">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width: 768px) 280px, 90vw"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center px-6 py-8 md:px-10">
                <h3 className="text-2xl font-bold text-brand-purple-dark">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-3xl leading-relaxed text-brand-grey">
                  {s.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {s.tags.map((t) => {
                    const Icon = t.icon;
                    return (
                      <span
                        key={t.label}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-purple-light px-4 py-2.5 text-sm font-medium text-brand-purple-dark"
                      >
                        <Icon size={16} className="text-brand-purple" />
                        {t.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden items-center pr-10 md:flex">
                <Link
                  href={s.href}
                  aria-label={`Learn more about ${s.title}`}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-purple text-brand-purple transition-all hover:bg-brand-purple hover:text-white"
                >
                  <ArrowRight size={22} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}