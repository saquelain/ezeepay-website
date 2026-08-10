import Link from "next/link";
import { Target, TrendingUp, Rocket, ArrowRight } from "lucide-react";

const VALUES = [
  {
    icon: Target,
    text: "Clarity over complexity: every service is designed so a first-time agent can start earning within minutes, no paperwork required.",
  },
  {
    icon: TrendingUp,
    text: "Growth for everyone: from a single kirana shop to a full-fledged distribution business, we believe the same platform should scale with your ambition.",
  },
  {
    icon: Rocket,
    text: "Continuous innovation: new services, better commissions, and smarter tools — shipped regularly for every partner.",
  },
];

export default function MissionValues() {
    return (
      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left — Our Mission */}
          <div>
            <h2 className="text-4xl font-bold text-[#1D1D1D] md:text-5xl">
              Our mission
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#4D585F]">
              Our mission is to build the largest branchless banking network of
              Ezeepay retailers — making digital banking easy, convenient, and
              accessible for every village in India.
            </p>
  
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand-purple-dark px-7 py-4 text-[16px] font-medium leading-none text-white shadow-lg shadow-brand-purple-dark/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
            >
              Explore the platform
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-purple-dark">
                <ArrowRight size={15} />
              </span>
            </Link>
          </div>
  
          {/* Right — Our Values */}
          <div>
            <h2 className="text-4xl font-bold text-[#1D1D1D] md:text-5xl">
              Our values
            </h2>
  
            <div className="mt-8 flex flex-col gap-7">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.text} className="flex items-start gap-5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#EDF1F4]">
                      <Icon size={20} className="text-[#1D1D1D]" />
                    </div>
                    <p className="pt-2.5 leading-relaxed text-[#4D585F]">
                      {v.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }