import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Smartphone,
  Tv,
  Network,
  Wallet,
  ShieldCheck,
  Zap,
  Clapperboard,
  CalendarClock,
  Landmark,
} from "lucide-react";

const SERVICES = [
  {
    title: "Mobile and DTH Recharge",
    description:
      "Earn money while acting as a gateway for your customers as you recharge their DTH & mobiles or pay their utility bills. Ezeepay changes any retailer into a one-stop solution-based destination for a customer that needs help with recharges and bill payments.",
    image: "/images/services/utility-bill-payment/mobile-dth-recharge.png",
    href: "#",
    tags: [
      { icon: Smartphone, label: "Mobile Recharge" },
      { icon: Tv, label: "DTH Recharge" },
      { icon: Wallet, label: "Earn Commission" },
    ],
  },
  {
    title: "Bharat Bill Payment System",
    description:
      "The Bharat Bill Payment system puts retailers under one single network, enabling them to use different payment methods to accept and send money and earn commission over every transaction — over and above helping their local customers.",
    image: "/images/services/utility-bill-payment/bharat-bill-payment.png",
    href: "#",
    tags: [
      { icon: Network, label: "Single Network" },
      { icon: Landmark, label: "Multiple Payment Modes" },
      { icon: Wallet, label: "Earn Every Transaction" },
    ],
  },
  {
    title: "OTT Recharge",
    description:
      "If you are an Ezeepay retailer, you can also recharge OTT platforms like Netflix, Amazon Prime, Disney+ Hotstar, etc. for your customers and earn money. The billing cycle for OTT recharges is usually a 30-day cycle.",
    image: "/images/services/utility-bill-payment/ott-recharge.png",
    href: "#",
    tags: [
      { icon: Clapperboard, label: "OTT Platforms" },
      { icon: CalendarClock, label: "30-Day Cycle" },
      { icon: Zap, label: "Quick Recharge" },
    ],
  },
];

export default function UtilityBillPaymentList() {
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
            Utility and Bill Payment Services
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-brand-purple-dark md:text-5xl">
            Pay Bills, Earn{" "}
            <span className="relative inline-block text-brand-orange">
              Commissions, Every Month
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
            You, being an Ezeepay retailer, can help your local rural
            customers pay utility bills through our safe &amp; reliable
            portal. Every time you pay someone&apos;s bill, you earn money.
            Some of the utility and bill payment services we provide are —
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