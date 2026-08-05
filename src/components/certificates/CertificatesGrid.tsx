"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Download, Landmark, ShieldCheck, BadgeCheck, RefreshCw } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Your files (already in the repo):
 *  - PDFs:       /public/images/certificates/{mca,gst,dipp,msme}.pdf
 *  - PDF icon:   /public/images/certificates/pdf-icon.png
 *  - Thumbnails: /public/images/certificates/thumbs/<slug>.png (optional —
 *    export page 1 of each PDF as an image; until then a styled
 *    placeholder with the PDF icon is shown automatically)
 */
const CERTIFICATES = [
  {
    slug: "mca",
    title: "Certificate of Incorporation",
    desc: "Certificate of Incorporation issued by the Ministry of Corporate Affairs.",
  },
  {
    slug: "gst",
    title: "GST Registration",
    desc: "Goods and Services Tax Registration Certificate issued under GST Act.",
  },
  {
    slug: "dipp",
    title: "Startup India (DPIIT) Recognition",
    desc: "Certificate of Recognition issued by DPIIT, Government of India.",
  },
  {
    slug: "msme",
    title: "MSME Registration",
    desc: "Udyam Registration Certificate issued by the Ministry of MSME.",
  },
];

const TRUST_STRIP = [
  {
    icon: Landmark,
    title: "Government Registered",
    desc: "Registered with relevant government authorities.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    desc: "Bank-level security to keep your data protected.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Documents",
    desc: "All documents are verified and up-to-date.",
  },
  {
    icon: RefreshCw,
    title: "Regularly Updated",
    desc: "We ensure our compliance documents are always current.",
  },
];

export default function CertificatesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  /* Thumbs that failed to load fall back to a styled placeholder */
  const [thumbError, setThumbError] = useState<Record<string, boolean>>({});

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        /* Fail-safe entrance: per-card trigger, never pre-hidden */
        gsap.utils.toArray<HTMLElement>(".cert-card").forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 36, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power3.out",
              delay: (i % 4) * 0.08,
              immediateRender: false,
              clearProps: "all",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* ── Certificate cards ── */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {CERTIFICATES.map((c) => (
            <div
              key={c.slug}
              className="cert-card flex flex-col rounded-3xl bg-white p-6 ring-1 ring-black/5 shadow-lg shadow-brand-purple/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-purple/10"
            >
              <div className="flex gap-5">
                {/* Thumbnail with PDF badge */}
                <div className="relative w-24 flex-shrink-0">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#F7F5FB] ring-1 ring-black/10 shadow-sm">
                    {thumbError[c.slug] ? (
                      /* Placeholder until a real thumbnail is added */
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="relative h-10 w-10 opacity-80">
                          <Image
                            src="/images/certificates/pdf-icon.png"
                            alt=""
                            fill
                            sizes="40px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={`/images/certificates/thumbs/${c.slug}.png`}
                        alt={`${c.title} preview`}
                        fill
                        sizes="96px"
                        className="object-cover object-top"
                        onError={() =>
                          setThumbError((s) => ({ ...s, [c.slug]: true }))
                        }
                      />
                    )}
                  </div>
                  {/* PDF icon — top-right corner */}
                  <div className="absolute -right-3 -top-3 h-10 w-10 drop-shadow-md">
                    <Image
                      src="/images/certificates/pdf-icon.png"
                      alt=""
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Title + divider + description */}
                <div className="min-w-0">
                  <h3 className="text-lg font-bold leading-snug text-[#1D1D1D]">
                    {c.title}
                  </h3>
                  <span className="mt-2.5 block h-0.5 w-8 rounded-full bg-brand-purple" />
                  <p className="mt-3 text-sm leading-relaxed text-brand-grey">
                    {c.desc}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto flex gap-3 pt-6">
                <a
                  href={`/images/certificates/${c.slug}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-purple/30 py-2.5 text-sm font-semibold text-brand-purple transition-colors hover:bg-brand-purple-light"
                >
                  View PDF
                  <Eye size={15} />
                </a>
                <a
                  href={`/images/certificates/${c.slug}.pdf`}
                  download
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-purple py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-purple-dark"
                >
                  Download
                  <Download size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Trust strip ── */}
        <div className="cert-card mt-8 grid gap-x-6 gap-y-8 rounded-3xl bg-white p-8 ring-1 ring-black/5 shadow-lg shadow-brand-purple/5 sm:grid-cols-2 lg:grid-cols-4 md:p-10">
          {TRUST_STRIP.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-brand-purple-light text-brand-purple">
                <Icon size={24} />
              </span>
              <div>
                <h4 className="font-bold text-[#1D1D1D]">{title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-brand-grey">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}