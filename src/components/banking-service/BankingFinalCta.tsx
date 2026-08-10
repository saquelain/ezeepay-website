import { ArrowRight } from "lucide-react";
import Image from "next/image";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.EzeePay_DigitalBharat&pli=1";

export default function BankingFinalCta() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#4038A8] via-[#3D2F96] to-[#37277F] py-12 lg:py-14">
      {/* Decorative corner waves */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Left wave — portrait, hugs the left edge */}
        <div className="absolute bottom-0 left-0 top-0 w-[22%]">
            <Image
            src="/images/services/banking-service/cta-wave-left.png"
            alt=""
            fill
            sizes="22vw"
            className="object-cover object-left"
            />
        </div>

        {/* Right wave — landscape, sits in the bottom-right corner */}
        <div className="absolute bottom-0 right-0 h-[85%] w-[38%]">
            <Image
            src="/images/services/banking-service/cta-wave-right.png"
            alt=""
            fill
            sizes="38vw"
            className="object-contain object-right-bottom"
            />
        </div>
        </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
      <h2 className="whitespace-nowrap text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
          Join Thousands of Successful Retailers
        </h2>

        <p className="mt-4 text-lg text-white/85">
          Start offering banking services today and earn more with Ezeepay
        </p>

        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex items-center gap-3 rounded-xl bg-brand-orange px-8 py-4 text-[16px] font-semibold leading-none text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
        >
          Download App Now
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-orange">
            <ArrowRight size={15} />
          </span>
        </a>
      </div>
    </section>
  );
}