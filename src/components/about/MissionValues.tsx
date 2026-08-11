import Link from "next/link";
import Image from "next/image";
import { Target, TrendingUp, Rocket, ArrowRight, Store } from "lucide-react";

const VALUES = [
  {
    icon: Target,
    title: "Clarity over complexity",
    text: "Every service is designed so a first-time agent can start earning within minutes, no paperwork required.",
  },
  {
    icon: TrendingUp,
    title: "Growth for everyone",
    text: "From a single kirana shop to a full-fledged distribution business, the same platform scales with your ambition.",
  },
  {
    icon: Rocket,
    title: "Continuous innovation",
    text: "New services, better commissions, and smarter tools — shipped regularly for every partner.",
  },
];

export default function MissionValues() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FAFAFA] px-6 py-28">
      {/* soft glow accents */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gray-100 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[400px] w-[400px] rounded-full bg-[#F47B20]/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Left — Our Mission */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F47B20]">
            Our mission
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-brand-purple-dark md:text-5xl">
            Digital banking for{" "}
            <span className="text-[#F47B20]">every village</span> in India
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-brand-grey">
            We&apos;re building the largest branchless banking network of
            Ezeepay retailers — making digital banking easy, convenient, and
            accessible everywhere.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand-purple px-7 py-4 text-[16px] font-medium leading-none text-white shadow-lg shadow-brand-purple/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
          >
            Explore the platform
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F47B20] text-white">
              <ArrowRight size={15} />
            </span>
          </Link>

          {/* Photo + floating stat card */}
          <div className="relative mt-12 max-w-md">
            <div className="overflow-hidden rounded-3xl border border-border-subtle">
              <Image
                src="/retailer.png"
                alt="Ezeepay retailer serving a customer at a local shop"
                width={640}
                height={440}
                className="h-64 w-full object-cover md:h-72"
              />
            </div>

            {/* floating stat card */}
            <div className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-2xl shadow-black/10 ring-1 ring-black/5 md:-right-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F47B20]/10">
                <Store size={20} className="text-[#F47B20]" />
              </div>
              <div className="leading-tight">
                <p className="text-xl font-bold text-brand-purple-dark">2,00,000+</p>
                <p className="text-sm text-[#6B7280]">Retail partners</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Our Values */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F47B20]">
            Our values
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-brand-purple-dark md:text-5xl">
            What we stand for
          </h2>

          <div className="mt-10 flex flex-col gap-5">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="group rounded-2xl border border-border-subtle bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F47B20]/40 hover:shadow-md"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#F47B20]/10 transition-colors duration-300 group-hover:bg-[#F47B20]/20">
                      <Icon size={20} className="text-[#F47B20]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-brand-purple-dark">
                        {v.title}
                      </h3>
                      <p className="mt-1.5 leading-relaxed text-brand-grey">
                        {v.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}