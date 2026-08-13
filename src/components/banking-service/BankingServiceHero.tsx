import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp, Headphones, ShieldCheck } from "lucide-react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.EzeePay_DigitalBharat&pli=1";

const HIGHLIGHTS = [
  { icon: TrendingUp, label: "High Commissions" },
  { icon: Headphones, label: "24x7 Support" },
  { icon: ShieldCheck, label: "100% Secure Transactions" },
];

export default function BankingServiceHero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#EDE7F8] via-[#F3EEFA] to-white">
      {/* Corner blob artwork — transparent PNG, top-right as-is, bottom-left rotated 180° */}
      {/* <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute right-0 top-0 h-[55%] w-[45%] md:h-[65%] md:w-[38%]">
          <Image
            src="/images/services/banking-service/corner-blob.png"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 38vw, 45vw"
            className="object-cover object-right-top"
          />
        </div>

        <div
          className="absolute bottom-0 left-0 h-[55%] w-[45%] md:h-[65%] md:w-[38%]"
          style={{ transform: "rotate(180deg)" }}
        >
          <Image
            src="/images/services/banking-service/corner-blob.png"
            alt=""
            fill
            sizes="(min-width: 768px) 38vw, 45vw"
            className="object-cover object-right-top"
          />
        </div>
      </div> */}

      <div className="relative z-10 mx-auto w-full max-w-[96rem] px-6 pb-16 pt-28 lg:px-12 lg:pt-32">
        {/* Back link — sits above the whole grid, like the reference */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-brand-purple/15 bg-white px-4 py-2 text-sm font-medium text-brand-purple-dark shadow-sm transition-colors hover:border-brand-purple/30"
        >
          <ArrowRight size={14} className="rotate-180" />
          Back to Services
        </Link>

        <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          {/* ── Left — copy ── */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-purple">
              Ezeepay Banking Services
            </p>

            <h1 className="mt-4 text-5xl font-extrabold leading-[1.1] tracking-tight text-brand-purple-dark md:text-6xl xl:text-[4.5rem]">
              Banking Services,
              <br />
              Built for{" "}
              <span className="relative inline-block text-brand-orange">
                You
                <svg
                  aria-hidden
                  viewBox="0 0 140 18"
                  className="absolute left-0 top-full mt-0.5 h-3.5 w-full text-brand-orange"
                  fill="none"
                >
                  <path
                    d="M2 12C30 2 90 2 138 12"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-xl leading-relaxed text-brand-grey">
              Offer a complete range of banking services to your customers and
              grow your business with high commissions and trusted support from
              Ezeepay.
            </p>

            {/* Highlight cards — 3 in a horizontal row */}
            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
              {HIGHLIGHTS.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.label}
                    className="flex items-center gap-3 rounded-2xl border border-brand-purple/10 bg-white/80 px-5 py-5 shadow-sm backdrop-blur-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple">
                      <Icon size={20} />
                    </span>
                    <span className="text-[15px] font-semibold leading-snug text-brand-purple-dark">
                      {h.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-xl bg-brand-purple-dark px-8 py-4 text-[16px] font-medium leading-none text-white shadow-lg shadow-brand-purple-dark/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
            >
              Download Ezeepay App
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-purple-dark">
                <ArrowRight size={15} />
              </span>
            </a>
          </div>

          {/* ── Right — phone mockup ── */}
          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="relative h-[420px] w-full lg:h-[600px]">
              <Image
                src="/images/services/banking-service/hero-image.png"
                alt="Ezeepay app — AEPS, DMT, Micro ATM and more banking services"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 92vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}