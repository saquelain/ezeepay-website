import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.EzeePay_DigitalBharat&pli=1";

export default function AepsHero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#EDE7F8] via-[#F3EEFA] to-white">
      {/* Right wave background */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 top-0 w-[40%] md:w-[32%]"
        aria-hidden
      >
        <Image
          src="/images/services/aeps-registration/wave-right.png"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 32vw, 40vw"
          className="object-cover object-left"
        />
      </div>

      {/* Left wave — reuse the same image, mirrored */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 hidden w-[18%] -scale-x-100 lg:block"
        aria-hidden
      >
        <Image
          src="/images/services/aeps-registration/wave-right.png"
          alt=""
          fill
          sizes="18vw"
          className="object-cover object-left opacity-60"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 pb-16 pt-28 lg:px-12 lg:pt-32">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-white px-4 py-1.5 text-sm font-medium text-brand-orange shadow-sm transition-colors hover:border-brand-orange"
        >
          <ArrowRight size={13} className="rotate-180" />
          Go Back to Services
        </Link>

        <div className="mt-6 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          {/* ── Left — copy ── */}
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-brand-purple-dark md:text-5xl">
              AePS Registration
              <br />
              <span className="relative inline-block text-brand-orange">
                Online
                <svg
                  aria-hidden
                  viewBox="0 0 140 18"
                  className="absolute left-0 top-full mt-1 h-3 w-full text-brand-orange"
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

            <h2 className="mt-8 max-w-lg text-xl font-bold leading-snug text-brand-purple-dark">
              Become an AEPS agent with Ezeepay and offer banking services to
              your customers through your retail shop
            </h2>

            <p className="mt-5 max-w-lg leading-relaxed text-brand-grey">
              The ultimate solution for all your banking needs! With our
              innovative platform, you can effortlessly offer your customers a
              wide range of services including seamless cash withdrawals,
              convenient cash deposits, instant balance inquiries, and
              comprehensive mini statements. Our goal is to empower you and
              enhance the banking experience for your valued customers. Join us
              today and unlock a world of hassle-free transactions with Ezeepay
              AePS Service.
            </p>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-brand-orange px-6 py-3 text-[15px] font-semibold leading-none text-white shadow-lg shadow-brand-orange/25 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
            >
              <Download size={17} />
              Download App
            </a>
          </div>

          {/* ── Right — phone mockup ── */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-2xl">
            <div className="relative h-[400px] w-full lg:h-[560px]">
              <Image
                src="/images/services/aeps-registration/hero-image.png"
                alt="Ezeepay app — AePS, DMT, Micro ATM and more services"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}