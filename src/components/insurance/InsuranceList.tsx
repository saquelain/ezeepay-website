import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  HeartPulse,
  Car,
  Store,
  Smartphone,
  Wallet,
  ShieldCheck,
  Users,
  FileSearch,
  Flame,
} from "lucide-react";

const SERVICES = [
  {
    title: "Health Insurance",
    description:
      "Ezeepay helps retailers find the best health insurance policies from varied options available for their customers. Retailers can help their clients avoid huge hospital bills, medical bills, diagnostic bills, etc., by providing them with health insurance at a reasonable premium per year. You can search for individual or family health insurance and can ask for the type of plan your customers need and find it accordingly.",
    image: "/images/services/insurance/health-insurance.png",
    href: "#",
    tags: [
      { icon: HeartPulse, label: "Individual & Family Plans" },
      { icon: FileSearch, label: "Compare Policies" },
      { icon: Wallet, label: "Earn Commission" },
    ],
  },
  {
    title: "Motor Insurance",
    description:
      "With Ezeepay, retailers can book motor insurance for their customers. There are different policies available for two-wheelers, four-wheelers, and other heavy and light vehicles. As per the requirement, you can search for suitable motor insurance and help people living in your local areas avoid heavy expenditure after accidents involving their vehicles.",
    image: "/images/services/insurance/motor-insurance.png",
    href: "#",
    tags: [
      { icon: Car, label: "Two & Four Wheelers" },
      { icon: ShieldCheck, label: "Accident Coverage" },
      { icon: Wallet, label: "Earn Commission" },
    ],
  },
  {
    title: "Shop Insurance",
    description:
      "Insurance for shops is important because they are the major source of livelihood, especially in village areas. Retailers that join Ezeepay have the option to find a decent insurance plan for their customers' shops and help them stay tension-free from any theft or incident of fire or other problems that can harm their shops. You can use Ezeepay to see what insurance company offers the most suitable plan for their shop.",
    image: "/images/services/insurance/shop-insurance.png",
    href: "#",
    tags: [
      { icon: Store, label: "Protect Livelihood" },
      { icon: Flame, label: "Fire & Theft Cover" },
      { icon: Wallet, label: "Earn Commission" },
    ],
  },
  {
    title: "Device Insurance",
    description:
      "Electronic devices like mobile phones are costly. So, covering them with an insurance plan is a good idea. Retailers can use Ezeepay to find different plans that can cover different electronic devices at a cost-effective price for them and their clients. Relieve your customers from the stress of mobile phones getting stolen or lost.",
    image: "/images/services/insurance/device-insurance.png",
    href: "#",
    tags: [
      { icon: Smartphone, label: "Mobile & Electronics" },
      { icon: ShieldCheck, label: "Theft & Loss Cover" },
      { icon: Users, label: "Cost-Effective Plans" },
    ],
  },
];

export default function InsuranceList() {
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
            Ezeepay Insurance Services
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-brand-purple-dark md:text-5xl">
            Get the Best{" "}
            <span className="relative inline-block text-brand-orange">
              Insurance Policies
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
            Ezeepay can help you find different types of insurance policies as
            per the needs of your rural customers and secure their lives &amp;
            livelihood. There are several affordable plans available.
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