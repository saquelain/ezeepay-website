import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Landmark,
  CreditCard,
  QrCode,
  HandCoins,
  TrendingUp,
  ShieldCheck,
  Wallet,
  Clock,
  Gift,
} from "lucide-react";

const SERVICES = [
  {
    title: "Digital Bank Account",
    description:
      "Ezeepay comes with banking tools for every financial service you will ever need. Retailers can choose from leading banks & offer multiple banking services to their local customers. Retailers can also open accounts digitally in the most secure, reliable, and fast way. Note that being associated with Ezeepay ensures the retailers with cashback, rewards and commissions.",
    image: "/images/services/neo-banking/digital-bank-account.png",
    href: "#",
    tags: [
      { icon: Landmark, label: "Leading Banks" },
      { icon: ShieldCheck, label: "Secure & Fast" },
      { icon: Gift, label: "Cashback & Rewards" },
    ],
  },
  {
    title: "Physical Card",
    description:
      "Ezeepay retailers have the option to apply for both debit and credit cards on behalf of their customers and the card gets delivered to their registered address by the respective bank. Each card issued to a customer gets you a good commission with no barriers to earning.",
    image: "/images/services/neo-banking/physical-card.png",
    href: "#",
    tags: [
      { icon: CreditCard, label: "Debit & Credit Cards" },
      { icon: Wallet, label: "Doorstep Delivery" },
      { icon: TrendingUp, label: "No Earning Barriers" },
    ],
  },
  {
    title: "UPI Payment",
    description:
      "Ezeepay retailers can receive and transfer money through UPI on behalf of their local customers too, in exchange for a small commission. UPI payments have been proven to be highly reliable and allow your customer to transfer funds contactless. Ezeepay brings you a handsome mode for accepting payments via UPI and QR.",
    image: "/images/services/neo-banking/upi-payment.png",
    href: "#",
    tags: [
      { icon: QrCode, label: "UPI & QR" },
      { icon: ShieldCheck, label: "Contactless & Reliable" },
      { icon: Wallet, label: "Earn Commission" },
    ],
  },
  {
    title: "Loan",
    description:
      "When we said to be the bank, we meant it. Be the bank and help your local customers by handing out loans easily. The idea is simple — do not let the customer slip away just because they need something and our retailers cannot provide it. Handing out loans is easier than ever. Only on Ezeepay!",
    image: "/images/services/neo-banking/loan.png",
    href: "#",
    tags: [
      { icon: HandCoins, label: "Easy Loans" },
      { icon: Clock, label: "Fast Disbursal" },
      { icon: Wallet, label: "Earn on Every Loan" },
    ],
  },
  {
    title: "Investment",
    description:
      "Allow your customers to invest via the platform & enjoy the gains. With each investment account opened via the platform, earn more. Ezeepay is happy to help.",
    image: "/images/services/neo-banking/investment.png",
    href: "#",
    tags: [
      { icon: TrendingUp, label: "Investment Accounts" },
      { icon: Wallet, label: "Earn Per Account" },
      { icon: ShieldCheck, label: "Trusted Platform" },
    ],
  },
];

export default function NeoBankingList() {
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
            Neo Banking Services
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-brand-purple-dark md:text-5xl">
            Banking Services;{" "}
            <span className="relative inline-block text-brand-orange">
              More of Everything
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
            EzeePay has got you covered to assist you with every banking
            service that there is. Dive more into the details of the offered
            services below:
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