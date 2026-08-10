import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Send,
  Clock,
  Wallet,
  ThumbsUp,
  Briefcase,
} from "lucide-react";

const SERVICES = [
  {
    title: "Aadhaar Enabled Payment System (AEPS)",
    description:
      "Simplify banking for your customers with secure and hassle-free transactions using Aadhaar authentication. Enable Cash Withdrawal, Balance Enquiry, Cash Deposit and Mini Statement services.",
    image: "/images/services/banking-service/aeps.png",
    href: "#",
    tags: [
      { icon: Zap, label: "Instant Transactions" },
      { icon: ShieldCheck, label: "Secure & Reliable" },
      { icon: TrendingUp, label: "High Success Rate" },
    ],
  },
  {
    title: "Money Transfer (DMT)",
    description:
      "Send money instantly across India and Nepal with our Domestic Money Transfer service. Safe, secure and reliable transfers for your customers' peace of mind.",
    image: "/images/services/banking-service/dmt.png",
    href: "#",
    tags: [
      { icon: MapPin, label: "Pan India Service" },
      { icon: Send, label: "Instant Transfer" },
      { icon: Clock, label: "24x7 Available" },
    ],
  },
  {
    title: "Micro ATM Withdrawal",
    description:
      "Turn your shop into a banking point with Micro ATM. Offer cash withdrawal and balance enquiry services even in areas with limited banking infrastructure.",
    image: "/images/services/banking-service/micro-atm.png",
    href: "#",
    tags: [
      { icon: Wallet, label: "Low Investment" },
      { icon: ThumbsUp, label: "Easy to Use" },
      { icon: Briefcase, label: "More Business" },
    ],
  },
];

export default function BankingServicesList() {
  return (
    <section className="relative w-full bg-[#F7F6FB] py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-12">
        {/* ── Section heading ── */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand-purple/15 bg-white px-5 py-2 text-sm font-medium text-brand-purple shadow-sm">
            All-in-One Banking Solutions
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-[#1D1233] md:text-5xl">
            Every Service You Need,
            <br />
            All in{" "}
            <span className="relative inline-block text-brand-orange">
              One Place
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
            Empower your business with our range of banking services and become
            a trusted banking partner in your area.
          </p>
        </div>

        {/* ── Service cards ── */}
        <div className="mt-14 space-y-8">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="grid grid-cols-1 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md md:grid-cols-[280px_1fr_auto]"
            >
              {/* Image */}
              <div className="relative flex items-center justify-center bg-[#F4F2FA] p-6">
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
                        className="inline-flex items-center gap-2 rounded-xl bg-[#F4F2FA] px-4 py-2.5 text-sm font-medium text-brand-purple-dark"
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