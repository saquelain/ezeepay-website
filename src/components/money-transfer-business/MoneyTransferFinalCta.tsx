import { ArrowRight } from "lucide-react";
import Image from "next/image";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.EzeePay_DigitalBharat&pli=1";

export default function MoneyTransferFinalCta() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-brand-purple via-brand-purple-dark to-[#120B22] py-12 lg:py-14">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute bottom-0 left-0 top-0 w-[22%]">
          <Image
            src="/images/services/banking-service/cta-wave-left.png"
            alt=""
            fill
            sizes="22vw"
            className="object-cover object-left"
          />
        </div>
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

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
          Start Your Money Transfer Business Today
        </h2>
        <p className="mt-4 text-lg text-white/85">
          Join thousands of retailers earning more with every transfer
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