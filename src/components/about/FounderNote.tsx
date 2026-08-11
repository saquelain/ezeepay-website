import Image from "next/image";

/* 1px outline used for the card + notch (keep these two in sync) */
const LINE = "rgba(17, 24, 39, 0.08)";

export default function FounderNote() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Mobile heading — plain, above the card */}
        <h2 className="text-center text-4xl font-bold text-[#1D1D1D] md:hidden">
          How Ezeepay Started
        </h2>

        {/* Card with a notched title tab (md+) */}
        <div
          className="relative mt-12 rounded-[2.5rem] border bg-[#F7F5FB] p-8 md:mt-24 md:p-14 md:pt-24"
          style={{ borderColor: LINE }}
        >
          {/* ── White tab the heading sits in — cuts into the card's top edge ── */}
          <div className="absolute -top-px left-1/2 hidden -translate-x-1/2 md:block">
            <div
              className="relative rounded-b-[2rem] border-x border-b bg-white px-12 pb-6 pt-2"
              style={{ borderColor: LINE }}
            >
              <h2 className="whitespace-nowrap text-center text-4xl font-bold text-[#1D1D1D] md:text-5xl">
                How Ezeepay Started
              </h2>

              {/* Concave corners joining tab → card, with the outline running through them */}
              <span
                aria-hidden
                className="absolute right-full top-0 h-8 w-8"
                style={{
                  background: `radial-gradient(circle at 0% 100%, transparent calc(2rem - 1px), ${LINE} calc(2rem - 1px), ${LINE} 2rem, #ffffff 2rem)`,
                }}
              />
              <span
                aria-hidden
                className="absolute left-full top-0 h-8 w-8"
                style={{
                  background: `radial-gradient(circle at 100% 100%, transparent calc(2rem - 1px), ${LINE} calc(2rem - 1px), ${LINE} 2rem, #ffffff 2rem)`,
                }}
              />
            </div>
          </div>

          {/* ── Avatar, pinned to the card's right side (not the narrower text column) ── */}
          <div className="absolute right-10 top-24 hidden flex-shrink-0 rounded-2xl border-2 border-dashed border-border-subtle p-3 md:top-28 md:block lg:right-14">
            <div className="relative h-44 w-44 overflow-hidden rounded-xl bg-gray-100 lg:h-52 lg:w-52">
              <Image
                src="/images/about/founder.webp"
                alt="Shams Tabrez, founder of Ezeepay"
                fill
                sizes="208px"
                className="object-cover"
              />
            </div>
          </div>

          {/* ── "Our Journey" heading, sitting directly above the letter ── */}
          <div>
            <h3 className="text-3xl font-bold text-brand-purple-dark">
              Our Journey
            </h3>
            <p className="mt-2 text-lg text-brand-grey">A note from the founder</p>
          </div>

          {/* ── Letter body — reserves space on the right (md+) so text doesn't
                 run under the absolutely-positioned avatar. Sized up (text-lg,
                 leading-loose, larger paragraph gaps) so the block fills the
                 card's height instead of reading as a thin strip of text. ── */}
          <div className="relative z-10 mt-8 max-w-2xl space-y-7 pr-0 text-lg leading-loose text-brand-grey md:max-w-none md:pr-64 lg:pr-72 lg:text-xl">
            {/* Mobile-only avatar, back inline since there's no room to pin it aside */}
            <div className="float-right ml-6 mb-4 flex-shrink-0 rounded-2xl border-2 border-dashed border-border-subtle p-2.5 md:hidden">
              <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src="/images/about/founder.webp"
                  alt="Shams Tabrez, founder of Ezeepay"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            </div>

            <p>Dear partners,</p>

            <p>
              EzeePay Digital Bharat is a leading service aggregator and
              payments solution provider based in India. We currently offer
              more than 60+ services — AEPS, domestic money transfer, mobile
              recharge, bill payments, insurance, travel bookings (bus,
              railway, flight), taxation, and more.
            </p>

            <p>
              In a very short space of time, EzeePay Digital Bharat has
              experienced rapid growth and established itself as one of the
              leading players in the Indian market.
            </p>

            <p className="clear-right">
              As a rural fintech company, EzeePay Digital Bharat has aimed to
              make banking easier and more convenient in rural areas of India.
              Following that, we&apos;ve expanded our retail base and channel
              partners — growing from 5,000 to 10,00,000 retail outlets, with
              plans to triple that headcount in the years ahead.
            </p>

            <div className="pt-4">
              <p className="text-xl font-bold text-brand-purple-dark">
                Shams Tabrez
              </p>
              <p className="text-lg text-brand-grey">Founder, Ezeepay</p>
            </div>
          </div>

          {/* ── Decorative bottom-right corner image ── */}
          {/* Drop your image at /public/images/about/founder-note-decor.png (or update the src) */}
          <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-72 overflow-hidden rounded-br-[calc(2.5rem-1px)] md:h-56 md:w-[26rem]">
            <Image
              src="/images/about/founder-note-decor.png"
              alt=""
              fill
              sizes="(min-width: 768px) 416px, 288px"
              className="object-cover object-left-bottom [mask-image:linear-gradient(to_left,black_55%,transparent)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}