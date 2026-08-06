"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Certifications & Associations strip for the footer.
 *
 * Logo files live at /public/images/associations/ — the `file` field below
 * must match each file's actual name + extension.
 *
 * Until a logo file exists, a clean text badge is shown automatically.
 */
const ASSOCIATIONS = [
  { file: "bcfi.png", name: "BCFI", full: "Business Correspondent Federation of India" },
  { file: "iamai.png", name: "IAMAI", full: "Internet and Mobile Association of India" },
  { file: "rbi.png", name: "RBI", full: "Reserve Bank of India" },
  { file: "npci.png", name: "NPCI", full: "National Payments Corporation of India" },
  { file: "upi.png", name: "UPI", full: "Unified Payments Interface" },
  { file: "duns.png", name: "D-U-N-S", full: "Dun & Bradstreet D-U-N-S Registered" },
];

export default function FooterAssociations() {
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  return (
    <div className="mt-4 pt-0">
      {/* Heading between divider lines */}
      <div className="flex items-center gap-6">
        <span className="h-px flex-1 bg-white/10" />
        <p className="text-lg font-semibold text-white/90">
          Certifications &amp; Associations
        </p>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      {/* Logos — one row on desktop, each scales to fit its cell */}
      <div className="mt-0 grid grid-cols-2 items-center gap-x-3 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
        {ASSOCIATIONS.map((a) => (
          <div
            key={a.file}
            title={a.full}
            className="flex h-24 items-center justify-center opacity-95 transition-opacity duration-300 hover:opacity-100 md:h-32"
          >
            {failed[a.file] ? (
              /* Text badge until the official logo file is added */
              <span className="inline-flex items-center rounded-xl border border-white/15 px-6 py-4 text-lg font-bold tracking-wide text-white/80">
                {a.name}
              </span>
            ) : (
              <Image
                src={`/images/associations/${a.file}`}
                alt={a.full}
                width={480}
                height={160}
                className="max-h-full w-auto max-w-full object-contain"
                onError={() => setFailed((s) => ({ ...s, [a.file]: true }))}
              />
            )}
          </div>
        ))}
      </div>

      <p className="mt-0 text-center text-sm leading-relaxed text-white/30">
        All trademarks and logos belong to their respective organisations and are
        shown to indicate membership, registration, or compliance.
      </p>
    </div>
  );
}