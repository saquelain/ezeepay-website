import Image from "next/image";
import { CheckCircle2, Search, Landmark, FileText } from "lucide-react";

const BENEFITS = [
  "Increased Revenue",
  "Enhanced Customer Experience",
  "Competitive Advantage",
  "Expanded Customer Base",
  "Comprehensive Support",
  "Cutting-edge Technology",
];

const CARDS = [
  {
    icon: Search,
    title: "Balance Inquiry",
    description:
      "AEPS Agent can check the balance of the customer simply in less than a minute by using Ezeepay portal or mobile application. We have the best mobile App to do AEPS.",
    featured: false,
  },
  {
    icon: Landmark,
    title: "Aadhaar ATM",
    description:
      "Instead of searching for an ATM, AEPS Agents of Ezeepay can convert their own available links on an ATM using this service. Customers can withdraw money using their Aadhaar Number and finger print.",
    featured: true,
  },
  {
    icon: FileText,
    title: "Mini statement",
    description:
      "Checking the mini statement of a customer has never been simpler. AEPS Agent will also get a commission every time he checks the mini statement of the customer via AEPS.",
    featured: false,
  },
];

export default function AepsBenefits() {
  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-12">
        {/* ── Heading ── */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#1D1233] md:text-4xl">
            Becoming <span className="text-brand-purple">AePS Service</span>
            <br />
            Provider of <span className="text-brand-purple">Ezeepay</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-brand-grey">
            Start your journey towards numerous benefits by becoming an AEPS
            Service Provider with Ezeepay. Joining our network opens up a world
            of advantages that will take your business to new heights. Here are
            just a few of the benefits you can enjoy:
          </p>
        </div>

        {/* ── Benefits checklist ── */}
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-3 rounded-2xl border border-black/5 bg-white px-8 py-6 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b} className="flex items-center gap-2.5">
              <CheckCircle2
                size={18}
                className="shrink-0 fill-brand-orange text-white"
              />
              <span className="text-sm font-medium text-[#1D1233]">{b}</span>
            </div>
          ))}
        </div>

        {/* ── 3 feature cards ── */}
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className={
                  c.featured
                    ? "rounded-2xl bg-gradient-to-b from-brand-orange to-[#E8571F] p-7 text-center text-white shadow-lg shadow-brand-orange/25 md:-my-3"
                    : "rounded-2xl border border-black/5 bg-white p-7 text-center shadow-sm"
                }
              >
                <span
                  className={
                    c.featured
                      ? "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15"
                      : "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F2FA]"
                  }
                >
                  <Icon
                    size={30}
                    className={c.featured ? "text-white" : "text-brand-purple"}
                  />
                </span>

                <h3
                  className={
                    c.featured
                      ? "mt-5 text-lg font-bold text-white"
                      : "mt-5 text-lg font-bold text-[#1D1233]"
                  }
                >
                  {c.title}
                </h3>

                <p
                  className={
                    c.featured
                      ? "mt-3 text-sm leading-relaxed text-white/90"
                      : "mt-3 text-sm leading-relaxed text-brand-grey"
                  }
                >
                  {c.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── What is AePS Service ── */}
        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          {/* Left — illustration */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-square w-full">
              <Image
                src="/images/services/aeps-registration/what-is-aeps.png"
                alt="AePS service — Aadhaar authentication with biometric device"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right — copy */}
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1D1233] md:text-4xl">
              What is <span className="text-brand-purple">AePS Service</span>
            </h2>

            <p className="mt-6 leading-relaxed text-brand-grey">
              AEPS (Aadhaar Enabled Payment System) is a revolutionary banking
              service that aims to provide inclusive and accessible financial
              transactions to individuals across various segments of society.
              It leverages the Aadhaar Enabled Payment System (AEPS) to enable
              secure and convenient banking services for all users, regardless
              of their location or access to traditional banking facilities.
            </p>

            <p className="mt-5 leading-relaxed text-brand-grey">
              Join the Ezeepay network as an AEPS Agent or AEPS Distributor and
              unlock a world of earning potential. We are dedicated to not only
              adding you to our network but also providing guidance on how to
              maximize your earnings. Getting started is easy — simply fill out
              our straightforward AEPS Agent registration form and you&apos;ll
              be on your way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}