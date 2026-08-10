"use client";

import Image from "next/image";
import { Users, MapPin, Landmark, Gauge } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.EzeePay_DigitalBharat&pli=1";
const APP_STORE_URL = "#"; // replace with real App Store link if you have one

const STATS = [
  { icon: Users, value: "10 Lakh+", label: "Happy Retailers" },
  { icon: MapPin, value: "500+", label: "Districts Covered" },
  { icon: Landmark, value: "100+", label: "Banking Services" },
  { icon: Gauge, value: "99.9%", label: "Uptime Guarantee" },
];

export default function BankingCtaBanner() {
  return (
    <section className="relative w-full bg-[#F7F5FB] pb-20">
      <div className="mx-auto w-full max-w-[100rem] px-6 lg:px-8">
        {/* ── Purple CTA banner — gradient tied to the Footer's dark tone
             (#120B22) so it reads as the same brand, not a random purple ── */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-purple via-brand-purple-dark to-[#120B22] px-6 py-10 md:px-12 md:py-4">
          {/* Subtle glow accent, echoes the corner-blob device used elsewhere */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-orange/20 blur-[100px]"
          />

          <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-[300px_200px_1fr] md:gap-12">
            {/* Phone image — anchored to bottom-left, bleeding off the banner */}
            <div className="relative mx-auto h-72 w-56 md:-mb-16 md:-ml-4 md:h-[440px] md:w-full md:self-end">
            <Image
                src="/images/services/banking-service/cta-phone.png"
                alt="Ezeepay app preview"
                fill
                sizes="(min-width: 768px) 320px, 224px"
                className="object-contain object-bottom"
            />
            </div>

            {/* QR code */}
            <div className="mx-auto text-center md:py-12">
              <p className="text-lg font-semibold leading-snug text-white">
                Scan to
                <br />
                Download App
              </p>
              <div className="mt-4 inline-block rounded-2xl bg-white p-3">
                <QRCodeSVG
                    value={PLAY_STORE_URL}
                    size={144}
                    level="M"
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                />
                </div>
            </div>

            {/* Copy + phone input + store badges */}
            <div className="md:py-12">
              <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
                Take Your Business
                <br />
                to the <span className="text-brand-orange">Next Level!</span>
              </h2>

              <p className="mt-4 max-w-md leading-relaxed text-white/80">
                Download the Ezeepay app now and unlock a world of banking
                services. More services, more earnings!
              </p>

              {/* Phone number input */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-6 flex max-w-lg items-center overflow-hidden rounded-full bg-white p-1.5 shadow-lg"
              >
                <span className="flex shrink-0 items-center gap-1.5 border-r border-black/10 px-4 text-sm font-medium text-brand-purple-dark">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter your mobile number"
                  className="w-full bg-transparent px-4 py-2.5 text-sm text-brand-purple-dark outline-none placeholder:text-brand-grey"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
                >
                  Get App Link
                </button>
              </form>

              {/* Store badges */}
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-12 w-40 transition-transform hover:scale-105"
                >
                  <Image
                    src="/images/badges/google-play.svg"
                    alt="Get it on Google Play"
                    fill
                    sizes="160px"
                    className="object-contain"
                  />
                </a>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-12 w-40 transition-transform hover:scale-105"
                >
                  <Image
                    src="/images/badges/app-store.svg"
                    alt="Download on the App Store"
                    fill
                    sizes="160px"
                    className="object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="mt-8 grid grid-cols-2 gap-6 rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-brand-purple/10 md:grid-cols-4 md:divide-x md:divide-brand-purple/10 md:px-10">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex items-center gap-4 md:justify-center"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-purple-light text-brand-purple">
                  <Icon size={24} />
                </span>
                <div>
                  <p className="text-2xl font-extrabold text-brand-purple-dark">
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-sm text-brand-grey">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}