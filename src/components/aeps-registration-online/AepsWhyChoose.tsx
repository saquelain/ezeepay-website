import Image from "next/image";
import { CheckSquare } from "lucide-react";

const REQUIREMENTS = [
  "Smart Phone or Computer with an active internet connection",
  "Biometric Device",
];

export default function AepsWhyChoose() {
  return (
    <section className="w-full bg-[#F7F6FB] py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-12">
        {/* ── Heading ── */}
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#1D1233] md:text-4xl">
          Why choose <span className="text-brand-purple">Ezeepay</span> for
          AEPS Service?
        </h2>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — activation process copy */}
          <div>
            <h3 className="text-xl font-bold text-[#1D1233]">
              Activation Process
            </h3>

            <p className="mt-4 max-w-xl leading-relaxed text-brand-grey">
              Any new or existing business partner can do AEPS free portal
              registration with a simple documentation process. All you need to
              do is to submit your PAN Card and Aadhaar Card and fill the
              Aadhaar Enable Payment System / AePS registration form. Earn a
              handsome income on every transaction!
            </p>

            <h4 className="mt-7 font-bold text-[#1D1233]">
              Things required to start AEPS Business?
            </h4>

            <ul className="mt-4 space-y-3">
              {REQUIREMENTS.map((r) => (
                <li key={r} className="flex items-center gap-3">
                  <CheckSquare
                    size={19}
                    className="shrink-0 text-brand-orange"
                  />
                  <span className="text-sm font-medium text-[#1D1233]">
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — handshake illustration */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-square w-full">
              <Image
                src="/images/services/aeps-registration/why-choose.png"
                alt="Partner with Ezeepay and grow your earnings"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}