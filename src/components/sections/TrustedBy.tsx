import Image from "next/image";

const PARTNERS = [
  { name: "Partner 1", src: "/images/trusted-by/partner-1.png" },
  { name: "Partner 2", src: "/images/trusted-by/partner-2.png" },
  { name: "Partner 3", src: "/images/trusted-by/partner-3.png" },
  { name: "Partner 4", src: "/images/trusted-by/partner-4.png" },
  { name: "Partner 5", src: "/images/trusted-by/partner-5.png" },
  { name: "Partner 6", src: "/images/trusted-by/partner-6.png" },
  { name: "Partner 7", src: "/images/trusted-by/partner-7.png" },
];

export default function TrustedBy() {
  return (
    <section className="relative bg-white px-6 py-16 mb-30">
      <div className="mx-auto max-w-6xl">
        {/* Badge + divider line */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px bg-black/10" />
          <span className="relative rounded-full border border-black/10 bg-white px-6 py-2.5 text-sm font-medium text-brand-purple-dark">
            Trusted by Partners across India
          </span>
        </div>

        {/* Marquee logo row */}
        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          <div
            className="animate-marquee flex w-max items-center gap-16"
            style={{ animationDuration: "30s" }}
          >
            {[...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="relative h-8 w-28 flex-shrink-0 grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}